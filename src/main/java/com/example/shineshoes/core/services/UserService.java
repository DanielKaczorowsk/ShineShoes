package com.example.shineshoes.core.services;

import com.example.shineshoes.core.cache.UserLoginCache;
import com.example.shineshoes.core.cache.UserRegisterCache;
import com.example.shineshoes.core.dto.Users.SimpleResultUserDTO;
import com.example.shineshoes.core.dto.Users.UserLoginDTO;
import com.example.shineshoes.core.dto.Users.UserRegisterDTO;
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

    public void register(UserRegisterDTO userRegisterDTO)
    {
        this.userFactory.execute(userRegisterDTO,register);
    }
    public SimpleResultUserDTO login(UserLoginDTO userLoginDTO)
    {
        return this.userFactory.execute(userLoginDTO,login);
    }
}
