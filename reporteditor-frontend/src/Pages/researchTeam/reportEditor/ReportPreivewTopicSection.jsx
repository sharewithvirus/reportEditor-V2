import { Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import parse from "html-react-parser";
import { getChartsById } from "../../../Services/chartServices";


const reportPreivewTopicSection = ({dataToDisplay}) => {
  
    return (
      <>
        <Stack>
          <Container>
            {parse("<html><head><title>Test Page</title><style>body{background-color:#a8d1d1;font-family:Roboto,sans-serif}#chart{max-width:650px;margin:35px auto}</style></head><body><div id='chart'>Hello</div><script src='https://cdn.jsdelivr.net/npm/apexcharts'></script> <script>let options = {chart:{type:'bar'},series:[{name:'sales',data:[30,40,45,50,49,60,70,91,125]}],xaxis:{categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]}}; let chart=new ApexCharts(document.querySelector('#chart'), options); chart.render();</script></body></html>")}
          </Container>
        </Stack>
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
