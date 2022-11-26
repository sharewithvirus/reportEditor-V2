

import axios from "axios";

export const getTemplate = async () => {
    try {
        return await axios.get(`/api/v1/template`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const createTemplate = async (data) => {
    try {
        return await axios.post(`/api/v1/template`, data)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const updateNewDepartment = async (data, id) => {
    try {
        return await axios.patch(`/api/v1/template/${id}`, data)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const updateTemplate = async ( templateId ) => {
     try {
        return await axios.post(`/api/v1/template`, {templateId: templateId})
     } catch (error) {
        alert(error.response.data.message)
        return error.response;
     }
}

export const deleteTemplate = async ( templateId ) => {
    console.log("Role Id", templateId)
    try {
       return await axios.delete(`/api/v1/user/role/delete/${templateId}`)
    } catch (error) {
       alert(error.response.data.message)
       return error.response;
    }
}