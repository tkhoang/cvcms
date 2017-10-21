class SessionApi {
  static login(credentials) {
    //debugger;
    
    var details = {
      'username': credentials.username,
      'password': credentials.password,
      'grant_type': 'password'
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const request = new Request(`/api/oauth2/token`, {
      method: 'POST',
      headers: new Headers({
        'Authorization':'Basic '
           +btoa(credentials.username+':'+credentials.password),
        'Content-Type': 'application/x-www-form-urlencoded'
      }), 
      body:formBody
    });

    return fetch(request).then(response => {
      //return response.json();  
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).catch(error => {
      return error;
    });
  } 
}

export default SessionApi;
