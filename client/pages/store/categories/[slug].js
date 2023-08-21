import Card from "../../../components/store/card";
import Categories from "../../../components/store/categories";
import axios from "axios";
import {useAxios} from "../../../customeHooks/useAxios";
import {useRouter} from "next/router";
import LoadingCircle from "../../../components/loadingCircle";
import {useQuery} from "@tanstack/react-query";

export default function CategoriesPage() {
    const router = useRouter()
    const { data: categories, isLoading} = useAxios("get","/api/store/categories")
    const {data:products, isLoading:isProductsLoading,error} = useQuery(["category",router.query.slug],()=>{
        return axios.get(`/api/store/categories/${router.query.slug}`)
            .then(res =>{
                return res.data
            })
    })
    if(isProductsLoading || isLoading){
        return <LoadingCircle />
    }
    console.log(categories, products, "hiiii",router.query)
   return (
      <>
         <Categories categories={categories?.data} />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.data.map((product) => (
                <Card product={product} key={product.id} />
            ))}
         </div>
      </>
   );
}
// export async function getStaticPaths() {
//    const { data: categories } = await axios.get("/api/store/categories")
//        .catch(()=>({
//           data:{
//             data:[]
//           }
//        }));
//    return {
//       paths: categories.data.map((category) => ({
//          params: {
//             slug: category.slug,
//          },
//       })),
//       fallback: false,
//    };
// }
// export async function getStaticProps({ params }) {
//    const { slug } = params;
//    const { data: products } = await axios.get(`/api/store/categories/${slug}`);
//    const { data: categories } = await axios.get("/api/store/categories");
//    return {
//       props: {
//          products: products.data,
//          categories: categories.data
//       },
//    };
// }
