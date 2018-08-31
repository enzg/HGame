import Router from 'koa-router'
import queryString from 'query-string'
import { post$ } from './http_client'
const CryptoJS = require('crypto-js')
const secret = '736d1dd8-645e-4e16-b4dd-6a1308a7b8e1'
const DEV_API_AUTH = 'https://xbbw2jfb58.execute-api.ap-southeast-1.amazonaws.com/dev/game'
const DEV_HGAME_DOMAIN = 'http://47.88.170.136:43000'
const DEV_GAME_HOST = 'https://4oi868q8qh.execute-api.ap-southeast-1.amazonaws.com/N243/games/42001'
const DEV_GAME_NAME = 'caishen/index.html'
const LandingRouter = new Router({ prefix: '/landing' })


LandingRouter.get('/:plat/:userId/:gameType/:gameId', async ctx => {
    // should auth with na platform
    console.log(ctx.params)
    const timestamp = Date.now()
    const apiKey = CryptoJS.SHA1(`${timestamp}${secret}`).toString(CryptoJS.enc.Hex)
    const params = {
        ...ctx.params,
        plat: 'NA',
        timestamp: timestamp,
        apiKey: apiKey
    }
    console.log(params)
    const res = await post$('/auth', params, `${DEV_API_AUTH}`)
    console.log(res)
    if (res.code === 0) {
        const url = `${DEV_HGAME_DOMAIN}/${DEV_GAME_NAME}?${queryString.stringify({ game_host: `${DEV_GAME_HOST}`, game_user_id: params.userId, verify_code: 4484394 })}`
        ctx.redirect(url)
    }
})



export { LandingRouter }