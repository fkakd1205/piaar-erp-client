import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpOrderItemDataConnect = () => {
    return {
        uploadExcelFile: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-item/excel/upload`, formData, {
                withCredentials: true
            })
        },
        searchList: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/erp-order-item/list`, {
                params: params,
                withCredentials: true
            })
        },
        createList: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-item/list`, params, {
                withCredentials: true
            })
        },
        changeSoldYnForListInSales: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-item/list/sales`, body, {
                withCredentials: true
            })
        },
        changeOptionCodeForListInAll: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-item/list/option-code/all`, body, {
                withCredentials: true
            })
        },
        deleteList: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-item/list/delete`, params, {
                withCredentials: true
            })
        }
    }
}

export {
    erpOrderItemDataConnect
}