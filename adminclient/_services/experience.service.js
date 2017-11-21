import { authHeader } from '../_helpers';
 
export const experienceService = {
  getAll 
};
 
function getAll(username, password) {

  console.log(authHeader());

  const requestOptions = {
    method:  'GET',
    headers: authHeader()
  };
 
  return fetch('/api/infos', requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
 
      return response.json();
    })
    .then(experiences => {
      console.log ('user :',experiences);
    });
}
 
 
