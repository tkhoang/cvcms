import { authHeader } from '../_helpers';
 
export const crudService = {
  put,
  post
};
 
function put(url, body) {
  console.log('body:',body)
  const requestOptions = {
    method:  'PUT',
    headers: authHeader(),
    body: JSON.stringify(body)
  };
 
  return fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        console.log(response);
        return Promise.reject(response.statusText);
      }
      return response.json();
    })
}
 
 
function post(url, body) {
  console.log('body:',body)
  const requestOptions = {
    method:  'POST',
    headers: authHeader(),
    body: JSON.stringify(body)
  };
 
  return fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        console.log(response);
        return Promise.reject(response.statusText);
      }
      return response.json();
    })
}
