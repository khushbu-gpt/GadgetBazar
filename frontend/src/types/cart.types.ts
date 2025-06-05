export interface Product{
    _id:string,
    title:string,
    price:number
}

export interface intialValue{
cart:Product[],
loading:boolean,
error:string
}
