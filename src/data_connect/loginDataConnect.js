import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const loginDataConnect = () => {
    return {
        login: async function (params) {
            return await axios.post(`http://localhost:8082/api/v1/login`, params, {
                withCredentials: true
            })
        }
    }
}

export {
    loginDataConnect
}