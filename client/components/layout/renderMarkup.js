import {useGetHTML} from "../../customeHooks/useGetHTML";
import React from "react";


export const RenderMarkup = ({content}) => {
    const {data:html, isLoading} = useGetHTML(content)
    if(isLoading){
       return null
    }

    return <div className={"max-w-full mx-5 [&_ol]:list-decimal [&_code]:whitespace-normal [&>p]:py-2 [&_ul]:pb-4 [&_ul]:list-disc [&_li]:mr-4 [&_li]:mb-4 [&_a]:text-diaBlue [&_h4]:pb-2 [&_h4]:text-xl"}
                dangerouslySetInnerHTML={{__html: html}} />
}