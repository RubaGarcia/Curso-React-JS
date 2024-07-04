//optional chaining(?)



const al={
    nombre:"dsfsf",
    clase:"prog1",
    aprobado:true,
    examenes: {
        examen1:90
    }
}

console.log(al.examenes?.examen1)
//si existe examenes tirale con el examen 1 y que no se cague, en caso de que no esté pues lo ignora


//nullish operator(??)


const pag= null ?? 1
//pone el valor de la izq en caso de que sea nulo
