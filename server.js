let express = require('express')
let bodyParser = require('body-parser')
let logger = require('morgan')
let hbs = require('express-handlebars')
let mongoose = require('mongoose')
let indexRoutes = require('./routes/indexRoutes')
let apiRoutes = require('./routes/apiRoutes')

let app = express()
const PORT = process.env.PORT || 3000
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'

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

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
