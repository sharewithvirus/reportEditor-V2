

import axios from "axios";

export const getSubtopic = async () => {
    try {
        return await axios.get(`/api/v1/subtopic/`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const getAllSubtopic = async () => {
    try {
        return await axios.get(`/api/v1/subtopic/`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const getSubtopicsById = async (id) => {
    try {
        return await axios.get(`/api/v1/subtopic/${id}`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const createSubtopics = async (data) => {
    try {
        return await axios.post(`/api/v1/subtopic/`, data)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}


export const updateSubtopics = async (data) => {
     try {
       
      const res = await axios.put(`/api/v1/subtopic/`, data)
      
    //   console.log("data in controller..",res);
        // console.log("success");  
        return res;
     } catch (error) {
        alert(error.response.data.message)
        return error.response;
     }
}

export const deleteChapters = async (subtopicId) => {
    // console.log("Role Id", reportId)
    try {
       return await axios.delete(`/api/v1/subtopic/${subtopicId}`)
    } catch (error) {
       alert(error.response.data.message)
       return error.response;
    }
}