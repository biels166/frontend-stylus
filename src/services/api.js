import axios from 'axios';

const api = axios.create({
    baseURL:
        process.env.REACT_APP_ENVCONFIG === "DEV"
            ? process.env.REACT_APP_LOCALHOST
            : process.env.REACT_APP_STYLUS_API,
});


export default api;
