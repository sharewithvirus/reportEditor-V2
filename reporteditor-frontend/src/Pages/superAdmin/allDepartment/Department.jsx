import React from 'react'
import { Stack, Typography, Box, Button } from '@mui/material'
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import DepartmentTable from './DepartmentTable';
import DepartmentModal from './DepartmentModal';
const Department = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
        <DepartmentModal handleClose={handleClose} open={open}/>
            <Box
                sx={{
                    // border: "1px solid black",
                    
                    // borderRadius: "5px",
                    padding: "5px 50px 5px 50px",
                    margin: "5px 50px 5px 50px"

                }}

            >

                <Stack display='flex'
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                     
                        <Typography sx={{fontSize:'20px', fontWeight:'bold' }}>All Department</Typography>
                  
                    <Button variant="contained" color="primary" sx={{textTransform: "none" }}  onClick={handleOpen}>
                        Create a Department
                    </Button>
                </Stack>
                <Box  my={4}
                sx={{
                    border: "1px solid black",
                }}>
                <Box 
                sx={{
                   
                    borderRadius: "5px",
                    // padding: "50px",
                    margin: "50px"
                    // borderRadius: "5px",
                    // // padding: "",
                    // margin: "20px 50px 20px 50px",

                }}>
                    <DepartmentTable />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Department
