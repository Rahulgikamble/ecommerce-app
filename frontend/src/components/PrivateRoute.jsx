import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Wraps routes that require login (e.g. Cart, Checkout).
// If not logged in, redirects to /login.
const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
