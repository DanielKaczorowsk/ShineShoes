package com.example.shineshoes.core.dto;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO
{
    @NotBlank(message = "Email can't be empty")
    @Email(message = "It's wrong email")
    private String email;

    /*@NotBlank(message = "Name can't be empty")
    @Size(min = 3, max = 50, message = "Name have to have 50 signs")*/
    private String name;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password have to have 8 signs")
    private String password;

    //@Size(min = 32, message = "Token have to have 32 signs")
    private String token;
    //public boolean verification;
}
