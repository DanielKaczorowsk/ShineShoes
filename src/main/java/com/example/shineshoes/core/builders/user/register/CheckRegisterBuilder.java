package com.example.shineshoes.core.builders.user.register;

import com.example.shineshoes.core.dto.UserDTO;
import com.example.shineshoes.core.exceptions.ErrorCode;
import com.example.shineshoes.core.exceptions.ShopException;
import com.example.shineshoes.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CheckRegisterBuilder implements  RegisterBuilderInterface
{
    private final UserRepository userRepository;

    public void build(UserDTO query)
    {
        if(userRepository.existsByEmail(query.getEmail()))
        {
            throw new ShopException(ErrorCode.EMAIL_USED);
        }
        if(userRepository.existsByName(query.getName()))
        {
            throw new ShopException(ErrorCode.NAME_USED);
        }
    }
}
