const config = require('config')
const twitter = require('twitter')
const client = new twitter(config.twitter)
const { readFileSync } = require('fs')

module.exports.search = async (ctx, next) => {
  const { query } = ctx
  const { keyword, limit } = query

  if (!keyword) ctx.throw(400, 'Not found parmater')

  try {
    const tweets = await client.get('search/tweets', { q: keyword })
    const tweetList = tweets.statuses
    return tweetList
  } catch (err) {
    ctx.throw(500, err)
  }
}
