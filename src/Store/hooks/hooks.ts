import { createSlice } from '@reduxjs/toolkit';

import { IUserLis } from 'Models/auth';
import { ILoginActions } from 'Models/notification';
import { DecriptionData, EncriptData } from 'Utils/encription';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: '',
    loading: false,
    userLoggedIn: false,
    isUserLogin: localStorage.getItem('auth') ? true : false,
    auth: null,
    userDetails: null,
    history: '',
    isOnlineUser: false,
    isCheckInternet: false,
    mode: 'light',
    sidebarVisible: true,
    isOpen: [], // for active default menu
    appState: '',
    opened: true,
  },
  reducers: {
    handleLogin: (state: any, action) => {
      console.log(action, 'Action');
      switch (action.payload?.type) {
        case ILoginActions.LOGIN:
          localStorage?.removeItem('_expiredTime');
          localStorage.setItem('auth', EncriptData(action.payload) as any);
          state.isUserLogin = true;
          state.isOnlineUser = true;
          state.auth = action.payload;
          const checkIsAuthSaved = localStorage.getItem('auth');
          let decriptedData = checkIsAuthSaved ? DecriptionData(checkIsAuthSaved) : null;

          let user: IUserLis = decriptedData?.payload;
          state.userDetails = user;
          break;
        case ILoginActions.LOGOUT:
          localStorage.removeItem('auth');

          localStorage?.removeItem('_expiredTime');
          state.isUserLogin = false;
          state.isOnlineUser = false;
          state.auth = null;
          state.userDetails = null;
      }
    },
    setIsOnlineUser: (state, action) => {
      state.isOnlineUser = action?.payload;

      state.isOnlineUser && (state.isCheckInternet = true);
    },
    setUserLogin: (state) => {
      state.userLoggedIn = true;
    },
    setLogin: (state) => {
      state.userLoggedIn = true;
    },
    MENU_OPEN: (state, action: any) => {
      console.log(action, 'Action');
      state.isOpen = action.id;
    },
    SET_MENU: (state, action: any) => {
      console.log(action, 'Action');
      state.opened = action?.opened;
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
      console.log('herr');
      state.isUserLogin = false;
      state.userLoggedIn = false;
    },
    setMode: (state: any) => {
      console.log('here', state?.mode);
      state.mode = state?.mode === 'light' ? 'dark' : 'light';
    },
    setVisible: (state) => {
      state.sidebarVisible = state.sidebarVisible === true ? false : state.sidebarVisible === false ? true : true;
    },
    setAppState: (state, action: any) => {
      state.appState = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const {
  setUser,
  setLogout,
  setMode,
  setVisible,
  SET_MENU,
  MENU_OPEN,
  setAppState,
  setLogin,
  handleLogin,
  setUserLogin,
  setAuth,
  setUserDetails,
} = authSlice.actions;
export default authSlice.reducer;
