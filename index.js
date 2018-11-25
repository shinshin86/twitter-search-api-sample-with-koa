'use strict'
const koa = require('koa')
const koaRouter = require('koa-router')
const path = require('path')
const render = require('koa-ejs')
const { search } = require('./apis/tweets');

const app = new koa()
const router = new koaRouter()

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

router.get('tweets', '/tweets', async (ctx, next) => {
  const tweetList = await search(ctx, next);
  return ctx.render('tweets', {
    tweetList
  })
})

router.get('top', '/', async (ctx, next) => {
  return ctx.render('index');
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => console.log('Running on port 3000'))
