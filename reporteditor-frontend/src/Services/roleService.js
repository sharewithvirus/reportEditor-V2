

import axios from "axios";

export const getAllRole = async () => {
    try {
        return await axios.get(`/api/v1/user/role/`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const createRole = async (data) => {
    try {
        return await axios.post(`/api/v1/user/role/create`, data)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const updateNewDepartment = async (data, id) => {
    try {
        return await axios.patch(`/api/v1/admin/department/update/${id}`, data)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const changeRoleStatus = async ( roleId ) => {
     try {
        return await axios.post(`/api/v1/user/role/update-status`, {roleId: roleId})
     } catch (error) {
        alert(error.response.data.message)
        return error.response;
     }
}