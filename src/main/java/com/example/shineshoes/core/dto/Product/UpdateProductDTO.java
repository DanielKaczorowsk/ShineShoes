package com.example.shineshoes.core.dto.Product;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor

public class UpdateProductDTO
{
    private Long id;
    private String name;
    private String description;
    private String model;
    private BigDecimal price;
    private List<@NotBlank String> category;
    private List<ProductVariantDTO> productVariantDTO;
}
