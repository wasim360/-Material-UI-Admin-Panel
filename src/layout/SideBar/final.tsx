import { List } from '@mui/material';
import appRoutes from 'routes/appRoutes';

import SidebarItem from './SidebarItem';
import SidebarItemCollapse from './SidebarItemCollapse';

const Sidebar = () => {
  return (
    <List disablePadding>
      {appRoutes.map((route, index) =>
        route.sidebarProps ? (
          route.child ? (
            <SidebarItemCollapse item={route} key={index} />
          ) : (
            <SidebarItem item={route} key={index} />
          )
        ) : null
      )}
    </List>
  );
};

export default Sidebar;
