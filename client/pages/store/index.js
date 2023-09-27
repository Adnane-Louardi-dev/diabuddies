import Card from "../../components/store/card";
import Categories from "../../components/store/categories";
import {StoreLayout} from "../../components/store/storeLayout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import axios from "axios";

const Home = ({products, categories}) => {

   return (
      <StoreLayout>
         <Categories categories={categories}/>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                    <Card product={product} key={product.id}/>
                )
            )}
         </div>
      </StoreLayout>
   );
};

export async function getStaticProps({locale}) {
    const products = await axios.get(`${process.env.BACKEND_URL}/store/products`).catch(()=> ({data: {data: []}}));
    const categories = await axios.get(`${process.env.BACKEND_URL}/store/categories`).catch(()=> ({data: {data: []}}));

    return {
        props: {
            products: products.data.data,
            categories: categories.data.data,
            ...(await serverSideTranslations(locale, ['common','blogStore']))
        },
    }
}

export default Home;
