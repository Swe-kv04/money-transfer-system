package com.fidelity.mts.services;


import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fidelity.mts.dto.ErrorResponse;
import com.fidelity.mts.dto.TransferRequest;
import com.fidelity.mts.dto.TransferResponse;
import com.fidelity.mts.entity.Account;
import com.fidelity.mts.entity.TransactionLog;
import com.fidelity.mts.enums.AccountStatus;
import com.fidelity.mts.enums.TransactionStatus;
import com.fidelity.mts.repo.AccountRepository;
import com.fidelity.mts.repo.TransactionLogRepository;

@Service
public class TransferServiceImpl implements TransferService{

	TransferRequest transferRequest;
	String failureReason;
	String errorCode;
	@Autowired TransactionLogRepository trepo;
	@Autowired AccountRepository repo;
	
	@Override
	public ResponseEntity<?> transfer(TransferRequest tr) {
		this.transferRequest = tr;
		
		if (!validateTransfer()) {
			ErrorResponse errorResponse = new ErrorResponse();
			errorResponse.setErrorCode(this.errorCode);
			errorResponse.setMessage(this.failureReason);
			return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(errorResponse);
			
			
		}
		else {

			TransactionLog transactionLog = new TransactionLog();
			transactionLog.setFromAccountId(tr.getFromAccountId());
			transactionLog.setToAccountId(tr.getToAccountId());
			transactionLog.setIdempotencyKey(tr.getIdempotencyKey());
			transactionLog.setAmount(tr.getAmount());
			transactionLog.setStatus(TransactionStatus.SUCCESS);
			trepo.save(transactionLog);
			
			if (executeTransfer());
			{
				TransferResponse transferResponse = new TransferResponse();
				transferResponse.setTransactionId(transactionLog.getId());
				transferResponse.setAmount(transactionLog.getAmount());
				transferResponse.setDebitedFrom(transactionLog.getFromAccountId());
				transferResponse.setCreditedTo(transactionLog.getToAccountId());
				transferResponse.setStatus(TransactionStatus.SUCCESS);
				transferResponse.setMessage("Transfer completed");
		
				return ResponseEntity.status(HttpStatus.OK).body(transferResponse);
			}
			
			
		}
		
		
	}
	@Override
	public boolean validateTransfer() {

		 if (transferRequest.getFromAccountId() == transferRequest.getToAccountId()) {
		            this.failureReason = "Accounts must be different";
		            this.errorCode = "VAL-422";
		            return false;
		        }
		 Optional<Account> f = repo.findById(transferRequest.getFromAccountId());
		 Optional<Account> t = repo.findById(transferRequest.getToAccountId());
		 if (!f.isPresent())
		 {	
			 this.errorCode ="ACC-404";
			 this.failureReason = "Source account must exist";
	         return false;
		 }
		 if (!t.isPresent()) {
			 this.errorCode ="ACC-404";
			 this.failureReason = "Destination account must exist";
	         return false;
		 }
		 if(f.get().getStatus() != AccountStatus.ACTIVE) {
			
			 this.errorCode = "ACC-403";
			 this.failureReason = "Source account must be ACTIVE";
			 return false;
		 }
		 if(t.get().getStatus() != AccountStatus.ACTIVE) {
			 this.errorCode = "ACC-403";
			 this.failureReason = "Destination account must be ACTIVE";
			 return false;
		 }
		 if (transferRequest.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
			 this.errorCode = "VAL-422";
			 this.failureReason = "Amount must be > 0";
			 return false;
		 }
		 
		 if (f.get().getBalance().compareTo(transferRequest.getAmount()) <= 0) {
			 this.errorCode = "TRX-400";
			 this.failureReason = "Source balance >= amount";
			 return false;
		 }
		 System.out.println(trepo.findByIdempotencyKey(transferRequest.getIdempotencyKey()));
		 var keyExsists = trepo.findByIdempotencyKey(transferRequest.getIdempotencyKey());
		 if(keyExsists.isPresent()) {
			 this.errorCode = "TRX-409";
			 this.failureReason = "Idempotency key must be unique";
			 return false;
		 }
		 
		return true;
	}
	@Override
	public boolean executeTransfer() {
		BigDecimal amount = transferRequest.getAmount();
		 Optional<Account> f = repo.findById(transferRequest.getFromAccountId());
		 Optional<Account> t = repo.findById(transferRequest.getToAccountId());
		 if (f.isPresent() && t.isPresent()) {
			f.get().setBalance(f.get().getBalance().subtract(amount));
			t.get().setBalance(t.get().getBalance().add(amount));
			
			repo.save(f.get());
			repo.save(t.get());
			return true;
		 }
		
		 return false;

	}
	
}
