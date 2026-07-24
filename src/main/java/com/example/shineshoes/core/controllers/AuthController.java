package com.example.shineshoes.core.controllers;

import com.example.shineshoes.core.dto.Users.UserLoginDTO;
import com.example.shineshoes.core.dto.Users.UserRegisterDTO;
import com.example.shineshoes.core.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
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
    public record LoginResponse(String token) {}
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody UserLoginDTO userLoginDTO) {
        userService.login(userLoginDTO);
        return ResponseEntity.ok(new LoginResponse(userLoginDTO.getToken()));
    }
}