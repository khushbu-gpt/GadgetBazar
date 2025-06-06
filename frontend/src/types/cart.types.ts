export interface CartPayload{
    productId:string,
    quantity:number
}

export interface CartItem{
productId:string,
name:string,
price:number,
subtotal:number,
image:string,
quantity:number
}

export interface getCartApiResponse{
data:{
_id:string
user:string
items:CartItem[]
 subtotal:number,
 tax:number,
 discount:number,
 totalPrice:number
    }
}

export type logOutRespose={
    auth:null
}