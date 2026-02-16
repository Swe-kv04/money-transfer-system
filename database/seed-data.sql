INSERT INTO account (id, balance, holder_name, last_updated, status, version) VALUES
(1, 15000.50, 'Alice Johnson',     '2025-01-10 10:15:30.000000', 1, 0),
(2, 4200.00,  'Bob Williams',      '2025-01-12 12:20:10.000000', 1, 0),
(3, 99000.75, 'Charlie Anderson',  '2025-01-14 08:50:00.000000', 1, 0),
(4, 500.00,   'Diana Peterson',    '2025-01-18 14:00:45.000000', 1, 0),
(5, 7600.35,  'Edward Thompson',   '2025-01-20 11:33:21.000000', 1, 0),
(6, 200000.00,'Fiona Richards',    '2025-01-25 16:45:55.000000', 1, 0);


INSERT INTO transaction_log (
  id, amount, created_on, failure_reason, from_account_id,
  idempotency_key, status, to_account_id
) VALUES
('a1b2c3d4-e111-4abc-91b3-111111111111', 500.00,   '2025-02-01 09:00:00.000000', NULL, 1, 'idem-001', 1, 2),
('b2c3d4e5-e222-4abc-92b3-222222222222', 2500.00,  '2025-02-02 10:30:15.000000', NULL, 3, 'idem-002', 2, 4),
('c3d4e5f6-e333-4abc-93b3-333333333333', 100.00,   '2025-02-03 14:22:45.000000', 'Insufficient funds', 4, 'idem-003', 3, 1),
('d4e5f6g7-e444-4abc-94b3-444444444444', 6000.00,  '2025-02-04 17:50:05.000000', NULL, 5, 'idem-004', 2, 6),
('e5f6g7h8-e555-4abc-95b3-555555555555', 300.00,   '2025-02-05 19:10:30.000000', NULL, 2, 'idem-005', 1, 1),
('f6g7h8i9-e666-4abc-96b3-666666666666', 50.00,    '2025-02-06 21:40:55.000000', NULL, 6, 'idem-006', 1, 3);