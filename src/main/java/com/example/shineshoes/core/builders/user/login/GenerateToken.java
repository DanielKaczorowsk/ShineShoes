package com.example.shineshoes.core.builders.user.login;

import com.example.shineshoes.core.dto.UserDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
@Component

public class GenerateToken implements LoginBuilderInterface
{
    private final String secret;
    private final long expiration;

    public GenerateToken(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long expiration)
    {
        this.secret = secret;
        this.expiration = expiration;
    }
    @Override
    public void build(UserDTO query)
    {
        Key key = Keys.hmacShaKeyFor(this.secret.getBytes());

        String token = Jwts.builder()
                .subject(query.getName())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + this.expiration))
                .signWith(key)
                .compact();
        query.setToken(token);
    }
}
