import React, {useEffect, useState} from "react";
import {useGetWishListItems, useToggleWishItem} from "../../customeHooks/wishListHooks";


export const WishedIcon = ({productId}) => {
    const {toggleWishItem, isLoading:toggleProductLoading} = useToggleWishItem()
    const {wishedProducts, isLoading} = useGetWishListItems()
    const [isWished, setIsWished] = useState(undefined)

    useEffect(()=>{
        if(!isLoading){
            setIsWished(wishedProducts.indexOf(productId) !== -1)
        }
    },[isLoading])

    return !isLoading ?
        <button onClick={()=>{
            if(!toggleProductLoading){
                toggleWishItem(productId)
                setIsWished((wished) => !wished)
            }
        }}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 key={productId}
                     className={`h-8 w-8 stroke-current text-red-500 
                     ${isWished ? "fill-current" : "fill-none"}
                     `} viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        </button>: <></>
}