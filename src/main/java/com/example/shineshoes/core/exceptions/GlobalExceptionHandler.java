package com.example.shineshoes.core.exceptions;

import com.example.shineshoes.core.builders.BuildExceptionDTO;
import com.example.shineshoes.core.dto.ExceptionDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler
{
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    @ExceptionHandler(ShopException.class)
    public ResponseEntity<ExceptionDTO> handleShopException(ShopException ex)
    {
        ErrorCode error = ex.getErrorCode();
        BuildExceptionDTO builderDTO = new BuildExceptionDTO();
        ExceptionDTO dto = builderDTO.message(error.getMessage())
                .status(error.getStatus())
                .timestamp(LocalDateTime.now())
                .get();
        logger.warn("Error Aplication: Status={}, Code={}, Message={}",
                error.getStatus(), error, error.getMessage());
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
        logger.error("Unexpected system error: {}", ex.getMessage(), ex);
        return ResponseEntity.internalServerError()
                .body(dto);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionDTO> handleValidationException(MethodArgumentNotValidException ex)
    {
        FieldError fieldError = ex.getBindingResult().getFieldError();
        BuildExceptionDTO builderDTO = new BuildExceptionDTO();
        String messageError = fieldError != null ? fieldError.getDefaultMessage() : "Invaild input";
        String fieldNameError = fieldError != null ? fieldError.getField() : "Unknown field name";
        ExceptionDTO dto = builderDTO.message(messageError)
                .status(HttpStatus.BAD_REQUEST)
                .timestamp(LocalDateTime.now())
                .get();
        logger.warn("HTTP request validation error message : {} and field: {}", messageError,fieldNameError);
        return ResponseEntity.badRequest().body(dto);
    }
}
