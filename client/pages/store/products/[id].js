import Products from "../../../components/store/products";
import commerce from "../../../lib/commerce";
import {StoreLayout} from "../../../components/store/storeLayout";

//fetch the product that have the clicked permalink
export async function getStaticProps({ params }) {
   const { id } = params;

   const product = await commerce.products.retrieve(id, {
      type: "id",
   });

   return {
      props: {
         product,
      },
   };
}

//create all possible paths for products section
export async function getStaticPaths() {
   const { data: products } = await commerce.products.list();
   return {
      paths: products.map((product) => ({
         params: {
            id: product.id,
         },
      })),
      fallback: false,
   };
}

//create component that handle a data passed from getStaticProps
export default function ProductPage({ product }) {
   return (
      <StoreLayout>
         <Products {...product} />
      </StoreLayout>
   );
}
