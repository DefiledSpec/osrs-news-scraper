const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const hbs = require('express-handlebars')
const mongoose = require('mongoose')
const indexRoutes = require('./routes/indexRoutes')
const apiRoutes = require('./routes/apiRoutes')
const schedule = require('node-schedule')
const scraper = require('./scrapeNews')
const http = require('http')

const app = express()
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.engine('hbs', hbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

app.use('/', indexRoutes)
app.use('/api', apiRoutes)

app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`)
	schedule.scheduleJob('0 0 * * *', () => { 
		console.log('Retrieving new news posts!')
		schedule.scheduleJob('0 0 * * *', async () => {
			try {
				let results = await scraper()
				console.log(results)
			} catch (error) {
				console.log('Unable to scrape news.')
				console.log(error)
			}
		})
	})
	setInterval(function() {
		http.get("http://osrs-news-scraper.herokuapp.com");
	}, 300000); // every 5 minutes (300000)
})
