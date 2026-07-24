package com.example.shineshoes.core.builders.user.register;

import com.example.shineshoes.core.builders.UserBuilderInterface;
import com.example.shineshoes.core.dto.Users.UserRegisterDTO;

public interface RegisterBuilderInterface extends UserBuilderInterface
{
    public void build(UserRegisterDTO userRegisterDTO);
}
