package com.example.shineshoes.core.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode
{
    EMPTY_DTO(HttpStatus.NOT_FOUND,"Empty record in DTO"),
    Empty_Class(HttpStatus.BAD_REQUEST,"Class not found"),
    Empty_Array(HttpStatus.BAD_REQUEST,"invaild array arguments"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not found"),
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid email or password"),
    Email_Used(HttpStatus.CONFLICT,"Email is already in use"),
    Name_User(HttpStatus.CONFLICT,"Name is already in use"),
    Email_Error(HttpStatus.CONFLICT,"Can't send email"),
    PRODUCT_VARIANT_NOT_FOUND(HttpStatus.NOT_FOUND, "Product variant not found");

    private final HttpStatus status;
    private final String message;
    ErrorCode(HttpStatus status , String message){
        this.status = status;
        this.message = message;
    }
}
