import { Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { Link } from "react-router-dom";
import { getTemplate } from "../../../Services/templateServices";
import { useState } from "react";
import { useEffect } from "react";
function ReportTemplateManagement() {
  const [templatesData, setTemplatesData] = useState([]);
  const getData = async () => {
    const res = await getTemplate();
    if (res.status === 200) {
      // console.log("get details",res.data.templateList);
      setTemplatesData(res.data.templateList);
    }
  };
  // console.log("templated data to state",templatesData);
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
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
              Report Template Management
            </Typography>
          </Stack>
          <Stack
            display="flex"
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={5}
          >
            <Link to={"/u_control/template"}>
              <Button
                color="inherit"
                sx={{
                  height: "5vh",
                }}
              >
                Add
                <IconButton>
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Divider />
        <Stack flexDirection="row" flexWrap="wrap" justifyContent="space-between" >
          {templatesData
            ? templatesData.map((data, index) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "centet",

                      flexWrap: "wrap",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        minWidth: "500px",
                        marginTop: "100px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          "& > :not(style)": {
                            m: 1,
                            width: 160,
                            height: 180,
                          },
                          marginRight: "100px",
                        }}
                      >
                        <Paper
                          elevation={3}
                          square
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "15px",
                            }}
                          >
                            {data.header}
                          </Typography>
                          <IconButton
                            sx={{
                              fontSize: "10px",
                            }}
                          >
                            {index === 0 ? <DoneOutlineOutlinedIcon
                              sx={{
                                fontSize: "15px",
                                marginRight: "12px",
                              }}
                            /> : ""}
                            
                           {index === 0 ? "Default" : ""}
                          </IconButton>
                          <Typography 
                          sx={{fontSize:"10px",color:"green"}}
                          
                          >
                            {data.name}
                          </Typography>
                          <Typography>
                            {data.footer}
                          </Typography>
                        </Paper>
                      </Box>
                      <Box
                        sx={{
                          width: "10vw",

                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="inherit"
                          sx={{
                            width: "100%",
                            height: "4vh",
                            marginTop: "10px",
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="inherit"
                          sx={{
                            width: "100%",
                            height: "4vh",
                            marginTop: "10px",
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outlined"
                          color="inherit"
                          sx={{
                            width: "100%",
                            height: "4vh",
                            marginTop: "10px",
                          }}
                        >
                          Set as Default
                        </Button>
                      </Box>
                    </Box>
                  </Box> 
                );
              })
            : ""}
        </Stack>
      </Box>
    </>
  );
}

export default ReportTemplateManagement;
