package com.example.shineshoes.core.factory;

import com.example.shineshoes.core.builders.UserDirector;
import com.example.shineshoes.core.builders.user.login.LoginBuilderInterface;
import com.example.shineshoes.core.builders.user.login.LoginContext;
import com.example.shineshoes.core.builders.user.register.RegisterBuilderInterface;
import com.example.shineshoes.core.cache.UserLoginCache;
import com.example.shineshoes.core.cache.UserRegisterCache;
import com.example.shineshoes.core.dto.Users.SimpleResultUserDTO;
import com.example.shineshoes.core.dto.Users.UserLoginDTO;
import com.example.shineshoes.core.dto.Users.UserRegisterDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
@RequiredArgsConstructor
public class UserFactory
{
    private final ApplicationContext context;
    private final UserDirector director;

    public void execute(UserRegisterDTO query, UserRegisterCache registerCache)
    {
        List<RegisterBuilderInterface> builders = registerCache.getCache().stream()
                .map(clazz -> (RegisterBuilderInterface) context.getBean(clazz))
                .toList();
        director.build(query,builders);
    }
    public SimpleResultUserDTO execute(UserLoginDTO query, UserLoginCache loginCache)
    {
        LoginContext loginContext = new LoginContext();
        SimpleResultUserDTO simpleResultUserDTO = new SimpleResultUserDTO(loginContext.getToken(),loginContext.getEmail(),loginContext.getProvider());
        List<LoginBuilderInterface> builders = loginCache.getCache().stream()
                .map(clazz -> (LoginBuilderInterface) context.getBean(clazz))
                .toList();
        director.build(query,builders,loginContext);
        return simpleResultUserDTO;
    }
}
