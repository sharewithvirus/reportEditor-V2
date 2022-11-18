import { Box, Stack } from "@mui/system";
import React from "react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";

function DraftAccept() {
  return (
    <>
      <Box
        sx={{
          padding: "15px 50px 5px 50px",
          margin: "5px 50px 5px 50px",
        }}
      >
        <Stack>
          <Container
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Stack
              display="flex"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
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
                  Draft Accept Validation
                </Typography>
              </Stack>
            </Stack>
            <Paper
              elevation={3}
              sx={{ mt: 1, p: 4, width: "100%", minHeight: "40vh" }}
            >
              <Stack>
                <Typography variant="body2">
                  Power Line Communication (PLC) Market Size By Offering
                  (Software [Energy Management, Data Acquisition and
                </Typography>
                <Typography variant="caption">
                  Author: Nikhil, Vikas, Uttareshwa
                </Typography>
                <Typography variant="caption" display="block">
                  Author: Nikhil, Vikas, Uttareshwa
                </Typography>
              </Stack>
              <Stack display="flex" justifyContent="start" flexDirection="row">
                <Typography component="caption" variant="body2" mt={2}>
                  Editing Team
                </Typography>
                <FormGroup
                  sx={{
                    fontSize: "10px",
                    marginLeft: "30px",
                    marginTop: "8px",
                  }}
                >
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
                    label={<span style={{ fontSize: "0.7rem" }}>Panka K</span>}
                  />
                </FormGroup>
              </Stack>
              <Stack>
                <FormGroup
                  sx={{
                    fontSize: "10px",
                   marginTop:'20px'
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox color="default" size="small" />
                    }
                    label={
                      <span style={{ fontSize: "0.7rem" }}>Above information validated</span>
                    }
                  />
                </FormGroup>
              </Stack>
              <Stack
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
                mt={2}
              >
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  
                  sx={{
                    fontSize: "10px",paddingX:"50px",backgroundColor:"rgba(14, 176, 168, 1)"
                  }}
                >
                  Draft Record
                </Button>

                <Button
                  variant="contained"
                  color="inherit"
                  size="small"
                  sx={{
                    fontSize: "10px",paddingX:"40px",border:"1px solid"
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Paper>
          </Container>
        </Stack>
      </Box>
    </>
  );
}

export default DraftAccept;
