import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { FC } from 'react';

interface IProps {
  isActive?: boolean;
  isLogout?: boolean;
}

const Item = styled(Paper)(({ theme }: any) => ({
  ...theme.typography?.body2,
  textAlign: 'center',

  height: 60,
  lineHeight: '60px',
}));
export const ExpireTokenModal: FC<IProps> = ({ isActive, isLogout }) => {
  return (
    <div>
      <Item elevation={1}>
        <Typography variant="h2">Timeout Notification</Typography>
        {isLogout ? (
          <p className="para textCenter pv-20">
            Your session has expired.
            <br />
            Please log in again to proceed.
          </p>
        ) : (
          <p className="para textCenter pv-20">
            Your session has timed out due to inactivity. Please resume the session to start where you have left off or
            start a new session.
          </p>
        )}
      </Item>
    </div>
  );
};
