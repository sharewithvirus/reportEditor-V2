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
import { Box } from "@mui/system";
import React, { useContext, useEffect, useRef, useState } from "react";
import moment from 'moment'
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import SideBar from "./component/SideBar";
import { Link } from "react-router-dom";
// import Editor from "./component/Editor";
import { saveSubtopics, updateSubtopics } from "../../../Services/chapterServices";
import { UserDataContext } from "../../../context/userContext";
import { getReportDataById } from "../../../Services/reportServices";
import Editor from "./component/Editor";
import EditorModal from "./component/EditorModal";
import ReportEditiorFile from './component/ReportEditorFile';
function ReportEditor() {
  const { id } = useParams();
  const { setIsLoading } = useContext(UserDataContext);
  const [reportData, setReportData] = useState();
  const [open, setOpen] = useState(false);
  const [editorState, setEditorState] = useState(false);
  const handleShow = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const [activeTopicData, setActiveTopicData] = useState({});
  const [openSnack, setopenSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState();
  const date = new Date();
  const [expanSidePanel, setExpandSidePanel] = useState({
    left: 4,
    right: 8,
  });
  const ref = useRef(null);
  const getReportData = async () => {
    setIsLoading(true)
    const res = await getReportDataById(id);
    if(res.status === 200)
    {
      if(res.data.reportData.subTopics.length == 0){
        setOpen(true);
        setEditorState(true);
      }
      setIsLoading(false)
      setReportData(res.data.reportData);
    }
  };
  const handleSnack = () => {
    setopenSnack(!openSnack);
  };
  const saveTopicsData = async (data) => {
    setIsLoading(true);
    const res = await saveSubtopics(data);
    if (res.status === 200) {
      setSeverity("success");
      setSnackMsg("Added Successfully !");
      setopenSnack(true);
      handleShow();
      getReportData();
      setIsLoading(false);
      console.log("success");
    }
    else{
      setSeverity("error");
      setSnackMsg("Something went Wrong !");
      setopenSnack(true);
    }
  };
  const saveHtmlData = async (data) =>{
    const res = await updateSubtopics(data);
    if(res.status === 200){
      getReportData();
    }
  }
const ativeDataSet = (data) =>{
  setActiveTopicData(data);
}
useEffect(()=>{
  getReportData();
},[])
  return (
    <>
      <Snackbar open={openSnack} autoHideDuration={5000} onClose={handleSnack}>
        <Alert onClose={handleSnack} severity={severity} sx={{ width: "100%" }}>
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
                justifyContent: "space-between",
              }}
            >
              {reportData ? (
                <SideBar
                  subTopicList={
                    reportData.subTopics ? reportData.subTopics : ""
                  }
                  getReportDataText={getReportData}
                  
                  ativeDataSet = {(x) => {
                    // console.log(x)
                    ativeDataSet(x)
                    }}
                />
              ) : (
                ""
              )}
              <Stack mt={8}>
                <Stack alignContent="center" alignItems="center">
                  <Typography variant="body2">Author: Vikas</Typography>
                  <Typography variant="body2">
                    Base Year : {reportData ? reportData.baseYear : ""}
                  </Typography>
                  <Typography variant="body2">
                    Forecast Year :{reportData ? reportData.forecastYear : ""}
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
                  <b>Last Saved :</b> <span>{activeTopicData ? moment(activeTopicData.updatedAt).format('Do MMM YYYY  , h:mm:ss A'):""} </span>
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
                  <b>Editing : </b> <span> {activeTopicData? activeTopicData.subTopicName:""}</span>
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
                <Editor activeTopicData = {activeTopicData ? activeTopicData : ''} saveHtmlData = {(x)=>saveHtmlData(x)} editorState={editorState} />
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
                  <TextField
                    placeholder="search here"
                    variant="outlined"
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
