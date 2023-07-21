import commerce from "../../lib/commerce";
import Card from "../../components/store/card";
import Categories from "../../components/store/categories";
import {useRouter} from "next/router";
import {StoreLayout} from "../../components/store/storeLayout";

const Home = ({ products , categories}) => {
    const router = useRouter()

    // const {data,isLoading} = useQuery({
    //     queryKey: ["authUser"],
    //     queryFn: async () => {
    //         commerce.customer.login("ahmed.tanalt666@gmail.com","https://localhost:3001/").then(token => {
    //             console.log("token", token)
    //         })
    //         commerce.customer.getToken('1ae420a5-2f43-426f-8a61-516eabb56d33').then((jwt) => console.log(jwt));
    //         return commerce.customer.login("ahmed.tanalt666@gmail.com","https://localhost:3001/")
    //     }
    // })
    // console.log(data)
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