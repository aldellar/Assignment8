/*
#######################################################################
#
# Copyright (C) 2020-2024 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import React from 'react';
import {useNavigate} from 'react-router-dom';
import WorkspacesSidebar from './WorkspaceSidebar';
import WorkspaceContent from './WorkspaceContent';
import {WorkspaceProvider} from './WorkspaceContext';
/**
 * @returns {*} JSX Component
 */
function Home() {
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('user');
    history('/login');
  };

  return (
    <React.Fragment>
      <h2>Home Page</h2>
      <div>Auth Token: {user?.accessToken}</div>
      <p></p>
      <button onClick={logout}>Logout</button>
      <p></p>
      <WorkspaceProvider>
        <div style={{display: 'flex', height: '100vh'}}>
          <WorkspacesSidebar />
          <WorkspaceContent />
        </div>
      </WorkspaceProvider>
    </React.Fragment>
  );
}

export default Home;
