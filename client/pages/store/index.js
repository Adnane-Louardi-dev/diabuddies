import commerce from "../../lib/commerce";
import Card from "../../components/store/card";
import Categories from "../../components/store/categories";
import {useRouter} from "next/router";
import {StoreLayout} from "../../components/store/storeLayout";

const Home = ({ products , categories}) => {
    const router = useRouter()

   return (
      <StoreLayout>
         <Categories />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                    <Card {...product}
                          key={product.id}/>
                )
            )}
         </div>
      </StoreLayout>
   );
};


export async function getStaticProps() {
   const { data: products } = await commerce.products.list();
   const { data: categories } = await commerce.categories.list();
   return {
      props: {
         products,
         categories,
      },
   };
}

export default Home;