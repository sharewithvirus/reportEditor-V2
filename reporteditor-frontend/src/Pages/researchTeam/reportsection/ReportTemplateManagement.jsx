import { Button, Divider, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
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
        </Stack>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "centet",
           
            flexWrap:"wrap"
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              minWidth:"500px",
              marginTop:"100px"
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
              minWidth:"500px",
              marginTop:"100px"
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
              minWidth:"500px",
              marginTop:"100px"
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
        </Box>
      </Box>
    </>
  );
}

export default ReportTemplateManagement;
