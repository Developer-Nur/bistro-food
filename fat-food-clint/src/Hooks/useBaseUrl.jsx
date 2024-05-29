import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
})

const useBaseUrl = () => {
    return axiosSecure;
};

export default useBaseUrl;