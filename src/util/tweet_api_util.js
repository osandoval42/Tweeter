export const fetchAllTweets = () => { //REVISE ADD LAST ID
  return $.ajax({
    method: 'GET',
    url: '/api/feed_tweets',
  });
};
