//eventos del DOM inputs
const inputnom = document.querySelector("#nombre")
inputnom.addEventListener("input",(e)=>{
    console.log(e.target.value)
})

const inputPass = document.querySelector("#password")
inputPass.addEventListener("input", functionPassword)

function functionPassword(){
    inputPass.type = "text"
    setTimeout(() => {
        inputPass.type = "password"
    }, 500);
}