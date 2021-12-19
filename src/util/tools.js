const log = function (...args) {
    console.log(...args);
};

const getParams = function (url, obj) {
    let result = '';
    let item;
    for (item in obj) {
        if (obj[item] && String(obj[item])) {
            result += `&${item}=${obj[item]}`;
        }
    }
    if (result) {
        result = '?' + result.slice(1);
    }
    return url + result;
}

export default {
    log,
    getParams,
}