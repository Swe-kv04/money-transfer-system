package com.fidelity.mts.entity;

import java.math.BigDecimal;
import java.time.Instant;

import com.fidelity.mts.enums.AccountStatus;

public class Account {
	 
    private long id;
    private String holderName;
    private BigDecimal balance;
    private AccountStatus status;
    private int version;
    private Instant lastUpdated;
 
    
 
    // Getters/Setters
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
 
    public String getHolderName() { return holderName; }
    public void setHolderName(String holderName) { this.holderName = holderName; }
 
    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }
 
    public AccountStatus getStatus() { return status; }
    public void setStatus(AccountStatus status) { this.status = status; }
 
    public int getVersion() { return version; }
    public void setVersion(int version) { this.version = version; }
 
    public Instant getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(Instant lastUpdated) { this.lastUpdated = lastUpdated; }
 
 
    
 
 
    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", holderName='" + holderName + '\'' +
                ", balance=" + balance +
                ", status=" + status +
                ", version=" + version +
                ", lastUpdated=" + lastUpdated +
                '}';
    }
}
