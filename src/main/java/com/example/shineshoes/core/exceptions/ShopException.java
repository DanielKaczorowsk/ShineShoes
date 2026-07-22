package com.example.shineshoes.core.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ShopException extends RuntimeException
{
    private final ErrorCode errorCode;

    public ShopException(ErrorCode errorCode)
    {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
    public HttpStatus getStatus()
    {
        return this.errorCode.getStatus();
    }
}
