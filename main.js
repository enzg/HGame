import Koa from 'koa'
import KoaBody from 'koa-body'
import { LandingRouter } from './routes'
const Server = new Koa()

Server
    .use(LandingRouter.routes())
    .listen(43000, () => {
        console.log('Server Started')
    })