import { FunctionComponent, PropsWithChildren } from 'react';
import { Box } from '@mui/material/';

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Renders "Public Layout" composition
 */
const PublicLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const userLogged = useSelector((state: any) => state?.auth?.isUserLogin);
  console.log(localStorage.getItem('auth') ? true : false, 'uuuu');
  console.log(localStorage.getItem('auth'), "localStorage.getItem('auth')");
  if (userLogged) {
    return <Navigate to="/app/dashboard/default" />;
  } else
    return (
      <Box
        sx={{
          flex: 1,
          height: '100%',
        }}
      >
        <Outlet />
      </Box>
    );
};

export default PublicLayout;
