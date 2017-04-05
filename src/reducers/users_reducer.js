import {
	RECEIVE_USERS,
	RESET_USERS
} from '../constants/constants';

const users = {};

const populateUsers = (usersArr) => {
	const users = {};
	usersArr.forEach((user) => {
		users[user['_id']] = user;
	})
	return users;
}

const UsersReducer = (state = users, action) => {
	switch(action.type){
		case RECEIVE_USERS:
			return populateUsers(action.users);
		case RESET_USERS:
			return state;
		default:
			return state;
	}
};

export default UsersReducer;