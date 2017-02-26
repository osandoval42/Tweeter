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

module.exports.fetchFollowers = (followedId) => {
	return $.ajax({
		method: 'GET',
		url: `/api/${followedId}/followers`
	});
}


module.exports.fetchUsersBeingFollowed = (followerId) => {
	return $.ajax({
		method: 'GET',
		url: `/api/${followerId}/following`
	});
}

module.exports.toggleFollow = (followedUserId) => {
	return $.ajax({
		method: 'POST',
		url: `/api/follow`,
		data: {toFollowId: followedUserId}
	});
}