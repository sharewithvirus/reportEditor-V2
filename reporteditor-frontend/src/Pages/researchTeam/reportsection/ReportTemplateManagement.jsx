import { Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import { Link } from "react-router-dom";
function ReportTemplateManagement() {
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
            <Link to={"/u_control/report-template-management/template-creator"}>
              <Button color="inherit"
              sx={{
                  height:"5vh"
              }}
              >
                  Add
              <IconButton>
                  <AddCircleOutlineOutlinedIcon/>
              </IconButton>
                  </Button>
            </Link>
          </Stack>
        </Stack>
        <Divider />
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
              <Paper elevation={3} square 
              sx={{
                display:"flex",
                flexDirection:"column",
                justifyContent:'space-around',
                alignItems:"center"
              }}
              >
                <Typography sx={{
                    fontSize:"15px"
                }}>
                    Template One
                </Typography>
                <IconButton sx={{
                    fontSize:"10px",
                }}>
                <DoneOutlineOutlinedIcon sx={{
                    fontSize:"15px",
                    marginRight:"12px"
                }}/>

                Default
                </IconButton>
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
          {/* <Box
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
                  width: 132,
                  height: 150,
                },
                marginRight: "100px",
              }}
            >
              <Paper elevation={3} square />
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
                  width: 132,
                  height: 150,
                },
                marginRight: "100px",
              }}
            >
              <Paper elevation={3} square />
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
          </Box> */}
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
              <Paper elevation={3} square 
              sx={{
                display:"flex",
                flexDirection:"column",
                justifyContent:'space-around',
                alignItems:"center"
              }}
              >
                <Typography sx={{
                    fontSize:"15px"
                }}>
                    Template Two
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
              <Paper elevation={3} square 
              sx={{
                display:"flex",
                flexDirection:"column",
                justifyContent:'space-around',
                alignItems:"center"
              }}
              >
                <Typography sx={{
                    fontSize:"15px"
                }}>
                    Template Three
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
      </Box>
    </>
  );
}

export default ReportTemplateManagement;
