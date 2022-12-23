import {
  Alert,
  Button,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteTemplate,
  getTemplate,
  updateTemplateStatus,
} from "../../../Services/templateServices";
import { useState } from "react";
import { useEffect } from "react";
import DeleteConfirmationModel from "../../../components/DeleteConfirmactionModel";
import { UserDataContext } from "../../../context/userContext";
function ReportTemplateManagement() {
  const [templatesData, setTemplatesData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteModelData, setDeleteModelData] = useState("");
  const { setIsLoading, userInfo } = useContext(UserDataContext);
  const [severity, setSeverity] = useState("success");
  const [snacbarMsg, setSnackBarMsg] = useState("");
  const navigate = useNavigate();
  // const [defaultTemplate,setDefaultTemplate]=useState(false);
  const handleClose = () => {
    setOpen(false);
    setDeleteModelData("");
  };
  const changeDefaultTemplate = async (id) => {
    console.log(id);
    setIsLoading(true);
    const res = await updateTemplateStatus(id);
    console.log(res);
    if (res.status) {
      setSnackBarMsg("Default status changed!");
      setSeverity("success");
      setIsLoading(false);
      getData();
    }
  };
  const handleDelete = async () => {
    setIsLoading(true);
    const res = await deleteTemplate(deleteModelData._id);
    console.log(res);
    setIsLoading(false);
    if (res.status == 200) {
      setSnackBarMsg("Data Deleted !");
      setSeverity("success");
      getData();
      setOpen(false);
    } else {
      setSnackBarMsg("Data is not Deleted !");
      setSeverity("error");
      getData();
      setOpen(false);
    }
  };
  const getData = async () => {
    setIsLoading(true);
    const res = await getTemplate();
    if (res.status === 200) {
      // console.log("get details",res.data.templateList);
      setTemplatesData(res.data.templateList);
    }
    setIsLoading(false);
  };
  const handleDeleteModel = (data) => {
    setDeleteModelData(data);
    setOpen(true);
  };
  // console.log("templated data to state",templatesData);
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {snacbarMsg ? snacbarMsg : ""}
        </Alert>
      </Snackbar>
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
                <AddCircleOutlineOutlinedIcon />
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
                    direction={{ xs: "column", sm: "row", md: "row" }}
                    spacing={{ xs: 1, sm: 4, md: 6 }}
                    key={index}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row", md: "row" }}
                      spacing={{ sm: 3, md: 6, sm: 4 }}
                      padding={{ sm: 1, md: 1, sm: 1 }}
                      alignContent="center"
                      mt={4}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          "& > :not(style)": {
                            m: 1,
                            width:220,
                            height:240,
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
                            padding:"0px",
                            backgroundColor: `${
                              data.defaultTemp === true
                                ? "rgba(0, 45, 227, 0.55)"
                                : ""
                            }`,
                          }}
                        >
                          <Stack
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                          >
                            {data?.logoAlignment === "left-top" ? (
                              <img
                                src={data?.url}
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  marginRight: "10px",
                                }}
                              ></img>
                            ) : (
                              ""
                            )}
                            <Typography
                              sx={{
                                fontSize: "15px",
                                marginLeft: "10px",
                              }}
                            >
                              {data.header}
                            </Typography>
                            {data?.logoAlignment === "right-top" ? (
                              <img
                                src={data?.url}
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  marginLeft: "10px",
                                }}
                              ></img>
                            ) : (
                              ""
                            )}
                          </Stack>
                          <IconButton
                            sx={{
                              fontSize: "10px",
                            }}
                          >
                            {data.defaultTemp === true ? (
                              <DoneOutlineOutlinedIcon
                                sx={{
                                  fontSize: "15px",
                                  marginRight: "12px",
                                }}
                              />
                            ) : (
                              ""
                            )}

                            {data.defaultTemp === true ? "Default" : ""}
                          </IconButton>
                          
                          <Typography sx={{ fontSize: "10px", color: "green" }}>
                            {data.name}
                          </Typography>
                          <Stack
                          flexDirection={'row'}
                          justifyContent={'space-between'}
                          >
                          {data?.logoAlignment === "left-bottom" ? (
                              <img
                                src={data?.url}
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  marginRight: "10px",
                                }}
                              ></img>
                            ) : (
                              ""
                            )}
                          <Typography>{data.footer}</Typography>
                          {data?.logoAlignment === "right-bottom" ? (
                              <img
                                src={data?.url}
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  marginLeft: "10px",
                                }}
                              ></img>
                            ) : (
                              ""
                            )}
                          </Stack>
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
                            onClick={() => {
                              handleDeleteModel(data);
                            }}
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
                            onClick={() => {
                              changeDefaultTemplate(data._id);
                            }}
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
      <DeleteConfirmationModel
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default ReportTemplateManagement;
