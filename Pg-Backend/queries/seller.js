const getBankAccountByUserId = `
SELECT *
FROM 
    seller AS s
JOIN
    bank_details AS b ON s.seller_account_number = b.account_number
WHERE 
    s.seller_user_id = $1
`;

const addBankAccountByUserId = `
INSERT INTO bank_details (account_number) 
VALUES ($1)
`;

const addSeller = `
INSERT INTO seller (seller_user_id, seller_account_number)
VALUES ($1, $2)
`;

module.exports = {
  getBankAccountByUserId,
  addBankAccountByUserId,
  addSeller,
};
