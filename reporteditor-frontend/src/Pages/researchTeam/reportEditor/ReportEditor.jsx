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
import React from "react";
import { styled } from "@mui/material/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import SideBar from "./component/SideBar";
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
  const [expanSidePanel,setExpandSidePanel]= React.useState();
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
          padding: "0px 36px 5px 45px",
        }}
      >
        <Grid container spacing={0}>
          <Grid
            item
            sm={4}
            md={2}
            sx={{
              minHeight: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.19)",
              paddingTop:"30px",
              zIndex:"50",
             
            }}
          >
            <Stack
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
              >Indexing</Typography>
              <SideBar />
            </Stack>
          </Grid>
          <Grid
            item
            sm={8}
            md={10}
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
