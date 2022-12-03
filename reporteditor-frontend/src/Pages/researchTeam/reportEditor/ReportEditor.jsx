import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import React, { useContext, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import {useParams} from 'react-router-dom';
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import SideBar from "./component/SideBar";
import { Link } from "react-router-dom";
import Editor from "./component/Editor";
import { getSubtopicsByReportId, saveSubtopics } from "../../../Services/chapterServices";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditorModal from "./component/EditorModal";
import { UserDataContext } from "../../../context/userContext";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  height: "3vh",
  color: theme.palette.text.secondary,
  border: "1px solid",
}));
function ReportEditor() {
  const {setIsLoading} = useContext(UserDataContext);
  const {id} = useParams();
  const [topicData , setTopicData]=useState();
  const [open, setOpen] = useState(false);
  const handleShow = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const [expanSidePanel, setExpandSidePanel] = React.useState({
    left: 4,
    right: 8,
  });
  const ref = useRef(null);
  
  const [width, setWidth] = useState(0);
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

  useEffect(() => {
    // console.log("v" + ref.current.clientWidth);
    setTimeout(() => {
      // setWidth(ref.current.clientWidth);
    }, 150);
  }, [expanSidePanel]);
  
  const [active, setActive] = React.useState({
    first: "transparent",
    second: "transparent",
    third: "transparent",
  });
  const changeActiveBtn = (e) => {
    if (e === 1) {
      setActive({ first: "grey", second: "transparent", third: "transparent" });
    } else if (e === 2) {
      setActive({ second: "grey", third: "transparent", first: "transparent" });
    } else if (e === 3) {
      setActive({ third: "grey", first: "transparent", second: "transparent" });
    }
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const saveTopicsData = async (data) => {
    setIsLoading(true);
   const res = await saveSubtopics(data);
   if(res.status === 200)
   {
    handleShow();
    setIsLoading(false);
    console.log("success");
   }
  };
  const getReportChaptersData = async (id) => {
    const res = await getSubtopicsByReportId(id);
  }
  return (
    <>
        <EditorModal open={open} handleOpen={handleShow} handleClose={handleShow} saveData={saveTopicsData} reportId={id}/>
      <Box
        sx={{
          padding: "0px 36px 5px 30px",
        }}
      >
        <Grid container spacing={0}>
          <Grid
            item
            md={expanSidePanel.left}
            sx={{
              minHeight: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.12)",
              paddingTop: "30px",
              transition: "0.3s",
              zIndex: "50",
            }}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
          >
            <Stack
              // ref={ref}
              justifyContent="center"
              alignItems="center"
            >
              <Button onClick={()=>handleShow()}>
                <Typography>ADD Chapter</Typography>
                <AddOutlinedIcon />
              </Button>
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                overflowY: "auto",
                height: "600px",
              }}
            >
              {/* {width && <SideBar scrWidth={width} />} */}
              <SideBar />
            </Stack>

            <Stack 
            mt={2}
            >
              <Stack
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "8px",
                  }}
                >
                  Author: Vikas
                  <br />
                  Base Year: 2020
                  <br />
                  Forecast Year: 2028
                  <br />
                  Template Two
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
                    ABCD Market
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
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="small"
                    sx={{
                      width: "70%",
                      margin: "auto",
                    }}
                  >
                    Search Here
                  </Button>
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
                    width: "80%",
                    margin: "10px  auto",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <ButtonGroup size="small" sx={{}}>
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{
                        width: "120px",
                        backgroundColor: `${active.first}`,
                      }}
                      onClick={() => changeActiveBtn(1)}
                    >
                      Images
                    </Button>
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{
                        width: "120px",
                        backgroundColor: `${active.second}`,
                      }}
                      onClick={() => changeActiveBtn(2)}
                    >
                      Tables
                    </Button>
                    <Button
                      variant="contained"
                      color="inherit"
                      sx={{
                        width: "120px",
                        backgroundColor: `${active.third}`,
                      }}
                      onClick={() => changeActiveBtn(3)}
                    >
                      Charts
                    </Button>
                  </ButtonGroup>
                </Stack>

                <Stack
                  sx={{
                    padding: "10px",
                  }}
                >
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    {Array.from(Array(6)).map((_, index) => (
                      <Grid item sm={4} md={4} key={index}>
                        <Item square color="inherit"></Item>
                      </Grid>
                    ))}
                  </Grid>
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
