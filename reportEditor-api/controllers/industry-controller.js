const IndustryModel = require("../model/industryModel");

exports.createIndustry = async (req,res) => {
    try{
      const {name, status} = req.body;
      if(!name){
        res.status(200).json({
            status:"error",
            message:"Name Field is Required",
        })
      return;
      }
      else{
        const newIndustry = await IndustryModel.create(req.body);
        res.status(201).json({
            status:"success",
            message:"Industry Doc Created Successfully",
            data:newIndustry
        })
      }
    } catch (error){
        res.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}

exports.getAllIndustry = async (req,res) => {
    try{
      const industryList = await IndustryModel.find({});
      res.status(200).json({
        status:"Success",
        message:"All Industry List are retrieved Successfully!",
        data:industryList
      })
    } catch(error){
        res.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}
exports.getAllIndustryByStatus = async (req,res) => {
    try{
       
      const industryList = await IndustryModel.find({status : true});
      res.status(200).json({
        status:"Success",
        message:"All Industry List are retrieved Successfully!",
        data:industryList
      })
    } catch(error){
        res.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}
exports.updateIndustry = async (req,res) => {
    try{
     const { id } = req.params;
     const {name,status} = req.body;
     console.log(req.body);
     if(!name){
        res.status(200).json({
            status:"error",
            message:"Industry name is required"
        })
        return;
     }
     else{
        const updatedIndustry = await IndustryModel.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({
            status:"success",
            message:"Industry Doc Updated Successfully",
            data:updatedIndustry
        })
     }
     
    } catch(error){
        res.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}

exports.deleteIndustry = async (req,res) => {
    try{
      const { id } = req.params;
      if(id){
        await IndustryModel.findByIdAndDelete(id);
        res.status(200).json({
            status:"success",
            message:"Industry Doc Deleted Successfully"
        });
      }
      else{
        res.status(404).json({
            status:"error",
            message:"Industry Doc NOT Found"
        })
      }
    } catch(error){
        res.status(500).json({
         status:"error",
         message:"Internal Server Error"   
        })
    }
}

 exports.updateStatus = async (req,res) => {
    try{
       const { id } = req.params;
       const industryStatus = await IndustryModel.findById(id).select("status");
       await IndustryModel.findByIdAndUpdate(industryStatus._id, {status: !industryStatus.status});
       res.status(200).json({
        status:"success",
        message:"Industry Status Updated Successfully"
       })
    } catch(error){
        res.status(500).json({
            status:"error",
            message:"Internal Server Error"
        })
    }
}