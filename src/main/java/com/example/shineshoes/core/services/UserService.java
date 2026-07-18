package com.example.shineshoes.core.services;

import com.example.shineshoes.core.cache.UserLoginCache;
import com.example.shineshoes.core.cache.UserRegisterCache;
import com.example.shineshoes.core.dto.UserDTO;
import com.example.shineshoes.core.factory.UserFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService
{
    private final UserFactory userFactory;
    private final UserRegisterCache register;
    private final UserLoginCache login;
    @Transactional

    public void register(UserDTO query)
    {
        this.userFactory.execute(query,register);
    }
    public void login(UserDTO query){this.userFactory.execute(query,login);}
}
