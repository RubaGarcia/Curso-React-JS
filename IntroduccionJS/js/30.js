//clicks
const heading = document.querySelector(".heading")
//retorna todos
const enlaces = document.querySelectorAll(".navegacion a")

enlaces.forEach(enlace=>{
    enlace.addEventListener("click", (e)=>{
        e.preventDefault()
        console.log(e)
        e.target.textContent = "CLICK"
        console.log("kjsdfhgk")
    })
})

// heading.addEventListener("click", ()=>{
//     heading.textContent("nuevo heading de noseque")
// })