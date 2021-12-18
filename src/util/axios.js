import axios from 'axios';
import router from '../router';

var instance = axios.create({timeout: 1000 * 12});

instance.interceptors.request.use(config => {
    console.log('config:', config);
    if (sessionStorage.getItem("userId")) {
        config.headers.userId = sessionStorage.getItem("userId");
        config.headers.userToken = sessionStorage.getItem("userToken");
    }
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

router.beforeEach((to, from, next) => {
    let requireAuth = to.meta.requireAuth;
    const userId = sessionStorage.getItem('userId');
    if (requireAuth) {
        if (userId) {
            next();
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            });
        }
    } else {
        next();
    }
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
            console.log('axios post:', params);
            instance.post(url, params)
           .then(res => {
               resolve(res.data);
           })
           .catch(err =>{
               reject(err.data)
           })
       });
    },
    uploadFile: function (url, data) {
        return new Promise((resolve, reject) => {
            instance.post(url, data, {
                headers: {
                    "Content-Type":"multipart/form-data"
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data);
            });
        });
    },
}