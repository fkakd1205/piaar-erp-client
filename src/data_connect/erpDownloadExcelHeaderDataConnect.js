import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpDownloadExcelHeaderDataConnect = () => {
    return {
        searchList: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/erp-download-excel-headers`, {
                withCredentials: true
            })
        },
        createOne: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-download-excel-headers`, body, {
                withCredentials: true
            })
        },
        deleteOne: async function (id) {
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/erp-download-excel-headers/${id}`, {
                withCredentials: true
            })
        },
        updateOne: async function (body) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/erp-download-excel-headers`, body, {
                withCredentials: true
            })
        },
        actionDownloadForDownloadOrderItems: async function (id, downloadOrderItemsBody) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-download-excel-headers/${id}/download-order-items/action-download`, downloadOrderItemsBody, {
                withCredentials: true
            })
        }
    }
}

export {
    erpDownloadExcelHeaderDataConnect
}