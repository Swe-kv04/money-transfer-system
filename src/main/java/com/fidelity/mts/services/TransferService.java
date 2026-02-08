package com.fidelity.mts.services;



import org.springframework.http.ResponseEntity;

import com.fidelity.mts.dto.TransferRequest;


public interface TransferService {
	ResponseEntity<?> transfer(TransferRequest tr);
	boolean validateTransfer();
	boolean executeTransfer();
	
}
