import React, { useState, useEffect } from "react";
// import Modal from '@mui/material/Modal';
import {
  Box,
  Stack,
  TextField,
  Grid,
  Radio,
  FormControlLabel,
  RadioGroup,
  OutlinedInput,
  Checkbox,
  ListItemText,
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
    teamType: props.deptData.teamType,
    industries: "",
  });

  const [industries, setIndustries] = useState(props.deptData.industries);
  const [demoIndus, setDemoIndus] = useState([]);
  const indus = [
    {
      name: "Education",
      id: "14dfdf85df85df85df8",
    },
    {
      name: "Cyber Cell",
      id: "14dfdf85df85df85dfd",
    },
    {
      name: "Widgets",
      id: "14dfdf85df85df85df8",
    },
  ];
  const handleChange = (e) =>{
const arr = industries;

    // setIndustries(e.target.value);
  }
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    let finalData = data;
    finalData.industries = industries;
    await props.create(finalData);
    setData("");
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
                {props.edit ? "Update Team" : "Create Team"}
              </Typography>
            </Stack>
            <hr />
          </Typography>
          <Box>
            <Stack lg={4} item xs={12}>
              <Box my={0} mx={0}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="teamType"
                    value={data.teamType}
                    onChange={onInputChange}
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
            </Stack>
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
                      label="Team Name"
                      id="outlined-size-small"
                      placeholder="Input Team Name"
                      fullWidth
                      name="name"
                      margin="normal"
                      onChange={onInputChange}
                      defaultValue={props.deptData ? props.deptData.name : ""}
                      size="large"
                    />
                    <TextField
                      color="primary"
                      label="Team Description"
                      id="outlined-multiline-flexible"
                      fullWidth
                      multiline
                      maxRows={10}
                      margin="normal"
                      placeholder="Add Team Description"
                      name="description"
                      defaultValue={
                        props.deptData ? props.deptData.description : ""
                      }
                      onChange={onInputChange}
                      size="large"
                    />
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Tag
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={indus}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        // renderValue={(selected) => selected.join(',')}
                        // MenuProps={MenuProps}
                      >
                       
                        {indus.map((industry, index) => (
                          <MenuItem key={industry.id} value={industry.name}>
                            <Checkbox
                              checked
                            />
                            <ListItemText primary={industry.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
