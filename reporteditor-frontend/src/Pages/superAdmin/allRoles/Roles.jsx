import React, { useState, useEffect, useContext} from 'react'
import { Stack, Typography, Box, Button ,TextField,Grid} from '@mui/material'
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import RolesTable from './RolesTable';
import Modal from '@mui/material/Modal';
// import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {UserDataContext} from '../../../context/userContext'
import { getAllDepartment } from '../../../Services/departmentService'
import { getAllRole, createRole, changeRoleStatus } from '../../../Services/roleService'

// import {}

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

    const { setIsLoading } = useContext(UserDataContext);
    const [open, setOpen] = React.useState(false);
    const [deptList, setDeptList] = React.useState([]);
    const [roleList, setRoleList] = React.useState([]);
    const [deleteModelShow, setDeleteModelShow ] = React.useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

const getData = async () => {
    const res = await getAllDepartment();
    setDeptList(res.data.data)
    const res1 = await getAllRole();
    setRoleList(res1.data.data)
}
const createNewRole = async ( data ) => {
    setIsLoading(true);
    const res = await createRole(data)
    if(res.status === 200){
        getData();
        setOpen(false)
    }
    setIsLoading(false)
}
// const handleShowDeleteModel = (index) => {
//     const roleId = roleList[index];
//     if(deleteModelShow){
//         setActiveRoleId("");    
//     }else{
//         setActiveRoleId(roleId._id);
//     }
//     setDeleteModelShow(!deleteModelShow);
// }
const changeStatusOfRole = async (x) => {
    setIsLoading(true)
    const res = await changeRoleStatus(x)
    console.log(res)
    if(res.status === 200){
        getData();
    }
    setIsLoading(false)
}
useEffect(() => {
    getData();
}, [])
    return (
        <>
            <Box
                sx={{
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
                            Create Role
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
                        <RolesTable rows={roleList} changeVisibility={changeStatusOfRole}/>
                    </Box>
                </Box>
            </Box>

            <div>
                <Model open={open} handleClose={handleClose} deptList={deptList} createRole={(x) => createNewRole(x)} />
            </div>
        </>
    )
}

const Model = ({open, handleClose, deptList, createRole}) => {

    const [ data, setData ] = useState({
        name: '',
        department: '',
        access: ''
    })

    const inputChange = (e) => {
        const { name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleSubmit = () => {
        createRole(data);
    }

    const changeRoleStatus = (id) => {
        
    }

    return (
        <Modal
        open={open}
        onClose={handleClose}
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
                                label="Roles Name"
                                id="outlined-size-small"
                                name="name"
                                onChange={inputChange}
                                defaultValue={data.name}
                                size="small"
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box my={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={4}>
                            <FormControl sx={{ m: 1, minWidth: 216 }} size="small">
                                <InputLabel id="demo-select-small">Select Department</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    name="department"
                                    defaultValue={data.department}
                                    label="Select Roles"
                                    onChange={inputChange}
                                >
                                    {
                                        deptList.map((item) => (
                                                 <MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <Box my={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={4}>
                            <FormControl sx={{ m: 1, minWidth: 216 }} size="small">
                                <InputLabel id="demo-select-small">Select Permission</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    name="access"
                                    defaultValue={data.access}
                                    label="Select Roles"
                                    onChange={inputChange}
                                >
                                    <MenuItem value="read">Read Access</MenuItem>
                                    <MenuItem value="write">Write Access</MenuItem>
                                    <MenuItem value="read_write">Read and Write Access</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Stack display='flex'
                direction='row'
                justifyContent='end'
                spacing={2}
            >
                <Button variant="outlined" color="primary" sx={{ textTransform: "none" }} onClick={handleClose} >
                    Cancel
                </Button>
                <Button variant="outlined" color="primary" sx={{ textTransform: "none" }} onClick={handleSubmit} >
                    Create
                </Button>
            </Stack>
        </Box>
    </Modal>
    )
}

export default Roles;

// i javed added lines of code here

const DeleteConfirmationModel = ({open, handleClose, deptList, createRole, handleModelClose}) => {

    const [ data, setData ] = useState({
        name: '',
        department: '',
        access: ''
    })

    const inputChange = (e) => {
        const { name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleSubmit = () => {
        createRole(data);
    }

    const changeRoleStatus = (id) => {
        
    }

    return (
        <Modal
        open={open}
        onClose={handleClose}
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
                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Deleting Confirmaction</Typography>
                </Stack>
                <hr />
            </Typography>
            <Box>
                <Grid container spacing={2}>
                    <Grid height={75} item xs={12}>
                        <Typography> Are You Sure to Delete ?</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Stack display='flex'
                direction='row'
                justifyContent='center'
                spacing={2}
            >
                <Button variant="outlined" color="primary" sx={{ textTransform: "none" }} onClick={handleModelClose} >
                    Cancel
                </Button>
                <Button variant="outlined" color="primary" sx={{ textTransform: "none" }} onClick={createRole} >
                    Delete
                </Button>
            </Stack>
        </Box>
    </Modal>
    )
}