import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/ContextProvider";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
})

const useBaseUrl = () => {
    const {logOut} = useContext(AuthContext)
    const navigation = useNavigate()
    // Add a request interceptor
    axiosSecure.interceptors.request.use(function (config) {

        // Do something before request is sent
        const token = localStorage.getItem('access-token');
        // console.log("request stoped by interceptor", token);
        config.headers.authorization = `Bearer ${token}`;

        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // intercept 401 and 403 status
    axiosSecure.interceptors.response.use(response => {
        return response;

    }, async (error) => {
        const status = error.response.status;
        // 
        if(status === 401 || status === 403){
           await logOut()
            navigation('/login')
        }

        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useBaseUrl;