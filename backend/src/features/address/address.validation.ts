import { z } from "zod";

export const addressSchema=z.object({
    fullname:z.string().min(3,"Fullname is required"),
    phone:z.string().regex(/^\d{9}$/,"phone num must be 9 digits"),
    city:z.string().min(3,"City is required"),
    state:z.string().min(3,"State is required"),
    country:z.string().optional(),
    address1:z.string().min(3,"Address1 is required"),
    address2:z.string().min(3,"Address 2 ").optional(),
    pincode:z.string().regex(/^[1-9]{6}$/, "Pincode must be a valid 6-digit number"),
})


export const createAddressSchema=z.object({
    uid:z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
     address:addressSchema,
})
export const getAddressByUid=z.object({
    uid:z.string().regex(/^[a-f\d]{24}$/i,"uid sould be valid"),
})

export const updateAddress=addressSchema.partial()

export const getAddressById=z.object({
    id:z.string().regex(/^[a-f\d]{24}$/i,"Id sould be valid")
})

export const deleteAddressById=getAddressById


export type getAddressBYId=z.infer<typeof getAddressById>
export type zodaddress=z.infer<typeof addressSchema>
export type updateByZodaddress=z.infer<typeof updateAddress>
