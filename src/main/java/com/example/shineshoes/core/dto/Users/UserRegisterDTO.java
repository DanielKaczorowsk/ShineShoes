package com.example.shineshoes.core.dto.Users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserRegisterDTO
{
    @NotBlank(message = "Email can't be empty")
    @Email(message = "It's wrong email")
    private String email;

    @NotBlank(message = "Name can't be empty")
    @Size(min = 3, max = 50, message = "Name have to have 50 signs")
    private String name;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password have to have 8 signs")
    private String password;
}
