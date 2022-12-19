import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./logIn.css";
import { Box, TextField, Typography, Button } from "@mui/material";
import { UserDataContext } from "../../context/userContext";
import { userLogin } from "../../Services/authService";

const LogIn = () => {
  const navigate = useNavigate();

  const {
    setUserInfo,
    setIsAdmin,
    setUserRole,
    setIsLoading,
    setIsAuthenticated,
  } = useContext(UserDataContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    passwordIsVisible: false,
  });
  const handleInput = async (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      if (loginData.email === "" || loginData.password === "") {
        alert("Email And Password are Required");
        return;
      }
      setIsLoading(true);
      const res = await userLogin(loginData.email, loginData.password);
      if (res.status === 200) {
        setIsAuthenticated(true);
        setIsAdmin(res.data.data.userData.isAdmin);
        setUserRole(res.data.data.userData.role);
        setUserInfo(res.data.data.userData);
        if (res.data.data.userData.role === "admin") {
          navigate("/a_control");
        } else if (res.data.data.userData.role === "user") {
          navigate("/u_control");
        }
        setIsLoading(false);
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    } catch (error) {
      alert(error.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Box className="login-container">
        <Box
          className="login-box"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "25px" }}>Admin</Typography>
          <form onSubmit={loginHandler} sx={{}}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "40vw",
              }}
            >
              <TextField
                label="Email"
                name="email"
                sx={{ width: "80%", marginTop: "15px" }}
                type="email"
                color="primary"
                onChange={handleInput}
              />
              {/* <TextField label="Filled success" variant="filled" color="success" focused /> */}
              <TextField
                label="Password"
                name="password"
                sx={{ width: "80%", marginTop: "15px" }}
                color="primary"
                type="password"
                onChange={handleInput}
              />
              {/* <TextField label="Filled success" variant="filled" color="success" focused /> */}

              {/* <Link to="#"> Forget Password</Link> */}
              {/* <a href="#" style={{textAlign:'center'}}>Forget Password</a> */}
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "20vh", padding: "15px 0", marginTop: "15px" }}
                onClick={(e) => loginHandler(e)}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default LogIn;
