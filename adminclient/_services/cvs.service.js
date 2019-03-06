import { authHeader } from '../_helpers';
 
export const cvsService = {
  getAll,
  addCv,
  deleteCv 
};
 
function getAll() {

  const requestOptions = {
    method:  'GET',
    headers: authHeader()
  };
 
  return fetch('/api/cvs', requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    })
}
 
 
function addCv(cvname) {
  var body = {"title": cvname}; 
  const requestOptions = {
    method:  'POST',
    headers: authHeader(),
    body: JSON.stringify(body)
  };
 
  return fetch('/api/cvs', requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    })
}

function deleteCv(id) {

  const requestOptions = {
    method:  'DELETE',
    headers: authHeader()
  };
 
  return fetch('/api/cvs/'+id, requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    })
}
