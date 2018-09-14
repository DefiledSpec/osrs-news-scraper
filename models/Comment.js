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
  	} ,
  	postedAt: {
	  	type: Date,
	  	default: Date.now()
  	}
})

let Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
