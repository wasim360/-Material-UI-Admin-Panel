import { FunctionComponent } from 'react';
import { Drawer, DrawerProps, Box, useTheme } from '@mui/material';

import { useSelector } from 'react-redux';

import Sidebar from './final';

interface Props extends Pick<DrawerProps, 'anchor' | 'className' | 'open' | 'variant' | 'onClose'> {}

/**

 * @component SideBar
 * @param {string} anchor - 'left' or 'right'
 * @param {boolean} open - the Drawer is visible when true
 * @param {string} variant - variant of the Drawer, one of 'permanent', 'persistent', 'temporary'
 * @param {function} onClose - called when the Drawer is closing
 */

const SideBar: FunctionComponent<Props> = ({ anchor, open, variant, onClose, ...restOfProps }) => {
  const theme: any = useTheme();

  const visible = useSelector((state: any) => state.auth.sidebarVisible);

  const drawerWidth = '200px';
  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, position: 'absolute', top: '20px' }} aria-label="mailbox folders">
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            width: visible ? drawerWidth : '80px',
            background: theme.palette.background.alt,
            color: theme.palette.text.primary,

            borderRight: 'none',

            [theme.breakpoints.up('xs')]: {
              top: '78px',
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <Sidebar />
      </Drawer>
    </Box>
  );
};

export default SideBar;
