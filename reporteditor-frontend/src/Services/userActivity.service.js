import axios from "axios";

export const getUserAllActivity = async (page, limit) => {
    try {
        const data = await axios.get(`/api/v1/user/activity/${page}/${limit}`)
        return data;
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}