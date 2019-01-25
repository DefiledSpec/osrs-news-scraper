const db = require('./models')
const axios = require('axios')
const cheerio = require('cheerio')
// const mongojs = require('mongojs')
const Article = require('./models/Article')

async function scrape() {
	const newsLink = 'https://oldschool.runescape.com/'
	try {
		const html = await axios.get(newsLink)
		const $ = cheerio.load(html.data)
		$('article.news-article').each( async (i, element) => {
			let result = {}
			result.title = $(element).children('div.news-article__details').children('h3').text()
			result.link  = $(element).children('div.news-article__details').children('h3').children('a').attr('href')
			result.img   = $(element).children('figure').children('a').children('img').attr('src')
			result.summary = $(element).children('div.news-article__details').children('p').text()
			let article = new Article(result)
			article.saveSummary()
			try {
				await db.Article.create(article)
			} catch(err) {
				console.log(err)
			}
		})
		// res.redirect('/')
		return { ok: true }
	} catch(err) {
		// res.redirect('/')
		return { err, ok: false }
	}
}

module.exports = scrape