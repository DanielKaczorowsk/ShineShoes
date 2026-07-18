package com.example.shineshoes.core.controllers;

import com.example.shineshoes.core.dto.UserDTO;
import com.example.shineshoes.core.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO) {
        userService.register(userDTO);
        return ResponseEntity.ok("Użytkownik zarejestrowany pomyślnie!");
    }
    public record LoginResponse(String token) {}
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody UserDTO userDTO) {
        userService.login(userDTO);
        return ResponseEntity.ok(new LoginResponse(userDTO.getToken()));
    }
}