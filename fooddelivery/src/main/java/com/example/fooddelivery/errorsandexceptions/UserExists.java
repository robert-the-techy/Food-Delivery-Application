package com.example.fooddelivery.errorsandexceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(value=HttpStatus.CONFLICT)
public class UserExists extends RuntimeException
{
	public UserExists(String error_msg)
	{
		super(error_msg);
	}
}
