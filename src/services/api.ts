import axios from "axios";

const apiClient = axios.create({
    // baseURL: process.env.NODE_ENV === 'development'
    //     ? 'http://localhost:5173'
    //     : 'https://uchechukwu-prince-nwulu-lendsqr-fe-test.vercel.app/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true,
});

export default apiClient;