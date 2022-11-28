

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
export const createReport = async (data) => {
    try {
        return await axios.post(`/api/v1/report/`, data)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const updateReportData = async (data, id) => {
    try {
        return await axios.patch(`/api/v1/report/${id}`, data)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const updateReport = async (data) => {
     try {
        return await axios.put(`/api/v1/report/`, {data})
     } catch (error) {
        alert(error.response.data.message)
        return error.response;
     }
}

export const deleteReport = async (reportId) => {
    console.log("Role Id", reportId)
    try {
       return await axios.delete(`/api/v1/report/${reportId}`)
    } catch (error) {
       alert(error.response.data.message)
       return error.response;
    }
}