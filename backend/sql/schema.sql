DROP TABLE IF EXISTS account;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE account (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data jsonb
);
DROP TABLE IF EXISTS workspaces;
CREATE TABLE workspaces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data jsonb
);
DROP TABLE IF EXISTS workspace_users;
CREATE TABLE workspace_users (
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES account(id) ON DELETE CASCADE,
  PRIMARY KEY (workspace_id, user_id)
);
