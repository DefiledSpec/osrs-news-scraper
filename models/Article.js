let mongoose = require('mongoose')

let Schema = mongoose.Schema

let ArticleSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	link: {
		type: String,
		required: true
	},
	img: {
		type: String
	},
	summary: {
		type: String
	},
	comment: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
})

ArticleSchema.methods.saveSummary = function() {
	this.summary = this.summary.split(' Read More...')[0]
	return this.summary
}

let Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
