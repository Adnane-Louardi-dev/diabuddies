import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";


export const useToggleWishItem = () => {
    const queryClient = useQueryClient()

    const result = useMutation({
        mutationKey: ["toggleWishItem"],
        mutationFn: (productId) => {
            return axios.post(`/api/wishList?id=${productId}`)
        },
        onMutate: async (productId)=>{
            await queryClient.cancelQueries(["wishList"])
            const previousWishList = queryClient.getQueryData(["wishList"])
            const productIdx = previousWishList.indexOf(productId);
            let newWishList
             if(productIdx!== -1){
                 newWishList = previousWishList.slice(productIdx,1)
            } else {
                 newWishList = [...previousWishList, productId]
             }
            queryClient.setQueryData(["wishList"], newWishList)
        },
        onError: (err,productId,context) => {
            console.log("ctx", context)
            queryClient.setQueryData(["wishList"],context.wishedProducts)
        },
        onSettled: () => {
            queryClient.invalidateQueries(["wishList"])
        }
    })

    return {...result, toggleWishItem: result.mutate}
}

export const useGetWishListItems = () => {
    const result = useQuery({
        queryKey: ["wishList"],
        queryFn: async () => {
            const {data} =  await axios.get("/api/wishList")
            return data
        },
    })
    return {...result, wishedProducts: result.data}
}

