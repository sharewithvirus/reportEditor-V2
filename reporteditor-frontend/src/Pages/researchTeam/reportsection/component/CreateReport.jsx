import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { margin } from "@mui/system";

function CreateReport() {
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
            creat a report
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
          <Box
            sx={{
              padding: "50px",
              width: "70vw",
              textAlign: "center",
            }}
          >
            ABCD MARKET
          </Box>
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
              <FormControlLabel
                control={
                  <Checkbox defaultChecked color="default" size="small" />
                }
                label={<span style={{ fontSize: "0.7rem" }}>Vikash [me] </span>}
              />
              <FormControlLabel
                control={<Checkbox color="default" size="small" />}
                label={
                  <span style={{ fontSize: "0.7rem" }}>Nikhil Changle </span>
                }
              />
              <FormControlLabel
                control={<Checkbox color="default" size="small" />}
                label={
                  <span style={{ fontSize: "0.7rem" }}>Uttreswar More </span>
                }
              />
              <FormControlLabel
                control={<Checkbox color="default" size="small" />}
                label={<span style={{ fontSize: "0.7rem" }}>Panka K</span>}
              />
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
        marginTop="50px"
       
        // border="2px solid black"
      >
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
              <FormGroup>
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
            Forecast Year
          </Typography>
          <Box sx={{ marginLeft: "5px", width: "20vw" }}>
            <Box sx={{}}>
              <FormGroup>
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
              </FormGroup>
            </Box>
          </Box>
        </Stack>
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
        display:"flex",
        justifyContent:"center",
        marginTop:"8vh"
      }}
      >
        <Button
          variant="contained"
          
          sx={{
            fontSize: "10px",
            textTransform: "none",
            marginLeft: "8px",
            width:"10vw",
            margin:"auto",
            backgroundColor:"rgba(15, 154, 173, 1)"
          }}
        >
          Start Report Draft
        </Button>
      </Stack>
    </Box>
  );
}

export default CreateReport;
