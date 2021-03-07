import axios from 'axios';
import appConfig from '../config/app.js';

const request = async (options) => {
    const response = await axios({
        ...options,
        url: `${appConfig.apiUrl}/api/v1${options.url}`,
        withCredentials: true,
    });

    return response.data;
};

export default request;
