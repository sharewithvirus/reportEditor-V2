import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useEffect, useRef, useState } from "react";
import { getSubtopic, saveSubtopics } from "../../../../Services/chapterServices";
import EditorModal from "./EditorModal";
import { UserDataContext } from "../../../../context/userContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

function SideMenuItems({ clWidth, item, preIndex, index , getReportData , ativeDataSet,active}) {
  const { setIsLoading } = useContext(UserDataContext);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleShow = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const [openSnack, setopenSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");
  const saveTopicsData = async (data) => {
    setIsLoading(true);
    console.log(data)
    const res = await saveSubtopics(data);
    if (res.status === 200) {
      setSeverity("success");
      setSnackMsg("Chapter Added Successfully !");
      setopenSnack(true);
      handleShow();
      setIsLoading(false);
     
    }
  };

  if(item.subTopics.length > 0){
   return ( 
        <>
        <EditorModal open={open} handleOpen={handleShow} handleClose={handleShow} saveData={(x) => saveTopicsData(x)} subTopicid={item._id}/>
          <Stack>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"             
                >
                    {/* <Typography>{clWidth>200 ? `chapter ${preIndex}`:{preIndex}} </Typography> */}
                    {/* <Typography>{preIndex} </Typography> */}
                    <Typography
                    onClick={() =>ativeDataSet(item)}
                    // onClick={()=>alert("heyy!!!")}
                    >{preIndex ? `${preIndex}.${index}: `: `${index}: `}{`${item.subTopicName}`} </Typography>
                    <Box
                    
                    >
                      <ButtonGroup>
                        <IconButton>
                            <SaveAsOutlinedIcon/>
                        </IconButton>
                        <IconButton onClick={()=>handleShow()}>
                            <AddCircleOutlinedIcon />
                        </IconButton>
                        <IconButton>
                            <DeleteForeverIcon/>
                        </IconButton>
                      </ButtonGroup>
                    </Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                {item.subTopics.map((item,index) => {
                     return <SideMenuItems item={item} preIndex={`${Number(index+1)}.${Number(index+1)}`} index={Number(index+1)} ativeDataSet = {(x) =>ativeDataSet(x)} />
                })}
              </AccordionDetails>
            </Accordion>
          </Stack>
        </>)

  }
  else
  {
     return ( 
        <>        
        <EditorModal open={open} handleOpen={handleShow} handleClose={handleShow} saveData={(x) => saveTopicsData(x)} subTopicid={item._id}/>
          <Stack>
            <Accordion>
            <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack
                flexDirection="row"
                // justifyContent="space-between"
                alignItems="center"
                >
                    <Typography
                     onClick={()=> ativeDataSet(item)}
                    // onClick={()=>alert("heyy!!!")}
                    >{preIndex ? `${preIndex}.${index}: `: `${index}: `}{`${item.subTopicName}`}</Typography>
                    <Box
                    >
                      <ButtonGroup>

                        <IconButton>
                            <SaveAsOutlinedIcon/>
                        </IconButton>
                        <IconButton onClick={()=>handleShow()}>
                            <AddCircleOutlinedIcon/>
                        </IconButton>
                        <IconButton>
                            <DeleteForeverIcon/>
                        </IconButton>
                      </ButtonGroup>
                    </Box>
                </Stack>
              </AccordionSummary>
            </Accordion>
          </Stack>
        </>)
  }
}

export default SideMenuItems;
