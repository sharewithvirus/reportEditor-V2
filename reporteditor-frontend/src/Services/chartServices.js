import axios from "axios";

export const getChartsByType = async () => {
    try {
        const res = await axios.get(`/api/v1/chart/`)
        console.log(res)
        return res;
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const getChartsById = async (chartId) => {
    try {
        const res = await axios.get(`/api/v1/chart/getChartById/${chartId}`)
        console.log(res)
        return res;
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const getAllCharts = async (id) => {
    try {
        // console.log(id);
        const res = await axios.get(`/api/v1/chart/${id}`)
        console.log("chart get req", res.data)
        return res;
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const createCharts = async (data) => {
    try {
        return await axios.post(`/api/v1/chart/`, data)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const updateCharts = async (data,id) => {
    try {
        return await axios.patch(`/api/v1/chart/${id}`, data)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const deleteCharts = async (chartId) => {
    console.log("Chart Id", chartId)
    try {
       return await axios.delete(`/api/v1/chart/${chartId}`)
    } catch (error) {
       alert(error.response.data.message)
       return error.response;
    }
}