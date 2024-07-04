//submit

const form = document.querySelector("#formulario")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const nombre = document.querySelector("#nombre").value

    const pwd = document.querySelector("#password").value

    if (pwd === "" || nombre === ""){
        console.log("MAL")
    } else {
        console.log(nombre +"," +pwd)
        console.log("BIEN")
    }
    console.log("enviando")
})