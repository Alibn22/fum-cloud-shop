import { RoutingControllersOptions, createExpressServer, HttpError, Action } from 'routing-controllers'
import config from './config';
import * as express from 'express';

import './services/database'

// disable classToPlain class-transformer
require('class-transformer')['classToPlain'] = function (obj: object)  {
    return JSON.parse(JSON.stringify(obj))
}

// ساختار خطاهای اچ‌تی‌تی‌پی را که به سمت کلاینت می‌روند زیباتر می‌کنیم
// HttpError.prototype['toJSON'] = function () {
//     return {
//         message: this.message,
//         httpCode: this.httpCode,
//         code: this.httpCode
//     }
// }

const bodyParser = require('body-parser')

const appOptions: RoutingControllersOptions = {
    controllers: [
    ],
    defaults: {
        paramOptions: {
            required: true
        }
    },
    cors: true,
    classTransformer: true,
    async currentUserChecker(action: Action) {
        return {}
        // try {
        //     let token = action.request.headers['authorization']
        //     if (token.startsWith('Bearer')) {
        //         token = token.slice('Bearer '.length)
        //     }
        //     const user = await jwt.verify(token)
        //     return user
        // } catch(err) {
        //     return null
        // }
    },
    async authorizationChecker(action: Action, roles: string[]) {
        return true
        // try {
        //     let token: string = action.request.headers['authorization']
        //     if (token.startsWith('Bearer')) {
        //         token = token.slice('Bearer '.length)
        //     }
        //     const user = await jwt.verify(token)


        //     if (!roles.length) {
        //         return true
        //     }

        //     if (roles.some(role => user.roles.includes(role))) {
        //         return true
        //     }

        //     return false

        // } catch(err) {
        //     return false
        // }
    }
}

const account: express.Application = createExpressServer(appOptions)
const profile = require('./services/profile');
const app = express()
app.use(bodyParser.json())
app.use('/account', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    next()
})
//app.use('/account', account)
app.use('/account', profile);
app.use(express.static(config.clientPath))

app.use((req, res, next) => {
   res.status(404).sendFile(config.clientPath + '/index.html')
})

app.listen(config.port, () => {
    console.log('listening on port ' + config.port)
})
