

import axios from "axios";

export const getReport = async () => {
    try {
        return await axios.get(`/api/v1/report/`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const getReportDataById = async (id) => {
    try {
        return await axios.get(`/api/v1/report/reportData/${id}`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const getReportPreviewData = async (id) => {
    try {
        console.log("Report Id In Axios Request", id)
        return await axios.get(`/api/v1/report/reportData/preview/${id}`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const createReport = async (data) => {
    console.log(data);
    try {
        return await axios.post(`/api/v1/report/`, data)
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
export const updateReport = async (data) => {
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

export const deleteReport = async (reportId) => {
    // console.log("report Id", reportId)
    try {
       return await axios.delete(`/api/v1/report/${reportId}`)
    } catch (error) {
       alert(error.response.data.message)
       return error.response;
    }
    
}

// export const getReportData = async (reportId) => {
//     // console.log("report Id", reportId)
//     try {
//        return await axios.get(`/api/v1/report/reportData/${reportId}`)
//     } catch (error) {
//        alert(error.response.data.message)
//        return error.response;
//     }
    
// }
export const getReportPdf = async (reportId) => {
    try {
        console.log("getReportPdf....",reportId);
       const res = await axios.get(`/api/v1/report/pdf-generate/${reportId}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer",
        });
        console.log("response for getReportPdf",res);
        return res;
    } catch (error) {
       alert(error.response.data.message)
       return error.response;
    }
    
}
