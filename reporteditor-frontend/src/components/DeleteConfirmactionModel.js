import React, { useState, useEffect, useContext} from 'react'
import { Stack, Typography, Box, Button ,TextField,Grid} from '@mui/material'
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,            
    p: 4,
};

const DeleteConfirmationModel = ({open, handleClose, handleDelete, handleModelClose, id}) => {
    return (
        <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <Stack display='flex'
                    direction='row'
                    justifyContent='start'
                    alignItems='center'
                    spacing={2}
                >
                    <FileCopyRoundedIcon />
                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Deleting Confirmaction</Typography>
                </Stack>
                <hr />
            </Typography>
            <Box>
                <Grid container spacing={2}>
                    <Grid height={75} item xs={12}>
                        <Typography> Are You Sure to Delete ?</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Stack display='flex'
                direction='row'
                justifyContent='center'
                spacing={2}
            >
                <Button variant="outlined" color="primary" sx={{ textTransform: "none" }} onClick={handleClose} >
                    Cancel
                </Button>
                <Button variant="outlined" color="primary" sx={{ textTransform: "none" }} onClick={() => handleDelete(id)} >
                    Delete
                </Button>
            </Stack>
        </Box>
    </Modal>
    )
}

export default DeleteConfirmationModel;