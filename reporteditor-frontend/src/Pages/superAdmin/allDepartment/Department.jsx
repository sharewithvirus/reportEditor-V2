import React, { useEffect, useContext, useState } from 'react'
import { Stack, Typography, Box, Button } from '@mui/material'
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import DepartmentTable from './DepartmentTable';
import DepartmentModal from './DepartmentModal';

import { getAllDepartment, changeDepartmentStatus, createDepartment, updateNewDepartment, deleteDepartment } from "../../../Services/departmentService";
import { UserDataContext } from '../../../context/userContext';
import DeleteConfirmationModel from '../../../components/DeleteConfirmactionModel';

const Department = () => {

    const { setIsLoading } = useContext(UserDataContext);
    const [open, setOpen] = React.useState(false);
    const [activeDept, setActiveDept] = React.useState('');
    const [editDept, setEditDept] = React.useState(false);
    const [departmentList, setDepartmentList] = React.useState([]);
    const [deleteModelShow, setDeleteModelShow ] = React.useState(false)
    const handleShow = () => {
        if(open === true){
            setActiveDept("")
        }
        setOpen(!open);
    }
    const handleDeleteModelShow = (id) =>{
        setOpen(false)
        setDeleteModelShow(!deleteModelShow);
    }
    const handleDelete = async (id) => {
        setIsLoading(true)
        const res = await deleteDepartment(id);
        if(res.status === 200){
          setOpen(false);
          setDeleteModelShow(false);
          getDepartment();
        }else if(res.status === 204){
            setDeleteModelShow(false);
            alert("Department is assigned to To Users First Remove Users.");
        }
        setActiveDept('');
        setIsLoading(false)
    
      }
    const getDepartment = async () => {
        const res = await getAllDepartment();
        if(res.status === 200){
            setDepartmentList(res.data.data);
        }
    }

    const deptStatusChange = async (id) => {
        setIsLoading(true);
        const res = await changeDepartmentStatus(id);
        if(res.status === 200){
            getDepartment();
        }
        setIsLoading(false);
        return;
    }

    const createNewDepartment = async (data) => {
        setIsLoading(true);
        let res;
        if(editDept == true){
                if(data.name === undefined){
                    data.name = activeDept.name
                }
            res = await updateNewDepartment(data, activeDept._id)
        }else{
            res = await createDepartment(data);
        }
        if(res.status === 200){
            getDepartment();
            setOpen(false);
        }
        setIsLoading(false)
    }

    const createDeptModel = () => {
        setEditDept(false)
        handleShow();
    }

    const updateDepartment = async (index) => {
        const dept = departmentList[index];
            setActiveDept(dept)
            setEditDept(true)
            handleShow()
    }

    useEffect(() => {
        getDepartment();
    }, [])

    return (
        <>
 {}
  <DepartmentModal handleDeleteModelShow={handleDeleteModelShow} handleClose={handleShow} open={open} edit={editDept} deptData={activeDept} create={(x) => createNewDepartment(x)}/>
  <DeleteConfirmationModel open={deleteModelShow}  handleShow={handleDeleteModelShow} id={activeDept._id} handleClose={handleDeleteModelShow} handleDelete={(x) => handleDelete(x)} />
            <Box
                sx={{
                    // border: "1px solid black",
                    // borderRadius: "5px",
                    padding: "5px 0px 5px 0px",
                    margin: "5px 50px 5px 50px"

                }}

            >
                <Stack display='flex'
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                        <Typography sx={{fontSize:'20px', fontWeight:'bold' }}>All Department</Typography>
                  
                    <Button variant="contained" color="primary" sx={{textTransform: "none" }}  onClick={createDeptModel}>
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
                    margin: "10px",
                    marginY:'20px'
                    // borderRadius: "5px",
                    // // padding: "",
                    // margin: "20px 50px 20px 50px",

                }}>
                    <DepartmentTable rows={departmentList} changeStatus={(x) => {deptStatusChange(x)}} modify={(x) => updateDepartment(x)}/>
                    
                    </Box>
                </Box>
            </Box>
            {/* {console.log("department id is....",departmentList)} */}
        </>
    )
}

export default Department
