let mongoose = require('mongoose')

let Schema = mongoose.Schema

let CommentSchema = new Schema({
	name: {
		type: String,
		default: 'Anonymous'
	},
  	body: {
		type: String,
		required: true
	},
	deleted: {
		type: Boolean,
		default: false
	},
  	postedAt: {
	  	type: Date,
	  	default: Date.now()
  	}
})

let Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
