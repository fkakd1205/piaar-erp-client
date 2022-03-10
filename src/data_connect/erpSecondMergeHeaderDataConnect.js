import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpFirstMergeHeaderDataConnect = () => {
    return {
        searchList: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/erp-second-merge-headers`, {
                withCredentials: true
            })
        },
        createOne: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-second-merge-headers`, body, {
                withCredentials: true
            })
        },
        deleteOne: async function (id) {
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/erp-second-merge-headers/${id}`, {
                withCredentials: true
            })
        },
        updateOne: async function (body) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/erp-second-merge-headers`, body, {
                withCredentials: true
            })
        }
    }
}

export {
    erpFirstMergeHeaderDataConnect
}