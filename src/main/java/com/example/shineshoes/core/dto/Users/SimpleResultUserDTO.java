package com.example.shineshoes.core.dto.Users;

public record SimpleResultUserDTO(
        String token,
        String email,
        String provider
) {}
