import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpFirstMergeHeaderDataConnect = () => {
    return {
        // searchOne: async function () {
        //     return await axios.get(`${API_SERVER_ADDRESS}/api/v1/erp-order-header`, {
        //         withCredentials: true
        //     })
        // },
        createOne: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-first-merge-header`, body, {
                withCredentials: true
            })
        },
        // updateOne: async function (params) {
        //     return await axios.put(`${API_SERVER_ADDRESS}/api/v1/erp-order-header`, params, {
        //         withCredentials: true
        //     })
        // }
    }
}

export {
    erpFirstMergeHeaderDataConnect
}