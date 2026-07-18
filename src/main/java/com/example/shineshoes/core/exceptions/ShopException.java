package com.example.shineshoes.core.exceptions;

import org.springframework.http.HttpStatus;

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
    public ErrorCode getErrorCode()
    {
        return this.errorCode;
    }
}
