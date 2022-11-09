import axios from "axios";

// const apiURL = "http://localhost:9090"


// const sendRequest = (method, url, data) => {
//     try {
        
//     } catch (error) {
//         return 
//     }
// }

// export default sendRequest;


axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';