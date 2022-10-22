import React from 'react'
import { Box, TextField, Typography, Button } from '@mui/material';
// import { border } from '@mui/system';
import {Link} from 'react-router-dom'
import './logIn.css'
const LogIn = () => {
    return (
        <>

            <Box className='login-container'>


                <Box className='login-box' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                    <Typography sx={{ fontSize: '25px' }}>Admin</Typography>
                    <Box
                        component="form" x
                        sx={{
                            '& > :not(style)': { m: 1, width: '35ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField label="User Name" color="primary" focused />
                        {/* <TextField label="Filled success" variant="filled" color="success" focused /> */}

                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '35ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField  label="Password" color="primary" focused type='password' />
                        {/* <TextField label="Filled success" variant="filled" color="success" focused /> */}

                    </Box>
                    {/* <Link to="#"> Forget Password</Link> */}
                    <a href="#" style={{textAlign:'center'}}>Forget Password</a>
                    <Box my={2}>
                        <Button variant="contained" color="primary" sx={{width :"20vh",padding:'15px 0'}} >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default LogIn
