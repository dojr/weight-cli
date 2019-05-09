const axios = require('axios');

// Could run out of memory; Looks better (imo) than iterative;
module.exports = async (url, page = '/api/products/1', data = []) => {
    let newData;
    try {
        const res = await axios.get(`${url}${page}`);
        newData = data.concat(res.data.objects);
        if (res.data.next !== null) {
            return await getData(url, res.data.next, newData);
        }
    } catch (err) {
        console.log(err);
    }

    return newData;
}