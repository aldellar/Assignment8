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

  const item = (event) => {
    event.preventDefault();
    history('/item/1234');
  };

  return (
    <React.Fragment>
      <h2>Home Page</h2>
      <div>Auth Token: {user?.authToken}</div>
      <p></p>
      <button onClick={logout}>Logout</button>
      <p></p>
      <button onClick={item}>Item 1234</button>
    </React.Fragment>
  );
}

export default Home;
