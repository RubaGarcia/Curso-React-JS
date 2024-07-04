//async await

const url ="https://jsonplaceholder.typicode.com/comments"

const consultaAPI = async () =>{
     try{
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("AAAAAA")
        }
        const data = await response.json()
        console.log(data)
    }catch (error){
        console.log(error)
    }
}

consultaAPI()