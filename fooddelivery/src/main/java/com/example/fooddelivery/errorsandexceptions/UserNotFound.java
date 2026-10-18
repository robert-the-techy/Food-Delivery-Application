package com.example.fooddelivery.errorsandexceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(value=HttpStatus.NOT_FOUND)
public class UserNotFound extends RuntimeException{
	public UserNotFound(String error_msg)
	{
		super(error_msg);
	}
}
