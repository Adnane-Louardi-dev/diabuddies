import {useEffect, useState} from "react";
import axios from "axios";


export const useAxios = (method,url,body=null,header=null) => {
    const [data,setData] = useState(undefined);
    const [isLoading,setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        axios[method](url,JSON.parse(body),JSON.parse(header))
            .then((res)=>{
                setData(res.data)
            })
            .catch((err)=>{
                setError(err)
            })
            .finally(()=>{
                setIsLoading(false)
            })
    }, []);
    return {data,isLoading,error}
}