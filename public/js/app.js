$('#scrape').click(async function() {
	await $.ajax({
		method: 'GET',
		url: '/api/scrape'
	})
	window.location.reload()
})

$('#delArticles').click(async function() {
	await $.ajax({
		method: 'DELETE',
		url: '/api/deleteArticles'
	})
	window.location.reload()
})

$('.view').click(function() {
	window.location = `/articles/${$(this).attr('data-id')}`
})

$('.save').click(async function() {
	try {
		await $.ajax({
			method: 'PUT',
			url: `/api/saveArticle/${$(this).attr('data-id')}`
		})
		window.location.reload()
	} catch(err) {
		console.log(err)
	}
})

$('.del').click(async function() {
	try {
		await $.ajax({
			method: 'PUT',
			url: `/api/delComment/${$(this).attr('data-id')}`
		})
		window.location.reload()
	} catch(err) {
		console.log(err)
	}
})

$('.delSave').click(async function() {
	try {
		await $.ajax({
			method: 'PUT',
			url: `/api/removeSaved/${$(this).attr('data-id')}`
		})
		window.location.reload()
	} catch(err) {
		console.log(err)
	}
})

$('.addComment').click(async function(e) {
	e.preventDefault()
	let name = $('#name').val().trim()
	let comment = $('#commentInput').val().trim()
	console.log(name, comment)
	//If no comment text do nothing
	if(comment = '') { return }
	else {
		if(name === '') {
			try {
				await $.ajax({
					method: 'POST',
					url: `/api/articles/${$(this).attr('data-id')}`,
					data: {
						body: $('#commentInput').val().trim()
					}
				})
				window.location.reload()
			} catch(err) {
				console.log(err)
			} 
		} else {
			try {
				await $.ajax({
					method: 'POST',
					url: `/api/articles/${$(this).attr('data-id')}`,
					data: {
						name,
						body: $('#commentInput').val().trim()
					}
				})
				window.location.reload()
			} catch(err) {
				console.log(err)
			}
		}
	}	
})
