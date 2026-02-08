package com.fidelity.mts.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class MTSGlobalExceptionHandler {
	
	@ExceptionHandler(value=AccountNotFoundException.class)
	public ResponseEntity<String> accountNotFound(AccountNotFoundException ex){
		return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);
	}
}
