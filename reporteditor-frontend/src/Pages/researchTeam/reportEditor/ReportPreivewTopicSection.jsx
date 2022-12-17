import { Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import parse from "html-react-parser";
function reportPreivewTopicSection({
  topicList,
  index,
  topicName,
  dataToDisplay,
}) {
  console.log("topic list", topicList.length);
  if (topicList.length) {
    return (
      <>
        <Stack>
          {" "}
          <Container>
            <Typography variant="h5">
              {index}.{topicName}
            </Typography>
            {parse(dataToDisplay)}
          </Container>
        </Stack>
        {topicList?.map((item, index) => {
          return (
            <DisplayTopics
              index={item.index}
              topicList={item.subTopics}
              topicName={item.subTopicName}
              dataToDisplay={item.htmlData}
              key={item._id}
            />
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <Stack>
          <Container>
            <Typography variant="h5">
              {index}.{topicName}
            </Typography>
            {parse(dataToDisplay)}
          </Container>
        </Stack>
      </>
    );
  }
}

const DisplayTopics = ({ index, topicName, dataToDisplay, topicList }) => {
  if (topicList.length) {
    return (
      <>
        {topicList?.map((item, index) => {
          return (
            <>
              <Stack>
                <Container>
                  <Typography variant="h5">
                    {index}.{topicName}
                  </Typography>
                  {parse(dataToDisplay)}
                </Container>
              </Stack>
              <DisplayTopics
                index={item.index}
                topicList={item.subTopics}
                topicName={item.subTopicName}
                dataToDisplay={item.htmlData}
                key={item._id}
              />
            </>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <Stack>
          <Container>
            <Typography variant="h5">
              {index}.{topicName}
            </Typography>
            {parse(dataToDisplay)}
          </Container>
        </Stack>
      </>
    );
  }
};

export default reportPreivewTopicSection;
