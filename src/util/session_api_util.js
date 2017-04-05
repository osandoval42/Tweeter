export const login = (user) => {
  return $.ajax({
    method: 'POST',
    url: '/api/login',
    data: {user}
  });
};

export const signup = (user) => {
  return $.ajax({
    method: 'POST',
    url: '/api/signup',
    data: {user}
  });
};

export const logout = () => {
  return $.ajax({
    method: 'DELETE',
    url: '/api/logout'
  });
};