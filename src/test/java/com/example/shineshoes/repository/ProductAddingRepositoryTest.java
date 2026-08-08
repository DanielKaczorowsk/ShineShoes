package com.example.shineshoes.repository;

import com.example.shineshoes.core.dto.Product.ProductDTO;
import com.example.shineshoes.core.dto.Product.ProductVariantDTO;
import com.example.shineshoes.core.model.product.Product;
import com.example.shineshoes.core.repository.ProductRepository;
import com.example.shineshoes.core.services.ProductServices;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class ProductAddingRepositoryTest
{
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServices productServices;

    private ProductDTO productDTO;

    @BeforeEach
    public void setIn()
    {
        ProductVariantDTO productVariantDTO = ProductVariantDTO.builder().color("Green").size(BigDecimal.valueOf(44)).quantity(3).build();
        List<ProductVariantDTO> productVariantList = new ArrayList<>();
        productVariantList.add(productVariantDTO);
        List<String> category = new ArrayList<>();
        productDTO = ProductDTO.builder().model("AirMax")
                .description("Test Description")
                .price(BigDecimal.valueOf(300))
                .productVariantDTO(productVariantList)
                .category(category)
                .build();
    }
    @Test
    public void checkProductRepositorySuccess()
    {
        productServices.addProduct(productDTO);
        verify(productRepository).save(any(Product.class));
    }
}
