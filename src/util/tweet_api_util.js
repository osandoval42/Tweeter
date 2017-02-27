export const fetchAllTweets = () => { //REVISE ADD LAST ID
  return $.ajax({
    method: 'GET',
    url: '/api/feed_tweets',
  });
};

export const fetchAllUserProfileTweets = (userId) => { //REVISE ADD LAST ID
  return $.ajax({
    method: 'GET',
    url: `/api/user_tweets?userId=${userId}`,
  });
};

export const fetchNonReplyProfileTweets = (userId) => { //REVISE ADD LAST ID
  return $.ajax({
    method: 'GET',
    url: `/api/user_tweets_without_replies?userId=${userId}`,
  });
};

export const fetchTweetsUserLikes = (userId) => { //REVISE ADD LAST ID
  return $.ajax({
    method: 'GET',
    url: `/api/tweets_user_likes?userId=${userId}`,
  });
};

export const postTweet = (content) => { //REVISE ADD LAST ID
  return $.ajax({
    method: 'POST',
    url: '/api/tweet',
    data: {content}
  });
};


