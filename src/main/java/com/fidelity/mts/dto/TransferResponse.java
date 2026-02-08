package com.fidelity.mts.dto;
 
 
import com.fidelity.mts.enums.TransactionStatus;
import java.math.BigDecimal;
 
public class TransferResponse {
    private String transactionId;
    private TransactionStatus status;
    private String message;
    private Long debitedFrom;
    private Long creditedTo;
    private BigDecimal amount;
 
    public String getTransactionId() {
        return transactionId;
    }
 
    public TransactionStatus getStatus() {
        return status;
    }
 
    public String getMessage() {
        return message;
    }
 
    public Long getDebitedFrom() {
        return debitedFrom;
    }
 
    public Long getCreditedTo() {
        return creditedTo;
    }
 
    public BigDecimal getAmount() {
        return amount;
    }
 
    @Override
    public String toString() {
        return "TransferResponse{" +
                "transactionId='" + transactionId + '\'' +
                ", status=" + status +
                ", message='" + message + '\'' +
                ", debitedFrom=" + debitedFrom +
                ", creditedTo=" + creditedTo +
                ", amount=" + amount +
                '}';
    }
}