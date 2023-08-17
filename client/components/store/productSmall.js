import React from "react";
import {ProductImage} from "./ProductImage";

const ProductSmall = ({ name, price, thumbnail, assets, quantity, selling_price}) => {

   return (
      <>
         <div className="mx-auto mb-5 flex rounded-xl shadow-md bg-blue-50 px-1 py-2">
            <div className="self-center relative h-16 w-16  flex-shrink-0 rounded-xl overflow-hidden bg-gray-400">
               <ProductImage className={"w-full h-full bg-center bg-cover"} src={thumbnail.data} />
            </div>
            <div className="self-center flex flex-col mx-auto mt-2 xs:mt-0 xs:ml-3 px-3 xs:px-0 justify-between rounded-xl font-rubik">
               <div className="flex-col">
                  <h1 className="mt-1 w-48 text-sm">{name}</h1>
                  <h1 className="my-1 text-sm flex justify-between">
                     <p>
                     {quantity} * <span className={"text-blue-700"}>{selling_price}</span>
                     </p>
                     <p>
                        {quantity * selling_price}
                     </p>
                  </h1>
               </div>
            </div>
         </div>
      </>
   );
};

export default ProductSmall;
