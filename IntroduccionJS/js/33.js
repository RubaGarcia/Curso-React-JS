//submit

const form = document.querySelector("#formulario")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const nombre = document.querySelector("#nombre").value

    const pwd = document.querySelector("#password").value

    //prevenimos
    const alertaPrevia = document.querySelector(".alerta")
    alertaPrevia?.remove()

    const alerta = document.createElement("DIV")
    alerta.textContent="contenido de alerta"
    alerta.classList.add("alerta","text-black","uppercase", "text-sm", "text-center","p-2","font-black")
    console.log(alerta)
    
    if (pwd === "" || nombre === ""){
        alerta.textContent = "MAL"
        alerta.classList.add("bg-red-500")
    } else {
        alerta.textContent ="BIEN"
        alerta.classList.add("bg-green-500")

    }
    form.appendChild(alerta)
    setTimeout(() => {
        alerta.remove()
    }, 1000);
    // console.log("enviando")
})