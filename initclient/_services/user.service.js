import { authHeader } from '../_helpers';
 
export const userService = {
  register,
 // getByLogin,
};
 
function register(user) {

  var details = {
    'username': user.username,
    'password': user.password,
    'email': user.email
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const requestOptions = {
    method: 'POST',
headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
    body: formBody 
  };
 
  return fetch('/api/users', requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
 
      return response.json();
    })
    .then(user => {
      console.log ('user :',user);
      if (user.message=='unique_constraint'){
        return Promise.reject('username already exists!'); 
      }
      return user;
    });
}
 
 
 
function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
 
  return response.json();
}
