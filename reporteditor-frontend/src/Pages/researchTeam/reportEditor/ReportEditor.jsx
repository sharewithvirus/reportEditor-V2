import {
  Alert,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import SideBar from "./component/SideBar";
import { Link } from "react-router-dom";
import {
  saveSubtopics,
  updateSubtopics,
} from "../../../Services/chapterServices";
import { UserDataContext } from "../../../context/userContext";
import { getReportDataById } from "../../../Services/reportServices";
import Editor from "./component/Editor";
import EditorModal from "./component/EditorModal";
import ReportEditiorFile from "./component/ReportEditorFile";
import isOnline from "is-online";
function ReportEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setIsLoading } = useContext(UserDataContext);
  const [reportData, setReportData] = useState();
  const [open, setOpen] = useState(false);
  // const [editorState, setEditorState] = useState(false);
  const handleShow = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const [activeTopicData, setActiveTopicData] = useState({});
  const [openSnack, setopenSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");
  const [internetStatus, setInternetStatus] = useState(true);
  const date = new Date();
  const getReportData = async () => {
    setIsLoading(true);
    const res = await getReportDataById(id);
    if (res.status === 200) {
      if (res.data.reportData.subTopics.length == 0) {
        setOpen(true);
        // setEditorState(true);
      }
      setIsLoading(false);
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
    } else {
      setSeverity("error");
      setSnackMsg("Something went Wrong !");
      setopenSnack(true);
    }
  };
  const saveHtmlData = async (data) => {
    console.log("Editor Data", data);
    console.log("topicData", activeTopicData);
    const res = await updateSubtopics(data);
    if (res.status === 200) {
      console.log("Updated Topic Data", res.data.topic);
      setActiveTopicData(res.data.topic);
      getReportData();
    }
  };
  const ativeDataSet = (data) => {
    setActiveTopicData(data);
  };
  useEffect(() => {
    getReportData();
  }, []);
  useEffect(() => {
    setInterval(async () => {
      const intStatus = await isOnline();
      if (intStatus !== internetStatus) {
        setInternetStatus(intStatus);
      }
    }, 5000);
  }, [internetStatus]);
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
        <Grid container spacing={0} mt={5}>
          <Grid
            item
            md={4}
            sm={2}
            display="flex"
            justifyContent="end"
            flexDirection="column"
            alignItems="center"
          >
            <Button onClick={() => handleShow()}>
              <Typography>ADD Chapter</Typography>
              <AddOutlinedIcon />
            </Button>
          </Grid>
          <Grid
            item
            md={5}
            sm={5}
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Stack  justifyContent="center" alignItems="center"
            
            >
              <Stack
                flexDirection="row"
                justifyContent="center"
                alignContent="center"
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
                fontSize:"15px"
              }}>
                <b>Status :</b> <span>
                  {internetStatus ? "online" : "offline"}
                </span>
              </Typography>
            </Stack>
              <Stack>
              <Typography
                sx={{
                  fontSize: "12px",
                }}
              >
                <b>Editing : </b>
                <span>
                  {activeTopicData ? activeTopicData.subTopicName : ""}
                </span>
              </Typography>
              </Stack>
          </Grid>
          <Grid
            item
            md={3}
            sm={5}
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Stack>
              <Typography
                sx={{
                  fontSize: "12px",
                }}
              >
                <b>Last Saved :</b>
                <span>
                  {activeTopicData
                    ? moment(activeTopicData.updatedAt).format(
                        "Do MMM YYYY  , h:mm:ss A"
                      )
                    : ""}
                </span>
              </Typography>
            </Stack>
            <Stack>
              {reportData ? (
                <Link to={`/u_control/report-preview/${reportData._id}`}>
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
              ) : (
                ""
              )}
            </Stack>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            border: "1px solid",
          }}
        >
          <Grid item md={3} sm={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "700px",
                // backgroundColor: "rgba(0,0,0,0.3)",
              }}
            >
              {reportData ? (
                <SideBar
                  subTopicList={
                    reportData.subTopics ? reportData.subTopics : ""
                  }
                  getReportDataText={getReportData}
                  ativeDataSet={(x) => {
                    ativeDataSet(x);
                  }}
                />
              ) : (
                ""
              )}
              <Stack mt={8}>
                <Stack alignContent="center" alignItems="center">
                  <Typography variant="body2">Author: {"vikas"}</Typography>
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
          <Grid item md={6} sm={9}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "700px",
                borderLeft: " 1px solid",
                borderRight: " 1px solid",
                overflow: "auto",
              }}
            >
              {internetStatus && activeTopicData ? (
                <Editor
                  activeTopicData={activeTopicData ? activeTopicData : ""}
                  saveHtmlData={(x) => saveHtmlData(x)}
                  editorState={true}
                />
              ) : (
                <Editor
                  activeTopicData={activeTopicData ? activeTopicData : ""}
                  saveHtmlData={(x) => saveHtmlData(x)}
                  editorState={false}
                />
              )}
            </Box>
          </Grid>
          <Grid item md={3} sm={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                height: "700px",
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
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <ReportEditiorFile />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ReportEditor;
