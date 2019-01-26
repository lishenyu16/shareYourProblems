import axios from "axios"
export default ()=>{
    return axios.create({
        baseURL:'http://localhost:5000' // 54.193.249.19
    })
} 