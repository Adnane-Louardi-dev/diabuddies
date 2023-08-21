import Card from "../../components/store/card";
import Categories from "../../components/store/categories";
import {useRouter} from "next/router";
import {StoreLayout} from "../../components/store/storeLayout";
import {useAxios} from "../../customeHooks/useAxios";
import LoadingCircle from "../../components/loadingCircle";

const Home = () => {
    const router = useRouter()
    const {data:products, isLoading:isLoadingProducts} = useAxios(
        "get",
        "/api/store/products"
    )
    const {data:categories, isLoading:isLoadingCategories, error} = useAxios(
        "get",
        "/api/store/categories"
    )
    if(isLoadingProducts || isLoadingCategories){
        return <LoadingCircle />
    }
    console.log("products",products, categories)
   return (
      <StoreLayout>
          {categories && <Categories categories={categories?.data}/>}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.data.map((product) => (
                    <Card product={product} key={product.id}/>
                )
            )}
         </div>
      </StoreLayout>
   );
};

export default Home;