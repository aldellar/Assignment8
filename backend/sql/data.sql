-- Your data insert statements go here;
DELETE FROM account;

INSERT INTO account(email, password_hash, gov_name) VALUES ('molly@books.com', crypt('mollymember', gen_salt('md5')), 'Andrew Dellaringa');
