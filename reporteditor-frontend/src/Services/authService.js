import axios from "axios";

export const userLogin = async (email, password) => {
    try {
        const data = await axios.post(`/api/v1/admin/login`, 
        { email: email, password: password }
        )
        return data;
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const userLogout = async (userId) => {
    try {
        const data = await axios.post(`/api/v1/admin/logout`, 
        { userId }
        )
        return data;
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}

export const userDashboard = async () => {
    try {
        const data = await axios.get(`/api/v1/admin/`);
        return data;
    } catch (error) {
        // alert(error.response.data.message)
        return error.response.data.message;
        
    }
}

// export default userLogin;