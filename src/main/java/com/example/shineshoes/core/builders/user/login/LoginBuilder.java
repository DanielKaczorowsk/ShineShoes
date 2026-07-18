package com.example.shineshoes.core.builders.user.login;

import com.example.shineshoes.core.dto.UserDTO;
import com.example.shineshoes.core.exceptions.ErrorCode;
import com.example.shineshoes.core.exceptions.ShopException;
import com.example.shineshoes.core.model.User;
import com.example.shineshoes.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LoginBuilder implements LoginBuilderInterface
{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void build(UserDTO query)
    {
        User user = userRepository.findByEmail(query.getEmail())
                .orElseThrow(() -> new ShopException(ErrorCode.USER_NOT_FOUND));
        if(!passwordEncoder.matches(query.getPassword(), user.getPassword()))
        {
            throw new ShopException(ErrorCode.INVALID_CREDENTIALS);
        }
        query.setName(user.getName());
    }
}
