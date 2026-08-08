package com.example.shineshoes.controller;

import com.example.shineshoes.core.controllers.ShopController;
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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.AssertionsKt.assertNotNull;

@SpringBootTest
@Transactional
public class ShopControllerIntegrationTest
{
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BasketRepository basketRepository;

    @Autowired
    private ShopController shopController;

    @Autowired
    CustomUserDetailsService customUserDetailsService;
    private ProductDTO productDTO;

    @BeforeEach
    void setUp()
    {
        ProductVariantDTO productVariantDTO = ProductVariantDTO.builder().color("Green").size(BigDecimal.valueOf(44)).quantity(3).build();
        List<ProductVariantDTO> productVariantList = new ArrayList<>();
        productVariantList.add(productVariantDTO);
        List<String> category = new ArrayList<>();
        category.add("Sports");
        productDTO = ProductDTO.builder().name("Nike")
                .model("AirMax")
                .description("Test Description")
                .price(BigDecimal.valueOf(300))
                .productVariantDTO(productVariantList)
                .category(category)
                .build();
    }
    @BeforeEach
    public void setSecurityContext()
    {
        UserPrincipal userPrincipal = customUserDetailsService.loadUserByUsername("d.kaczorowski.1999@gmail.com");
        Authentication auth = new UsernamePasswordAuthenticationToken(userPrincipal, null, userPrincipal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }
    @Test
    public void whenAddProduct()
    {
        long countBefore = productRepository.count();
        shopController.addProduct(productDTO);
        long countAfter = productRepository.count();
        assertEquals(countBefore+1,countAfter);
    }
    @Test
    public void whenAddToBasket()
    {
        shopController.addProduct(productDTO);
        Product product = productRepository.findAll().getFirst();
        SimpleLittleProductDTO simpleLittleProductDTO = new SimpleLittleProductDTO(product.getId(), 3);
        UserPrincipal principal = (UserPrincipal) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
        long countBefore = basketRepository.count();
        assertNotNull(principal);
        shopController.addToBasket(simpleLittleProductDTO,principal);
        long countAfter = basketRepository.count();
        assertEquals(countBefore+1,countAfter);
    }
    @AfterEach
    public void clearSecurityContext()
    {
        SecurityContextHolder.clearContext();
    }
}
