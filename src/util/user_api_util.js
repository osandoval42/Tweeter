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

module.exports.clearNotifications = () => {
	return $.ajax({
		method: 'POST',
		url: `/api/clear_notifications`,
	});
}

module.exports.uploadProfileImg = (profileImg) => {
	return $.ajax({
		method: 'POST',
		url: `/api/upload_profile_img`,
		data: {profileImg}
	});
}

module.exports.uploadCoverImg = (coverImg) => {
	return $.ajax({
		method: 'POST',
		url: `/api/upload_cover_img`,
		data: {coverImg}
	});
}

module.exports.getWhoToFollow = () => {
	return $.ajax({
		method: 'GET',
		url: `/api/who_to_follow`,
	});
}