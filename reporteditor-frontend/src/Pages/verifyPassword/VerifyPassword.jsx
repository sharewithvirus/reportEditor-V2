import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Typography, Button } from '@mui/material';
import { UserDataContext } from "../../context/userContext";
import { verifyUserToken, createUserPasswordAndLogin } from '../../Services/userService'

function VerifyPassword() {

    const param = useParams();
    const navigate = useNavigate();
    const { setIsLoading } = useContext(UserDataContext);

    const [data, setData] = useState({
        _id: '',
        token: '',
        password: '',
        confirmPassword: ''
    });

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setData({...data, [name]: value});
    }

    const checkToken = async () => { 
        setIsLoading(true);
        const { token } = param;
        const res = await verifyUserToken(token);
        if(res.status === 200){
            setData({...data, _id: res.data.data._id, token: res.data.token})
            setIsLoading(false);
            return;
        }else if(res.data.status === 404){
            alert(res.data.data.message);
            navigate("/login");
            setIsLoading(false)
            return;
        }
    }

    const handleSubmit = async ( ) => {
        if(data.password !== data.confirmPassword){
            alert("Password and Confirm Password are not the same.")
            return;
        }else{
            const res = await createUserPasswordAndLogin(data);
            console.log(res)
            if(res.status){
                alert(res.data.data.message);
                navigate("/login");
            }
        }
    }
    useEffect(() => {
        checkToken();
    }, [])

  return (
    <>

    <Box className='login-container'>
        <Box className='login-box' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <Typography sx={{ fontSize: '25px' }}>Verify User</Typography>
            <Box
                
                sx={{
                    '& > :not(style)': { m: 1, width: '35ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField label="Password" name="password" type="password" color="primary" defaultValue={data.password}  onChange={onInputChange} />
                {/* <TextField label="Filled success" variant="filled" color="success" focused /> */}

            </Box>
            <Box
                
                sx={{
                    '& > :not(style)': { m: 1, width: '35ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField  label="ConfirmPassword" name="confirmPassword" color="primary" type='password' defaultValue={data.confirmPassword} onChange={onInputChange} />
                {/* <TextField label="Filled success" variant="filled" color="success" focused /> */}

            </Box>
            {/* <Link to="#"> Forget Password</Link> */}
            {/* <a href="#" style={{textAlign:'center'}}>Forget Password</a> */}
            <Box my={2}>
                <Button variant="contained" color="primary" sx={{width :"20vh",padding:'15px 0'}} onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Box>
    </Box>
</>
  )
}

export default VerifyPassword;