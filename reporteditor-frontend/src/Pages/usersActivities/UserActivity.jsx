import { Typography, Box, Stack } from '@mui/material'
import { border, width } from '@mui/system'
import React from 'react'
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';


const UserActivity = () => {
    return (
        <>

            <Box my={2.9}
                sx={{
                    // border: "1px solid black",

                    // borderRadius: "5px",
                    padding: "5px 50px 5px 60px",
                    // margin: "5px 50px 5px 50px",
                    width: "50%"

                }}>

                <Stack display='flex'
                    direction='row'
                    justifyContent='start'
                    alignItems='center'
                    spacing={2}

                >
                    <FileCopyRoundedIcon />
                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>User Activity</Typography>
                </Stack>
            </Box>
            <Box>
                <Box
                    sx={{
                        border: "1px solid black",

                        // borderRadius: "5px",
                        padding: "5px 50px 5px 40px",
                        margin: "5px 50px 5px 20px",
                        width: "65%"

                    }}

                >

                    <Box mt={1}>
                        <Typography>Action : XYZ is loggedin</Typography>
                        <Typography>Timestamp : 28 Sept, 2022, 1:11AM IST</Typography>
                        <Box my={2}  sx={{ height: '2px', borderBottom: '1px solid black', width: '80%', margin:'auto' }}></Box>
                    </Box>

                    <Box mt={1}>
                        <Typography>Action : XYZ is loggedin</Typography>
                        <Typography>Timestamp : 28 Sept, 2022, 1:11AM IST</Typography>
                        <Box my={2}  sx={{ height: '2px', borderBottom: '1px solid black', width: '80%', margin:'auto' }}></Box>

                    </Box>
                    <Box mt={1}>
                        <Typography>Action : XYZ is loggedin</Typography>
                        <Typography>Timestamp : 28 Sept, 2022, 1:11AM IST</Typography>
                        <Box sx={{ height: '2px', borderBottom: '1px solid black', width: '80%', margin:'auto',padding:'5px 0' }}></Box>

                    </Box>
                    <Box mt={1}>
                        <Typography>Action : XYZ is loggedin</Typography>
                        <Typography>Timestamp : 28 Sept, 2022, 1:11AM IST</Typography>
                        {/* <Box mt={1} sx={{ height: '2px', borderBottom: '1px solid black', width: '60%', margin: 'left' }}></Box> */}

                    </Box>


                </Box>
            </Box>

        </>
    )
}

export default UserActivity
