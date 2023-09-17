import Products from "../../../components/store/products";
import {StoreLayout} from "../../../components/store/storeLayout";
import LoadingCircle from "../../../components/loadingCircle";
import {useRouter} from "next/router";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

//create component that handle a data passed from getStaticProps
export default function ProductPage({product}) {
   return (
      <StoreLayout>
         <Products {...product} />
      </StoreLayout>
   );
}

// export const getServerSideProps = async ({ locale }) => ({
//     props: {
//         ...(await serverSideTranslations(locale, ['common','blogStore']))
//     }
// });

export async function getStaticPaths() {
    const res = await axios.get(`${process.env.BACKEND_URL}/store/products`)
    const products = await res.data.data
    const paths = products.map((product) => ({
        params: {id: `${product.id}`},
    }))
    return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
    const product = await axios.get(`${process.env.BACKEND_URL}/store/products/${params.id}`);
    return { props: { product: product.data.data[0],
            ...(await serverSideTranslations("ar", ['common','blogStore']))
        } }
}