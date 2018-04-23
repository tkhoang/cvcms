export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'));
 
  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token,'content-type': 'application/x-www-form-urlencoded' };
  } else {
    return {};
  }
}
