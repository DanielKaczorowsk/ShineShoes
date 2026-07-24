package com.example.shineshoes.core.builders.user.login;

import com.example.shineshoes.core.dto.Users.SimpleResultUserDTO;
import com.example.shineshoes.core.dto.Users.UserLoginDTO;
import com.example.shineshoes.core.exceptions.ErrorCode;
import com.example.shineshoes.core.exceptions.ShopException;
import com.example.shineshoes.core.model.User;
import com.example.shineshoes.core.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.java.Log;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
public class LoginBuilder implements LoginBuilderInterface
{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void build(UserLoginDTO userLoginDTO, LoginContext loginContext)
    {
        User user = userRepository.findByEmail(userLoginDTO.getEmail())
                .orElseThrow(() -> new ShopException(ErrorCode.USER_NOT_FOUND));
        if(!passwordEncoder.matches(userLoginDTO.getPassword(), user.getPassword()))
        {
            throw new ShopException(ErrorCode.INVALID_CREDENTIALS);
        }
        userLoginDTO.setEmail(user.getName());
    }
}
