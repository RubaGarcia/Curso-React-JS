export type Guitar={
    id:number
    name:string
    image:string
    description:string
    price:number
}

export type CartItem = Guitar & {
    //herencia de Guitar
    quantity:number
}

// export type GuitarID = Guitar['id']

// export interface CartItem extends Guitar {
//     quantity:number
// }

