$('#scrape').click(async function(e) {
	await $.ajax({
		method: 'GET',
		url: '/api/scrape'
	})
	window.location.reload()
})

$('#delArticles').click(async function(e) {
	await $.ajax({
		method: 'DELETE',
		url: '/api/deleteArticles'
	})
	window.location.reload()
})

$('.view').click(function(e) {
	console.log($(this))
	window.location = `/articles/${$(this).attr('data-id')}`
})

$('.save').click(function() {
	$.ajax({
		method: 'PUT',
		url: `/api/saveArticle/${$(this).attr('data-id')}`
	})
	.then( res => window.location.reload())
	.catch(err => console.log(err))
})

$('.del').click(function() {
	$.ajax({
		method: 'PUT',
		url: `/api/delComment/${$(this).attr('data-id')}`
	})
	.then(res => window.location.reload())
	.catch(err => conosle.log(err))
})

$('.delSave').click(function() {
	$.ajax({
		method: 'PUT',
		url: `/api/removeSaved/${$(this).attr('data-id')}`
	})
	.then( res => window.location.reload())
	.catch(err => conosle.log(err))

})

$('.addComment').on('click', function(e) {
	e.preventDefault()
	let name = $('#name').val().trim()
	let comment = $('#commentInput').val().trim()
	console.log(name, comment)
	
	//If no comment text do nothing
	if(comment = '') { return }
	else {
		if(name === '') {
			$.ajax({
				method: 'POST',
				url: `/api/articles/${$(this).attr('data-id')}`,
				data: {
					body: $('#commentInput').val().trim()
				}
			})
			.then(() => window.location.reload())
			.catch(err => conosle.log(err))
		} else {
			$.ajax({
				method: 'POST',
				url: `/api/articles/${$(this).attr('data-id')}`,
				data: {
					name,
					body: $('#commentInput').val().trim()
				}
			})
			.then(() => window.location.reload())
			.catch(err => conosle.log(err))
	
		}
	}
	
})