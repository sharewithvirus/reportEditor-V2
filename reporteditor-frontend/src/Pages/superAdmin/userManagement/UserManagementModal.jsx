import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  Grid,
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteConfirmationModel from "../../../components/DeleteConfirmactionModel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserManagementModal = ({
  open,
  edit,
  activeUser,
  handleClose,
  deptList,
  roleList,
  handelCreate,
  handelUpdate,
  deleteModelOpen,
}) => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    verifyEmail: "",
    department: "",
    access: "",
  });
  const [deptRoleList, setDeptRoleList] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('research-team');
  const handleChange = (event) => {
    setSelectedValue((event.target.value));
  };
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  
  const departmentRole = () => {
    if (data.department) {
      let list = [];
      for (let i = 0; i < roleList.length; i++) {
        if (data.department === roleList[i].department._id) {
          list.push(roleList[i]);
        }
      }
      setDeptRoleList(list);
    } else if (edit === true && deptRoleList.length > 0) {
      let list = [];
      for (let i = 0; i < roleList.length; i++) {
        if (activeUser.department._id === roleList[i].department._id) {
          list.push(roleList[i]);
        }
      }
      setDeptRoleList(list);
    }
  };

  const handelInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    if (edit === false) {
      if (data.userName === "") {
        alert("Please Enter a username");
        return;
      } else if (data.email === "" || data.verifyEmail === "") {
        alert("Please Enter Email");
        return;
      } else if (data.email !== data.verifyEmail) {
        alert("Email are not Matched");
        return;
      } else if (data.department === "") {
        alert("Please Select a Department");
        return;
      } else if (data.access === "") {
        alert("Please Select Department Role");
        return;
      } else {
        handelCreate(data);
      }
    } else {
      handelUpdate(data);
    }
  };

  useEffect(() => {
    departmentRole();
  }, [data]);
  useEffect(() => {
    if (edit) {
      setData({
        ...data,
        _id: activeUser._id,
        userName: activeUser.userName,
        email: activeUser.email,
        verifyEmail: "",
        department: activeUser.department._id,
        access: activeUser.access._id,
      });
    }
  }, []);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Stack
              display="flex"
              direction="row"
              justifyContent="start"
              alignItems="center"
              spacing={2}
            >
              <FileCopyRoundedIcon />
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                {edit ? "Update User" : "Create User"}
              </Typography>
            </Stack>
            <hr />
          </Typography>
          <Box>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid lg={4} item xs={12}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    color="primary"
                    label="Full Name"
                    name="userName"
                    id="outlined-size-small"
                    onChange={handelInput}
                    defaultValue={edit ? activeUser.userName : data.userName}
                    // defaultValue="Small"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item lg={4} xs={12}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {edit ? (
                    <TextField
                      label="Email"
                      id="outlined-size-small"
                      name="email"
                      onChange={handelInput}
                      defaultValue={edit ? activeUser.email : data.email}
                      size="small"
                      disabled
                    />
                  ) : (
                    <TextField
                      label="Email"
                      id="outlined-size-small"
                      name="email"
                      onChange={handelInput}
                      // defaultValue={""}
                      size="small"
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {edit ? (
                    <TextField
                      label="Verify Email"
                      id="outlined-size-small"
                      name="verifyEmail"
                      onChange={handelInput}
                      defaultValue={edit ? activeUser.email : data.verifyEmail}
                      size="small"
                      disabled
                    />
                  ) : (
                    <TextField
                      label="Verify Email"
                      id="outlined-size-small"
                      name="verifyEmail"
                      onChange={handelInput}
                      // defaultValue="Small"
                      size="small"
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
            <Box my={4} mx={2}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="research-team"
                    control={<Radio />}
                    label="Reseach Team"
                    // onChange={()=> handleChange('research-team')}
                  />
                  <FormControlLabel
                    value="editing-team"
                    control={<Radio />}
                    label="Editing Team"
                    // onChange={()=> handleChange('editing-team')}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box my={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={5}>
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <InputLabel id="demo-select-small">
                      Select Department
                    </InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      name="department"
                      onChange={handelInput}
                      defaultValue={
                        edit ? activeUser.department._id : data.department
                      }
                      label="Select Roles"
                    >
                      {deptList ? (
                        deptList.map((x, i) => (
                          <MenuItem value={x._id}>{x.name}</MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No Department Found</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} lg={5}>
                  <FormControl sx={{ m: 1, width: "100%" }} size="small">
                    <InputLabel id="demo-select-small">Select Role</InputLabel>
                    {edit && deptRoleList.length === 0 ? (
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        name="access"
                        onChange={handelInput}
                        defaultValue={
                          edit ? activeUser.access._id : data.access
                        }
                        label="Select"
                        disabled
                      >
                        {deptRoleList.length > 0 ? (
                          deptRoleList.map((x, i) => (
                            <MenuItem value={x._id}>{x.name}</MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No Role Found</MenuItem>
                        )}
                      </Select>
                    ) : (
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        name="access"
                        onChange={handelInput}
                        defaultValue={
                          edit ? activeUser.access._id : data.access
                        }
                        label="Select"
                      >
                        {deptRoleList.length > 0 ? (
                          deptRoleList.map((x, i) => (
                            <MenuItem value={x._id}>{x.name}</MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No Role Found</MenuItem>
                        )}
                      </Select>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            {edit ? (
              ""
            ) : (
              <Box
                display="flex"
                direction="row"
                justifyContent="end"
                spacing={2}
                my={5}
                pl={1}
              >
                {data.userName === "" ||
                data.email === "" ||
                data.verifyEmail === "" ||
                data.department === "" ||
                data.access === "" ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ textTransform: "none" }}
                    disabled
                  >
                    Send Invitation
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ textTransform: "none" }}
                    onClick={handleSubmit}
                  >
                    Send Invitation
                  </Button>
                )}

                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ textTransform: "none", marginLeft: "15px" }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
          <Stack
            display="flex"
            direction="row"
            justifyContent="end"
            spacing={2}
          >
            {" "}
            {edit ? (
              <Button
                variant="outlined"
                color="primary"
                sx={{ textTransform: "none" }}
                onClick={handleSubmit}
              >
                Update User
              </Button>
            ) : (
              ""
            )}
            {edit ? (
              <Button
                variant="outlined"
                color="primary"
                sx={{ textTransform: "none" }}
                onClick={() => deleteModelOpen(data._id)}
              >
                Delete
              </Button>
            ) : (
              ""
            )}
            {edit ? (
              <Button
                variant="outlined"
                color="primary"
                sx={{ textTransform: "none" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            ) : (
              ""
            )}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default UserManagementModal;
