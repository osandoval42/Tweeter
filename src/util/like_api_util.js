export const toggleLike = (tweetId) => { //REVISE ADD LAST ID
  return $.ajax({
    method: 'POST',
    url: '/api/like',
    data: {tweetId}
  });
};