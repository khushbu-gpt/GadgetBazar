import argon2 from "argon2"

export async function hashPassword(text:string){
    if(!text) throw new Error("Password is not hashed")
return await argon2.hash(text)
}

export async function verifyPassword(password:string,hashPassword:string){
    if(!password||!hashPassword) throw new Error("Passwords are  not verified")
     return await argon2.verify(hashPassword,password,)
}