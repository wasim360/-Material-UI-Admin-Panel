import { FC, ReactNode, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, CircularProgress } from '@mui/material';

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
      {loading && (
        <>
          {' '}
          <CircularProgress /> <p> UI is loading please wait</p>
        </>
      )}
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
