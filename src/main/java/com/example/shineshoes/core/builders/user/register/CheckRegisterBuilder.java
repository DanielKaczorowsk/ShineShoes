package com.example.shineshoes.core.builders.user.register;

import com.example.shineshoes.core.dto.Users.UserRegisterDTO;
import com.example.shineshoes.core.exceptions.ErrorCode;
import com.example.shineshoes.core.exceptions.ShopException;
import com.example.shineshoes.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CheckRegisterBuilder implements  RegisterBuilderInterface
{
    private final UserRepository userRepository;

    public void build(UserRegisterDTO userRegisterDTO)
    {
        if(userRepository.existsByEmail(userRegisterDTO.getEmail()))
        {
            throw new ShopException(ErrorCode.EMAIL_USED);
        }
        if(userRepository.existsByName(userRegisterDTO.getName()))
        {
            throw new ShopException(ErrorCode.NAME_USED);
        }
    }
}
