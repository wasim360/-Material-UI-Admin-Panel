import { FC, ReactNode, useEffect, useState } from 'react';

import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useOnMobile } from '../hooks/layout';
import { SIDEBAR_DESKTOP_ANCHOR, SIDEBAR_WIDTH, TOPBAR_DESKTOP_HEIGHT, TOPBAR_MOBILE_HEIGHT } from './config';
import TopBar from './TopBar';
import SideBar from './SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import IdleTimer from 'components/SessionTimeOut/idleTimer';
import { handleLogin, setAuth, setUserDetails, setUserLogin } from 'Store/hooks/hooks';
import { ILoginActions } from 'Models/notification';
import { ExpireTokenModal } from 'components/TokenExpireModel';
import { DecriptionData } from 'Utils/encription';
import { IUserLis } from 'Models/auth';
import { isTokenExpired } from 'Utils/helperFunctions';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  width: '100%',
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: '641px',
    height: ' 200px',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialogContent-dividers': {},
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}

      <IconButton
        aria-label="close"
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme: any) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
}

/**
 * Renders "Private Layout" composition
 * @component PrivateLayout
 */
interface BaseLayoutProps {
  children?: ReactNode;
}
const PrivateLayout: FC<BaseLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const [isTimeout, setIsTimeout] = useState(false);
  const dispatch = useDispatch();
  const isUserLogin = useSelector((state: any) => state?.auth?.isUserLogin);
  const { auth } = useSelector((state: any) => state?.auth);
  const [timeout] = useState<number>(15);
  const onMobile = useOnMobile();
  const sideBarVisibl = useSelector((state: any) => state.auth?.sidebarVisible);
  const theme: any = useTheme();
  const [expireModal, setExpireModal] = useState(false);

  const checkIsAuthSaved = localStorage.getItem('auth');

  useEffect(() => {
    let mounted = true;
    if (checkIsAuthSaved) {
      if (mounted) {
        let decriptedData = DecriptionData(checkIsAuthSaved);

        let user: IUserLis = decriptedData.payload;
        dispatch(setUserLogin());
        dispatch(setAuth(decriptedData?.payload));
        dispatch(setUserDetails(user));
      }
    }
    return () => {
      mounted = false;
    };
  }, [checkIsAuthSaved, dispatch]);
  useEffect(() => {
    let mount = true;
    if (auth?.accessToken) {
      if (mount) {
        const checkvalidateToken = isTokenExpired(auth?.accessToken);
        if (checkvalidateToken) {
          setExpireModal(true);
        }
      }
    }
    return () => {
      mount = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isUserLogin) {
      const timer = new IdleTimer({
        //expire after 15 minutes by default
        timeout: Number(timeout) * 60,
        onTimeout: () => {
          setIsTimeout(true);
        },
        onExpired: () => {
          setIsTimeout(true);
        },
      });

      return () => {
        timer?.cleanUp();
      };
    }
  }, [isUserLogin, setIsTimeout, timeout]);

  function handleContinueSession() {
    localStorage?.setItem('pathName', pathname);
    localStorage?.removeItem('_expiredTime');
    dispatch(handleLogin({ type: ILoginActions.LOGOUT }));
  }

  function handleStartNewSession() {
    localStorage?.removeItem('pathName');
    localStorage?.removeItem('_expiredTime');
    dispatch(handleLogin({ type: ILoginActions.LOGOUT }));
  }

  const checkAuth = localStorage.getItem('auth');

  if (!checkAuth) {
    dispatch(handleLogin({ type: ILoginActions.LOGOUT }));
  }

  useEffect(() => {
    if (isTimeout) {
      if (!checkAuth) {
        dispatch(handleLogin({ type: ILoginActions.LOGOUT }));
      }
    }
  }, [checkAuth, isTimeout, dispatch]);

  return (
    <Stack
      direction="column"
      sx={{
        minHeight: '100vh', // Full screen height
        paddingTop: onMobile ? TOPBAR_MOBILE_HEIGHT : TOPBAR_DESKTOP_HEIGHT,
        paddingLeft: sideBarVisibl && SIDEBAR_DESKTOP_ANCHOR.includes('left') ? SIDEBAR_WIDTH : '50px',
        paddingRight: sideBarVisibl && SIDEBAR_DESKTOP_ANCHOR.includes('right') ? SIDEBAR_WIDTH : 0,
      }}
    >
      <Stack component="header">
        <TopBar />

        <SideBar anchor={SIDEBAR_DESKTOP_ANCHOR} />
      </Stack>

      <Stack
        component="main"
        sx={{
          flexGrow: 1, // Takes all possible space
          paddingLeft: 1,
          paddingRight: 1,
          paddingTop: 1,
          background: theme.palette.background.outletBackground,
        }}
      >
        {expireModal && (
          <BootstrapDialog aria-labelledby="customized-dialog-title" open={expireModal} maxWidth="md">
            <BootstrapDialogTitle id="customized-dialog-title">Session Time Out</BootstrapDialogTitle>
            <DialogContent dividers>
              <ExpireTokenModal isLogout={expireModal} />
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={() => {
                  dispatch(handleLogin({ type: ILoginActions.LOGOUT }));
                }}
                variant="outlined"
                color="secondary"
              >
                Ok
              </Button>
            </DialogActions>
          </BootstrapDialog>
        )}
        {isTimeout && (
          <BootstrapDialog aria-labelledby="customized-dialog-title" open={isTimeout} maxWidth="md">
            <BootstrapDialogTitle id="customized-dialog-title">Session Time Out</BootstrapDialogTitle>
            <DialogContent dividers>
              <ExpireTokenModal isLogout={!isUserLogin} />
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={() => {
                  handleContinueSession();
                }}
                variant="outlined"
                color="info"
              >
                Resume Session
              </Button>
              <Button
                autoFocus
                onClick={() => {
                  handleStartNewSession();
                }}
                variant="outlined"
                color="info"
              >
                Continuo
              </Button>
            </DialogActions>
          </BootstrapDialog>
        )}
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{ float: 'right' }}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <Link color="inherit" to="/">
            MUI
          </Link>
          <Link color="inherit" to="/">
            Core
          </Link>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>

        {children || <Outlet />}
      </Stack>
    </Stack>
  );
};

export default PrivateLayout;
