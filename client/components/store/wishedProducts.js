import {useQueries} from "@tanstack/react-query";
import commerce from "../../lib/commerce";
import LoadingCircle from "../loadingCircle";
import Card from "./card";


export const WishedProducts = ({wishedProducts}) => {
    const result = useQueries({
        queries: wishedProducts.map((productId) => {
            return {
                queryKey: ["product",productId],
                queryFn: async () => {
                    return await commerce.products.retrieve(productId,{
                        type: "id"
                    })
                }
            }
        }),
    })

    if(!result){
        return <LoadingCircle />
    }
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {result.map(({isErrore, isLoading, data:product}) => {
            if(isLoading) return null
            return !isErrore ? <Card {...product} key={product.id} /> : null
        })}
    </div>
}