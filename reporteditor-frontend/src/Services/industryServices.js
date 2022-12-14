

import axios from "axios";

export const getIndustry = async () => {
    try {
        return await axios.get(`/api/v1/industry/`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const getAllIndustry = async () => {
    try {
        return await axios.get(`/api/v1/industry/`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}



export const getAllIndustrybyDeptId = async (id) => {
    try {
        console.log(id)
        return await axios.get(`/api/v1/industry/getindustryBy/DeptId/${id}`);
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const getIndustryStatusTrue = async () => {
    try {
        return await axios.get(`/api/v1/industry/getByStatus`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const getIndustryDataById = async (id) => {
    try {
        return await axios.get(`/api/v1/industry/industryData/${id}`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const changeIndustryStatus = async (industryId ) => {
    try {
       return await axios.patch(`/api/v1/industry/update-status/${industryId}`)
    } catch (error) {
       alert(error.response.data.message)
       return error.response;
    }
}
export const createIndustry = async (data) => {
    try {
        return await axios.post(`/api/v1/industry/`, data)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

// export const updateReportData = async (data, id) => {
//     try {
//         return await axios.patch(`/api/v1/report/${id}`, data)
//     } catch (error) {
//         alert(error.response.data.message)
//         return error.response;
//     }
// }
export const updateIndustry = async (data) => {
     try {
       
      const res = await axios.put(`/api/v1/report/`, data)
      
    //   console.log("data in controller..",res);
        // console.log("success");  
        return res;
     } catch (error) {
        alert(error.response.data.message)
        return error.response;
     }
}
export const updateNewIndustry = async (data, id) => {
    try {
        return await axios.patch(`/api/v1/admin/department/update/${id}`, data)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const deleteIndustry = async (industryId) => {
    // console.log("Role Id", reportId)
    try {
       return await axios.delete(`/api/v1/report/${industryId}`)
    } catch (error) {
       alert(error.response.data.message)
       return error.response;
    }
}