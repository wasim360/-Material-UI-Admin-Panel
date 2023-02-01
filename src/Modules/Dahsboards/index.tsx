import { Box, Grid, Paper, styled, useTheme } from '@mui/material';

import TotalIncomeDarkCard from './Charts/WatchListColumn';

import BorderDialog from 'components/ModalComponent';

const CardWrapper = styled(Box)(({ theme }: any) => ({}));
const Dashboard = () => {
  const theme: any = useTheme();
  const Item = styled(Paper)(({ theme }: any) => ({
    backgroundColor: theme.palette.alt,
    ...theme.typography?.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
  }));

  return (
    <CardWrapper
      theme={theme}
      sx={{
        pl: 5,
        pr: 5,
        pt: 1,
      }}
    >
      <BorderDialog />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs>
            <Item>xs</Item>
          </Grid>
          <Grid item xs={4}>
            <Item></Item>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Item>xs=6</Item>
              </Grid>
              <Grid item xs={12}>
                <Item>xs=6</Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <TotalIncomeDarkCard />
    </CardWrapper>
  );
};

export default Dashboard;
