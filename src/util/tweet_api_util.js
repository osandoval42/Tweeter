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

export const replyTweet = (original, content) => { //REVISE ADD LAST ID
  return $.ajax({
    method: 'POST',
    url: '/api/tweet_reply',
    data: {content, original}
  });
};

export const postRetweet = (originalTweetId) => {
    return $.ajax({
    method: 'POST',
    url: '/api/retweet',
    data: {originalTweetId}
  });
}

export const deleteRetweet = (retweetId) => {
    return $.ajax({
    method: 'DELETE',
    url: '/api/retweet',
    data: {retweetId}
  });
}


