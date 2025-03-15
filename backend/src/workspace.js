import * as db from './db.js';
/**
 * Authenticates a user and returns an access token upon successful login.
 * @async
 * @function workspace
 * @param {object} req - Express request object containing user credentials.
 * @param {object} req.body - The request body.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's password.
 * @param {object} res - Express response object.
 * @returns {void} Sends a JSON response with the user's name and access to
 * @throws {401} If authentication fails due to invalid credentials.
 * @throws {500} If an internal server error occurs.
 */
export async function getUserWorkspaces(req, res) {
  console.log('in get user workspaces'); 
  if (!req.user || !req.user.id) {
    res.status(403).json({ error: 'Invalid or expired token' });
    return;
  }
  const userId = req.user.id;
  const workspaces = await db.getWorkspacesByUserId(userId);
  console.log('Workspaces from DB:', workspaces);
  if (!workspaces || workspaces.length === 0) {
    res.status(404).json({ message: 'No workspaces found' });
    return;
  }
  const formattedWorkspaces = workspaces.map( (workspace) => ({
    id: workspace.id,
    name: workspace.data.name,
    users: workspace.data.users,
  }));
  console.log('Formatted Workspaces:', formattedWorkspaces);
  res.status(200).json(formattedWorkspaces);
};
