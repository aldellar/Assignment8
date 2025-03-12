/*
#######################################################################
#
# Copyright (C) 2020-2025 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/
import Login from './login.jsx';
import Home from './Home';
import AuthenticatedRoute from './AuthenticatedRoute';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

/**
 * Simple component with no state.
 * @returns {object} JSX
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          exact
          element={<Login />}
        />
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <Home />
            </AuthenticatedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
