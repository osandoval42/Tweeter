import Like from './like_schema_only';
import Tweet from '../tweet';

module.exports = Like;

module.exports.toggleLike = (userId, tweetId, cb) => { //REVISE confirm not retweet
	Like.findOneAndRemove({userId, tweetId}, (err, deletedLike) => {
		if (err) {return cb(true);}

		if (deletedLike){
			Tweet.getTweetByIdWithAllInfo(tweetId, cb);
		} else {
			const newLike = new Like({
				userId,
				tweetId
			})
			newLike.save((err, like) => {
				if (err) {return cb(true);}

				Tweet.getTweetByIdWithAllInfo(tweetId, cb);
			})
		}
	})
}