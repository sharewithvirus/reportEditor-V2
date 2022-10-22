import React from 'react'
import { Stack, Typography, Box, Button } from '@mui/material'
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import UserManagementTable from './UserManagementTable';
import UserManagementModal from './UserManagementModal';
const UserManagement = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {
                open ? <UserManagementModal open={open} handleClose={handleClose} />
                    : 
                    ""
            }

            <Box
                sx={{
                    // border: "1px solid black",

                    // borderRadius: "5px",
                    // padding: "50px",
                    // margin: "10px 50px 10px 50px"
                    padding: "15px 50px 5px 50px",
                    margin: "5px 50px 5px 50px"

                }}

            >

                <Stack display='flex'
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Stack display='flex'
                        direction='row'
                        justifyContent='start'
                        alignItems='center'
                        spacing={2}
                    >
                        <FileCopyRoundedIcon />
                        <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>User Management</Typography>
                    </Stack>
                    <Button variant="contained" color="primary" sx={{ textTransform: "none" }} onClick={handleOpen}>
                        Create User
                    </Button>
                </Stack>
                <Box my={4}
                    sx={{
                        border: "1px solid black",



                    }}>
                    <Box
                        sx={{


                            borderRadius: "5px",
                            // padding: "50px",
                            margin: "50px",

                        }}>
                        <UserManagementTable />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default UserManagement
