import * as React from 'react';
// import Modal from '@mui/material/Modal';
import { Box, Stack, TextField, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DepartmentModal(props) {
 

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
                open={props.open}
                onClose={props.handleClose}
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
                            <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Create a Department</Typography>
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
                                        label="Department Name"
                                        id="outlined-size-small"
                                        // defaultValue="Small"

                                        size="small"
                                    />
                                </Box>
                            </Grid>
                            {/* <Grid item lg={4} xs={12}>
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
                            </Grid> */}
                        </Grid>
                        <Box my={4}>
                            <Grid container spacing={2}>
                                <Grid item lg={12}  spacing={2}>
                                
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
                                <Grid item lg={12}  spacing={2} pl={4}>
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
                        <Button variant="outlined" color="primary" sx={{ textTransform: "none" }} onClick={props.handleClose} >
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </Modal>

    </div>
  );
}
