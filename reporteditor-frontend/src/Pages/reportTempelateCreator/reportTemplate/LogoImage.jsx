import { Button, Stack, Typography } from "@mui/material";
import imgLogo from "../../../asset/logo/LogoGMI.PNG";
import React, {useState } from "react";
import { useEffect } from "react";

export default function LogoImage({setImgLogo, imgUrl}) {
  const [imgPreview,setImgPreview] = useState(null);
  const handleImageChange = (e) => {
    const profile_pic = e.target.files[0];
    console.log(profile_pic);
    const ALLOWED_TYPES = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];
    if (profile_pic && ALLOWED_TYPES.includes(profile_pic.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        console.log(profile_pic);
      };
      reader.readAsDataURL(profile_pic);
      setImgLogo(profile_pic);
    } else {
      console.log("File not Supported");
    }
  };

  useEffect(()=> {
    if(imgUrl){
        console.log(imgUrl)
        setImgPreview(imgUrl)
    }
  }, [])
  return (
    <div>
      <Stack sx={{ marginTop: "50px" }} spacing={1}>
        <Typography variant="subtitle2">URL</Typography>

        <Button
          variant="outlined"
          component="label"
          color="inherit"
        >
          select file
          <input type="file" name="logo" hidden onChange={handleImageChange}/>
        </Button>
      </Stack>
      <Stack mt={2}>
        {
        imgPreview === null && imgUrl ? 
                <img
                src={imgUrl}
                alt="user name"
                style={{
                    
                    height: "100px",
                    width: "200px",
                }}
                />
                :
                <img
                src={
                    imgPreview
                    ? imgPreview
                    : imgLogo
                }
                alt="user name"
                style={{
                    height: "100px",
                    width: "200px",
                }}
                />
                }
      </Stack>
    </div>
  );
}
