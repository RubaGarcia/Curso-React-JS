//arrays

const movidas = [1,2,3]
console.table(movidas)

movidas.push(123456789)

console.table(movidas)

//asi no cambias el array previo
const nuevoArray = [...movidas,"AAAAA"]
console.table(nuevoArray)


nuevoArray.shift()
console.table(nuevoArray)
//quitamos el primer valor

const movidas2 = nuevoArray.filter(function(tech){
    console.log(tech)
})