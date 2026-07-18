package com.example.shineshoes.core.dto;

import java.math.BigDecimal;

public record SimpleProductDTO(
        Long id,
        String name,
        String description,
        String model,
        BigDecimal price
) {}
