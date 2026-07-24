package com.example.shineshoes.core.builders.user.login;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginContext
{
    private String token;
    private String email;
    private String provider;
}
