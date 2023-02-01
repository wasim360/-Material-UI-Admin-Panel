import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import PrivateLayout from './PrivateLayout';

interface BaseLayoutProps {
  children?: ReactNode;
}
const CurrentLayout: FC<BaseLayoutProps> = (children) => {
  const userLogged = useSelector((state: any) => state?.auth?.isUserLogin);
  if (!userLogged) {
    return <Navigate to="/auth/login" />;
  }
  return <PrivateLayout {...children} />;
};

export default CurrentLayout;

interface BaseLayoutProps {
  children?: ReactNode;
}
