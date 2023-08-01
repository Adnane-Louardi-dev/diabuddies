import React, {useEffect, useState} from "react";
import {useGetWishListItems, useToggleWishItem} from "../../customeHooks/wishListHooks";
import {debounce} from "@mui/material";
import IconButton from "@mui/material/IconButton";


export const WishedIcon = ({itemId,type}) => {
    const {toggleWishItem, isLoading:toggleProductLoading} = useToggleWishItem(type)
    const {wishedItems, isLoading} = useGetWishListItems(type)
    const [isWished, setIsWished] = useState(undefined)

    useEffect(()=>{
        if(!isLoading){
          setIsWished(wishedItems.find(item => item.id === itemId))
        }
    },[isLoading])


    return !isLoading ?
        <IconButton onClick={debounce(()=>{
            if(!toggleProductLoading){
                toggleWishItem(itemId)
                setIsWished((wished) => !wished)
            }
        },300)}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 key={itemId}
                     className={`h-8 w-8 stroke-current text-red-500 
                     ${isWished ? "fill-current" : "fill-none"}
                     `} viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        </IconButton>: <></>
}