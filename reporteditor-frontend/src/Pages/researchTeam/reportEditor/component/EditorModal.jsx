import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/system';
import { TextField } from '@mui/material';
import { useState } from 'react';

function EditorModal({ handleOpen, handleClose , open , saveData , reportId, subTopicid }) {
  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    const [data,setData]=useState({
        subTopicName : "",
        reportId : "",
        subTopicId : "",
        htmlData : ""
    })
    const changeValues = (e) =>{
        setData({...data,subTopicName : e.target.value})
    }
      const handleSubmit = async (e)=>{
        e.preventDefault();
        if(subTopicid){
          data.reportId = reportId
          data.subTopicId = subTopicid
          data.htmlData = ""
        }else{
          data.reportId = reportId
        }
        // console.log(data)
       const res = await saveData(data);
       if(res.status === 200)
       {
        setData({
        subTopicName : "",
        reportId : "",
        subTopicId : "",
        htmlData : ""
        });
       }

        handleClose()
      }
      
    return (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create Chapter
              </Typography>
              <Stack
             mt={3}
              >
                <TextField id="outlined-basic" value={data.subTopicName} label="Chapter Name" variant="outlined" onChange={(e)=>changeValues(e)} />
              </Stack>
              <Stack
              flexDirection="row"
              justifyContent="start"
              alignItems="center"
              mt={3}
             
              >
                <Button
                variant='outlined'
                color='primary'
                sx={{
                    marginRight:"5px"
                }}
                onClick={handleSubmit}
                >SAVE</Button>
                <Button
                variant='outlined'
                color='secondary'
                sx={{
                    marginLeft:"5px"
                }}
                onClick={()=>handleClose()}
                >CANCEL</Button>
              </Stack>
            </Box>
          </Modal>
        </div>
      );
}

export default EditorModal