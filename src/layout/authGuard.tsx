import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }: any) => {
  const { pathname } = useLocation();

  let authenticated = true;

  return <>{authenticated ? children : <Navigate replace to="/session/signin" state={{ from: pathname }} />}</>;
};

export default AuthGuard;
