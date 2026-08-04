package com.example.shineshoes.security;

import com.example.shineshoes.core.exceptions.ErrorCode;
import com.example.shineshoes.core.exceptions.ShopException;
import com.example.shineshoes.core.model.User;
import com.example.shineshoes.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NullMarked;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@NullMarked
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserPrincipal loadUserByUsername(String email) throws UsernameNotFoundException
    {
        User user = userRepository.findByEmail(email).orElseThrow(()-> new ShopException(ErrorCode.USER_NOT_FOUND));
        return new UserPrincipal(user);
    }

}
