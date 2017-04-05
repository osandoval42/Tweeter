export const toggleFollowRicky = () => {
  return $.ajax({
    method: 'POST',
    url: '/api/follow',
    data: {toFollowId: "5899a8514fe17044939a56cc"}
  });
}