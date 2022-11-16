import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Modal,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "4%",
};

function UpdateModal({ open, handleClose }) {
  // const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack
              sx={{
                marginBottom: "30px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                }}
              >
                Power Line Communincation (PLC) market size by Offering (softwar
                [Equity Management],Data Acquisition and)
              </Typography>
            </Stack>
            <Divider />
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <Typography
                  sx={{
                    borderBottom: "1px solid",
                    padding: "5px",
                    fontSize:"15px"
                  }}
                >
                  Report Access
                </Typography>
                <Box sx={{
                    marginTop:"5px"
                }}>
                  <FormGroup sx={{ fontSize: "10px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox defaultChecked color="default" size="small" />
                      }
                      label={
                        <span style={{ fontSize: "0.7rem" }}>Vikash [me] </span>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox color="default" size="small" />}
                      label={
                        <span style={{ fontSize: "0.7rem" }}>
                          Nikhil Changle{" "}
                        </span>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox color="default" size="small" />}
                      label={
                        <span style={{ fontSize: "0.7rem" }}>
                          Uttreswar More{" "}
                        </span>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox color="default" size="small" />}
                      label={
                        <span style={{ fontSize: "0.7rem" }}>Panka K</span>
                      }
                    />
                  </FormGroup>
                </Box>
              </Stack>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <Typography
                  sx={{
                    borderBottom: "1px solid",
                    padding: "5px",
                    fontSize:"15px"
                  }}
                >
                  Edit Log
                </Typography>
              </Stack>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack 
              sx={{
                marginTop:"40px",
                display:"flex",
                justifyContent:"center"
              }}
              >
                <Box sx={{}}>
                  <FormGroup sx={{ fontSize: "10px" }}>
                    <FormControlLabel
                      control={<Checkbox color="default" size="small" />}
                      label={
                        <span style={{ fontSize: "0.7rem" }}> Validate </span>
                      }
                    />
                  </FormGroup>
                </Box>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(0, 194, 255, 1)",
                    width:"10vw"
                  }}
                >
                  Update
                </Button>
              </Stack>
              <Stack
              sx={{
                display:"flex",
                justifyContent:"end"
              }}
              >
                <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={handleClose}
                >
                    Close this Window
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default UpdateModal;
