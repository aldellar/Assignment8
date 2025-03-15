DELETE FROM account;
DELETE FROM workspaces;
DELETE FROM workspace_users;
INSERT INTO account (id, data)
VALUES (
    'f2ad0728-9d47-4e48-ac63-78a812ab6cab',
    jsonb_build_object(
        'email', 'molly@books.com', 
        'password_hash', crypt('mollymember', gen_salt('md5')),
        'gov_name', 'Andrew Dellaringa'
    )
);
INSERT INTO account (id, data)
VALUES (
    'f2ad0728-9d47-4e48-ac63-78a812ab6cac',
    jsonb_build_object(
        'email', 'anna@books.com', 
        'password_hash', crypt('annaadmin', gen_salt('md5')),
        'gov_name', 'Annna Hendo'
    )
);

INSERT INTO workspaces (id, data)
VALUES (
    'a3b2c1d4-e5f6-7890-abcd-1234567890ef',
    jsonb_build_object(
        'name', 'Project Alpha',
        'users', jsonb_build_array('f2ad0728-9d47-4e48-ac63-78a812ab6cab', 'f2ad0728-9d47-4e48-ac63-78a812ab6cac')
    )
);
INSERT INTO workspaces (id, data)
VALUES (
    'b4c3d2e1-f6a7-8901-bcde-2345678901ff',
    jsonb_build_object(
        'name', 'Project Beta',
        'users', jsonb_build_array('f2ad0728-9d47-4e48-ac63-78a812ab6cab', 'f2ad0728-9d47-4e48-ac63-78a812ab6cac')
    )
);
INSERT INTO workspaces (id, data)
VALUES (
    'a3b2c1d4-e5f6-7890-abcd-1234567890ec',
    jsonb_build_object(
        'name', 'Project Charlie',
        'users', jsonb_build_array('f2ad0728-9d47-4e48-ac63-78a812ab6cab', 'f2ad0728-9d47-4e48-ac63-78a812ab6cac')
    )
);

INSERT INTO workspace_users (workspace_id, user_id)
VALUES ('b4c3d2e1-f6a7-8901-bcde-2345678901ff', 'f2ad0728-9d47-4e48-ac63-78a812ab6cab');
INSERT INTO workspace_users (workspace_id, user_id)
VALUES ('b4c3d2e1-f6a7-8901-bcde-2345678901ff', 'f2ad0728-9d47-4e48-ac63-78a812ab6cac');
INSERT INTO workspace_users (workspace_id, user_id)
VALUES ('a3b2c1d4-e5f6-7890-abcd-1234567890ec', 'f2ad0728-9d47-4e48-ac63-78a812ab6cab');
INSERT INTO workspace_users (workspace_id, user_id)
VALUES ('a3b2c1d4-e5f6-7890-abcd-1234567890ec', 'f2ad0728-9d47-4e48-ac63-78a812ab6cac');
INSERT INTO workspace_users (workspace_id, user_id)
VALUES ('a3b2c1d4-e5f6-7890-abcd-1234567890ef', 'f2ad0728-9d47-4e48-ac63-78a812ab6cab');
INSERT INTO workspace_users (workspace_id, user_id)
VALUES ('a3b2c1d4-e5f6-7890-abcd-1234567890ef', 'f2ad0728-9d47-4e48-ac63-78a812ab6cac');