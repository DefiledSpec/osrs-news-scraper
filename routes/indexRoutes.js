let router = require('express').Router()
let db = require('../models')
let mongojs = require('mongojs')

router.get('/', async (req, res) => {
	let articles
	try {
		articles = await db.Article.find({}).populate('comment')
		articles.forEach(article => article.commentLength = article.comment.length)
	} catch(err) {
		throw err
	} finally {
		res.render('index', { articles })
	}
})

router.get('/saved', async (req, res) => {
	let savedArticles
	try {
		savedArticles = await db.Article.find({saved: true}).populate('comment')
		savedArticles.forEach(saved => saved.commentLength = saved.comment.length)
	} catch (err) {
		throw err
	} finally {
		res.render('saved', { articles: savedArticles })
	}
})

router.get('/articles/:id', (req, res) => {
	db.Article.find({ _id: mongojs.ObjectId(req.params.id) })
		.populate('comment')
		.then(article => {
			res.render('article', { article: article[0] })
		})
		.catch(err => { throw err })
})

module.exports = router
