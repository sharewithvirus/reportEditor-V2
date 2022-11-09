

import axios from "axios";

export const getUsers = async () => {
    try {
        return await axios.get(`/api/v1/user/`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const createUser = async (data) => {
    try {
        return await axios.post(`/api/v1/user/create`, data);
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const updateUser = async (data) => {
    try {
        return await axios.post(`/api/v1/user/update/user`, data);
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const verifyUserToken = async (token) => {
    try {
        return await axios.get(`/api/v1/user/verify/token/${token}`);
    } catch (error) {
        alert(error.response.data.message);
        return error.response;
    }
}

export const createUserPasswordAndLogin = async (data) => {
    try {
        return await axios.post(`/api/v1/user/password/create`, data);
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

// export const updateNewDepartment = async (data, id) => {
//     try {
//         return await axios.patch(`/api/v1/admin/department/update/${id}`, data)
//     } catch (error) {
//         alert(error.response.data.message)
//         return error.response;
//     }
// }
export const changeUserStatus = async ( userId ) => {
     try {
        return await axios.post(`/api/v1/user/update-status`, {userId: userId})
     } catch (error) {
        alert(error.response.data.message)
        return error.response;
     }
}