/**
 * Created by mingyue.yang on 2018/5/14.
 */
const crypto = require('crypto');

exports.MD5Hash = (text) => {
    const md5 = crypto.createHash('md5');
    return md5.update(text).digest('hex');
};