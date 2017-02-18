export const fetchAllTweets = () => { //REVISE ADD LAST ID
	console.log('get tweets in util');
  return $.ajax({
    method: 'GET',
    url: '/api/feed_tweets',
  });
};
