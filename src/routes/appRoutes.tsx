import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const appRoutes: any[] = [
  {
    index: true,

    state: 'home',
  },
  {
    path: '/auth/login',

    state: 'installation',
    sidebarProps: {
      displayText: 'Installation',
      icon: <FileDownloadOutlinedIcon />,
    },
  },
  {
    path: '/dashboard',

    state: 'dashboard',
    sidebarProps: {
      displayText: 'Dashboard',
      icon: <DashboardOutlinedIcon />,
    },
    child: [
      {
        index: true,

        state: 'dashboard.index',
      },
      {
        path: '/app/dashboard/default',

        state: 'dashboard.default',
        sidebarProps: {
          displayText: 'Default',
        },
      },
      {
        path: '/dashboard/analytics',

        state: 'dashboard.analytics',
        sidebarProps: {
          displayText: 'Analytic',
        },
      },
      {
        path: '/dashboard/saas',

        state: 'dashboard.saas',
        sidebarProps: {
          displayText: 'Saas',
        },
      },
    ],
  },
  {
    path: '/component',

    state: 'component',
    sidebarProps: {
      displayText: 'Components',
      icon: <AppsOutlinedIcon />,
    },
    child: [
      {
        path: '/component/alert',

        state: 'component.alert',
        sidebarProps: {
          displayText: 'Alert',
        },
      },
      {
        path: '/component/button',

        state: 'component.button',
        sidebarProps: {
          displayText: 'Button',
        },
      },
    ],
  },
  {
    path: '/documentation',

    state: 'documentation',
    sidebarProps: {
      displayText: 'Documentation',
      icon: <ArticleOutlinedIcon />,
    },
  },
  {
    path: '/changelog',

    state: 'changelog',
    sidebarProps: {
      displayText: 'Changelog',
      icon: <FormatListBulletedOutlinedIcon />,
    },
  },
];

export default appRoutes;
