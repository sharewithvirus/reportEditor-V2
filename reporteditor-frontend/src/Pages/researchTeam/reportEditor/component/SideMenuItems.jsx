import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useEffect, useRef, useState } from "react";
import { getSubtopic, saveSubtopics } from "../../../../Services/chapterServices";
import EditorModal from "./EditorModal";
function SideMenuItems({ clWidth, itemNo , item, preIndex }) {
  const [open, setOpen] = React.useState(false);
  const handleShow = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  // const [subtopic , setSubtopic] = useState();
  // const getSubtopicData = async() =>{
  //   const res = await getSubtopic();
  //   // console.log("status...",res);
  //   if(res.status === 200)
  //   {
  //     setSubtopic(res.data.topicList)
  //     console.log("name....", res.data.topicList);
  //   }
  // }
  
  useEffect(() =>{
    // getSubtopicData();
  },[])
  // console.log(clWidth);
  if(item.length>1)
  
  {
   return ( 
        <>
        <EditorModal open={open} handleOpen={handleShow} handleClose={handleShow}/>
          <Stack>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack
                flexDirection="row"
                // justifyContent="space-between"
                alignItems="center"
                
               
                >
                    {/* <Typography>{clWidth>200 ? `chapter ${preIndex}`:{preIndex}} </Typography> */}
                    {/* <Typography>{preIndex} </Typography> */}
                    <Typography>Chapter.{preIndex} </Typography>

                    <Box 
                   
                    >
                        <IconButton>
                            <SpellcheckOutlinedIcon/>
                        </IconButton>
                        <IconButton onClick={()=>handleShow()}>
                            <AddCircleOutlinedIcon />
                        </IconButton>
                        <IconButton>
                            <DeleteForeverIcon/>
                        </IconButton>
                    </Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                {item.map((item,index)=>{
                     return <SideMenuItems item={item} preIndex={Number(index + 1)}/>
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
        <EditorModal open={open} handleOpen={handleShow} handleClose={handleShow}/>
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
                    <Typography>Chapter {preIndex}</Typography>
                    <Box
                   
                    >
                        <IconButton>
                            <SpellcheckOutlinedIcon/>
                        </IconButton>
                        <IconButton onClick={()=>handleShow()}>
                            <AddCircleOutlinedIcon/>
                        </IconButton>
                        <IconButton>
                            <DeleteForeverIcon/>
                        </IconButton>
                    </Box>
                </Stack>
              </AccordionSummary>
            </Accordion>
          </Stack>
        </>)

  }
}

export default SideMenuItems;
