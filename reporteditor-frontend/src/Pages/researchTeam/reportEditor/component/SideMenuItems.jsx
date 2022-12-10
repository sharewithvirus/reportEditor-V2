import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useEffect, useRef, useState } from "react";
import { deleteChapters, getSubtopic, saveSubtopics, updateSubtopics, updateSubtopicsData } from "../../../../Services/chapterServices";
import EditorModal from "./EditorModal";
import { UserDataContext } from "../../../../context/userContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

function SideMenuItems({ clWidth, item, preIndex, index , getReportDataText1 , ativeDataSet,active}) {
  // console.log(getReportDataText1);
  const { setIsLoading } = useContext(UserDataContext);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleShow = () => setOpen(!open);
  const [openSnack, setopenSnack] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [snackMsg, setSnackMsg] = useState("");
  const [delId, setDelId] = useState("");
  const [editId, setEditId] = useState("");
  const saveTopicsData = async (data) => {
    setIsLoading(true);
    console.log(data)
    const res = await saveSubtopics(data);
    if (res.status === 200) {
      setSeverity("success");
      setSnackMsg("Chapter Added Successfully !");
      setopenSnack(true);
      handleShow();
      // console.log(getReportDataText1);
      getReportDataText1();
      setIsLoading(false);
    }
  };
  const handleDelete = (id) =>{
    // console.log("work");
    // console.log("dleid",id);
    setDelId(id);
    handleShow();
  }
  const deleteTopic = async (id) =>{
    console.log("Delete Id", id);
    const res = await deleteChapters(id);
    if(res.status === 200 )
    {
      console.log("deleted");
      setSeverity("success");
      setSnackMsg("Chapter Deleted !");
      setopenSnack(true);
      handleShow();
      // console.log(getReportDataText1);
      getReportDataText1();
      setIsLoading(false);
    }
  }
  const updateTopic = async (data)=>{
    console.log(data)
    const res = await updateSubtopicsData(data);
    if(res.status === 200)
    {
      setSeverity("success");
      setSnackMsg("Chapter Updated Successfully !");
      setopenSnack(true);
      handleShow();
      // console.log(getReportDataText1);
      getReportDataText1();
      setIsLoading(false);
      console.log("updated");
      
    }
  }
  const handleUpdate = (id) =>{
    console.log("...working");
    console.log("editId",id);
    setEditId(id);
    handleShow();
  }
 const handleClose = () =>{
  setEditId("");
  setDelId("");
  handleShow();

 }
  if(item.subTopics.length > 0){
   return ( 
        <>
        <EditorModal open={open} handleOpen={handleShow} handleClose={handleShow} saveData={(x) => saveTopicsData(x)} subTopicid={item._id} delId={delId} editId={editId} item={item} setEditId ={setDelId} setDelId={setDelId} deleteTopic ={(x)=>deleteTopic(x)} updateTopic = {(x)=>updateTopic(x)} />
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
                    <Typography
                    onClick={() =>ativeDataSet(item)}
                    >{preIndex ? `${preIndex}.${index}: `: `${index}: `}{`${item.subTopicName}`} </Typography>
                    <Box
                    
                    >
                      <ButtonGroup>
                        <IconButton onClick={()=>handleUpdate(item._id)} >
                            <SaveAsOutlinedIcon/>
                        </IconButton>
                        <IconButton onClick={()=>handleShow()}>
                            <AddCircleOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={()=>handleDelete(item._id)}>
                            <DeleteForeverIcon />
                        </IconButton>
                      </ButtonGroup>
                    </Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                {item.subTopics.map((item,index) => {
                     return <SideMenuItems item={item} preIndex={`${Number(index+1)}.${Number(index+1)}`} index={Number(index+1)} ativeDataSet = {(x) =>ativeDataSet(x)} getReportDataText1={getReportDataText1}/>
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
        <EditorModal open={open} handleOpen={handleShow} handleClose={handleShow} saveData={(x) => saveTopicsData(x)} subTopicid={item._id} delId={delId} editId={editId} item={item} setEditId ={setDelId} setDelId={setDelId} deleteTopic ={(x)=>deleteTopic(x)} updateTopic = {(x)=>updateTopic(x)}/>
          <Stack>
            <Accordion>
            <AccordionSummary
            
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack
                flexDirection="row"
              
                alignItems="center"
                >
                    <Typography
                     onClick={()=> ativeDataSet(item)}
               
                    >{preIndex ? `${preIndex}.${index}: `: `${index}: `}{`${item.subTopicName}`}</Typography>
                    <Box
                    >
                      <ButtonGroup>
                        <IconButton onClick={()=>handleUpdate(item._id)}>
                            <SaveAsOutlinedIcon/>
                        </IconButton>
                        <IconButton onClick={()=>handleShow()}>
                            <AddCircleOutlinedIcon/>
                        </IconButton>
                        <IconButton onClick={()=>handleDelete(item._id)}>
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
