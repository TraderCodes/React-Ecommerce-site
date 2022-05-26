import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
import { useUserContext } from '../context/user_context';
// the rest on top is rest operator
const PrivateRoute = ({ children, ...rest }) => {
  const { myUser } = useUserContext();
  // use spread to spread the rest
  return (
    <Route
      {...rest}
      render={() => {
        // redirect to homepage if user is false
        return myUser ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
