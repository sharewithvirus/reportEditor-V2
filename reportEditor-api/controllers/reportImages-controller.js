const User = require("../model/user");
const Role = require("../model/role")
const ReportImage = require("../model/reportImages");
const {uploadImg, deleteFile, getFileStream} = require("../config/s3Config");
const Report = require("../model/reportModel");

exports.uploadImageToReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { imageName } = req.body;
        const file = req.file;
        if(!reportId, !file) {
            res.status(200).json({
                status: 'error',
                message: "Report and Image is Required",
            })
            return;
        }else{
            const report = await Report.findById(reportId);
            const result = await uploadImg(file);
            const newReportImage = await ReportImage.create({reportId, name: imageName, key: result?.Key, imgUrl: result?.Location})
            report.reportImages.push(newReportImage._id);
            await report.save();
            res.status(200).json({
                status: 'success',
                message: "Image Updated Successfully",
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}

exports.getAllImagesByReportId = async (req, res) => {
    try {
        const {reportId} = req.params;
        const allReportImg = await ReportImage.find({ reportId, deletedAt: null });
        res.status(200).json({
            status: 'success',
            message: 'Reports Fetched Successfully',
            data: allReportImg,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}

exports.roleStatusUpdate = async (req, res) => {
    try {
        const { roleId } = req.body;
        const deptStatus = await Role.findById(roleId).select("status");
        await Role.findByIdAndUpdate(deptStatus._id, {status: !deptStatus.status});
        res.status(200).json({
            status: "success",
            message: "Role Status updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}

exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        console.log(id, name, description)
        if(!name){
            res.status(200).json({
                status: 'error',
                message: "Department Name required",
            })
            return;
        }else{
            const newDepartment = await Department.findByIdAndUpdate({ _id: id },{name, description}, { new: true });
            res.status(200).json({
                status: 'success',
                message: "Department Updated Successfully",
                data: newDepartment,
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}

exports.roleDelete = async (req, res) => {
    try {
        const { roleId } = req.params;
        console.log("Role Id", roleId)
        await Role.findByIdAndUpdate({_id: roleId}, {isDeleted:true});    
        res.status(200).json({
            status: "success",
            message: "Role Status updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }
}