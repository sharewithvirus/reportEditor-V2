const tableModel = require("../model/tableModel");

exports.createTable = async (req,res) => {
    try {
     const { reportId, name, rowData } = req.body;
   
     const newTable = await tableModel.create({reportId, name, rowData: `${rowData}`});
     res.status(201).json({
        status:"Success",
        message:"Table Created Successfully",
        data:newTable
     })
    } catch(error){
        console.log(error);
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error"
        })
    }
}

exports.getAllTables = async (req,res) => {
    try{
      const {id} = req.params;
      const tableDoc = await tableModel.find({reportId:id});
      res.status(200).json({
        status:"Success",
        message:"Tables are fetched Successfully",
        data:tableDoc
      })
    } catch(error){
        console.log(error);
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error"
        })
    }
}