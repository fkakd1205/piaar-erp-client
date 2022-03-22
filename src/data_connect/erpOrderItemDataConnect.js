import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpOrderItemDataConnect = () => {
    return {
        uploadExcelFile: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/excel/upload`, formData, {
                withCredentials: true
            })
        },
        searchList: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/search`, {
                params: params,
                withCredentials: true
            })
        },
        createList: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch`, params, {
                withCredentials: true
            })
        },
        changeSalesYnForListInSales: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/sales-yn`, body, {
                withCredentials: true
            })
        },
        changeReleaseYnForList: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/release-yn`, body, {
                withCredentials: true
            })
        },
        changeOptionCodeForListInBatch: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/option-code/all`, body, {
                withCredentials: true
            })
        },
        changeReleaseOptionCodeForListInBatch: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/release-option-code`, body, {
                withCredentials: true
            })
        },
        deleteList: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch-delete`, params, {
                withCredentials: true
            })
        },
        fetchFirstMerge: async function (firstMergeHeaderId, body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/erp-first-merge-headers/${firstMergeHeaderId}/action-merge`, body, {
                withCredentials: true
            })
        },
        fetchSecondMerge: async function (secondMergeHeaderId, body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/erp-second-merge-headers/${secondMergeHeaderId}/action-merge`, body, {
                withCredentials: true
            })
        }
    }
}

export {
    erpOrderItemDataConnect
}