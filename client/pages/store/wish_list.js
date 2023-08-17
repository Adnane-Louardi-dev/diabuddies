import {useGetWishListItems} from "../../customeHooks/wishListHooks";
import Typography from "@mui/material/Typography";
import LoadingCircle from "../../components/loadingCircle";
import {WishedProducts} from "../../components/store/wishedProducts";
import {StoreLayout} from "../../components/store/storeLayout";


export default function Wish_list() {
    const {wishedProducts, isLoading} = useGetWishListItems()


    if(isLoading){
        return <LoadingCircle />
    }
    return <StoreLayout>
        <Typography typography={"h4"} textAlign={"center"}>My WishList</Typography>
        <WishedProducts wishedProducts={wishedProducts} />
    </StoreLayout>
}