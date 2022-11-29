import React, { useEffect, useContext, useState } from "react";
import { Stack, Typography, Box, Button } from "@mui/material";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";

import{ UserDataContext } from "../../context/userContext";
import DeleteConfirmationModel from "../../components/DeleteConfirmactionModel";
import {
  getIndustryDataById,
  getIndustry,
  getAllIndustry,
  deleteIndustry,
  changeIndustryStatus,
  updateNewIndustry,
  createIndustry,
} from "../../Services/industryServices";

function Industries() {
  const { setIsLoading } = useContext(UserDataContext);
  const [open, setOpen] = React.useState(false);
  const [activeIndustry, setActiveIndustry] = React.useState("");
  const [editIndustry, setEditIndustry] = React.useState(false);
  const [industryList, setIndustryList] = React.useState([]);
  const [deleteModelShow, setDeleteModelShow] = React.useState(false);

  const handleShow = () => {
    if (open === true) {
      setActiveIndustry("");
    }
    setOpen(!open);
  };
  const handleDeleteModelShow = (id) => {
    setOpen(false);
    setDeleteModelShow(!deleteModelShow);
  };
  const handleDelete = async (id) => {
    setIsLoading(true);
    const res = await deleteIndustry(id);
    if (res.status === 200) {
      setOpen(false);
      setDeleteModelShow(false);
      getIndustry();
    } else if (res.status === 204) {
      setDeleteModelShow(false);
      alert("User List is assigned to To Users First Remove Users.");
    }
    setActiveIndustry("");
    setIsLoading(false);
  };
  const getIndustry = async () => {
    const res = await getAllIndustry();
    if (res.status === 200) {
      setIndustryList(res.data.data);
    }
  };

  const IndustryStatusChange = async (id) => {
    setIsLoading(true);
    const res = await changeIndustryStatus(id);
    if (res.status === 200) {
      getIndustry();
    }
    setIsLoading(false);
    return;
  };

  const createNewDepartment = async (data) => {
    setIsLoading(true);
    let res;
    if (editIndustry == true) {
      if (data.name === undefined) {
        data.name = activeIndustry.name;
      }
      res = await updateNewIndustry(data, activeIndustry._id);
    } else {
      res = await createIndustry(data);
    }
    if (res.status === 200) {
      getIndustry();
      setOpen(false);
    }
    setIsLoading(false);
  };

  const createIndustryModel = () => {
    setEditIndustry(false);
    handleShow();
  };

  const updateIndustry = async (index) => {
    const industry = industryList[index];
    setActiveIndustry(industry);
    setEditIndustry(true);
    handleShow();
  };

  useEffect(() => {
    getIndustry();
  }, []);

  return (
    <>
      {/* <DepartmentModal
          handleDeleteModelShow={handleDeleteModelShow}
          handleClose={handleShow}
          open={open}
          edit={edit}
          industryData={activeIndustry}
          create={(x) => createNewDepartment(x)}
        /> */}
      <DeleteConfirmationModel
        open={deleteModelShow}
        handleShow={handleDeleteModelShow}
        id={activeIndustry._id}
        handleClose={handleDeleteModelShow}
        handleDelete={(x) => handleDelete(x)}
      />
      <Box
        sx={{
          // border: "1px solid black",
          // borderRadius: "5px",
          padding: "5px 0px 5px 0px",
          margin: "5px 50px 5px 50px",
        }}
      >
        <Stack
          display="flex"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            All Industries
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
            onClick={createIndustryModel}
          >
            Create Industries
          </Button>
        </Stack>
        <Box
          my={4}
          sx={{
            border: "1px solid black",
          }}
        >
          <Box
            sx={{
              borderRadius: "5px",
              // padding: "50px",
              margin: "10px",
              marginY: "20px",
              // borderRadius: "5px",
              // // padding: "",
              // margin: "20px 50px 20px 50px",
            }}
          >
            {/* <DepartmentTable
                rows={departmentList}
                changeStatus={(x) => {
                  industryStatusChange(x); 
                }}
                modify={(x) => updateDepartment(x)}
              /> */}
          </Box>
        </Box>
      </Box>
      {/* {console.log("department id is....",departmentList)} */}
    </>
  );
}

export default Industries;
