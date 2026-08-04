    package com.example.shineshoes.config;
    
    import com.example.shineshoes.security.CustomUserDetailsService;
    import com.example.shineshoes.security.UserPrincipal;
    import io.jsonwebtoken.Claims;
    import io.jsonwebtoken.Jwts;
    import io.jsonwebtoken.io.IOException;
    import io.jsonwebtoken.security.Keys;
    import jakarta.servlet.FilterChain;
    import jakarta.servlet.ServletException;
    import jakarta.servlet.http.Cookie;
    import lombok.extern.slf4j.Slf4j;
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.servlet.http.HttpServletResponse;
    import org.jspecify.annotations.NonNull;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.context.annotation.Lazy;
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.security.core.context.SecurityContextHolder;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
    import org.springframework.stereotype.Component;
    import org.springframework.web.filter.OncePerRequestFilter;
    
    import java.nio.charset.StandardCharsets;
    import java.util.Arrays;

    @Slf4j
    @Component
    public class JwtAuthenticationFilter extends OncePerRequestFilter
    {
        private final String secret;
        private final CustomUserDetailsService userDetailsServices;
        public JwtAuthenticationFilter(@Value("${jwt.secret}") String secret, @Lazy CustomUserDetailsService userDetailsServices)
        {
            this.secret = secret;
            this.userDetailsServices = userDetailsServices;
        }
        @Override
        protected void doFilterInternal(@NonNull HttpServletRequest request,
                                        @NonNull HttpServletResponse response,
                                        @NonNull FilterChain filterChain) throws ServletException, IOException, java.io.IOException {
            String token = extractTokenFromCookies(request);
            if (token != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                try {
                    Claims claims = Jwts.parser().verifyWith(Keys
                                    .hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                            .build()
                            .parseSignedClaims(token)
                            .getPayload();
                    String username = claims.getSubject();
                    System.out.println(">>> [DEBUG JWT] Extracted Subject from token: '" + username + "'");
                    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        UserPrincipal userPrincipal = this.userDetailsServices.loadUserByUsername(username);
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userPrincipal, null, userPrincipal.getAuthorities()
                        );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                } catch (Exception e) {
                    System.out.println("Error verify token:" + e.getMessage());
                    logger.error("Error verify token:", e);
                    SecurityContextHolder.clearContext();
                }
            }
            filterChain.doFilter(request, response);
        }
        private String extractTokenFromCookies(HttpServletRequest request)
        {
            if (request.getCookies() == null) {
                return null;
            }
            return Arrays.stream(request.getCookies()).filter(cookie -> "jwt".equals(cookie.getName()))
                    .map(Cookie::getValue)
                    .findFirst()
                    .orElse(null);
        }
    }
