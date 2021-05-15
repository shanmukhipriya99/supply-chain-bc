import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
});

// instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

instance.interceptors.request.use(request => {
    // console.log(request);
    return request;
});

instance.interceptors.response.use(response => {
    // console.log(response);
    return response;
});

export default instance;