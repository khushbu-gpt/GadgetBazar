
export interface IUser{
    name:string,
    email:string,
    password:string,
    phone?:string,
    role:ROLE
}

export enum ROLE{
    USER="user",
    ADMIN="admin",
    CLIENT="client"
}