package com.example.shineshoes.core.exceptions;

import com.example.shineshoes.core.builders.BuildExceptionDTO;
import com.example.shineshoes.core.dto.ExceptionDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler
{
    @ExceptionHandler(ShopException.class)
    public ResponseEntity<ExceptionDTO> handleShopException(ShopException ex)
    {
        ErrorCode error = ex.getErrorCode();
        BuildExceptionDTO builderDTO = new BuildExceptionDTO();
        ExceptionDTO dto = builderDTO.message(error.getMessage())
                .status(error.getStatus())
                .timestamp(LocalDateTime.now())
                .get();

        return ResponseEntity.status(error.getStatus()).body(dto);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDTO> handleGenericException(Exception ex)
    {
        BuildExceptionDTO builderDTO = new BuildExceptionDTO();
        ExceptionDTO dto = builderDTO
                .message("Internal server error")
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .timestamp(LocalDateTime.now()).get();

        return ResponseEntity.internalServerError()
                .body(dto);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionDTO> handleValidationException(MethodArgumentNotValidException ex)
    {
        FieldError fieldError = ex.getBindingResult().getFieldError();
        BuildExceptionDTO builderDTO = new BuildExceptionDTO();
        ExceptionDTO dto = builderDTO.message(fieldError != null ? fieldError.getDefaultMessage() : "Invaild input")
                .status(HttpStatus.BAD_REQUEST)
                .timestamp(LocalDateTime.now())
                .get();
        return ResponseEntity.badRequest().body(dto);
    }
}
