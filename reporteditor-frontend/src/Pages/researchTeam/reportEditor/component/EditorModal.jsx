import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/system";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

function EditorModal({
  handleOpen,
  handleClose,
  open,
  saveData,
  reportId,
  subTopicid,
  delId,
  editId,
  item,
  setDelId,
  setEditId,
  deleteTopic, 
  updateTopic,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [data, setData] = useState({
    subTopicName: "",
    reportId: "",
    subTopicId: "",
    htmlData: "",
  });
  console.log(item);
  // console.log(editId);
  const changeValues = (e) => {
    setData({ ...data, subTopicName: e.target.value });
  };
  // console.log()
  const [editedTopicData,setEditedTopic] = useState({
    subTopicName: "",
    id : "",
  })
  const handleChangeValues = (e) =>{
    setEditedTopic({...editedTopicData, subTopicName: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subTopicid) {
      data.reportId = reportId;
      data.subTopicId = subTopicid;
      data.htmlData = "";
    } else {
      data.reportId = reportId;
    }
    // console.log(data)
    const res = await saveData(data);
    if (res.status === 200) {
      setData({
        subTopicName: "",
        reportId: "",
        subTopicId: "",
        htmlData: "",
      });
    }

    close();
  };

  const close = () => {
    setData({
      subTopicName: "",
      reportId: "",
      subTopicId: "",
      htmlData: "",
    });
    console.log("close button");
    setDelId("");
    setEditId("");
    handleClose();
  };

  useEffect(() => {
    if(item){
      setEditedTopic({
        subTopicName: item.subTopicName,
        id : item._id,
      })
    }else{
      setEditedTopic({
        subTopicName: "",
        id : "",
      })
    }
  }, [])

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* {(delId ? "Delete Topic" : "Create Topic") || (editId ? "Edit Topic" : "Create Topic")} */}
            {delId ? "delete topic" : editId ? "Edit Topic" : "Create Topic"}
          </Typography>
          <Stack mt={3}>
            {delId ? (
              <>
                <Typography> Are You Sure? You Want To Delete!</Typography>
              </>
            ) : editId ? (
              <>
                <TextField
                  value={editedTopicData.subTopicName}
                  label="Topic Name"
                  variant="outlined"
                  onChange={(e) => handleChangeValues(e)}
                />
              </>
            ) : (
              <TextField
                id="outlined-basic"
                value={data.subTopicName}
                label="Topic Name"
                variant="outlined"
                onChange={(e) => changeValues(e)}
              />
            )}
          </Stack>
          <Stack
            flexDirection="row"
            justifyContent="start"
            alignItems="center"
            mt={3}
          >
            {delId ? (
              <>
              {console.log(delId)}
                <Button variant="outlined" sx={{ marginRight: "10px" }}
                onClick={()=>deleteTopic(delId)}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ marginLeft: "10px" }}
                  onClick={() => close()}
                >
                  Cancel
                </Button>
              </>
            ) : editId ? (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    marginRight: "10px",
                  }}
                   onClick={()=>updateTopic(editedTopicData)}
                >
                  UPDATE
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    marginLeft: "10px",
                  }}
                  // onClick={() => close()}
                  onClick={() => close()}
                >
                  CANCEL
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    marginRight: "10px",
                  }}
                  onClick={handleSubmit}
                >
                  SAVE
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    marginLeft: "10px",
                  }}
                  // onClick={() => close()}
                  onClick={() => close()}
                >
                  CANCEL
                </Button>
              </>
            )}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default EditorModal;
