import {useGetWishListItems} from "../../customeHooks/wishListHooks";
import Typography from "@mui/material/Typography";
import LoadingCircle from "../../components/loadingCircle";
import {StoreLayout} from "../../components/store/storeLayout";
import Card from "../../components/store/card";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";


export default function Wish_list() {
    const {wishedItems, isLoading} = useGetWishListItems("product")
    const {t} = useTranslation()

    if(isLoading){
        return <LoadingCircle />
    }
    return <StoreLayout>
        <Typography typography={"h4"} textAlign={"center"}>{t("my_wishlist")}</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishedItems.map((product) => (
                    <Card product={product} key={product.id}/>
                )
            )}
        </div>
    </StoreLayout>
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    }
});