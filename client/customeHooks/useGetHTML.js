import {useEffect, useState} from "react";
import {remark} from "remark";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";


export const useGetHTML = (content) => {
    const [data,setData] = useState()

    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        remark()
            .use(remarkParse)
            .use(remarkHtml)
            .process(content)
            .then((res)=>{
                setData(res.value)
            })
            .finally(()=>{
                setIsLoading(false)
            })
    },[])

    return {data, isLoading}
}