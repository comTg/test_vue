import axios from 'axios';

var instance = axios.create({timeout: 1000 * 12});

instance.interceptors.request.use(config => {
    console.log('config:', config);
    return config;
}, error => {
    return Promise.error(error);
});

instance.interceptors.response.use(response => {
    console.log('response:', response);
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, error => {
    if (error.response.status) {
        console.log('response status:', error.response.status);
    }
    return Promise.reject(error.response);
});

export default {
    get: function (url, params) {
        return new Promise((resolve, reject) => {
            instance.get(url, {
                params
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data);
            })
        })
    },
    post: function (url, params) {
        return new Promise((resolve, reject) => {
            instance.post(url, params)
           .then(res => {
               resolve(res.data);
           })
           .catch(err =>{
               reject(err.data)
           })
       });
    }
}