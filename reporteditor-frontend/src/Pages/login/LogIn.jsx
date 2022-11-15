import React, { useContext, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './logIn.css'
import { Box, TextField, Typography, Button } from '@mui/material';
import { UserDataContext } from "../../context/userContext";
import { userLogin } from '../../Services/authService'


const LogIn = () => {

    const navigate = useNavigate();

    const { setUserInfo, setIsAdmin, setUserRole, setIsLoading, setIsAuthenticated } = useContext(UserDataContext)

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        passwordIsVisible: false
    })
    const handleInput = async (e) => {
        const { name, value } = e.target;
        setLoginData({...loginData, [name]: value})
    }

    const loginHandler = async () => {
        try{
            if(!loginData.email || !loginData.password){
                alert("Email And Password are Required");
                return;
            }
            setIsLoading(true);
            const res = await userLogin(loginData.email, loginData.password);
            if(res.status === 200){
                setIsAuthenticated(true);
                setIsAdmin(res.data.data.userData.isAdmin);
                setUserRole(res.data.data.userData.role);
                setUserInfo(res.data.data.userData);
                if(res.data.data.userData.role === "admin"){
                    navigate("/a_control");
                  }else if(res.data.data.userData.role === "user"){
                    navigate("/u_control");
                  }
                  setIsLoading(false);
            }else{
                setIsAuthenticated(false);
                setIsLoading(false);
            }
        } catch(error){
            alert(error.response.data.message);
            setIsLoading(false);
        }
    }
    return (
        <>

            <Box className='login-container'>
                <Box className='login-box' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                    <Typography sx={{ fontSize: '25px' }}>Admin</Typography>
                    <Box
                        component="form" 
                        sx={{
                           
                           width:'90%',
                           display: 'flex',
                           justifyContent: 'center',
                           marginTop:'2px'
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField label="Email" sx={{width:'80%'}} name="email" type="email" color="primary" focused  onChange={handleInput} />
                        {/* <TextField label="Filled success" variant="filled" color="success" focused /> */}

                    </Box>
                    <Box
                        component="form"
                        sx={{
                           
                           width:'90%',
                           display: 'flex',
                           justifyContent: 'center',
                           marginTop:'15px'
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField  label="Password" sx={{width:'80%'}} name="password" color="primary" focused type='password' onChange={handleInput} />
                        {/* <TextField label="Filled success" variant="filled" color="success" focused /> */}

                    </Box>
                    {/* <Link to="#"> Forget Password</Link> */}
                    {/* <a href="#" style={{textAlign:'center'}}>Forget Password</a> */}
                    <Box my={2}>
                        <Button variant="contained" color="primary" sx={{width :"20vh",padding:'15px 0'}} onClick={loginHandler}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default LogIn
