
import React from 'react';
import { Route,  Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      element={(props) =>
        user && user.role === 'admin' ? (
          <Element {...props} />
        ) : (
          <Navigate to="/Authentication/log-in" />
        )
      }
    />
  );
};

export default ProtectedRoute;
