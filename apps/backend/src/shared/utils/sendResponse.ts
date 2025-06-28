import { Response } from "express"

export type JSONResponse={
    status?:"success"|"error",
    data?:any,
   status_code?:number,
   message?:string
}
export function sendResponse(resObj:Response,res:JSONResponse={}):Response{
const {data=null,status="success", status_code=200,message="operation success"}=res
return resObj.status(status_code).json({
    data,
    status_code,
    message,
    status
})
}