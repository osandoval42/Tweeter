module.exports.searchUsers = (query) => {
	return $.ajax({
		method: 'GET',
		url: `/api/search_users?substr=${query}`
	});
}