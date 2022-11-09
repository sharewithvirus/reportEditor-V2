import axios from "axios";

export const getUserAllActivity = async (email, password) => {
    try {
        const data = await axios.get(`/api/v1/user/activity`)
        return data;
    } catch (error) {
        console.log("Error Message", error.response.data.message)
        console.log("Error Status", error.response.status)
        alert(error.response.data.message)
        return error.response;
    }
}