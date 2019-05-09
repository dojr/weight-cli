const axios = require('axios');
const _ = require('lodash');

module.exports = async (url, page = '/api/products/1') => {
    let data = [];
    while (true) {
        try {
            const res = await axios.get(`${url}${page}`);
            data = _.concat(data, res.data.objects);
            if (res.data.next === null || res === null) {
                break;
            }
            page = res.data.next;
        } catch (err) {
            console.log(err);
            break;
        }
    }

    return data;
}
