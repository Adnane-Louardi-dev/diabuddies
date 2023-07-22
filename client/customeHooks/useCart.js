import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import commerce from "../lib/commerce";


const roundNum = (num) =>  Math.round(num*100)/100
export const useGetCart = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            return await commerce.cart.retrieve()
        }
    })
}

const cartCalculationService = (cart)=>{
    let cartSubTotal = cart.line_items
        .map(line_item => line_item.line_total.raw)
        .reduce((a,b)=> a+b, 0)
    cartSubTotal = roundNum(cartSubTotal)
    const subTotal = {
        formatted: `${cartSubTotal}`,
        formatted_with_code: `${cartSubTotal} MAD`,
        formatted_with_symbol: `DH${cartSubTotal}`,
        raw: cartSubTotal
    }
    const totalItems = cart.line_items.map(line_item => line_item.quantity).reduce((a,b)=>  a+b, 0)
    return [subTotal,totalItems]
}

export const useUpdateCart = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['cartUpdate'],
        mutationFn: ({productId, quantity}) => {
            commerce.cart.update(productId, {quantity})
        },
        onMutate: async ({productId, quantity, price}) => {
            await queryClient.cancelQueries(["cart"])
            const cart = queryClient.getQueryData(["cart"])
            const productIdx = cart.line_items.findIndex(product => product.id === productId);
            cart.line_items[productIdx].quantity = quantity
            const lineTotal = roundNum(price * quantity)
            cart.line_items[productIdx].line_total = {
                formatted: `${lineTotal}`,
                formatted_with_code: `${lineTotal} MAD`,
                formatted_with_symbol: `DH${lineTotal}`,
                raw: lineTotal
            }
            const [subTotal, cartTotalItems] = cartCalculationService(cart)
            cart.subtotal = subTotal
            cart.total_items = cartTotalItems
            cart.manuallyUpdated = true
            queryClient.setQueryData(["cart"], cart)
        },
        onError: (err, {productId, quantity}, context) => {
            console.log("ctx", context)
            queryClient.setQueryData(["cart"], context.cart)
        },
        onSettled: () => {
            queryClient.invalidateQueries(["cart"])
        }
    });
}
export const useAddToCart = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["addToCart"],
        mutationFn: (product) => {
            return commerce.cart.add(product.id,1);
        },
        onMutate: async (product) => {
            await queryClient.cancelQueries(["cart"])
            const cart = queryClient.getQueryData(["cart"])
            product.quantity = 1
            product.line_total = product.price
            cart.line_items.push(product)
            console.log("line itmes", cart.line_items)
            const [subTotal, cartTotalItems] = cartCalculationService(cart)
            cart.subtotal = subTotal
            cart.total_items = cartTotalItems
            cart.manuallyUpdated = true
            queryClient.setQueryData(["cart"], cart)
        },
        onError: (err, product, context) => {
            console.log("ctx", context)
            queryClient.setQueryData(["cart"], context.cart)
        },
        onSettled: () => {
            queryClient.invalidateQueries(["cart"])
        }
    });
}
export const useDeleteCartItem = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["deleteItemFromCart"],
        mutationFn: (productId) => {
            commerce.cart.remove(productId)
        },
        onMutate: async (productId) => {
            await queryClient.cancelQueries(["cart"])
            let cart = queryClient.getQueryData(["cart"])
            cart = {...cart, line_items: cart.line_items.filter(line_item => line_item.id !== productId)}
            const [subTotal, totalItems] = cartCalculationService(cart)
            cart.subtotal = subTotal
            cart.total_items = totalItems
            queryClient.setQueryData(["cart"], cart)
        },
        onSettled: () => {
            queryClient.invalidateQueries(["cart"])
        }
    })
}
