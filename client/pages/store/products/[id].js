import Products from "../../../components/store/products";
import {StoreLayout} from "../../../components/store/storeLayout";
import LoadingCircle from "../../../components/loadingCircle";
import {useRouter} from "next/router";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

//create component that handle a data passed from getStaticProps
export default function ProductPage() {
   const router = useRouter()
   const {data:product, isLoading,error} = useQuery(["product",router.query.id],()=>{
      return axios.get(`/api/store/product/${router.query.id}`)
          .then(res =>{
             return res.data
          })
   })
   if(isLoading || error){
      return <LoadingCircle />
   }
   console.log("prodcut",product.data)
   return (
      <StoreLayout>
         <Products {...product.data} />
      </StoreLayout>
   );
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common','blogStore']))
    }
});