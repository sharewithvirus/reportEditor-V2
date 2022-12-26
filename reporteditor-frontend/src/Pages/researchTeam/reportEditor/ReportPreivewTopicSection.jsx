import { Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import parse from "html-react-parser";
import { getChartsById } from "../../../Services/chartServices";


const reportPreivewTopicSection = ({dataToDisplay}) => {
  
    return (
      <>
        {/* <Stack height="100vh"> */}
            <iframe width="100%" hight="100%" srcdoc={dataToDisplay} title="html Preview" >
            </iframe>
        {/* </Stack> */}
      </>
    );
  }

// const DisplayTopics = ({ index, topicName, dataToDisplay, topicList }) => {
//   if (topicList.length) {
//     return (
//       <>
//         {topicList?.map((item, index) => {
//           return (
//             <>
//               <Stack>
//                 <Container>
//                   <Typography variant="h5">
//                     {index}.{topicName}
//                   </Typography>
//                   {parse(dataToDisplay)}
//                 </Container>
//               </Stack>
//               <DisplayTopics
//                 index={item.index}
//                 topicList={item.subTopics}
//                 topicName={item.subTopicName}
//                 dataToDisplay={item.htmlData}
//                 key={item._id}
//               />
//             </>
//           );
//         })}
//       </>
//     );
//   } else {
//     return (
//       <>
//         <Stack>
//           <Container>
//             <Typography variant="h5">
//               {index}.{topicName}
//             </Typography>
//             {parse(dataToDisplay)}
//           </Container>
//         </Stack>
//       </>
//     );
//   }
// };

export default reportPreivewTopicSection;
