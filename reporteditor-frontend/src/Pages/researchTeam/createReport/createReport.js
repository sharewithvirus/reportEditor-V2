import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { margin } from "@mui/system";

function CreateReport() {
 // let currentYear=new Date().getUTCFullYear;
  const [allAuthor, setAllAuthor] = useState([]);
  const [baseYear, setBaseYear] = useState([]);
  const [forecastYear, setForecastYear] = useState([]);
  const [btnState, setBtnState] = useState(false);
  

  const getAllAuthor = async () => {
    try {
      const res = await axios.get("api/v1/user");
      // console.log(res.data.data);
      console.log("data is ");
      setAllAuthor(res.data.data);
      console.log(allAuthor);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAuthor();
  }, []);

// Adding BaseYear
const addBaseYear = async () => {
  try{
    const today = new Date();
    const year = today.getFullYear; 
     setBaseYear(()=>[...baseYear, year+1 ])
   //return <Button>2022</Button>


  }catch(error){
    console.log(error);
  }
};

useEffect(()=>{
  //addBaseYear();
  const today = new Date();
  let year = today.getFullYear();
  console.log(year);
  setBaseYear([...baseYear,year+1]);
}, []);

// Selecting Forecast year
const selectForecastYear = async () => {
  try{
   


  }catch(error){
    console.log(error);
  }
};

function handleClick(){
  setBtnState(btnState => !btnState)
}

// useEffect(()=>{
//  // selectForecastYear();
//  setForecastYear(()=> Number(forecastYear)+5)
// }, [forecastYear]);

  return (
    <Box
      sx={{
        padding: "15px 50px 5px 50px",
        margin: "5px 50px 5px 50px",
      }}
    >
      <Stack
        display="flex"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height="8vh"
      >
        <Stack
          display="flex"
          direction="row"
          justifyContent="start"
          alignItems="center"
          spacing={2}
        >
          <FileCopyOutlinedIcon />
          <Typography sx={{ fontSize: "20px", fontWeight: "" }}>
            Create a Report
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        display="flex"
        direction="row"
        justifyContent="start"
        alignItems="start"
        spacing={2}
        marginTop="30px"
      >
        <Typography sx={{ width: "10vw", fontSize: "15px" }}>
          Report Name
        </Typography>
        <Box sx={{ border: "1px solid gray" }}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={15}
            placeholder="Enter the Report Name"
            style={{ width: "70vw" }}
          />

          {/* <Box
            sx={{
              padding: "50px",
              width: "70vw",
              textAlign: "center",
            }}
          >
            ABCD MARKET
          </Box> */}
        </Box>
      </Stack>
      <Stack
        display="flex"
        direction="row"
        justifyContent="start"
        alignItems="start"
        spacing={2}
        marginTop="20px"
      >
        <Typography sx={{ width: "10vw", fontSize: "15px" }}>
          Author Name
        </Typography>
        <Box sx={{}}>
          <Box sx={{}}>
            <FormGroup sx={{ fontSize: "10px" }}>
              {allAuthor.map((x, index) => {
                return (
                  <FormControlLabel
                    control={<Checkbox color="default" size="small" />}
                    label={
                      <span style={{ fontSize: "0.7rem" }}>
                        {x.userName} [me]{" "}
                      </span>
                    }
                  />
                );
              })}
            </FormGroup>
          </Box>
        </Box>
      </Stack>

  
        <Stack
          display="flex"
          direction="row"
          justifyContent="start"
          alignItems="start"
          spacing={2}

          //   border="2px solid black"
        >
          <Typography sx={{ width: "10vw", fontSize: "15px" }}>
            Base Year
          </Typography>
          <Box sx={{ marginLeft: "10px", width: "10vw" }}>
            <Box sx={{}}>
              {/* <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked color="default" size="small" />
                  }
                  label={<span style={{ fontSize: "0.7rem" }}>2020</span>}
                />
                <FormControlLabel
                  control={<Checkbox color="default" size="small" />}
                  label={<span style={{ fontSize: "0.7rem" }}>2021 </span>}
                />
                <FormControlLabel
                  control={<Checkbox color="default" size="small" />}
                  label={<span style={{ fontSize: "0.7rem" }}>2022</span>}
                />
                <FormControlLabel
                  control={<Checkbox color="default" size="small" />}
                  label={<span style={{ fontSize: "0.7rem" }}>2023</span>}
                />
                <FormControlLabel
                  control={<Checkbox color="default" size="small" />}
                  label={<span style={{ fontSize: "0.7rem" }}>2024</span>}
                />
                <FormControlLabel
                  control={<Checkbox color="default" />}
                  label={<span style={{ fontSize: "0.7rem" }}>2025</span>}
                />
              </FormGroup> */}
              <Box sx={{display:"flex",direction:"row"}}>
              {/* <button onClick={() => setBaseYear((c) => c - 1)}>-</button> */}
                {/* {addBaseYear} */}
                <button onClick={addBaseYear}>Add Year</button>
                &nbsp;&nbsp; &nbsp;&nbsp;
                {/* <p >The base Year :{baseYear}</p> */}
                {/* <input type="text">{baseYear}</input> */}

                {/* <button >{baseYear}</button> */}
               
                &nbsp;&nbsp;
                {/* <input
                 type="text" 
                 value={baseYear}
                 size={10}
                 onChange={(e) => setBaseYear(e.target.value)}
               /> */}

                &nbsp;&nbsp;
              
               </Box>
            </Box>
          </Box>
        </Stack>
        &nbsp;&nbsp; &nbsp;&nbsp;


        <Stack
          display="flex"
          direction="row"
          justifyContent="start"
          alignItems="start"
          spacing={2}

          //   border="2px solid black"
        >
          <Typography sx={{ width: "10vw", fontSize: "15px" }}>
            Forecast Year
          </Typography>
          <Box sx={{ marginLeft: "5px", width: "20vw" }}>
            <Box sx={{}}>
              {/* <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked color="default" size="small" />
                  }
                  label={<span style={{ fontSize: "0.7rem" }}>2028</span>}
                />
                <FormControlLabel
                  control={<Checkbox color="default" size="small" />}
                  label={<span style={{ fontSize: "0.7rem" }}>2029</span>}
                />
                <FormControlLabel
                  control={<Checkbox color="default" size="small" />}
                  label={<span style={{ fontSize: "0.7rem" }}>2030</span>}
                />
                <FormControlLabel
                  control={<Checkbox color="default" size="small" />}
                  label={<span style={{ fontSize: "0.7rem" }}>2031</span>}
                />
                <FormControlLabel
                  control={<Checkbox color="default" size="small" />}
                  label={<span style={{ fontSize: "0.7rem" }}>2032</span>}
                />
                <FormControlLabel
                  control={<Checkbox color="default" size="small" />}
                  label={<span style={{ fontSize: "0.7rem" }}>2033 </span>}
                />
              </FormGroup> */}
              <Box sx={{display:"flex",direction:"row"}}>
              <button onClick={() => setForecastYear((c) => Number(forecastYear) - 1)}>-</button>
                &nbsp;&nbsp;
                {/* <input
                 type="text" 
                 value={baseYear+5}
                 size={10}
                 onChange={(e) => setForecastYear(e.target.value)}
               /> */}
                &nbsp;&nbsp;
               <button onClick={() => setForecastYear((c) => Number(forecastYear) + 1)}>+</button>
               </Box>
            </Box>
          </Box>
        </Stack>


      <Stack
        display="flex"
        direction="row"
        justifyContent="start"
        alignItems="start"
        spacing={2}
        marginTop="50px"
      >
        <Typography sx={{ width: "25vw", fontSize: "15px" }}>
          Templates
        </Typography>
        <Box sx={{}}>
          <Box
            sx={{
              width: "75vw",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  marginRight: "50px",
                  width: 132,
                  height: 150,
                },
              }}
            >
              <Paper elevation={3} square>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",

                    alignItems: "center",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox color="default" size="small" />}
                      label={<span style={{ fontSize: "0.7rem" }}>select</span>}
                    />
                  </FormGroup>
                  <Typography sx={{ fontSize: "10px", marginTop: "50px" }}>
                    Template one
                  </Typography>
                </Stack>
              </Paper>
              <Paper elevation={3} square>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",

                    alignItems: "center",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox color="default" size="small" />}
                      label={<span style={{ fontSize: "0.7rem" }}>select</span>}
                    />
                  </FormGroup>
                  <Typography sx={{ fontSize: "10px", marginTop: "50px" }}>
                    Template Two
                  </Typography>
                </Stack>
              </Paper>
              <Paper elevation={3} square>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",

                    alignItems: "center",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox color="default" size="small" />}
                      label={<span style={{ fontSize: "0.7rem" }}>select</span>}
                    />
                  </FormGroup>
                  <Typography sx={{ fontSize: "10px", marginTop: "50px" }}>
                    Template Three
                  </Typography>
                </Stack>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Stack>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "8vh",
        }}
      >
        <Button
          variant="contained"
          sx={{
            fontSize: "10px",
            textTransform: "none",
            marginLeft: "8px",
            width: "10vw",
            margin: "auto",
            backgroundColor: "rgba(15, 154, 173, 1)",
          }}
        >
          Start Report Draft
        </Button>
      </Stack>
    </Box>
  );
}

export default CreateReport;
