let router = require('express').Router()
let db = require('../models')
let axios = require('axios')
let cheerio = require('cheerio')
let mongojs = require('mongojs')
let newsLink = 'http://services.runescape.com/m=news/archive?oldschool=1&year=2018&month=9'
let Article = require('../models/Article')

router.get('/scrape', (req, res) => {
	axios.get(newsLink)
		.then(html => {
			let $ = cheerio.load(html.data)
			$('article.news-article').each( (i, element) => {
				let result = {}
				result.title = $(element).children('div.news-article__details').children('h3').text()
				result.link  = $(element).children('div.news-article__details').children('h3').children('a').attr('href')
				result.img   = $(element).children('figure').children('a').children('img').attr('src')
				result.summary = $(element).children('div.news-article__details').children('p').text()
				let article = new Article(result)
				article.saveSummary()
				db.Article.create(article)
					.then((data) => console.log(data))
					.catch(err => console.log(err))
			})
			res.send('Scrape Complete')
		})
		.catch(err => console.log(err))
})

router.get('/add', (req, res) => {
	db.Article.create({title: 'hi', link: 'hello'}).then(article => res.json(article))
})

router.get('/articles', (req, res) => {
	db.Article.find({})
		.then(articles => res.json(articles))
		.catch(err => res.json(err))
})



router.post('/articles/:id', (req, res) => {
	db.Comment.create(req.body)
		.then(body => {
			return db.Article.findOneAndUpdate(
				{ _id: mongojs.ObjectId(req.params.id) },
				{ $push: { comment: body._id } },
				{ new: true }
			)
		})
		.then(article => {
			console.log(article)
			res.json(article)
		})
		.catch(err => res.json(err))
})

module.exports = router
