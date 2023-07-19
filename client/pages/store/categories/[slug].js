import commerce from "../../../lib/commerce";
import Card from "../../../components/store/card";
import Categories from "../../../components/store/categories";
import Head from "next/head";
import Link from "next/link";

export default function Categoriespage({ products }) {
   return (
      <>
         <Head>
            <title>{`Edona | ${products[0].categories[0].name}`}</title>
         </Head>
         <Categories />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
               <div className="mx-auto my-7" key={product.id}>
                  <Link href={`/products/${product.permalink}`} passHref={true}>
                        <Card {...product} />
                  </Link>
               </div>
            ))}
         </div>
      </>
   );
}
export async function getStaticPaths() {
   const { data: categories } = await commerce.categories.list();
   return {
      paths: categories.map((category) => ({
         params: {
            slug: category.slug,
         },
      })),
      fallback: false,
   };
}
export async function getStaticProps({ params }) {
   const { slug } = params;
   const { data: products } = await commerce.products.list({
      category_slug: [slug],
   });
   return {
      props: {
         products,
      },
   };
}
