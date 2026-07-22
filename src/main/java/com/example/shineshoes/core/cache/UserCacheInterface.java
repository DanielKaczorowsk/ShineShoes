package com.example.shineshoes.core.cache;

import com.example.shineshoes.core.builders.UserBuilderInterface;

import java.util.List;

public interface UserCacheInterface {
    List<Class<? extends UserBuilderInterface>> getCache();
}
