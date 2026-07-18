package com.example.shineshoes.core.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantDTO
{
    @NotBlank
    private String color;
    @NotNull
    private BigDecimal size;
    @NotNull
    @Positive
    private int quantity;

}
