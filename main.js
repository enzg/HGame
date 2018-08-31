import Koa from 'koa'
import KoaBody from 'koa-body'
import { LandingRouter } from './routes'
const Server = new Koa()

Server
    .use(LandingRouter.routes())
    .listen(8888, () => {
        console.log('Server Started')
    })