import { ListItemButton, ListItemIcon, Tooltip, Typography, useTheme } from '@mui/material';

import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  item: any;
};

const SidebarItem = ({ item }: Props) => {
  const { pathname } = useLocation();
  const theme: any = useTheme();

  const visible = useSelector((state: any) => state.auth.sidebarVisible);
  const alt = theme.palette.background.alt;
  console.log(item?.path, 'item', pathname, 'pathname');
  return item.sidebarProps && item.path ? (
    <>
      <ListItemButton
        component={Link}
        to={item.path}
        sx={{
          mt: '10px',

          height: '30px',

          '&: hover': {
            backgroundColor: theme.palette.background.menuColor,
          },
          backgroundColor: pathname === item.path ? theme.palette.background.menuColor : 'unset',
        }}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !item.sidebarProps.icon ? 18 : 36 }}>
          {visible ? (
            item.sidebarProps.icon
          ) : (
            <Tooltip title={item.sidebarProps.displayText} placement="right" arrow>
              <span> {item.sidebarProps.icon} </span>
            </Tooltip>
          )}
        </ListItemIcon>
        <Typography
          variant="caption"
          sx={{ ...theme.typography.menuCaption, color: { alt }, opacity: visible ? 1 : 0 }}
          gutterBottom
        >
          {item.sidebarProps.displayText}
        </Typography>
      </ListItemButton>
    </>
  ) : null;
};

export default SidebarItem;
