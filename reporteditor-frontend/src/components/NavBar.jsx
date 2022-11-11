import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '.././asset/logo/LogoGMI.PNG'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';




import { UserDataContext } from '../context/userContext';
import { userLogout } from '../Services/authService';


const NavBar = (props) => {
  const { setIsAdmin, userInfo, setIsLoading, setIsAuthenticated } = React.useContext(UserDataContext)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handelLogOut = async () => {
    setIsLoading(true)
    await userLogout(userInfo._id);
      setIsAdmin(false);
      setIsAuthenticated(false)
      setIsLoading(false);
    return navigate("/login");
  };

  return (
    <AppBar sx={{background:'white', color:'black', minHeight:'100px',    paddingTop: "28px" ,width:'96%', margin:'auto'}}  position="static">
      <Container maxWidth="xll"  sx={{ color:'black'}}>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              color:'black'
            }}
          >
           <img src={Logo} alt="" />
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}> */}
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          {/* </Box> */}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
      
            }}
          >
           GMI LOGO
          </Typography>
         
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                // sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
          </Box>
          {!props.reportsDashboard?
          <>
           
          <Box sx={{ flexGrow:1 , color:'block !important'}}><Button  variant="text" sx={{fontSize:'17px',textTransform: "none"  }}>
          Admin Panel
          </Button></Box>
          </>
          :
          <>
          <Box sx={{ flexGrow:2 , color:'block !important'}}><Button  variant="text" sx={{fontSize:'17px',textTransform: "none"  }}>
          Reports Management
          </Button>
          <Button  variant="text" sx={{fontSize:'17px',textTransform: "none"  }}>
          Reports Templates
          </Button>
          </Box>
          <Box sx={{ flexGrow:1 , color:'block !important'}}>
         <Button  variant="text" sx={{fontSize:'17px',textTransform: "none"  }}>
          Research Team Mode
          </Button></Box>
          <Box sx={{ flexGrow:2 , color:'block !important'}}>
         <Button  variant="contained" sx={{fontSize:'10px',textTransform: "none" ,marginRight:"8px" }}>
          All Reports
          </Button>
          <Button  variant="contained" sx={{fontSize:'10px',textTransform: "none", marginLeft:"8px" }}>
          Create A Report
          </Button>
          </Box>
          <Box sx={{ flexGrow:1 , color:'block !important'}}>
         <Button  variant="text" sx={{fontSize:'17px',textTransform: "none"  }}>
          Research Team Mode
          </Button></Box>
          </>
          }
          <Box sx={{ flexGrow: 0 }}>
          <Button variant="text" color="primary" sx={{fontSize:'17px',textTransform: "none" }} onClick={handelLogOut}>
            Logout
          </Button>
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
