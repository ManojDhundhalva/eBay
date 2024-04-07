const getBankAccountByUserId = `
SELECT *
FROM 
    seller AS s
JOIN
    bank_details AS b ON s.seller_account_number = b.account_number
WHERE 
    s.seller_user_id = $1
`;

module.exports = {
  getBankAccountByUserId,
};
