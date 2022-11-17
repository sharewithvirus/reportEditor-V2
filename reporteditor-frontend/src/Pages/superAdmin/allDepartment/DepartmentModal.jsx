import React, { useState, useEffect } from "react";
// import Modal from '@mui/material/Modal';
import { Box, Stack, TextField, Grid, Radio, FormControlLabel, RadioGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteConfirmationModel from "../../../components/DeleteConfirmactionModel";
import { deleteDepartment } from "../../../Services/departmentService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "20rem",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DepartmentModal(props) {
  const [data, setData] = useState({
    name: props.deptData.name,
    description: props.deptData.description,
    deptId: props.deptData._id,
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    await props.create(data);
    setData("");
  };
  const [selectedValue, setSelectedValue] = React.useState('research-team');
  const handleChange = (event) => {
    setSelectedValue((event.target.value));
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
                {props.edit ? "Update Department" : "Create a Department"}
              </Typography>
            </Stack>
            <hr />
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid lg={4} item xs={12}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { width: "35ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      color="primary"
                      label="Department Name"
                      id="outlined-size-small"
                      placeholder="Input Department Name"
                      fullWidth
                      name="name"
                      margin="normal"
                      onChange={onInputChange}
                      defaultValue={props.deptData ? props.deptData.name : ""}
                      size="large"
                    />
                    <TextField
                      color="primary"
                      label="Department Name Description"
                      id="outlined-multiline-flexible"
                      fullWidth
                      multiline
                      maxRows={10}
                      margin="normal"
                      placeholder="Input Department Description"
                      name="description"
                      defaultValue={
                        props.deptData ? props.deptData.description : ""
                      }
                      onChange={onInputChange}
                      size="large"
                    />
                  </Box>
                </FormControl>
              </Grid>
            </Grid>
            <Box my={4} mx={0}>
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
          </Box>
          <Stack
            display="flex"
            direction="row"
            justifyContent="end"
            spacing={2}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{ textTransform: "none" }}
              onClick={props.handleClose}
            >
              Cancel
            </Button>

            {props.edit ? (
              <Button
                variant="outlined"
                color="primary"
                sx={{ textTransform: "none" }}
                onClick={() => {
                  props.handleDeleteModelShow(props.deptData._id);
                }}
              >
                Delete
              </Button>
            ) : (
              ""
            )}

            <Button
              variant="outlined"
              color="primary"
              sx={{ textTransform: "none" }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>

      <div></div>
      {/* {console.log("department id is....",props.deptData._id)} */}
    </div>
  );
}
