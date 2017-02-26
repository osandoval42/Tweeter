module.exports.searchUsers = (query) => {
	return $.ajax({
		method: 'GET',
		url: `/api/search_users?substr=${query}`
	});
}

module.exports.fetchProfileUser = (username) => {
	return $.ajax({
		method: 'GET',
		url: `/api/profile_user?username=${username}`
	});
}