import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import SidebarItem from './SidebarItem';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';

type Props = {
  item: any;
};

const SidebarItemCollapse = ({ item }: Props) => {
  const [open, setOpen] = useState(false);
  const theme: any = useTheme();
  const visible = useSelector((state: any) => state.auth.sidebarVisible);
  const appState = useSelector((state: any) => state?.auth?.appState);

  useEffect(() => {
    if (appState.includes(item.state)) {
      setOpen(true);
    }
  }, [appState, item]);

  return item.sidebarProps ? (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          mt: '10px',

          height: '30px',
          '&: hover': {
            backgroundColor: theme.palette.background.menuColor,
          },
        }}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !item.sidebarProps.icon ? 18 : 36 }}>
          {visible ? (
            item.sidebarProps.icon
          ) : (
            <Tooltip title={item.sidebarProps.displayText} placement="right" arrow>
              {item.sidebarProps.icon}
            </Tooltip>
          )}
        </ListItemIcon>

        <ListItemText
          disableTypography
          primary={
            <Typography
              variant="caption"
              sx={{ ...theme.typography.menuCaption, opacity: visible ? 1 : 0 }}
              display="block"
              gutterBottom
            >
              {item.sidebarProps.displayText}
            </Typography>
          }
        />
        {open ? (
          <IconChevronUp stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
        ) : (
          <IconChevronDown stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List
          component="div"
          sx={{
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 1,
              background: theme.palette.primary.light,
            },
          }}
        >
          {item.child?.map((route: any, index: number) =>
            route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse item={route} key={index} />
              ) : (
                <SidebarItem item={route} key={index} />
              )
            ) : null
          )}
        </List>
      </Collapse>
      <Divider />
    </>
  ) : null;
};

export default SidebarItemCollapse;
