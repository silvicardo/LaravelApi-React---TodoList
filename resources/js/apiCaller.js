const apiUrl = '/api/todos/';

//CREATE

export async function createTodo(todo){
  return fetch(apiUrl,
    { method: 'post',
      headers: new Headers({'Content-type': 'application/json'}),
      body: JSON.stringify(todo)
    })
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
      //Caso success
      return response.json();
})
}

//READ
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

//UPDATE

export async function updateTodoCompletionStatus(todo){

  return fetch(apiUrl + todo.id,
        { method: 'post',
          headers: new Headers({'Content-type': 'application/json'}),
          body: JSON.stringify({completed : !todo.completed})
        })
    .then(response => {

      console.log(response);

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

//DESTROY
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
