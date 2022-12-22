import axios from "axios";

export const getAllReportImages = async (id) => {
    try {
        // console.log(id);
        const res = await axios.get(`/api/v1/report-image/getAllImgByReportId/${id}`)
        // console.log("chart get req", res.data)
        return res;
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}
export const uploadImage = async (id, data) => {
    try {
        console.log("image",id);
        return await axios.post(`/api/v1/report-image/imageUpload/${id}`, data ,{ headers: {'Content-Type': 'multipart/form-data'}})
    } catch (error) {
        alert(error.response.data.message)
        return error.response;
    }
}



