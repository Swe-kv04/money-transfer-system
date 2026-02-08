package com.fidelity.mts.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fidelity.mts.entity.Account;
import com.fidelity.mts.entity.TransactionLog;
import com.fidelity.mts.exceptions.AccountNotFoundException;
import com.fidelity.mts.repo.AccountRepository;
import com.fidelity.mts.repo.TransactionLogRepository;

@Service
public class AccountServiceImpl implements AccountService{

	@Autowired AccountRepository repo;
	@Autowired TransactionLogRepository trepo;
	
	@Override
	public long createAccount(Account a) {
		repo.save(a);
		return a.getId();
	}

	@Override
	public Account getAccount(int id) {
		Optional<Account> a = repo.findById(id);
		if (!a.isPresent())
			throw new AccountNotFoundException();
		return a.get();
	}

	@Override
	public BigDecimal getBalance(int id) {
		Optional<Account> a = repo.findById(id);
		if (!a.isPresent())
			throw new AccountNotFoundException();
		return a.get().getBalance();
	}

	@Override
	public ResponseEntity<?> getTransactions(int id) {
		Optional<List<TransactionLog>> result = trepo.findByFromAccountId(id);
		if (!result.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No transactions found");
		}
		return ResponseEntity.status(HttpStatus.OK).body(result.get());
	}

}
