import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useAddToCart} from "../../customeHooks/useCart";


export const AddProductToCart = ({children, id,product}) => {
    const [added, setAdded] = useState(false);

    const {mutate:addToCart, isLoading,isSuccess} = useAddToCart()

    useEffect(()=>{
        if(!isLoading && isSuccess){
            let beggin = setInterval(() => {
                setAdded(true);
                setTimeout(() => {
                    setAdded(false);
                    clearInterval(beggin);
                }, 5000);
            }, 0);
        }
    },[isLoading])

    return <>
        {added && (
            <div className="fixed z-10  ml-3 mt-3 rounded-lg top-0 left-0 bg-yellow-400 p-4 font-rubik" role="alert">
                <p>Added to your cart!!</p>
                <p>
                    Check
                    <Link href="/store/cart">
                        <b className="capitalize cursor-pointer"> the cart </b>
                    </Link>
                    to complete your order.
                </p>
            </div>
        )}
        <div className={"flex justify-end w-full relative"} onClick={()=>{
            addToCart(product)
        }}>
            {children}
        </div>
    </>
}