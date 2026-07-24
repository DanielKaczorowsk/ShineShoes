package com.example.shineshoes.core.dto.Users;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginDTO
{
    @NotBlank(message = "Email can't be empty")
    @Email(message = "It's wrong email")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password have to have 8 signs")
    private String password;

    //public boolean verification;
}
