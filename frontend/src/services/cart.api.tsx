import axios from "axios"

const BACKEND="http://localhost:5000"


// interface getCartResponse;
export async function getCartApi(){
    const res=await axios.get(`${BACKEND}/cart`,)
    const response=res.data
    console.log(response)
    return response?.cart||[]
  
}

export async function cartIncreaseApi(id:string){
    try{

    const res=await axios.post(`${BACKEND}/cart/increase/${id}`,id)
    const response=await res.data
    return response
    }catch(error){
        console.log((error as Error).message)
    }
}

export async function cartDecreaseApi(id:string){
    try{
    const res=await axios.post(`${BACKEND}/cart/decrease/${id}`,)
    const response=await res.data
    return response
    }catch(error){
        console.log((error as Error).message)
    }
}