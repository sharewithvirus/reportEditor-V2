import React, { useState, useEffect, useContext  } from 'react'
import { Stack, Typography, Box, Button } from '@mui/material'
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import UserManagementTable from './UserManagementTable';
import UserManagementModal from './UserManagementModal';
import DeleteConfirmationModel from '../../../components/DeleteConfirmactionModel';
import { UserDataContext } from '../../../context/userContext'

import { createUser, getUsers, changeUserStatus, updateUser, deleteUser  } from '../../../Services/userService';

import { getAllDepartment } from '../../../Services/departmentService';
import { getAllRole } from '../../../Services/roleService';

const UserManagement = () => {

    const { setIsLoading } = useContext(UserDataContext)
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [activeUser, setActiveUser] = useState('');
    const [deleteId, setDeleteId] = useState('')
    const [editModel, setEditModel] = useState(false);
    const [userList, setUserList] = useState([]);

    const [departmentList, setDepartmentList] = useState([]);
    const [roleList, setRoleList] = useState([]);

    const handleDeleteModel = (x) => {
        setDeleteId(x)
        setOpen(false)
        setDeleteOpen(!deleteOpen)
    }            



    const getData = async () => {
        const res = await getAllDepartment();
        if(res.status === 200){
            setDepartmentList(res.data.data);
        }
        const res2 = await getAllRole();
        if(res2.status === 200){
            setRoleList(res2.data.data)
        }
    }

    const getUserList = async () => {
        const resUser = await getUsers();
        if(resUser.status === 200){
            setUserList(resUser.data.data);
        }
    }

    const handleDeleteSubmit = async (x) => {
        const res = await deleteUser(x);
        console.log("id is ",x)
        setDeleteOpen(false)
        await getUserList();
    }

    const handleShow = () => {
        if(open === true){
            setActiveUser('')
        }
        if(editModel){
            setEditModel(false);
        }
        setOpen(!open);
    }

    const userEditModelHandle = (index) => {
        setActiveUser(userList[index]);
        setEditModel(true);
        setOpen(true)
    }

    const userCreate = async (data) => {
        setIsLoading(true)
        const res = await createUser(data);
        if(res.status === 204 || res.status === 500){
            alert(res.data.message);
            setIsLoading(false);
        }else if(res.status === 201){
            handleShow();
            alert(res.data.message);
            getUserList();
            setIsLoading(false);
        }
    }

    const userUpdate = async (data) => {
        setIsLoading(true)
        const res = await updateUser(data);
        if(res.status === 200){
            setActiveUser('');
            setEditModel(false)
            getUserList();
            alert(res.data.message);
            handleShow()
        }else{

        }
        setIsLoading(false)
    }

    const userStatusUpdate = async (data) => {
        setIsLoading(true)
        const res = await changeUserStatus(data);
        if(res.status === 200){
            getUserList();
        }
        setIsLoading(false)
    }

    useEffect(() =>{
        getData();
        getUserList();
    }, [])
    
    return (
        <>
            {
                open ? <UserManagementModal open={open} edit={editModel} activeUser={activeUser} deleteModelOpen={(x) => handleDeleteModel(x)} deptList={departmentList} roleList={roleList} handleClose={handleShow} handelCreate={userCreate} handelUpdate={(x) => userUpdate(x)}/>
                    :   
                    ""
            }
            {
                deleteOpen ? <DeleteConfirmationModel open={deleteOpen} activeUser={activeUser} handleDelete={handleDeleteSubmit} id={userList[0]._id}  handleClose={handleDeleteModel}/>
                    : 
                    ""
            }
            <Box
                sx={{
                    padding: "15px 0px 5px 0px",
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
                    <Button variant="contained" color="primary" sx={{ textTransform: "none" }} onClick={handleShow}>
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
                            margin: "10px",
                            marginY:'20px'

                        }}>
                        <UserManagementTable rows={userList}  editModelOpen={(x) => userEditModelHandle(x)} updateStatus={(x) => userStatusUpdate(x)} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default UserManagement
