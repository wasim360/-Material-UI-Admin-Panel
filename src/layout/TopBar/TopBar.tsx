import {
  AppBar,
  Avatar,
  ButtonBase,
  Chip,
  InputAdornment,
  OutlinedInput,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FunctionComponent, ReactNode, useState } from 'react';
import FlexBetween from '../../components/flexBetween';
import { SettingsOutlined, DarkMode, LightMode } from '@mui/icons-material';
import User1 from 'assets/images/users/user-round.svg';

import IconButton from '@mui/material/IconButton';

import { Box } from '@mui/system';
import { shouldForwardProp } from '@mui/system';
import { useDispatch } from 'react-redux';

import { IconAdjustmentsHorizontal, IconMenu2, IconSearch, IconSettings } from '@tabler/icons';
import { setLogout, setMode, setVisible } from '../../Store/hooks/hooks';
interface Props {
  endNode?: ReactNode;
  startNode?: ReactNode;
  title?: string;
}
const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }: any) => ({
  width: 434,
  marginLeft: 16,
  paddingLeft: 16,
  paddingRight: 16,
  borderRadius: 10,
  background: theme.palette.background.outletBackground,
  border: '3px solid:#f7f8f9 ',
  '& input': {
    background: theme.palette.background.outletBackground,
    paddingLeft: '4px !important',
  },
  [theme.breakpoints.down('lg')]: {
    width: 250,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: theme.palette.background.outletBackground,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 4,
    background: theme.palette.background.outletBackground,
  },
}));
const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }: any) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  background: 'aliceblue',
  color: theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.light,
  },
})) as any;
/**
 * Renders TopBar composition
 * @component TopBar
 */
const TopBar: FunctionComponent<Props> = ({ endNode, startNode, title = '', ...restOfProps }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  const theme: any = useTheme();

  const dark = theme.palette.neutral.dark;

  const alt = theme.palette.background.alt;

  return (
    <AppBar
      component="div"
      elevation={0}
      sx={{
        boxShadow: 'none', // Uncomment to hide shadow
        backgroundColor: alt,
        height: '80px',
        justifyContent: 'center',
      }}
      {...restOfProps}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FlexBetween gap="1rem">
          <Box component="span">
            <Typography variant="h3">Trucking.PK</Typography>
          </Box>
          <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                transition: 'all .2s ease-in-out',
                background: 'aliceblue',
                color: theme.palette.secondary.dark,
                '&:hover': {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light,
                },
              }}
              color="inherit"
            >
              <IconMenu2 stroke={1.5} size="1.3rem" onClick={() => dispatch(setVisible())} />
            </Avatar>
          </ButtonBase>
        </FlexBetween>
        <Box sx={{ display: { md: 'block' } }}>
          <OutlineInputStyle
            id="input-search-header"
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <ButtonBase sx={{ borderRadius: '12px' }}>
                  <HeaderAvatarStyle variant="rounded">
                    <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                  </HeaderAvatarStyle>
                </ButtonBase>
              </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
          />
        </Box>
        {isNonMobileScreens && (
          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton>
            <IconButton>
              <SettingsOutlined sx={{ fontSize: '25px' }} />
            </IconButton>

            <FlexBetween>
              <span onClick={handleClick}>
                <Chip
                  sx={{
                    height: '48px',
                    width: '100px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    cursor: 'pointer',
                    '&[aria-controls="menu-list-grow"], &:hover': {
                      borderColor: theme.palette.primary.main,
                      background: `${theme.palette.primary.main}!important`,
                      color: theme.palette.primary.light,
                      '& svg': {
                        stroke: theme.palette.primary.light,
                      },
                    },
                    '& .MuiChip-label': {
                      lineHeight: 0,
                    },
                  }}
                  avatar={
                    <Avatar
                      alt="Natacha"
                      src={User1}
                      sx={{
                        ...theme.typography.mediumAvatar,
                        margin: '8px 0 8px 8px !important',
                        cursor: 'pointer',
                      }}
                    />
                  }
                  label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                  variant="outlined"
                  size="medium"
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
                </Menu>
              </span>
            </FlexBetween>
          </FlexBetween>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
