package com.example.shineshoes.core.cache;

import com.example.shineshoes.core.builders.user.login.GenerateToken;
import com.example.shineshoes.core.builders.user.login.LoginBuilder;
import com.example.shineshoes.core.builders.UserBuilderInterface;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class UserLoginCache implements UserCacheInterface
{
    private final List<Class<? extends UserBuilderInterface>> cacheLogin = new ArrayList<>();

    public UserLoginCache()
    {
        this.cacheLogin.add(LoginBuilder.class);
        this.cacheLogin.add(GenerateToken.class);
    }
    @Override
    public List<Class<? extends UserBuilderInterface>>getCache()
    {
        return this.cacheLogin;
    }
}
