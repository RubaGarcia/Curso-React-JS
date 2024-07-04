//fetch API

const url ="https://jsonplaceholder.typicode.com/comments"

fetch(url)
    .then((response) =>{
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch(error =>{
        console.log(error)
    })