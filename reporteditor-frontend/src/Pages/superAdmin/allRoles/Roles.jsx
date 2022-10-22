import React from 'react'
import { Stack, Typography, Box, Button ,TextField,Grid} from '@mui/material'
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import RolesTable from './RolesTable';
import Modal from '@mui/material/Modal';
// import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Roles = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
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

                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>All Roles</Typography>
                    <Stack justifyContent={{ xs: 'start', lg: 'end' }}>
                        <Button variant="contained" color="primary" sx={{ textTransform: "none" }}  onClick={handleOpen}>
                            Create User
                        </Button>
                    </Stack>
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
                        <RolesTable />
                    </Box>
                </Box>
            </Box>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <Stack display='flex'
                                direction='row'
                                justifyContent='start'
                                alignItems='center'
                                spacing={2}
                            >
                                <FileCopyRoundedIcon />
                                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Create Roles</Typography>
                            </Stack>
                            <hr />
                        </Typography>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid lg={4} item xs={12}>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField color='primary'
                                            label="Roles"
                                            id="outlined-size-small"
                                            // defaultValue="Small"

                                            size="small"
                                        />
                                    </Box>
                                </Grid>
                                <Grid item lg={4} xs={12}>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            label="Email"
                                            id="outlined-size-small"
                                            // defaultValue="Small"
                                            size="small"
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            label="Verify Email"
                                            id="outlined-size-small"
                                            // defaultValue="Small"
                                            size="small"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box my={4}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={4}>
                                        <FormControl sx={{ m: 1, minWidth: 216 }} size="small">
                                            <InputLabel id="demo-select-small">Select Roles</InputLabel>
                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                // value={age}
                                                label="Select Roles"
                                            // onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value='admin'>Admin</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} lg={4}>
                                        <FormControl sx={{ m: 1, minWidth: 216 }} size="small">
                                            <InputLabel id="demo-select-small">Select</InputLabel>
                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                // value={age}
                                                label="Select"
                                            // onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value='admin'>Read</MenuItem>
                                                <MenuItem value={20}>Write</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box my={5} pl={1}>
                                <Button variant="outlined" color="primary" sx={{ textTransform: "none" }} >
                                    Send Invitaion
                                </Button>
                            </Box>

                        </Box>
                        <Stack display='flex'
                            direction='row'
                            justifyContent='end'
                        >
                            <Button variant="outlined" color="primary" sx={{ textTransform: "none" }} onClick={handleClose} >
                                Cancel
                            </Button>
                        </Stack>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default Roles;
