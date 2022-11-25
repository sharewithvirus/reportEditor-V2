import {
  Button,
  ButtonGroup,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import SideBar from "./component/SideBar";
import { Link } from "react-router-dom";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  height: "3vh",
  color: theme.palette.text.secondary,
  border: "1px solid",
}));
function ReportEditor() {
  const [open, setOpen] = React.useState(true);
  const [expanSidePanel, setExpandSidePanel] = React.useState({
    left: 1,
    right: 11,
  });
  const ref = useRef(null);

  const [width, setWidth] = useState(0);
  // useEffect(() => {
  //   setWidth(ref.current.clientWidth);
  //   console.log(ref.current.parentElement.clientWidth);
  // }, []);
  const handleMouseEnter = () => {
    setExpandSidePanel({ left: 4, right: 8 });
    // setWidth(ref.current.clientWidth);
    // console.log("on mouse enter", ref.current.clientWidth);
  };
  const handleMouseLeave = () => {
    setExpandSidePanel({ left: 1, right: 11 });
    // console.log("value" + ref.current.clientWidth);
    // setWidth(ref.current.clientWidth);
    // console.log("on mouse leave", ref.current.clientWidth);
  };
  useEffect(() => {
    console.log("v"+ref.current.clientWidth);
    setTimeout(() => {
      setWidth(ref.current.clientWidth);
      
    }, 230);
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

  return (
    <>
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Stack
              ref={ref}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  marginBottom: "25px",
                }}
              >
                Indexing
              </Typography>
              {width && <SideBar scrWidth={width} />}
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
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
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
                <Link to = "/u_control/report-preview" >
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
              ></Stack>
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
