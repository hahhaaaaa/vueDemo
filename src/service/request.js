// import fetch from 'dva/fetch';

function parseJSON(response) {
    return response.json();
  }
  
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  
  /**
   * Requests a URL, returning a promise.
   *
   * @param  {string} url       The URL we want to request
   * @param  {object} [options] The options we want to pass to "fetch"
   * @return {object}           An object containing either "data" or "err"
   */
  export function request(url, options) {
    return fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => ({
        data
      }))
      .catch(err => ({
        err
      }));
  }
  export function getData(url,data){
   
    return fetch(url,{
      body:JSON.stringify(data),
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    }).then(checkStatus)
    .then(parseJSON)
    .then(data => ({
      data
    }))
    .catch(err => ({
      err
    }))
  }
  export function getFormData(url,formData){
       return new Promise((resolve, reject) =>{
            fetch(url,{
              method:'post',
              body:JSON.stringify(formData),
              headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
              }),
    
          }).then(res=>{
            console.log(res)
            resolve(res.json());
            
          })
        }
      )
  }
  