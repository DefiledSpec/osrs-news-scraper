const router = require('express').Router()
const db = require('../models')
const axios = require('axios')
const cheerio = require('cheerio')
const mongojs = require('mongojs')
const newsLink = 'https://oldschool.runescape.com/'
const Article = require('../models/Article')
const scraper = require('../scrapeNews')

router.get('/scrape', async (req, res) => {
	// try {
	// 	const html = await axios.get(newsLink)
	// 	const $ = cheerio.load(html.data)
	// 	$('article.news-article').each( async (i, element) => {
	// 		let result = {}
	// 		result.title = $(element).children('div.news-article__details').children('h3').text()
	// 		result.link  = $(element).children('div.news-article__details').children('h3').children('a').attr('href')
	// 		result.img   = $(element).children('figure').children('a').children('img').attr('src')
	// 		result.summary = $(element).children('div.news-article__details').children('p').text()
	// 		let article = new Article(result)
	// 		article.saveSummary()
	// 		try {
	// 			await db.Article.create(article)
	// 		} catch(err) {
	// 			console.log(err)
	// 		}
	// 	})
	// 	res.redirect('/')
	// } catch(err) {
	// 	res.redirect('/')
	// 	throw err
	// }
	try {
		let result = await scraper()
		if (result.ok) {
			res.redirect('/')
		} else {
			res.redirect('/')
			console.log(err)
		}
	} catch (err) {
		console.log(err)
	}
})

router.get('/add', async (req, res) => {
	// try {
	// 	const article = await db.Article.create({title: 'hi', link: 'hello'})
	// 	res.json(article)
	// } catch(err) {
	// 	res.end()
	// 	throw err
	// }
	res.redirect('/')
})

router.get('/articles', async (req, res) => {
	try {
		const articles = await db.Article.find({})
		res.json(articles)
	} catch(err) {
		res.end()
		throw err
	}
})

router.post('/articles/:id', async (req, res) => {
	try {
		const comment = await db.Comment.create(req.body)
		const article = await db.Article.findOneAndUpdate(
				{ _id: mongojs.ObjectId(req.params.id) },
				{ $push: { comment: comment._id } },
				{ new: true }
			)
		res.json(article)
	} catch(err) {
		res.end()
		throw err
	}
})

router.put('/saveArticle/:id', async (req, res) => {
	const _id = mongojs.ObjectId(req.params.id)
	try {
		let article = await db.Article.findOneAndUpdate({ _id: _id }, {$set: { saved: true }})
		res.json(article)
	} catch(err) {
		res.end()
		throw err
	}
})

router.put('/removeSaved/:id', async (req, res) => {
	const _id = mongojs.ObjectId(req.params.id)
	let unSaved
	try {
		unSaved = await db.Article.findOneAndUpdate({ _id }, {$set: { saved: false }})
		res.json(unSaved)
	} catch(err) {
		res.send(err)
		throw err
	}
})

router.put('/delComment/:id', async (req, res) => {
	const _id = mongojs.ObjectId(req.params.id)
	try {
		results = await db.Comment.findOneAndUpdate({ _id }, {$set: { deleted: true }})
		res.json(results)
	} catch(err) {
		res.send(err)
		throw err
	}
})

router.delete('/deleteArticles', async (req, res) => {
	try {
		await db.Article.remove()
		await db.Comment.remove()
		res.end()
	} catch(err) {
		res.end()
		throw err
	}
})


module.exports = router
