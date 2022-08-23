import axios, { AxiosResponse } from "axios";
import { request } from "http";
import { Activity } from "../models/activity";

const sleep=(delay:number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay);
    })
}

axios.defaults.baseURL="http://localhost:5000/api";

axios.interceptors.response.use(async (response)=>{
    try{
        await sleep(1000)
        return response;
    }
    catch(error){
        console.log(error);
        return await Promise.reject(error);
    }
})


const ResponseBody=<T>(respoonse: AxiosResponse<T>)=> respoonse.data;

const Requests={
    get:<T> (url:string) => axios.get<T>(url).then(ResponseBody),
    post:<T> (url:string,body:{}) => axios.post<T>(url,body).then(ResponseBody),
    put:<T> (url:string,body:{}) => axios.put<T>(url,body).then(ResponseBody),
    del:<T> (url:string) => axios.delete<T>(url).then(ResponseBody),
}

const Activities={
    list:()=>Requests.get<Activity[]>("/activities"),
    details:(id:string)=>Requests.get<Activity>("/activities/"+id),
    delete:(id:string)=>Requests.del<void>(`/activities/${id}`),
    update:(activity:Activity)=>Requests.put('/activities/'+activity.id,activity),
    create:(activity:Activity)=>Requests.post('/activities',activity)
}

const Agent ={
    Activities
}

export default Agent;