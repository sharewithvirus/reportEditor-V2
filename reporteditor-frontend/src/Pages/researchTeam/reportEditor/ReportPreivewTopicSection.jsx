import { Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import parse from "html-react-parser";
import { getChartsById } from "../../../Services/chartServices";
function reportPreivewTopicSection({
  topicList,
  index,
  topicName,
  dataToDisplay,
}) {
  return (
    <>
      {/* <Stack height="100vh"> */}
      <iframe
       
        style={{ minHeight: "842px", width: "100%",scrolling:"no"  }}
        srcdoc={dataToDisplay}
        title="html Preview"
      ></iframe>

      {/* </Stack> */}
      {/* <div>
          {parse(dataToDisplay)}
        </div> */}
    </>
  );
  // } else {
  //   return (
  //     <>
  //       <Stack>
  //         <Container>
  //           <Typography variant="h5">
  //             {index}.{topicName}
  //           </Typography>
  //           {parse(dataToDisplay)}
  //         </Container>
  //       </Stack>
  //     </>
  //   );
  // }
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
//                   < variant="h5">
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
