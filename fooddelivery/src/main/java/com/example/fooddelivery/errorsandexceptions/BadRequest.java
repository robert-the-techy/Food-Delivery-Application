package com.example.fooddelivery.errorsandexceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(value=HttpStatus.BAD_REQUEST)
public class BadRequest extends RuntimeException
{
	public BadRequest(String error_msg)
	{
		super(error_msg);
	}
}
