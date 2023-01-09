import { Box, Typography, Stack, Button, Paper, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { useNavigate, useParams } from "react-router-dom";
import {
  getReportDataById,
  getReportPdf,
  getReportPreviewData,
} from "../../../Services/reportServices";
import moment from "moment";
import ReportPreivewTopicSection from "./ReportPreivewTopicSection";
import { useContext } from "react";
import UserContext, { UserDataContext } from "../../../context/userContext";
import { saveAs } from "file-saver";
function ReportPreview() {
  const { setIsLoading } = useContext(UserDataContext);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const getReportData = async () => {
    const res = await getReportPreviewData(id);
    console.log("Report Preview Response", res.data);
    console.log("report data", res.data.reportData.name);
    if (res.status === 200) {
      if (res.data.data) {
        setData(res.data);
      }
    }
  };

  // /////////////////////////////////////////////////////
  const printPdf = async () => {
    setIsLoading(true);
    console.log("getPdf is called...");
    const { data } = await getReportPdf(id);
    console.log(data);
    const file = new Blob([data], { type: "application/pdf" });
    saveAs(file, `report.pdf`);
    setIsLoading(false);
  };
  // ////////////////////////////////////////////////////
  useEffect(() => {
    if (id) {
      getReportData();
    }
  }, []);

  // console.log("DATA SUBTOPICS", data?.subTopics);
  return (
    <Box
      sx={{
        padding: "15px 50px 5px 50px",
        margin: "5px 50px 5px 50px",
      }}
    >
      <Stack>
        <Grid container spacing={1}>
          <Grid
            item
            md={2}
            sm={12}
            sx={{
              display: "flex",
            }}
          >
            <Stack justifyContent={"end"}>
              <Typography sx={{ fontSize: "10px" }}>
                <b>Last Saved:</b>{" "}
                {data
                  ? moment(data.updatedAt).format("Do MMM YYYY  , h:mm:ss A")
                  : "MM : YYYY , H:M:SS D"}
              </Typography>
            </Stack>
          </Grid>
          <Grid item md={8} sm={12} sx={{}}>
            <Stack justifyContent={"center"} alignItems="center">
              <Typography>
                <FileCopyOutlinedIcon
                  sx={{
                    marginRight: "10px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                />
                -{" "}
                <span style={{ fontSize: "18px" }}>
                  <b>Preview</b>
                </span>
              </Typography>
              <Typography
                sx={{ fontSize: "15px", fontWeight: "", textAlign: "center" }}
              >
                {data?.reportData?.name}
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            md={2}
            sm={12} 
            sx={{
              display: "flex",
              justifyContent: "end",
              flexDirection: "column",
            }}
          >
            <Stack flexDirection="row" justifyContent="space-around">
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                sx={{ fontSize: "8px" }}
                onClick={() => printPdf()}
                // onClick={()=>window.print()}
              >
                Export to PDF
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                sx={{ fontSize: "8px" }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back to Editor Panel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <Stack
        sx={{
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "5px",
          marginTop: "20px",
          // height: "100vh",
          // overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              margin: "auto",
              p: 4,
              textAlign: "justify",
              width: "50vw",
            },
            img: {
              width: "80%",
            },
          }}
        >
          <Paper elevation={3} square>
            {/* <Stack justifyContent={"space-between"} direction="row">
              <Typography variant="caption">
                <b>Last Update : </b>{" "}
                <b>{data
                  ? moment(data.updatedAt).format("Do MMM YYYY  , h:mm:ss A")
                  : ""}</b>
              </Typography>
            </Stack> */}
            <Stack alignItems={"center"}>
              <Typography variant="body1">{data?.reportData?.name}</Typography>
              <Typography variant="caption">
                <b>Editor Name : </b> {data?.reportData?.userList}
              </Typography>
            </Stack>
            <Stack
              mt={2}
              sx={{
                minHeight: "842px",
                width: "100%",
              }}
            >
              {data ? (
                <ReportPreivewTopicSection dataToDisplay={data?.data} />
              ) : (
                ""
              )}
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}

export default ReportPreview;
