import Router from 'koa-router'
const LandingRouter = new Router({
    prefix: '/landing'
})
const GameRouter = new Router({
    prefix: '/games'
})


LandingRouter.get('/:plat/:userId/:gameType/:gameId', async ctx => {
    // should auth with na platform
    console.log(ctx.params)
    const gameHost = 'https://www.google.com/ncr'
    ctx.redirect('/games/loading?game_host=' + encodeURIComponent(gameHost))
})

GameRouter.get('/*', async ctx => {
    console.log(decodeURIComponent(ctx.querystring) )
    ctx.body = 'game contents'
})


export { LandingRouter, GameRouter }