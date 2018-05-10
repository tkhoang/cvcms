import { authHeader } from '../_helpers';
 
export const cvService = {
  getCv
};
 
function getCv(id) {

  const requestOptions = {
    method:  'GET',
    headers: authHeader()
  };
 
  return fetch('/api/cv/'+id, requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    })
}
 
 
