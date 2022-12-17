import { Box, Typography, Stack, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { useParams } from "react-router-dom";
import { getReportDataById } from "../../../Services/reportServices";
import moment from "moment";

function ReportPreview() {
  const [data,setData] = useState();
  const {id} = useParams();
  // console.log("....",id);
  const getReportData = async () =>
  {
    const res = await getReportDataById(id);
    if(res.status === 200)
    {
      if(res.data.reportData)
      {
        setData(res.data.reportData);
      }
      console.log("success fetched...", res.data);
      // setData(res.data.data.reportData);
    }
  }
  useEffect(()=>{
    if(id)
    {
    getReportData();
    }
  },[])
  return (
    <Box
      sx={{
        padding: "15px 50px 5px 50px",
        margin: "5px 50px 5px 50px",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
          marginTop: "20px",
        }}
      >
        <Stack
          sx={{
           

            display: "flex",
            // alignItems:"center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>
            <b>Last Saved:</b> {data
                    ? moment(data.updatedAt).format(
                      "Do MMM YYYY  , h:mm:ss A"
                      )
                      : "MM : YYYY , H:M:SS D"}
          </Typography>
        </Stack>
        <Stack
          sx={{
           
            display: "flex",
            // alignItems:"center",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Stack display="flex" flexDirection="row">
            <FileCopyOutlinedIcon
              sx={{ marginRight: "10px", fontSize: "20px" }}
            />
            <Typography sx={{ fontSize: "16px", fontWeight: "" }}>
              ABCD Market - <span style={{ fontSize: "12px" }}>Preview</span>
            </Typography>
          </Stack>
          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            sx={{
                marginLeft:"5vw"
            }}
          >
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              sx={{ fontSize: "8px", marginRight: "10px" }}
            >
              Export to PDF
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              sx={{ fontSize: "8px", marginLeft: "10px" }}
            >
              Back to Editor Panel
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{
        backgroundColor:'rgba(0,0,0,0.6)',
        padding:"5px",
        marginTop:"20px",
        height: "100vh",
        overflow:"auto"
      }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              margin:"auto",
              p:4,
              textAlign:"justify",
              width: "50vw",
            },
           
          }}
        >
          <Paper elevation={3} square>
            <Typography variant="body2" component="article">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nostrum, soluta ullam dolorem magnam doloribus quod aspernatur, tempore rem atque laboriosam aliquid magni ea eligendi quisquam dolorum fugiat! Illum, officiis?
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. At consectetur odit, corrupti, fugit maiores blanditiis deserunt facere optio quas hic quaerat provident, tenetur architecto quia ipsum officiis impedit quidem! Saepe?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quidem dolores impedit reprehenderit facilis odio necessitatibus placeat nostrum qui. Alias veniam dolores quasi tempora numquam voluptate in, omnis sapiente inventore ea illum a! Id dicta soluta eaque suscipit quas quis error fugiat quia voluptatibus nesciunt ut quibusdam sit assumenda dolores nulla sed quisquam atque rerum explicabo nam quo distinctio, perferendis tempore fugit? Sint iste laudantium, ipsa tempore, molestiae praesentium repellendus non ducimus quisquam eaque amet vero consequuntur harum qui consequatur excepturi maiores ipsum ad totam quos delectus porro laborum! Quos cupiditate optio similique alias et veritatis aliquam ab aliquid, vitae accusamus saepe nobis. Voluptates unde numquam consequuntur repellendus blanditiis ullam officiis! Facere facilis quis, quia neque ducimus a recusandae illum sint, assumenda voluptates possimus ipsa repudiandae ad quam beatae voluptatum, optio porro repellendus tenetur est laborum enim eaque sed. Atque id dolorum, laborum, harum minus unde deleniti, odit nobis earum fuga saepe! Molestias accusantium corporis aut dolore eos delectus blanditiis nesciunt ipsam mollitia commodi eaque necessitatibus ad architecto quae quis nam recusandae esse consequuntur veniam, excepturi provident iusto minima facilis dolor. Repellendus, temporibus tempore! Eum voluptatibus id fugiat. Sequi culpa iusto, aliquam rerum eius ipsum corporis expedita perspiciatis? Facilis expedita adipisci necessitatibus voluptates magni sed officia corrupti sequi totam quaerat repudiandae mollitia ab ea cumque odit neque recusandae sapiente assumenda iure fugiat distinctio in dolorum, quod commodi? Inventore aliquam necessitatibus quas reiciendis expedita atque eos! Fugiat quis ipsum eius, repellendus aspernatur totam est numquam molestias necessitatibus soluta hic sint odio enim aperiam excepturi molestiae rem sed eligendi velit beatae et quas quo. Optio laborum ab beatae, doloribus hic neque ipsum, id ea veniam fugit quibusdam. Reiciendis sit magnam doloremque vitae veniam quam quasi a? Placeat alias ea dolores magnam, aliquid perspiciatis ratione reprehenderit laudantium at odio quae numquam, nisi rerum consequatur saepe pariatur, voluptates doloribus dolore veniam ullam dolorem doloremque? Maxime excepturi facere eum facilis alias nobis, cum atque nisi ad, officia hic corrupti. Repudiandae quaerat illo repellat recusandae non ratione enim corporis quae labore aut. Vel ab nam iusto est distinctio, rerum cum dolorum quod libero cumque porro sequi suscipit, quas sed nemo laudantium quisquam consequatur aliquid nostrum? Dolorum consequatur odio, adipisci consequuntur nobis temporibus a aut facere, quis at, molestias ipsam ipsum. Eaque ullam blanditiis quasi alias, dolorem quas deleniti, obcaecati ipsam quam suscipit quae similique error omnis, nihil distinctio in ipsa sunt illum sit quisquam pariatur debitis sequi sint. Dignissimos vero atque odio provident corporis amet architecto dolore iste corrupti, sed maxime, facere laudantium necessitatibus cupiditate veniam cum natus sapiente et fugit illo excepturi blanditiis esse fuga repellendus? Similique officia quis harum nisi, repellat quos recusandae officiis dolorem ut non impedit veritatis qui et libero a, aspernatur perferendis excepturi voluptatem repellendus in voluptate odio. Assumenda, eveniet recusandae veniam rem corporis reiciendis sed ab ad doloremque explicabo tempora alias deserunt temporibus totam hic harum neque sapiente sunt magnam blanditiis debitis aliquid facere, rerum beatae. Deleniti, consectetur ex asperiores voluptatum illo quasi nisi fuga aliquid odio sequi totam porro minima eaque temporibus eius veritatis itaque tempora esse possimus magnam voluptatem sed. Magnam placeat ullam deserunt cumque non quam, corporis tempora officia voluptate consequuntur debitis corrupti? Vel voluptatem libero reprehenderit quia ex facilis necessitatibus quis voluptas modi corrupti quas, fugit facere inventore dignissimos corporis architecto soluta asperiores in pariatur fuga. Ut doloremque minima rem. Incidunt animi eos nobis, tempore, voluptates ipsum cum voluptas minus similique porro ipsa magni pariatur beatae! Doloremque est, velit distinctio maxime autem atque tenetur pariatur sequi blanditiis et quas soluta necessitatibus sit cumque! Consectetur est voluptas eos voluptatibus, illum ea voluptatem sit eaque alias expedita modi minima temporibus libero hic magni commodi harum blanditiis officia dicta voluptate. Odio magnam fuga neque culpa? Dolorem numquam dignissimos, cupiditate quia non tenetur accusamus quo. Deserunt quo dolorum alias ratione minus animi explicabo quos numquam suscipit harum aliquam accusantium quas delectus quod, tempora nulla, vero cumque, excepturi hic tempore officiis voluptas incidunt! Facere, eum eveniet soluta minima animi labore nihil sequi aliquam iste repellendus libero nisi at officiis delectus enim. Similique, eaque. Doloremque debitis neque, cumque totam itaque, excepturi suscipit aut dolores, expedita quae sit facere inventore delectus? Qui quibusdam, voluptatum voluptates fugit sed sit at quaerat ea ipsa nobis cupiditate id aperiam consequatur ipsum laudantium? Exercitationem adipisci inventore quia earum facilis cum molestiae obcaecati dolorem tempore porro delectus, unde saepe, officia sit! Alias, inventore labore, quas perferendis quia nulla nisi consequuntur commodi quibusdam culpa ut? Cumque dignissimos fugiat harum voluptates? Doloremque optio, nesciunt quidem impedit omnis molestias iure temporibus perferendis nostrum corporis modi sed itaque. Quidem, obcaecati delectus voluptatibus itaque eos saepe autem voluptatum labore ut, blanditiis tempore nihil nemo? Suscipit enim, ipsa commodi tempora explicabo consequuntur minus neque vel unde iure velit voluptas corporis atque voluptate aperiam dolorem odio iusto rerum vero! Nesciunt odio laboriosam maiores. Labore earum, eos, magnam officiis unde dolore animi quibusdam quam ex tempora dicta consequatur aliquam eum ipsa possimus, excepturi culpa at explicabo repellendus? Quos similique aspernatur mollitia est eius, placeat deleniti neque, harum ab consequuntur optio possimus voluptatem tempora explicabo quod earum minima delectus hic, obcaecati accusantium blanditiis. Iste veniam dolore doloribus perspiciatis aspernatur nesciunt minus dolorem animi voluptate delectus, incidunt quis sunt iusto quod tempore fugit impedit sequi modi blanditiis iure ea nemo mollitia a vitae? Hic, nemo aut quisquam, consectetur quam veniam dolore officia esse ab ipsa voluptatum architecto eveniet quo amet dolor natus provident minus! Quibusdam placeat, eveniet eum sapiente nisi suscipit vel in explicabo fugiat ut libero quae nam, quo tempore nostrum. Quas natus harum dolore et aspernatur, nam sed expedita quibusdam hic saepe soluta voluptate eaque porro rem architecto atque consequuntur inventore voluptatem, maiores quidem consectetur delectus neque ullam. Ipsa magnam dolore sunt facilis illum, ea deserunt similique! Ab quasi odit, saepe aliquid vel, explicabo nemo autem beatae minima totam distinctio cupiditate corporis voluptates nulla repudiandae error dolorum laborum aperiam. Voluptas aliquam odio officia, ut quo tenetur ipsam accusamus deleniti quos doloremque quae dicta possimus odit sequi enim minus molestias eligendi? Recusandae distinctio ratione aperiam accusantium repellendus.
            </Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}

export default ReportPreview;
