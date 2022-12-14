import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Typography,
  Box,
  Stack,
  getAccordionDetailsUtilityClass,
} from "@mui/material";
import { border, width } from "@mui/system";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import Pagination from "@mui/material/Pagination";

import { getUserAllActivity } from "../../Services/userActivity.service";
import { X } from "react-bootstrap-icons";

const UserActivity = () => {
  const [activityList, setActivityList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = React.useState(1);
  const limit = 5;

  const handlePageChange = async (event, value) => {
    setPage(value);
    getActivity();
  };

  const getActivity = async () => {
    const res = await getUserAllActivity(page, limit);
    if (res.status === 200) {
      setActivityList(res.data.data);
      setTotalCount(res.data.count);
    }
  };

  useEffect(() => {
    getActivity();
  }, []);
  return (
    <>
      <Box
        my={2.9}
        sx={{
          // border: "1px solid black",
          // borderRadius: "5px",
          padding: "5px 50px 5px 50px",
          // margin: "5px 50px 5px 50px",
          width: "50%",
        }}
      >
        <Stack
          display="flex"
          direction="row"
          justifyContent="start"
          alignItems="center"
          spacing={2}
        >
          <FileCopyRoundedIcon />
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            User Activity
          </Typography>
        </Stack>
      </Box>
      <Box>
        <Box
          sx={{
            border: "1px solid black",

            // borderRadius: "5px",
            padding: "5px 50px 5px 40px",
            // margin: "5px 50px 5px 20px",
            margin: "0px auto",
            width: "65%",
          }}
        >
          {activityList
            ? activityList.map((x, index) => (
                <>
                  <Activity item={x} keyItem={index} key={x} />
                </>
              ))
            : ""}
          <Box
            sx={{
              marginTop: "10px",
            }}
          >
            <Stack spacing={0.5}>
              <Pagination
                count={Number(totalCount / page)}
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const Activity = ({ item, keyItem }) => {
  return (
    <>
      <Box mt={1} key={`${keyItem}-${item._id}`}>
        <Typography>{`Action : ${item.user.userName} is ${item.activityType}`}</Typography>
        <Typography>{`Client IP : ${item.ipAddress}`}</Typography>
        <Typography>{`Timestamp : ${moment(item.updatedAt).format(
          "llll"
        )}`}</Typography>
        <Box
          my={2}
          sx={{
            height: "2px",
            borderBottom: "1px solid black",
            width: "80%",
            margin: "auto",
          }}
        ></Box>
      </Box>
    </>
  );
};

export default UserActivity;
