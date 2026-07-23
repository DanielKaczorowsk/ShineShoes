package com.example.shineshoes.core.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
@Getter
@Setter
public class ExceptionDTO
{

    private String errorCode;
    private String message;
    private HttpStatus status;
    private LocalDateTime timestamp;
}
