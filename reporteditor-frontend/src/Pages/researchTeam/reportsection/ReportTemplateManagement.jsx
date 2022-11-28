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
import DeleteConfirmationModel from "../../../components/DeleteConfirmactionModel";
function ReportTemplateManagement() {
  const [templatesData, setTemplatesData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
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
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={5}
          >
            <Link to={"/u_control/report-template/create"}>
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
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          // bgcolor="darkblue"
        >
          {templatesData
            ? templatesData.map((data, index) => {
                return (
                  <Stack
                    // sx={{
                    //   display: "flex",
                    //   justifyContent: "space-between",
                    //   alignItems: "center",
                    // }}
                    direction={{ xs: "column", sm: "row", md:'row' }}
                      spacing={{ xs: 1, sm: 4, md: 6 }}
                     
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row", md:'row' }}
                      spacing={{ sm: 3, md: 6, sm:4 }}
                      padding={{sm:1,md:1,sm:1}}
                     
                      alignContent="center"
                      mt={4}
                     
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
                            {index === 0 ? (
                              <DoneOutlineOutlinedIcon
                                sx={{
                                  fontSize: "15px",
                                  marginRight: "12px",
                                }}
                              />
                            ) : (
                              ""
                            )}

                            {index === 0 ? "Default" : ""}
                          </IconButton>
                          <Typography sx={{ fontSize: "10px", color: "green" }}>
                            {data.name}
                          </Typography>
                          <Typography>{data.footer}</Typography>
                        </Paper>
                      </Box>
                      <Stack
                        direction={{ xs: "column", sm: "column", md: "column" }}
                        spacing={{ xs: 1, sm: 3, md: 3 }}
                      >
                        <Link
                          to={`/u_control/report-template/edit/${data._id}`}
                        >
                          <Button
                            variant="outlined"
                            color="inherit"
                            sx={{
                              width: "100%",

                              marginTop: "10px",
                            }}
                            size="small"
                          >
                            Edit
                          </Button>
                        </Link>
                        <Link>
                          <Button
                            variant="outlined" 
                            color="inherit"
                            sx={{
                              width: "100%",

                              marginTop: "10px",
                            }}
                            size="small"
                            onClick={() =>setOpen(true) }
                          >
                            Delete
                          </Button>
                        </Link>
                        <Link>
                          <Button
                            variant="outlined"
                            color="inherit"
                            sx={{
                              width: "100%",

                              marginTop: "10px",
                            }}
                            size="small"
                            fullWidth
                          >
                            Set as Default
                          </Button>
                        </Link>
                      </Stack>
                    </Stack>
                  </Stack>
                );
              })
            : ""}
        </Stack>
      </Box>
      <DeleteConfirmationModel open={open}  handleClose={handleClose} />
    </>
  );
}

export default ReportTemplateManagement;
