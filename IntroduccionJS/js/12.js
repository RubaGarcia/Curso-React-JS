const cosas = [1,2,3,4,5,6,7,8,9,0]

cosas.forEach(function(a){
    console.log(a+1)
})
//map genera un nuevo array
console.log(cosas)

for(let a of cosas){
    console.log(a)
}