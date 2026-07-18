package com.example.shineshoes.core.factory;

import com.example.shineshoes.core.builders.UserBuilderInterface;
import com.example.shineshoes.core.builders.UserDirector;
import com.example.shineshoes.core.cache.UserCacheInterface;
import com.example.shineshoes.core.dto.UserDTO;
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

    public void execute(UserDTO query, UserCacheInterface strategy)
    {
        List<UserBuilderInterface> builders = strategy.getCache().stream()
                .map(clazz -> (UserBuilderInterface) context.getBean(clazz))
                .toList();
        director.build(query,builders);
    }
}
