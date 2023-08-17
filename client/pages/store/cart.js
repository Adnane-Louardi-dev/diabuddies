import React from "react";
import Link from "next/link";
import Head from "next/head";
import {Autocomplete, Button, debounce} from "@mui/material";
import {StoreLayout} from "../../components/store/storeLayout";
import {ProductImage} from "../../components/store/ProductImage";
import {Controller, useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import LoadingCircle from "../../components/loadingCircle";
import {Add, Remove} from "@mui/icons-material";
import {useGetCart, useUpdateCart} from "../../customeHooks/useCart";
import {useRouter} from "next/router";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {useGetCurrentUser} from "../../customeHooks/useGetCurrentUser";
import axios from "axios";
import {nullCart} from "../../utils/nulls";
import {useAxios} from "../../customeHooks/useAxios";


const Cart = () => {
   const router = useRouter()
   const queryClient = useQueryClient()

   const {data:cart} = useGetCart()
   const {updateCart} = useUpdateCart()
   const {data:cities, isLoading:isCitiesLoading} = useAxios("get","/api/store/cities")
   const {register, control, handleSubmit} = useForm();
   const {user, isLoading:isUserLoading} = useGetCurrentUser()

   const {mutate:createOrder, data, isLoading:creatingOrder} = useMutation({
      mutationKey: ["createOrder"],
      mutationFn: (order)=>{
         return axios.post("/api/store/checkout/", {
            ...order,
            venteEntries: cart.venteEntries.map((entry)=>({
               quantity: entry.quantity,
               productId: entry.product.id
            }))})
      },
      onSuccess: () => {
         localStorage.setItem("my-cart",JSON.stringify(nullCart))
         queryClient.setQueryData(["cart"],nullCart)
         router.push("/store/")
      }
   })
   const submitOrder = async ({email, city, shippingAddress,phoneNumber, customerName}) => {
      console.log("city   dsds", city)
      createOrder({
         email,
         shippingAddress,
         phoneNumber,
         customerName,
         cityId: city.value
      })
   }


   if(isUserLoading || !cart) {
      return <LoadingCircle/>
   }

   return (
      <StoreLayout>
         <Head>
            <title>Your cart</title>
         </Head>
         {cart.totalItems === 0 ?
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
               <div className="flex flex-wrap-reverse gap-3 my-14 mx-10 w-full font-rubik">
                  <div className={"w-full mt-5 md:w-[400px]"}>
                     <Typography typography={"h4"}>Shipping Information</Typography>
                     <TextField variant="outlined" className={"mt-2 w-[300px]"} {...register("customerName")} label={"Name"} defaultValue={user.givenName + " " + user.familyName} required type={"text"} />
                     <TextField variant="outlined" className={"mt-2 w-[300px]"} {...register("email")} label={"Email"} defaultValue={user.email} required type={"email"} />
                     <TextField variant="outlined" className={"mt-2 w-[300px]"} {...register("shippingAddress")} label={"Shipping address"} defaultValue={user.homeAddress} required type={"text"} />
                     {!isCitiesLoading && <Controller
                         name={"city"}
                         control={control}
                         defaultValue={user.cityId ?? {
                            label: cities[0].attributes.name,
                            value: cities[0].id
                         }}
                         render={({field: {ref, onChange, ...field}}) => (
                             <Autocomplete
                                 className={"w-[300px]"}
                                 options={cities.map(city => ({
                                    label: city.attributes.name,
                                    value: city.id
                                 }))}
                                 // getOptionLabel={(cityId) => cities.data.find(city => city.id === cityId).attributes.name}
                                 onChange={(_, data) => onChange(data)}
                                 renderInput={(params) =>
                                     <TextField required {...field} {...params} label={"City"} className={"mt-2 w-[300px]"}/>}
                             />
                         )}
                     />}
                     <TextField variant="outlined" className={"mt-2 w-[300px]"} {...register("phoneNumber")} label={"PhoneNumber"} defaultValue={user.phoneNumber} required type={"text"} />
                     <div className={"mt-5 flex justify-between"}>
                        <div>
                           <h4>Order Total: {cart.total}</h4>
                           <h4>Total Quantity: {cart.totalItems}</h4>
                           <Button type={"submit"} className={'bg-amber-500 text-white mt-5'}>
                              Submit Your Order
                           </Button>
                        </div>
                     </div>

                  </div>
                  <div className={"w-full md:w-[calc(100%-450px)]"}>
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
                                 <tbody className="bg-white divide-y divide-gray-200">

                                 {cart.venteEntries.map(({product, quantity, total}) => {
                                    const {name,thumbnail,selling_price} = product.attributes
                                    return (
                                        <tr key={product.id}>
                                           <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="flex items-center">
                                                 <div className="relative flex-shrink-0 h-10 w-10 shadow-sm">
                                                    {thumbnail && <ProductImage className={"w-full h-full bg-center bg-cover"}
                                                                   src={thumbnail.data}/>}
                                                 </div>
                                                 <div className="ml-4">
                                                    <div
                                                        className="text-sm font-medium text-gray-900">{name}</div>
                                                 </div>
                                              </div>
                                           </td>
                                           <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="text-sm text-gray-900">{selling_price}</div>
                                           </td>
                                           <td className="px-6 py-4 whitespace-nowrap">
                                              <Add className={"cursor-pointer text-[1rem] mr-1"}
                                                   onClick={debounce(() => {
                                                      updateCart(product, 1)
                                                   }, 200)}/>
                                              <span>
                                                {quantity}
                                             </span>
                                              <Remove className={"cursor-pointer text-[1rem] ml-1"}
                                                      onClick={debounce(() => {
                                                         updateCart(product, -1)
                                                      }, 200)}
                                              />
                                           </td>
                                           <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="text-sm text-gray-900">{total}</div>
                                           </td>
                                           <td className="px-6 py-4 whitespace-nowrap">
                                              <span
                                                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                           </td>
                                           <td
                                               onClick={() => {
                                                  updateCart(cart, product, -1000)
                                               }}
                                               className="py-4 px-6 whitespace-nowrap text-center text-md font-medium rounded-lg cursor-pointer"
                                           >
                                              <Button className="text-red-400 ">
                                                 Remove
                                              </Button>
                                           </td>
                                        </tr>
                                    )
                                 })}
                                 </tbody>
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
