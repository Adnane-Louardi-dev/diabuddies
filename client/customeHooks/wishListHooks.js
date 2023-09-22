import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";


export const useToggleWishItem = (type) => {
    const queryClient = useQueryClient()

    const result = useMutation({
        mutationKey: ["toggleWishItem"],
        mutationFn: (itemId) => {
            return axios.post(`/api/wishList/${type}?id=${itemId}`)
        },
        onMutate: async (itemId)=>{
            itemId = String(itemId)
            await queryClient.cancelQueries(["wishList",type])
            const previousWishList = queryClient.getQueryData(["wishList",type])
            let newWishList
            const item = previousWishList.find((item) => item.id === itemId)
            if(item){
                newWishList = previousWishList.filter((item) => item.id !== itemId)
            }
            newWishList = [...previousWishList, {id: itemId}]

            queryClient.setQueryData(["wishList",type], newWishList)
        },
        onError: (err,productId,context) => {
            queryClient.setQueryData(["wishList",type],context.wishedProducts)
        },
        onSettled: () => {
            queryClient.invalidateQueries(["wishList",type])
        }
    })

    return {...result, toggleWishItem: result.mutate}
}

export const useGetWishListItems = (type) => {
    const result = useQuery({
        queryKey: ["wishList",type],
        queryFn: async () => {
            const {data} = await axios.get(`/api/wishList/${type}`)
            return data
        },
    })
    return {...result, wishedItems: result.data}
}

