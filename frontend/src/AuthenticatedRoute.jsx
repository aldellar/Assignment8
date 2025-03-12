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

import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthenticatedRoute = ({children}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.any, // Add the missing prop type validation
};

export default AuthenticatedRoute;
