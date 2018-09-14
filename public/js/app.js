$(document).on('click', '.osrsArticle', function(e) {
	window.location = `/articles/${$(this)[0].id}`
})

$('.addComment').on('click', function(e) {
	e.preventDefault()
	let name = $('#name').val().trim()
	console.log('hello')
	if(name === '') {
		$.ajax({
			method: 'POST',
			url: `/api/articles/${$(this).attr('data-id')}`,
			data: {
				body: $('#commentInput').val().trim()
			}
		})
		.then(() => window.location.reload())
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
	}
})