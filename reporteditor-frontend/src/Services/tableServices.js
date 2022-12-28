import axios from "axios";


export const getTableById = async (tableId) => {
    try {
        const res = await axios.get(`/api/v1/table/getTableById/${tableId}`)
        console.log(res)
        return res;
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const getAllTable = async (id) => {
    try {
        console.log(" table api hitt", id);
        console.log(id);
        const res = await axios.get(`/api/v1/table/${id}`)
        console.log("table response", res);
        return res;
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const createTable = async (data) => {
    try {
        return await axios.post(`/api/v1/table/`, data)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

// export const updateTable = async (data,id) => {
//     try {
//         return await axios.patch(`/api/v1/table/${id}`, data)
//     } catch (error) {
//         alert(error.response.data.message)
//         return error.response;
//     }
// }

export const deleteTable = async (tableId) => {
    console.log("Table Id", tableId)
    try {
       return await axios.delete(`/api/v1/table/${tableId}`)
    } catch (error) {
       alert(error.response.data.message)
       return error.response;
    }
}