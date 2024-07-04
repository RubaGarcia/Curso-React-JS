//selectores

const heading = document.querySelector(".heading")
//retorna todos
const enlaces = document.querySelectorAll(".navegacion a")

heading.textContent ="un nuevo heading"
heading.id = "nuevo id"
heading.removeAttribute("id")

const inputnombre = document.querySelector("#nombre")
inputnombre.value ="skldjfkl"

enlaces.forEach(enlace=>enlace.textContent="nuevoEnlace")