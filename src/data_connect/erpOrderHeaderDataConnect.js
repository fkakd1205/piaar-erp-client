import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpOrderHeaderDataConnect = () => {
    return {
        searchOne: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/erp-order-headers`, {
                withCredentials: true
            })
        },
        createOne: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-headers`, params, {
                withCredentials: true
            })
        },
        updateOne: async function (params) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/erp-order-headers`, params, {
                withCredentials: true
            })
        }
    }
}

export {
    erpOrderHeaderDataConnect
}