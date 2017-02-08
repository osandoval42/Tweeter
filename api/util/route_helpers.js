const routeHelpers = {
	ensureLoggedIn(currUser, res){
		if (currUser == undefined){
			res.status(401).send({"error": "You must be logged in to perform this action"}); 
			return false;
		} else {
			return true;
		}
	}
}

module.exports = routeHelpers;