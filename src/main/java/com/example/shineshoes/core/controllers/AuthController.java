package com.example.shineshoes.core.controllers;

import com.example.shineshoes.core.dto.Users.SimpleResultUserDTO;
import com.example.shineshoes.core.dto.Users.UserLoginDTO;
import com.example.shineshoes.core.dto.Users.UserRegisterDTO;
import com.example.shineshoes.core.exceptions.ErrorCode;
import com.example.shineshoes.core.exceptions.ShopException;
import com.example.shineshoes.core.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins}", allowCredentials = "true")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody UserRegisterDTO userRegisterDTO) {
        userService.register(userRegisterDTO);
        return ResponseEntity.ok("Użytkownik zarejestrowany pomyślnie!");
    }
    public record UserResponse(String email) {}
    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@Valid @RequestBody UserLoginDTO userLoginDTO) {
        SimpleResultUserDTO simpleResultUserDTO = userService.login(userLoginDTO);
        ResponseCookie cookie = ResponseCookie.from("jwt",simpleResultUserDTO.token())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(3600)
                .sameSite("Strict")
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(new UserResponse(simpleResultUserDTO.email()));
    }
    @PostMapping("/logout")
    public  ResponseEntity<?> logout()
    {
        ResponseCookie cookie = ResponseCookie.from("jwt","").httpOnly(true).secure(true)
                .path("/").maxAge(0).sameSite("Strict").build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Pomyślnie wylogowano");
    }
    @PostMapping("/me")
    public ResponseEntity<?> checkSession(@AuthenticationPrincipal UserDetails userDetails)
    {
        if(userDetails == null)
        {
            throw new ShopException(ErrorCode.UNAUTHORIZED);
        }

        return ResponseEntity.ok(new UserResponse(userDetails.getUsername()));
    }
}