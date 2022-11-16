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

import AddBoxIcon from "@mui/icons-material/AddBox";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
function ReportEditor() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        sx={{
          padding: "15px 36px 5px 45px",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            sm={4}
            md={2}
            sx={{
              minHeight: "100vh",
              backgroundColor: "grey",
              padding: "0 px",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Indexing</Typography>
            </Stack>

            <List
              sx={{
                bgcolor: "background.paper",
              }}
            >
              <ListItemButton onClick={handleClick}>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Inbox" />
                <AddBoxIcon />
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
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
              marginTop:"20px",
              
              minHeight:"100vh",
              display:"flex",
              flexDirection:"row"
            }}
            >
              <Stack
              sx={{
                width:"60%",
                border:"5px solid",
                height:"100vh"
              }}
              >

              </Stack>
              <Stack
              sx={{
                width:"40%",
                border:"5px solid",
                height:"100vh"
              }}
              >
                <Stack
                sx={{
                  marginTop:"10px"
                }}
                >
                  <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  sx={{
                    width:"70%",
                    margin:"auto"
                  }}
                  >
                    Search Here
                  </Button>
                </Stack>
                <Stack
                sx={{
                  border:"1px solid",
                  width:"90%",
                  margin:"10px auto",
                  height:'20vh'
                }}
                >

                </Stack>
                <Stack sx={{
                  width:"80%",
                  margin:"10px  auto",
                  display:"flex",
                  flexDirection:"row",
                  justifyContent:"center"
                }}>
                  <ButtonGroup size="small"  sx={{
                  }} >
                    <Button
                    sx={{
                      width:"120px"
                    }}
                    >Images</Button>
                    <Button
                     sx={{
                      width:"120px"
                    }}
                    >Tables</Button>
                    <Button
                     sx={{
                      width:"120px"
                    }}
                    >Charts</Button>
                  </ButtonGroup>
                </Stack>
                <Stack
                sx={{

                }}
                >
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
