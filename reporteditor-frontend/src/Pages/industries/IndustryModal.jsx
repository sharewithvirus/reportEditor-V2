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


function IndustryModal({open,handleClose,handleDeleteModelShow,industryData,create}) {
    const [data, setData] = useState({
      name: industryData.name,
    //   description: props.deptData.description,
    //   deptId: props.deptData._id,
    //   teamType: props.deptData.teamType,
    });
    const onInputChange = async (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    //   await create(data);
    //   setData("");
    };
    
    const handleSubmit = async () => {
    await create(data);
    setData("");
    handleClose()
    //   
    };
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
 return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
                Create Team
              </Typography>
            </Stack>
            <hr />
          </Typography>
          <Box>
              {/* <Stack lg={4} item xs={12}>
              <Box my={0} mx={0}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="industryType"
                //   value={data.teamType}
                //   onChange={onInputChange}
                >
                  <FormControlLabel
                    value="research-team"
                    control={<Radio />}
                    label="Research Team"
                  />
                  <FormControlLabel
                    value="editing-team"
                    control={<Radio />}
                    label="Editing Team"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
              </Stack> */}
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
                      label="Industry Name"
                      id="outlined-size-small"
                      placeholder="Input Team Name"
                      fullWidth
                      name="name"
                      margin="normal"
                      onChange={onInputChange}
                    //   defaultValue={props.deptData ? props.deptData.name : ""}
                      size="large"
                    />
                    {/* <TextField
                      color="primary"
                      label="Industry Description"
                      id="outlined-multiline-flexible"
                      fullWidth
                      multiline
                      maxRows={10}
                      margin="normal"
                      placeholder="Add Industry Description"
                      name="description"
                    //   defaultValue={
                    //     props.deptData ? props.deptData.description : ""
                    //   }
                      onChange={onInputChange}
                      size="large"
                    /> */}
                  </Box>
                </FormControl>
              </Grid>
            </Grid>
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
              onClick={handleClose}
            >
              Cancel
            </Button>

            {/* {props.edit ? (
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
            )} */}
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

export default IndustryModal;