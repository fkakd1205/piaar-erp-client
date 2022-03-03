import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productOptionDataConnect = () => {
    return {
        searchList: async function () {
            return await axios.get(`http://localhost:8081/api/v1/product-option/list-m2oj`, {
                withCredentials: true
            })
        }
    }
}

export {
    productOptionDataConnect
}