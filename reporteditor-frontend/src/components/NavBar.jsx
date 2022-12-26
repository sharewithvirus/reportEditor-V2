import * as React from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Logo from ".././asset/logo/LogoGMI.PNG";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";

import { UserDataContext } from "../context/userContext";
import { userDashboard, userLogout } from "../Services/authService";
import { useMediaQuery, useTheme } from "@mui/material";
import { Stack } from "@mui/system";

const NavBar = (props) => {
  const {
    setIsAdmin,
    userRole,
    userInfo,
    setIsLoading,
    setIsAuthenticated,
    setUserRole,
    setUserInfo,
  } = React.useContext(UserDataContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userData, setUserData] = React.useState(userInfo.role);

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
    setIsLoading(true);
    const res = await userLogout(userInfo._id);
    if (res.status === 200) {
      setIsAdmin(false);
      setIsAuthenticated(false);
      setIsLoading(false);
      return navigate("/login");
    }
  };

  // const getUserDataApi = async () => {
  //   const res = await userDashboard();
  //   if (res === "User Not found") {
  //     setIsLoading(false);
  //     navigate("/login");
  //   } else {
  //     setIsAuthenticated(true);
  //     setUserData(res.data.data.userData.role)
  //     setIsAdmin(res.data.data.userData.isAdmin);
  //     setUserRole(res.data.data.userData.role);
  //     setUserInfo(res.data.data.userData);
  //     setIsLoading(false);
  //     if (res.data.user.role === "admin") {
  //       navigate("/a_control");
  //     } else if (res.data.user.role === "user") {
  //       navigate("/u_control");
  //     }
  //   }
  // };

  React.useEffect(() => {
    // getUserDataApi();
  }, []);

  // console.log(userData)
  React.useEffect(() => {
    // console.log(userData);
    // setUserData(userInfo);
  }, [userData, userInfo]);
  return (
    <>
      <AppBar
        sx={{
          background: "white",
          color: "black",
          minHeight: "100px",
          paddingTop: "28px",
          width: "96%",
          margin: "auto",
        }}
        position="static"
      >
        <Container maxWidth="xll" sx={{ color: "black" }}>
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Stack justifyContent={""} alignItems={"center"}>
              <Link to="/">
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <img src={Logo} alt="logo" />
                </Typography>
              </Link>
              {userData == "user" ? (
                <Box
                  sx={{
                    flexGrow: 1,
                    color: "block !important",
                    cursor: "not-allowed",
                  }}
                >
                  <Button
                    variant="text"
                    sx={{
                      fontSize: "17px",
                      textTransform: "none",
                      color: "black",
                      fontWeight: "600",
                    }}
                    size="small"
                  >
                    Research Team Mode
                  </Button>
                </Box>
              ) : (
                ""
              )}
            </Stack>

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
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" ,sm:"none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GMI LOGO
            </Typography>

            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
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
            {userData == "admin" ? (
              <AdminSection />
            ) : userData == "user" ? (
              <ResearchUserSection />
            ) : (
              ""
            )}
            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant="text"
                color="primary"
                sx={{ fontSize: "17px", textTransform: "none", color: "black" }}
                onClick={handelLogOut}
              >
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
      <Outlet />
    </>
  );
};

const AdminSection = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, color: "block !important" }}>
        <Button
          variant="text"
          sx={{ fontSize: "17px", textTransform: "none", color: "black" }}
        >
          Admin Panel
        </Button>
      </Box>
    </>
  );
};

const ResearchUserSection = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Stack flexDirection={'row'}
      justifyContent= {'start'}
      alignItems={'center'}
      sx={{width:"50%"}}
      >
         <Box sx={{ flexGrow: 1, color: "block !important" }}>
          <Link to="/u_control">
            <Button
              variant="text"
              sx={{ fontSize: "17px", textTransform: "none", color: "black" }}
              size="small"
            >
              All Reports
            </Button>
          </Link>
        </Box>
          <Box sx={{ flexGrow: 2, color: "block !important" }}>
           
            <Link
              to="/u_control/create-report"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                sx={{
                  fontSize: "10px",
                  textTransform: "none",
                  marginLeft: "8px",
                }}
                size="small"
              >
                Create A Report
              </Button>
            </Link>
          </Box>
        <Box sx={{ flexGrow: 2, color: "block !important" }}>
          {/* <Button
          variant="text"
          sx={{ fontSize: "17px", textTransform: "none", color: "black" }}
          size="small"
        >
          Reports Management
        </Button> */}
          <Link
            to="/u_control/report-template-management"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="text"
              sx={{ fontSize: "17px", textTransform: "none", color: "black" }}
              size="small"
            >
              Reports Templates
            </Button>
          </Link>
        </Box>
        {/* {isMatch === false ? 
       <Box sx={{ flexGrow: 1, color: "block !important" }}>
       <Button
         variant="text"
         sx={{
           fontSize: "17px",
           textTransform: "none",
           color: "black",
           fontWeight: "600",
         }}
         size="small"
       >
         Research Team Mode
       </Button>
     </Box>
      : ""} */}

       
      </Stack>
    </>
  );
};

const editingUserSection = () => {
  return <>Admin</>;
};

export default NavBar;
