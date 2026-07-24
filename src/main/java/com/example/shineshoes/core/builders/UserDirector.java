package com.example.shineshoes.core.builders;

import com.example.shineshoes.core.builders.user.login.LoginBuilderInterface;
import com.example.shineshoes.core.builders.user.login.LoginContext;
import com.example.shineshoes.core.builders.user.register.RegisterBuilderInterface;
import com.example.shineshoes.core.dto.Users.SimpleResultUserDTO;
import com.example.shineshoes.core.dto.Users.UserLoginDTO;
import com.example.shineshoes.core.dto.Users.UserRegisterDTO;
import com.example.shineshoes.core.exceptions.ErrorCode;
import com.example.shineshoes.core.exceptions.ShopException;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class UserDirector
{
    public void build(UserLoginDTO userLoginDTO, List<LoginBuilderInterface> list, LoginContext loginContext)
    {

        if (list == null || list.isEmpty()) {
            throw new ShopException(ErrorCode.EMPTY_CLASS);
        }
        list.forEach(b-> {
            b.build(userLoginDTO, loginContext);
        });
    }
    public void build(UserRegisterDTO userRegisterDTO, List<RegisterBuilderInterface> list)
    {
        if (list == null || list.isEmpty()) {
            throw new ShopException(ErrorCode.EMPTY_CLASS);
        }
        list.forEach(b->{
            b.build(userRegisterDTO);
        } );
    }
}
