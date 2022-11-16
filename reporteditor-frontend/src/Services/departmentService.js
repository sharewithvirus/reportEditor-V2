import axios from "axios";

export const getAllDepartment = async () => {
    try {
        return await axios.get(`/api/v1/admin/department/`)
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const createDepartment = async (data) => {
    try {
        return await axios.post(`/api/v1/admin/department/create`, data)
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
export const changeDepartmentStatus = async ( deptId ) => {
     try {
        return await axios.post(`/api/v1/admin/department/update-status`, {deptId: deptId})
     } catch (error) {
        alert(error.response.data.message)
        return error.response;
     }
}
export const deleteDepartment = async ( deptId ) => {
    console.log("Department Id", deptId)
    try {
        if(!deptId){
            return { status: 200, data: { message: "Select Proper Department to Delete"} }
        }
       const data = await axios.delete(`/api/v1/admin/department/delete/${deptId}`)
        return data;
    } catch (error) {
        console.log(error.response)
       alert(error.response.data.message)
       return error.response;
    }
}

