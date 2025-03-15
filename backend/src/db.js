
import pg from 'pg';

const pool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB || 'dev',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
});
/**
 * Retrieves all emails by a given ID, including the content
 * @async
 * @function getMailById
 * @param {string} email - the email id
 * @param {string} password - the email id
 * @returns {Promise<object>} a promise of array
 * @throws {Error} if issues executing the query
 */
export async function validate(email, password) {
  const query = {
    text: `
      SELECT account.data->>'email', account.data->>'password_hash',
      account.id AS userID,
      account.data->>'gov_name' AS gov_name
      FROM account
      WHERE  account.data->>'email' = $1 AND
       account.data->>'password_hash' = crypt($2, 
       account.data->>'password_hash')
      `,
    values: [email, password],
  };
  const {rows} = await pool.query(query);
  if (rows.length === 0) {
    console.log('returning false');
    return false;
  }
  const account = rows[0];
  console.log(`returning ${account.gov_name}`);
  console.log(`returning ${account.userid}`);
  console.log('Query Result:', account);
  return {name: account.gov_name, id: account.userid};
}
/**
 * Retrieves all workspaces associated with a given user ID.
 * @async
 * @function getWorkspacesByUserId
 * @param {string} userId - The UUID of the user whose workspaces
 * @returns {Promise<Array<object>>} A promise that resolves to an
 * @throws {Error} If the database query fails.
 */
export async function getWorkspacesByUserId(userId) {
  console.log('in get use workspaces by userid');
  const query = {
    text: `
      SELECT w.*
      FROM workspaces w
      JOIN workspace_users wu ON w.id = wu.workspace_id
      WHERE wu.user_id = $1;
    `,
    values: [userId],
  };
  const {rows} = await pool.query(query);
  return rows;
}
