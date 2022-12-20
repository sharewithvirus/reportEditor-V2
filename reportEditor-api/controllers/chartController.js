const chartModel = require("../model/chartModel");
const { findByIdAndUpdate } = require("../model/subTopicModel");
const Report = require("../model/reportModel");

//Create All Chart With ChartType from[ "pie","donut","line","bar","radar","stacked","multibar","area","barandline"]
exports.createChart = async (req, res) => {
    try{
       const {chartType,reportId} = req.body;
       console.log(req.body);
           const newChart = await chartModel.create(req.body);
           const report = await Report.findById(reportId);
           report.reportCharts.push(newChart._id);
           await report.save();
           res.status(201).json({
            status:"Success",
            message:`${chartType} Chart created Successfully`,
            data:newChart
           })
    } catch(error){
        console.log(error);
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error"
        })
    }
}

//Get All Chart with ChartType value
exports.getChart = async (req, res) => {
    try {
        const { chartType } = req.body;
        const chartDocs = await chartModel.find({chartType});
        res.status(200).json({
            status:"Success",
            message:`${chartType}-Chart fetched Successfully`,
            data:chartDocs
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error"
        })
    }
}



// all charts by report id code by javed
exports.getAllChart = async (req, res) => {
    try {
        // const { chartType } = req.body;
        const { id } = req.params;
        // console.log("api hitt", req.body);
        const chartDocs = await chartModel.find({reportId: id})
        res.status(200).json({
            status:"Success",
            message:`All Chart fetched Successfully`,
            data:chartDocs
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error"
        })
    }
}
// //// chart by chart id
exports.getChartbyId= async (req, res) => {
    try {
        // const { chartType } = req.body;
        const { id } = req.body;
        console.log("api hitt", req.body);
        const chartDocs = await chartModel.findById(id)
        res.status(200).json({
            status:"Success",
            message:`Chart fetched Successfully`,
            data:chartDocs
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error"
        })
    }
}

exports.updateChart = async (req,res) => {
    try{
       const { id } = req.params;
       const { reportId,chartType,name,label,series,categories } = req.body;
       const updatedDoc = await chartModel.findByIdAndUpdate({_id:id},req.body,{new:true});
       res.status(200).json({
        status:"Success",
        messsage:`${chartType} Chart is Updated Successfully`,
        data:updatedDoc
       })
    } catch(error){
        console.log(error);
       res.status(500).json({
        status:"Error",
        message:"Internal Server Error"
       }) 
    }
}

exports.deleteChart = async (req,res) => {
    try{
      const { id } = req.params;
      const getChart = await chartModel.findOne({_id:id, isDeleted:false});
      if (!getChart) {
        return res.status(404).json({ status: false, message: `Chart Not found` })  
    }
      const deletedDoc = await chartModel.findByIdAndUpdate(id, {$set: {isDeleted:true,deletedAt:Date.now()}}, {new:true});
      res.status(200).json({
        status:"Success",
        message:`Chart Deleted Successfully`,
        data:deletedDoc
      })
    } catch(error){
        console.log(error);
        res.status(500).json({
         status:"Error",
         message:"Internal Server Error"
        })
    }
}
