import {Avatar, Badge, Hidden, Icon, IconButton, MenuItem, useMediaQuery} from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { MatxMenu, MatxSearchBox } from 'app/components';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Span } from '../../../components/Typography';
import cookie from "js-cookie";
import {fetchUserData} from "../../../auth/RoutsData";
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: 'all 0.3s ease',
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: 24,
  padding: 4,
  '& span': { margin: '0 8px' },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary },
}));


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  const [userData,setUserData]=useState({});
  const [avatarData,setAvatarData]=useState("");

  React.useEffect(()=>{
    fetchUserData().then((response)=>{
      setUserData(response.data);
       setAvatarData(response.data.image.imageUrl)
    }).catch((e)=>{
      removeCookie("jwt");
      navigate("*");
    })
  },[])

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  const navigate = useNavigate();
  const handlelogout =  () => {

    removeCookie("jwt");
    navigate("*");

  }

  const [rl,setRl]=useState(true);
  React.useEffect(()=>{
    fetchUserData().then((response)=>{
      setRl(response.data.role==="Admin")
    })
  },[])
  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>

        </Box>

        <Box display="flex" alignItems="center">
          <MatxSearchBox />



          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Hi <strong>{userData.username}</strong>
                  </Span>
                </Hidden>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                  <Avatar src={avatarData} />
                </StyledBadge>
              </UserMenu>
            }
          >
            <div hidden={!rl}>
              <StyledItem >
                <Link to="/dashboard/admin">
                  <Icon> home </Icon>
                  <Span> Admin space </Span>
                </Link>
              </StyledItem>
            </div>
            <StyledItem>
              <Link to="/dashboard/profil">
                <Icon> person </Icon>
                <Span> Profile </Span>
              </Link>
            </StyledItem>


            <StyledItem onClick={handlelogout} >
              <Icon> power_settings_new </Icon>
              <Span > Logout </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default React.memo(Layout1Topbar);
