package com.example.shineshoes.controller;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import com.example.shineshoes.core.dto.Product.ProductDTO;
import com.example.shineshoes.core.dto.Product.ProductVariantDTO;
import com.example.shineshoes.core.dto.Product.SimpleLittleProductDTO;
import com.example.shineshoes.core.model.product.Product;
import com.example.shineshoes.core.repository.BasketRepository;
import com.example.shineshoes.core.repository.ProductRepository;
import java.util.ArrayList;
import java.util.List;
import com.example.shineshoes.security.CustomUserDetailsService;
import com.example.shineshoes.security.UserPrincipal;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.databind.ObjectMapper;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
public class ShopControllerIntegrationTest
{
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Autowired
    private BasketRepository basketRepository;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMultipartFile mockMultipartFile;

    private UserPrincipal userPrincipal;

    @BeforeEach
    void setUp()
    {
        ProductVariantDTO productVariantDTO = ProductVariantDTO.builder().color("Green").size(BigDecimal.valueOf(44)).quantity(3).build();
        List<ProductVariantDTO> productVariantList = new ArrayList<>();
        productVariantList.add(productVariantDTO);
        List<String> category = new ArrayList<>();
        category.add("Sports");
        ProductDTO productDTO = ProductDTO.builder().name("Nike")
                .model("AirMax")
                .description("Test Description")
                .price(BigDecimal.valueOf(300))
                .productVariantDTO(productVariantList)
                .category(category)
                .build();
        mockMultipartFile = new MockMultipartFile("productDTO" , "","application/json",objectMapper.writeValueAsBytes(productDTO));
    }
    @BeforeEach
    public void setSecurityContext()
    {
         userPrincipal = customUserDetailsService.loadUserByUsername("test@shineshoes.com");
    }
    private void createProductAndAssertResponse() throws Exception {
        mockMvc.perform(multipart("/addproduct").file(mockMultipartFile))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("Nike"))
                .andExpect(jsonPath("$.model").value("AirMax"))
                .andExpect(jsonPath("$.description").value("Test Description"))
                .andExpect(jsonPath("$.price").value(BigDecimal.valueOf(300)))
                .andExpect(jsonPath("$.productVariantDTO").exists())
                .andExpect(jsonPath("$.category").exists());
    }
    @Test
    public void addProductShouldReturnCreatedWithCorrectData() throws Exception {
        long countBefore = productRepository.count();
        createProductAndAssertResponse();
        long countAfter = productRepository.count();
        assertEquals(countBefore + 1, countAfter);
    }
    @Test
    public void addProductWithoutDTO() throws Exception {
        mockMvc.perform(multipart("/addproduct")
                .file(
                        new MockMultipartFile("productDTO" ,
                                "",
                                "application/json",objectMapper.writeValueAsBytes("")))).andExpect(status().isNotFound());

    }
    @Test
    public void addProductToBasketShouldIncreaseBasketCount() throws Exception {
        createProductAndAssertResponse();
        List<Product> products = productRepository.findAll();
        Product product = products.stream().filter(p->p.getName().equals("Nike")).findFirst().orElseThrow();
        SimpleLittleProductDTO simpleLittleProductDTO = new SimpleLittleProductDTO(product.getId(), 3);
        long countBefore = basketRepository.count();
        mockMvc.perform(post("/basket/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(simpleLittleProductDTO))
                .with(user(userPrincipal))).andExpect(status().isCreated());
        long countAfter = basketRepository.count();
        assertEquals(countBefore+1,countAfter);
    }
    @Test
    public void addProductToBaskedWithoutAuth() throws Exception
    {
        createProductAndAssertResponse();
        List<Product> products = productRepository.findAll();
        Product product = products.stream().filter(p->p.getName().equals("Nike")).findFirst().orElseThrow();
        SimpleLittleProductDTO simpleLittleProductDTO = new SimpleLittleProductDTO(product.getId(), 3);
        mockMvc.perform(post("/basket/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(simpleLittleProductDTO))
                        .with(user(""))).andExpect(status().isUnauthorized());
    }
    @AfterEach
    public void clearSecurityContext()
    {
        SecurityContextHolder.clearContext();
    }
}
