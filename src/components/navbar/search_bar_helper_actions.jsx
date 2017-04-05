import API_Util from '../../util/user_api_util';

module.exports.searchUsers = (substr, cb) => {
	API_Util.searchUsers(substr).then(users => {
		cb(users);
	})
}