const apiUrl = '/api/todos/';

export async function getTodos(){
  return fetch(apiUrl)
    .then(response => {

      //Error Handling
      if(!response.ok){
        if(response.status >= 400 && response.status < 500){
          return response.json().then(data => {
            let err ={errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Server off, retry later'}
        }
      }
      //Caso success
      return response.json();
    })
}

export async function destroyTodo(id){
  return fetch(apiUrl + id + '/delete', { method: 'post'})
    .then(response => {

      //Error Handling
      if(!response.ok){
        if(response.status >= 400 && response.status < 500){
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'Server off, retry later'}
        }
      }
      //Caso deletion success
      return response.json();
})
}
