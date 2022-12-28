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
  // const getChartDetails = async (id) =>{
  //   const res = await getChartsById(id);
  //   if(res.status === 200 )
  //   {
  //     console.log("chart response", res);
  //   }
  // }
  // // ////////////////////////////////////////// target id of chart
  // const arr = dataToDisplay?.split("id='");
  // if(arr)
  // {
  //   // console.log("targeted id",arr[1].slice(0,24));
  //   const id = arr[1].slice(0,24);
  //   console.log("target id",id);
  //   getChartDetails(id);
  // }
  // // //////////////////////////////////////////
  // console.log("topic list", topicList.length);
  // if (topicList.length) {
  //   console.log();
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
