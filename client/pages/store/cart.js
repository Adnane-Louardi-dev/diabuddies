import React from "react";
import Link from "next/link";
import Head from "next/head";
import {Button, debounce} from "@mui/material";
import {StoreLayout} from "../../components/store/storeLayout";
import commerce from "../../lib/commerce";
import {ProductImage} from "../../components/store/ProductImage";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import LoadingCircle from "../../components/loadingCircle";
import {Add, Remove} from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import {useDeleteCartItem, useGetCart, useUpdateCart} from "../../customeHooks/useCart";
import {useRouter} from "next/router";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {useGetCurrentUser} from "../../customeHooks/useGetCurrentUser";
import axios from "axios";

const nullCart = {
   line_items: [],
   subtotal: {
      raw: 0,
      formatted: "0.00",
      formatted_with_code: "0.00 MAD",
      formatted_with_symbol: "DH0.00"
   },
   total_items: 0,
}

const Cart = () => {
   const router = useRouter()
   const queryClient = useQueryClient()

   const {data:cart, isLoading} = useGetCart()

   const {mutate:updateCart, isLoading:mutationLoading} = useUpdateCart()

   const {mutate:deleteItemFromCart, isLoading:deletingItem} = useDeleteCartItem()

   const {register, handleSubmit} = useForm();
   const {user, isLoading:isUserLoading} = useGetCurrentUser()
   const {mutate:createOrder, data, isLoading:creatingOrder} = useMutation({
      mutationKey: ["createOrder"],
      mutationFn: (order)=>{
         return axios.post("/api/orders/",order)
      },
      onSuccess: () => {
         queryClient.setQueryData(["cart"],nullCart)
         commerce.cart.refresh().then((cart)=>{
            queryClient.setQueryData(["cart"],cart)
         })
         router.push("/store/")
      }
   })
   const submitOrder = async ({email, city, shippingAddress,phoneNumber}) => {
      await commerce.checkout.generateToken(cart.id, { type: 'cart' })
      createOrder({
         cartId: cart.id,
         email,
         shippingAddress,
         city,
         phoneNumber,
         hostedUrl: cart.hosted_checkout_url,
         cart: JSON.stringify(cart)
      })
   }


   if(isLoading || isUserLoading) {
      return <LoadingCircle/>
   }

   return (
      <StoreLayout>
         <Head>
            <title>Your cart</title>
         </Head>
         {cart.line_items.length === 0 ?
            <div className="text-white px-6 py-4 my-28 mx-5 border-0 rounded relative bg-yellow-500">
               <span className="text-xl inline-block mr-5 align-middle">
                  <i className="fas fa-bell" />
               </span>
               <span className="inline-block align-middle mr-8">
                  Empty cart!
                  <Link href="/store">
                     <b className="capitalize cursor-pointer"> go shopping!!</b>
                  </Link>
               </span>
            </div> :
             <form onSubmit={handleSubmit(submitOrder)}>
               <div className="flex my-14 mx-10 font-rubik noScrollbar">
                  <div className={"w-[400px]"}>
                     <Typography typography={"h4"}>Shipping Information</Typography>
                     <TextField variant="outlined" className={"mt-2"} {...register("email")} label={"Email"} defaultValue={user.email} required type={"email"} />
                     <TextField variant="outlined" className={"mt-2"} {...register("shippingAddress")} label={"Shipping address"} defaultValue={user.homeAddress} required type={"text"} />
                     <TextField variant="outlined" className={"mt-2"} {...register("city")} label={"City"} required type={"text"} />
                     <TextField variant="outlined" className={"mt-2"} {...register("phoneNumber")} label={"PhoneNumber"} defaultValue={user.phoneNumber} required type={"text"} />
                     <div className={"mt-5 flex justify-between"}>
                        <div>
                           <h4>Order Total: {cart.subtotal.formatted_with_code}</h4>
                           <h4>Total Quantity: {cart.total_items}</h4>
                           <Button type={"submit"} className={`bg-amber-500 text-white mt-5 ${cart.manuallyUpdated ? "opacity-50 cursor-not-allowed" : ""}`}>
                              Submit Your Order
                           </Button>
                        </div>
                     </div>

                  </div>
                  <div className={"w-[calc(100%-400px)]"}>
                     <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                           <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                 <thead className="bg-gray-800 rounded-lg">
                                    <tr>
                                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                          Product name
                                       </th>

                                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                          Price
                                       </th>
                                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                          Quantity
                                       </th>
                                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                          Total
                                       </th>
                                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                          Status
                                       </th>
                                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                          Actions
                                       </th>
                                    </tr>
                                 </thead>
                                 {cart.line_items.map((product) => (
                                    <tbody className="bg-white divide-y divide-gray-200" key={product.id}>
                                       <tr>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <div className="flex items-center">
                                                <div className="relative flex-shrink-0 h-10 w-10 shadow-sm">
                                                   <ProductImage className={"w-full h-full bg-center bg-cover"} src={product.image ? product.image.url : product.assets[0]?.url} />
                                                </div>
                                                <div className="ml-4">
                                                   <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                </div>
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <div className="text-sm text-gray-900">{product.price.formatted_with_code}</div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <Add className={"cursor-pointer text-[1rem] mr-1"}
                                                  onClick={debounce(()=>{
                                                     updateCart({productId: product.id, quantity: product.quantity + 1,price: product.price.raw})
                                                  },200)}/>
                                             <span>
                                                {product.quantity}
                                             </span>
                                             <Remove className={"cursor-pointer text-[1rem] ml-1"}
                                                     onClick={debounce(()=>{
                                                        if(product.quantity > 1) {
                                                           updateCart({productId: product.id, quantity: product.quantity - 1,price: product.price.raw})
                                                        }
                                                     },200)}
                                             />
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <div className="text-sm text-gray-900">{product.line_total.raw}</div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                          </td>
                                          <td
                                             onClick={() => {
                                                deleteItemFromCart(product.id)
                                             }}
                                             className="py-4 px-6 whitespace-nowrap text-center text-md font-medium rounded-lg cursor-pointer"
                                          >
                                             <Button className="text-red-400 ">
                                                Remove {deletingItem && <CircularProgress />}
                                             </Button>
                                          </td>
                                       </tr>
                                    </tbody>
                                 ))}
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
             </form>
         }
      </StoreLayout>
   );
};
export default Cart;
