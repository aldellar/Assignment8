
import pg from 'pg';

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});
/**
 * Retrieves all emails by a given ID, including the content
 * @async
 * @function getMailById
 * @param {string} id - the email id
 * @returns {Promise<object>} a promise of array
 * @throws {Error} if issues executing the query
 */
export async function validate(email, password) {
  console.log(`validation ${email}, ${password}`);
  const query = {
    text: `
      SELECT email, password_hash, gov_name
      FROM account
      WHERE email = $1 AND
      password_hash = crypt($2, password_hash)
      `,
    values: [email, password],
  };
  const {rows} = await pool.query(query);
  if (rows.length === 0) {
    return false;
  }
  const account = rows[0];
  return {name: account.gov_name};
}
