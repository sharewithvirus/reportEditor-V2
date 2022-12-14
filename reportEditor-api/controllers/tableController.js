const tableModel = require("../model/tableModel");

exports.createTable = async (req,res) => {
    try {
     const { reportId, name, rowData } = req.body;
     const newTable = await tableModel.create(req.body);
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