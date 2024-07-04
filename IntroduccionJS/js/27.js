//performance y movidas


const url ="https://jsonplaceholder.typicode.com/comments"
const url2 = "https://jsonplaceholder.typicode.com/todos"
const url3 = "https://jsonplaceholder.typicode.com/photos"

const consultaAPI = async (url) =>{
     try{
        const inicio = performance.now()
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("AAAAAA")
        }
        const data = await response.json()
        console.log(data)

        const fin =performance.now()
        console.log(fin-inicio)
    }catch (error){
        console.log(error)
    }

}

consultaAPI(url)
consultaAPI(url2)
consultaAPI(url3)



const consultaAPIPromises = async () =>{
    try{
       const inicio = performance.now()

       const[r1,r2,r3]=await Promise.all([fetch(url),fetch(url2),fetch(url3)])

       const[d1,d2,d3] = await Promise.all([r1.json(),r2.json(),r3.json()])

       console.log(d1)
       console.log(d2)
       console.log(d3)

       const response = await fetch(url)
       if(!response.ok){
           throw new Error("AAAAAA")
       }
       const data = await response.json()
       console.log(data)

       const fin =performance.now()
       console.log(fin-inicio)
   }catch (error){
       console.log(error)
   }

}

consultaAPIPromises()