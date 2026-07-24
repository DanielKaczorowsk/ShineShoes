package com.example.shineshoes.core.builders.user.login;

import com.example.shineshoes.core.builders.UserBuilderInterface;
import com.example.shineshoes.core.dto.Users.UserLoginDTO;

public interface LoginBuilderInterface extends UserBuilderInterface
{
    public void build(UserLoginDTO userLoginDTO,LoginContext loginContext);
}
