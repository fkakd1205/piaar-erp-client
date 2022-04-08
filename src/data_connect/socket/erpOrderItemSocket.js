import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpOrderItemSocket = () => {
    return {
        createList: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/ws/v1/erp-order-items/batch`, params, {
                withCredentials: true
            })
        },
        updateOne: async function (body) {
            return await axios.put(`${API_SERVER_ADDRESS}/ws/v1/erp-order-items`, body, {
                withCredentials: true
            })
        },
        changeOptionCodeForListInBatch: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-order-items/batch/option-code/all`, body, {
                withCredentials: true
            })
        },
        changeReleaseOptionCodeForListInBatch: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-order-items/batch/release-option-code`, body, {
                withCredentials: true
            })
        },
        changeSalesYnForListInSales: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-order-items/batch/sales-yn`, body, {
                withCredentials: true
            })
        },
        changeReleaseYnForList: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-order-items/batch/release-yn`, body, {
                withCredentials: true
            })
        },
        changeWaybillForList: async function (formData) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-order-items/batch/waybill`, formData, {
                withCredentials: true
            })
        },
        deleteList: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/ws/v1/erp-order-items/batch-delete`, params, {
                withCredentials: true
            })
        },
        actionReflectStock: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-order-items/batch/stock/action-reflect`, body, {
                withCredentials: true
            })
        }
    }
}

export {
    erpOrderItemSocket
}