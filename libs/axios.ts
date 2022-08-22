import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ,
});


if (typeof window !== 'undefined') {    
    const accessToken = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : false

    const tokenType = localStorage.getItem('token_type')
    ? localStorage.getItem('token_type')
    : 'Bearer'

    if (accessToken) {
        axiosInstance.defaults.headers.common.Authorization = `${tokenType} ${accessToken}`
    }
}


axiosInstance.interceptors.response.use(response => {
    return response;
} , error => {
    if (error.response.status === 401) { // token expires or invalid credentials
        if (typeof window !== 'undefined' && window.location.href != 'http://localhost:3000/') { // this url can be added to env variables    
            alert('You have been logged out. Please login again.'); 
            window.location.href = '/';
        } else {}
            
    }
    return Promise.reject(error);
});


export default axiosInstance