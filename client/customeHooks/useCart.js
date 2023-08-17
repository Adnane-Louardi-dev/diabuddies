import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";

const nullCart = {
    total: 0,
    subtotal: 0,
    discount: 0,
    totalItems: 0,
    venteEntries: []
}
const roundNum = (num) =>  Math.round(num*100)/100

const cartCalculationService = (entries)=>{
    return entries.reduce((entry1,entry2)=>({
        total: entry1.total + entry2.total,
        subtotal: entry1.subtotal + entry2.subtotal,
        discount: entry1.discount + entry2.discount,
        totalItems: entry1.totalItems + entry2.quantity,
    }),{
        total: 0,
        subtotal: 0,
        discount: 0,
        totalItems: 0,
    })
}
export const useGetCart = () => useQuery(["cart"],()=>{
    return JSON.parse(localStorage.getItem("my-cart")) ?? {
        total: 0,
        subtotal: 0,
        discount: 0,
        totalItems: 0,
        venteEntries: []
    }
})
export const useUpdateCart = () => {
    const [cart, setState] = useState(() => {
        // Initialize the state
        try {
            const value = window.localStorage.getItem("my-cart")
            // Check if the local storage already has any values,
            // otherwise initialize it with the passed initialValue
            return value ? JSON.parse(value) : {
                total: 0,
                subtotal: 0,
                discount: 0,
                totalItems: 0,
                venteEntries: []
            }
        } catch (error) {
            console.log(error)
        }
    })

    const queryClient = useQueryClient()

    const updateCart = (product,quantity) => {
        try {
            let currentCart = JSON.parse(window.localStorage.getItem("my-cart"))
            let newCart;
            if(!currentCart){
                newCart = {
                    venteEntries: [{
                        product: product,
                        total: product.attributes.selling_price * 1,
                        subtotal: product.attributes.original_price * 1,
                        discount: product.attributes.original_price - product.attributes.selling_price,
                        quantity: 1
                    }]
                }
                const valueToStore = {
                    ...cartCalculationService(newCart.venteEntries),
                    ...newCart
                }

                window.localStorage.setItem("my-cart", JSON.stringify(valueToStore))
                setState(valueToStore)
                queryClient.invalidateQueries(["cart"])
                return;
            }
            let existedEntry = currentCart.venteEntries.find(entry => entry.product.id === product.id);
            let existedEntryIndex = currentCart.venteEntries.findIndex(entry => entry.product.id === product.id);
            if(!!existedEntry){
                newCart = {
                    venteEntries: currentCart.venteEntries
                        .filter(entry => entry.product.id !== product.id)
                }
                console.log("between cart bro", newCart)
                const newQty = existedEntry.quantity + quantity,
                    total = roundNum(newQty*existedEntry.product.attributes.selling_price),
                    subtotal = roundNum(newQty*existedEntry.product.attributes.original_price)
                if(newQty > 0){
                    newCart = {
                        venteEntries: [...newCart.venteEntries.slice(0,existedEntryIndex), {
                            total,
                            subtotal,
                            quantity: newQty,
                            product: existedEntry.product,
                            discount: subtotal - total
                        } , ...newCart.venteEntries.slice(existedEntryIndex)]
                    }
                }
            } else {
                newCart = {
                    venteEntries: [...currentCart.venteEntries, {
                        product: product,
                        total: product.attributes.selling_price * 1,
                        subtotal: product.attributes.original_price * 1,
                        discount: product.attributes.original_price - product.attributes.selling_price,
                        quantity: 1
                    }]
                }
            }
            const valueToStore = {
                ...cartCalculationService(newCart.venteEntries),
                ...newCart
            }
            window.localStorage.setItem("my-cart", JSON.stringify(valueToStore))
            setState(valueToStore)
            queryClient.invalidateQueries(["cart"])
        } catch (error) {
            console.log(error)
        }
    }

    return {cart: {...cart}, updateCart}

}

