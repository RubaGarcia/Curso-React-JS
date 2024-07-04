//destructuring

const prod = {
    nombre: "Tablet",
    precio: 300,
    existe: false
}

const cliente = {
    nombre:"Cliente",
    premium:true
}
const{nombre} = prod
const{nombre: nombreCliente} = cliente

console.log(nombre)
console.log(nombreCliente)