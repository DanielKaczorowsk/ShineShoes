package com.example.shineshoes.core.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode
{
    EMPTY_DTO(HttpStatus.NOT_FOUND,"Empty record in DTO"),
    EMPTY_CLASS(HttpStatus.BAD_REQUEST,"Class not found"),
    EMPTY_ARRAY(HttpStatus.BAD_REQUEST,"invaild array arguments"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not found"),
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid email or password"),
    EMAIL_USED(HttpStatus.CONFLICT,"Email is already in use"),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED,"unauthorized session"),
    NAME_USED(HttpStatus.CONFLICT,"Name is already in use"),
    EMAIL_ERROR(HttpStatus.CONFLICT,"Can't send email"),
    PRODUCT_VARIANT_NOT_FOUND(HttpStatus.NOT_FOUND, "Product variant not found");

    private final HttpStatus status;
    private final String message;
    ErrorCode(HttpStatus status , String message){
        this.status = status;
        this.message = message;
    }
}
