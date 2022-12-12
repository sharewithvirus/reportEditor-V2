import axios from "axios";

export const getAllCharts = async () => {
    try {
        const res = await axios.get(`/api/v1/chart/`)
        console.log(res)
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

export const updateNewCharts = async (data, id) => {
    try {
        return await axios.patch(`/api/v1/chart/update/${id}`, data)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

