import {useGetWishListItems} from "../../customeHooks/wishListHooks";
import Typography from "@mui/material/Typography";
import LoadingCircle from "../../components/loadingCircle";
import {StoreLayout} from "../../components/store/storeLayout";
import Card from "../../components/store/card";


export default function Wish_list() {
    const {wishedItems, isLoading} = useGetWishListItems("product")


    if(isLoading){
        return <LoadingCircle />
    }
    return <StoreLayout>
        <Typography typography={"h4"} textAlign={"center"}>My WishList</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishedItems.map((product) => (
                    <Card product={product} key={product.id}/>
                )
            )}
        </div>
    </StoreLayout>
}