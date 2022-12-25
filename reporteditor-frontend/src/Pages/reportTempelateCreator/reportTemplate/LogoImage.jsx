import { Button, Stack, TextField, Typography } from "@mui/material";
import imgLogo from "../../../asset/logo/LogoGMI.PNG";
import React, { useState } from "react";
import { useEffect } from "react";

export default function LogoImage({ setImgLogo, imgUrl,setImgUrlLogo }) {
  const [imgPreview, setImgPreview] = useState(null);
  let profile_pic = null;
  
  const handleImageChange = (e) => {
    profile_pic = e.target.files[0];
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
      setImgUrlLogo("");
    } else {
      console.log("File not Supported");
    }
  };
  if(!profile_pic && imgPreview)
  {
    setImgLogo(null);
    setImgUrlLogo(imgPreview);
    // uploadImg(imgPreview);
  }
  const handleChange = (e) => {
    setImgPreview(e.target.value);
  };

  useEffect(() => {
    if (imgUrl) {
      console.log(imgUrl);
      setImgPreview(imgUrl);
    }
  }, []);
  return (
    <div>
      <Stack sx={{ marginTop: "50px" }} spacing={1}>
        <Typography variant="subtitle2">LOGO</Typography>
        <Stack
          flexDirection={"row"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Button
            variant="outlined"
            
            color="inherit"
            sx={{
              width: { md: "44%", sm: "44%" },
            }}
          >
            select file
            <input
              type="file"
              name="logo"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          <Typography variant="h5">OR</Typography>
          <TextField
            name="logo"
            sx={{
              width: { md: "44%", sm: "44%" },
              textAlign: "center",
            }}
            value={imgPreview ? imgPreview :""}
            placeholder={"PASTE URL HERE !"}
            onChange={(e)=>handleChange(e)}
          />
        </Stack>
      </Stack>
      <Stack mt={2}>
        {imgPreview === null && imgUrl ? (
          <img
            src={imgUrl}
            alt="user name"
            style={{
              height: "100px",
              width: "200px",
            }}
          />
        ) : (
          <img
            src={imgPreview ? imgPreview : imgLogo}
            alt="user name"
            style={{
              height: "100px",
              width: "200px",
            }}
          />
        )}
      </Stack>
    </div>
  );
}
