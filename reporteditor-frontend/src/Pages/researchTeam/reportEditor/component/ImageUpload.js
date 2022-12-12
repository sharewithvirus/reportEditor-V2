import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = () => {
    const [inputImage, setInputImage] = useState(null);
    const [imageAvailable, setImageAvailable] = useState(false);
    const [imageName, setImageName] = useState("");

    const onDrop = useCallback((acceptedFiles) => {
        const imageURL = URL.createObjectURL(acceptedFiles[0]);
        setInputImage(imageURL);
        setImageAvailable(true);
    }, []);

    // Image Name input OnChange function
    const handleImageNameInput = (e) => {
        setImageName(e.target.value)

    }

    // useDropzone is from usedrop library
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "image/jpeg": [],
            "image/png": [],
            "image/webp": [],
        },
        noDragEventsBubbling: true,
    });

    const removeImage = () => {
        setInputImage(null);
        setImageAvailable(false);
    };
    // =========================uploadImage=========================================

    const uploadImage = () => {
        // inputImage variable is providing static image URL
        console.log(inputImage);
    };
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    return (
        <Container maxWidth="xs">
            <Paper sx={{ width: "400px", height: "425px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", border: "1px solid #ececec", borderRadius: "8px", padding: "10px", boxShadow: "none" }} elevation={8}>
                {/* Header Text */}
                {/* <Typography variant="h4" component="h1">
                    Upload Image
                </Typography> */}

                {/* Image upload button */}
                <Box>
                    <Button variant="outlined" size="small" endIcon={<AddAPhotoOutlinedIcon />} {...getRootProps()}>
                        Select Image
                    </Button>
                </Box>

                {/* Text -Input for Image Name*/}
                <Box my="7px">
                    <TextField label="Image Name" required size="small" type="text" name="imageName" onChange={handleImageNameInput} value={imageName} />
                </Box>
                <input {...getInputProps()} />


                {/* Drag and drop box */}
                <Box maxWidth="xs" sx={{ height: "180px", width: "252px", display: "flex", justifyContent: "center", alignItems: "center", border: "2px solid grey", padding: "10px", textAlign: "center", background: "#e8e8e8", borderRadius: "5px" }} {...getRootProps()}>
                    {imageAvailable ? <img src={inputImage} alt="" height="175px" width="250px" /> : isDragActive ? <Typography>Drop the files here ...</Typography> : <Typography>Drag 'n' drop some files here, or click on Upload icon</Typography>}
                </Box>

                {/* Remove and upload image Buttons  */}
                <Stack mt={1} width="148px" height="62px">
                    {imageAvailable ? (
                        <>
                            <Button variant="text" size="small" endIcon={<RemoveCircleOutlineIcon />} onClick={removeImage}>
                                Remove Image
                            </Button>
                            <Button variant="contained" size="small" endIcon={<CloudUploadOutlinedIcon />} onClick={uploadImage}>
                                Upload Image
                            </Button>
                        </>
                    ) : null}
                </Stack>
            </Paper>
        </Container>
    );
};
export default ImageUpload;