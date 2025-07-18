import axios from "axios"

const axiosInstance=axios.create({
    baseURL:process.env.NEXT_PUBLIC_BACKEND_URL||"http://localhost:8000"
  })

axiosInstance.interceptors.request.use((config)=>{
 const token=localStorage.getItem("accessToken")
 if(token){
  config.headers.Authorization=`Bearer ${token}`
 }
 return config
  })
  
export default axiosInstance