import {
  Alert,
  Button,
  ButtonGroup,
  Grid, Paper,
  Snackbar,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserDataContext } from "../../../context/userContext";
import {
  saveSubtopics
} from "../../../Services/chapterServices";
import { getReportDataById } from "../../../Services/reportServices";
import Editor from "./component/Editor";
import EditorModal from "./component/EditorModal";
import ReportEditiorFile from './component/ReportEditorFile';
import SideBar from "./component/SideBar";

function ReportEditor() {
  const { id } = useParams();
  const { setIsLoading } = useContext(UserDataContext);
  const [reportData, setReportData] = useState();
  const [open, setOpen] = useState(false);
  const handleShow = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const [openSnack, setopenSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState("images");
  const [expanSidePanel, setExpandSidePanel] = useState({
    left: 4,
    right: 8,
  });
  const ref = useRef(null);

  // useEffect(() => {
  //   setWidth(ref.current.clientWidth);
  //   console.log(ref.current.parentElement.clientWidth);
  // }, []);
  // const handleMouseEnter = () => {
  //   setExpandSidePanel({ left: 4, right: 8 });
  //   // setWidth(ref.current.clientWidth);
  //   // console.log("on mouse enter", ref.current.clientWidth);
  // };
  // const handleMouseLeave = () => {
  //   setExpandSidePanel({ left: 1, right: 11 });
  //   // console.log("value" + ref.current.clientWidth);
  //   // setWidth(ref.current.clientWidth);
  //   // console.log("on mouse leave", ref.current.clientWidth);
  // };

  const getReportData = async () => {
    const res = await getReportDataById(id);
    // console.log("....report",res.data.reportData);
    setReportData(res.data.reportData);
  }
  console.log("..rdata", reportData);
  useEffect(() => {
    // console.log(id)
    getReportData();
    // console.log("v" + ref.current.clientWidth);
    // setTimeout(() => {
    //   // setWidth(ref.current.clientWidth);
    // }, 150);
  }, [expanSidePanel]);


  const handleSnack = () => {
    setopenSnack(!openSnack);
  };
  const saveTopicsData = async (data) => {
    setIsLoading(true);
    const res = await saveSubtopics(data);
    if (res.status === 200) {
      setSeverity("success");
      setSnackMsg("Chapter Added Successfully !");
      setopenSnack(true);
      handleShow();
      setIsLoading(false);
      console.log("success");
    }
  };
  // const getReportChaptersData = async (id) => {
  //   const res = await getSubtopicsByReportId(id);
  // };
  console.log(snackMsg);
  console.log(severity);
  return (
    <>
      <Snackbar open={openSnack} autoHideDuration={5000} onClose={handleSnack}>
        <Alert onClose={handleSnack} severity="success" sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
      <EditorModal
        open={open}
        handleOpen={handleShow}
        handleClose={handleShow}
        saveData={saveTopicsData}
        reportId={id}
      />
      <Box
        sx={{
          padding: "0px 36px 5px 30px",
        }}
      >
        <Grid container spacing={0}>
          <Grid
            item
            md={expanSidePanel.left}
            display="flex"
            justifyContent="start"
            flexDirection="column"
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          >

            <Stack mt={5}>
              <Button onClick={() => handleShow()}>
                <Typography>ADD Chapter</Typography>
                <AddOutlinedIcon />
              </Button>
            </Stack>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <SideBar reportData={reportData} />
              <Stack mt={8}>
                <Stack alignContent="center"

                  alignItems="center"
                >
                  <Typography variant="body2">
                    Author: Vikas
                  </Typography>
                  <Typography variant="body2">
                    Base Year : {reportData ? reportData.baseYear : ""}
                  </Typography>
                  <Typography variant="body2">
                    Forecast Year :{reportData ? reportData.forecastYear : ""}
                  </Typography>
                  <Typography variant="body2">
                    Template : 2
                  </Typography>
                </Stack>

                <Button
                  size="small"
                  variant="contained"
                  color="info"
                  sx={{
                    fontSize: "0.5rem",
                    marginTop: "10px",
                  }}
                >
                  Forward to Editin
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="inherit"
                  sx={{
                    fontSize: "0.5rem",
                    marginTop: "10px",
                  }}
                >
                  Finish Research Draft
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid
            item
            md={expanSidePanel.right}
            sx={{
              minHeight: "100vh",
            }}
          >
            <Stack
              flexDirection={{ md: "row", sm: "row" }}
              justifyContent="space-between"
              mt={2}
              pl={2}
              pr={2}
            >
              <Stack
                sx={{
                  marginRight: "100px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  <b>Last Saved :</b> <span> 12:00 PM</span>
                </Typography>
              </Stack>
              <Stack display="flex" justifyContent="center" alignItems="center">
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",

                    alignContent: "center",
                  }}
                >
                  <FileCopyOutlinedIcon
                    sx={{
                      fontSize: "22px",
                    }}
                  />
                  <Typography sx={{ fontSize: "16px", fontWeight: "" }}>
                    {reportData ? reportData.name : ""}
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  <b>Editing :</b> <span> Chapter 1</span>
                </Typography>
              </Stack>
              <Stack>
                <Link to="/u_control/report-preview">
                  <Button
                    color="inherit"
                    variant="outlined"
                    size="small"
                    sx={{
                      height: "3vh",
                    }}
                  >
                    Preview
                  </Button>
                </Link>
              </Stack>
            </Stack>
            <Stack
              sx={{
                marginTop: "20px",

                minHeight: "100vh",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Stack
                sx={{
                  width: "60%",
                  border: "5px solid",
                  height: "100vh",
                }}
              >
                <Editor saveTopicsData={saveTopicsData} />
              </Stack>
              <Stack
                sx={{
                  width: "40%",
                  border: "5px solid",
                  height: "100vh",
                }}
              >
                <Stack
                  sx={{
                    marginTop: "10px",
                  }}
                  alignItems="center"
                >
                  <TextField placeholder="search here" variant="outlined"
                    //  size="small"
                    sx={{
                      width: "90%",
                      textAlign: "center",

                    }}

                  />
                </Stack>
                <Stack
                  sx={{
                    border: "1px solid",
                    width: "90%",
                    margin: "10px auto",
                    height: "20vh",
                  }}
                ></Stack>

                <Stack
                  sx={{
                    width: "90%",
                    margin: "10px  auto",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <ReportEditiorFile />
                </Stack>


              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ReportEditor;
