import Link from "next/link";

const Categories = ({categories}) => {
    console.log("cat", categories)
   return (
      <div className="my-3 pl-3 overflow-hidden font-rubik">
         <h1 className="text-2xl mt-5">Categories</h1>

         <div className={`noScrollbar my-5 flex overflow-x-auto`}>
            <Link href="/store" passHref={true}>
               <button type="submit" className="rounded-lg flex-none h-12 w-24 sm:h-12 sm:w-28 px-6 shadow-md bg-yellow-400 m-3 hover:bg-transparent hover:ring-2 hover:ring-yellow-400 focus:bg-blue-50 focus:ring-2 focus:ring-yellow-400">
                  <h4>All</h4>
               </button>
            </Link>
            {categories.map(({id,attributes:category}) => <Link href={`/store/categories/${category.slug}`} key={category.name}>
               <button type="submit"
                       className="rounded-lg flex-none h-12 sm:h-12 px-6 w-fit shadow-md bg-yellow-400 m-3 hover:bg-transparent hover:ring-2 hover:ring-yellow-400 focus:bg-blue-50 focus:ring-2 focus:ring-yellow-400">
                  <h4>{category.name}</h4>
               </button>
            </Link>)}
         </div>
      </div>
   );
};

export default Categories;
