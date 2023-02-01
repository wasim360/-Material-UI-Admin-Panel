// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports

// assets

import MainCard from 'components/ui-components/Cards';

const CardWrapper = styled(MainCard)(({ theme }: any) => ({
  backgroundColor: 'red',
  color: 'red',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',

    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

const TotalIncomeDarkCard = () => {
  const theme = useTheme();

  return (
    <>
      <CardWrapper border={true} content={false}>
        <Box sx={{ p: 2 }}>
          <List sx={{ py: 0 }}>
            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
              <ListItemAvatar></ListItemAvatar>
              <ListItemText
                sx={{
                  py: 0,
                  mt: 0.45,
                  mb: 0.45,
                }}
                secondary={
                  <Typography variant="subtitle2" sx={{ color: 'primary.dark', mt: 0.25 }}>
                    Total Income
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Box>
      </CardWrapper>
    </>
  );
};

export default TotalIncomeDarkCard;
