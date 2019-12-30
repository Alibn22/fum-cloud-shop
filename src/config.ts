import path = require('path');

export default {
    mongo: {
        uri: process.env['MONGO_URI']||' mongodb://127.0.0.1:27017/profile',
    },
    port: process.env['PORT'] || 6672,
    apiRoot: process.env['API_ROOT'] || 'http://127.0.0.1:6672/account',
    clientRoot: process.env['CLIENT_ROOT'] || 'http://127.0.0.1:8080',
    clientPath: process.env['CLIENT_PATH'] || path.resolve(__dirname, '../../fum-cloud-shop/dist'),
    zarinpalMerchant: process.env['ZARINPAL_MERCHANT'],
    zarinpalSandbox: process.env['ZARINPAL_SANDBOX'] === 'TRUE',
}