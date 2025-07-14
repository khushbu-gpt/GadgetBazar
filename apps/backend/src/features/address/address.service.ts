import { AppError } from "../../shared/utils/AppError"
import { AddressModel } from "./address.model"
import { getAddressBYId, updateByZodaddress, zodaddress } from "./address.validation"

export const createAddress=async(data:zodaddress,)=>{
 return await AddressModel.create(data)
 
}

export const getAddressById=async(id:getAddressBYId)=>{
    return await AddressModel.findById(id)
}

export const getAddress=async(uid:string)=>{
    const address=await AddressModel.find({id:uid}).lean()
    if(!address) throw new AppError("Address not found",400)
    return address
}

export const updateAddress=async(data:updateByZodaddress,id:getAddressBYId)=>{
    const address=await AddressModel.findByIdAndUpdate(id,data,{new:true})
    if(!address) throw new AppError("Address not found",400)
    return address
  }

  export const deleteAddress=async(id:getAddressBYId)=>{
    const address=await AddressModel.findByIdAndDelete(id)
    if(!address) throw new AppError("Address not found",404)
    return address
  }