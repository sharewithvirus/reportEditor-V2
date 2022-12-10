const pieAndDonutModel = require("../model/pieAndDonutModel");
const lineAndBarModel = require("../model/lineAndBarModel");
const stackAndRadarModel = require("../model/stackAndRadarModel");


//(1) PIE-CHART Methods
 exports.createPieChart = async (req, res) => {
    try{
       const { reportId,chartType,name,labels,series } = req.body; //labels = name of each slice ,series = value of each slice
       if(labels.length == series.length)
         {
           const newPieChart = await pieAndDonutModel.create(req.body);
           res.status(201).json({
            status:"Success",
            message:"Pie-Chart created Successfully",
            data:newPieChart
           })
         }
        else{
            res.staus(200).json({
             status:"Error",
             message:"Length of both labels and series must be same"
            })
            return;
        }
    } catch(error){
        console.log(error);
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error"
        })
    }
}


exports.getPieChart = async (req, res) => {
    try {
        const chartDocs = await pieAndDonutModel.find({chartType:"pie"});
        res.status(200).json({
            status:"Success",
            message:"Pie-Chart fetched Successfully",
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

//(2)DONUT-CHART Methods
exports.createDonutChart = async (req, res) => {
    try{
       const { reportId,chartType,name,labels,series  } = req.body; //labels = name of each slice ,series = value of each slice
       if(labels.length == series.length)
         {
           const newDonutChart = await pieAndDonutModel.create(req.body);
           res.status(201).json({
            status:"Success",
            message:"Donut-Chart created Successfully",
            data:newDonutChart
           })
         }
        else{
            res.staus(200).json({
             status:"Error",
             message:"Length of both labels and series must be same"
            })
            return;
        }
    } catch(error){
        console.log(error);
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error"
        })
    }
}


exports.getDonutChart = async (req, res) => {
    try {
        const chartDocs = await pieAndDonutModel.find({chartType:"donut"});
        res.status(200).json({
            status:"Success",
            message:"Donut Chart fetched Successfully",
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


//BAR-CHART Methods
exports.createBarChart = async (req,res) => {
    try{
       const { reportId,chartType,name,series } = req.body;
       const newBarChart = await lineAndBarModel.create(req.body);
       res.status(201).json({
        status:"Succes",
        message:"Bar-Chart created Successfully",
        data:newBarChart
       })
    } catch(error){
        console.log(error);
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error"
        })
    }
}

exports.getBarChart = async (req, res) => {
    try {
        const chartDocs = await lineAndBarModel.find({chartType:"bar"});
        res.status(200).json({
            status:"Success",
            message:"Bar Chart fetched Successfully",
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


//LINE-CHART Methods
exports.createLineChart = async (req,res) => {
    try{
       const { reportId,chartType,name,series } = req.body;
       const newBarChart = await lineAndBarModel.create(req.body);
       res.status(201).json({
        status:"Succes",
        message:"Line-Chart created Successfully",
        data:newBarChart
       })
    } catch(error){
        console.log(error);
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error"
        })
    }
}

exports.getLineChart = async (req, res) => {
    try {
        const chartDocs = await lineAndBarModel.find({chartType:"line"});
        res.status(200).json({
            status:"Success",
            message:"Line Chart fetched Successfully",
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

//STACKED-BAR-CHART Methods
exports.createStackChart = async (req,res) => {
    try{
       const { reportId,chartType,name,series,labels } = req.body;
       const newStackChart = await stackAndRadarModel.create(req.body);
       res.status(201).json({
        status:"Succes",
        message:"Stacked-Bar Chart created Successfully",
        data:newStackChart
       })
    } catch(error){
        console.log(error);
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error"
        })
    }
}

exports.getStackChart = async (req, res) => {
    try {
        const chartDocs = await stackAndRadarModel.find({chartType:"stack"});
        res.status(200).json({
            status:"Success",
            message:"Stacked-Bar Chart fetched Successfully",
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

//RADAR-CHART Methods
exports.createRadarChart = async (req,res) => {
    try{
       const { reportId,chartType,chartName,series,labels } = req.body;
       const newRadarChart = await stackAndRadarModel.create(req.body);
       res.status(201).json({
        status:"Succes",
        message:"Radar Chart created Successfully",
        data:newRadarChart
       })
    } catch(error){
        console.log(error);
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error"
        })
    }
}

exports.getRadarChart = async (req, res) => {
    try {
        const chartDocs = await stackAndRadarModel.find({chartType:"radar"});
        res.status(200).json({
            status:"Success",
            message:"Radar Chart fetched Successfully",
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

