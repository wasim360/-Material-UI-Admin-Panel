import { SnackbarOrigin } from '@mui/material';
import { SnackbarProvider } from 'notistack';

const MAX_SNACK = 3;

const AUTO_HIDE_DURATION = 3000;

const POSITION: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center',
};

export default function NotistackWrapper({ children }: any) {
  return (
    <SnackbarProvider maxSnack={MAX_SNACK} autoHideDuration={AUTO_HIDE_DURATION} anchorOrigin={POSITION}>
      {children}
    </SnackbarProvider>
  );
}
