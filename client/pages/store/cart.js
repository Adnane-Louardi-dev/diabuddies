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
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {getDir} from "../../utils/getDir";


const Cart = ({cities}) => {
   const router = useRouter()
   const queryClient = useQueryClient()
   const {t, i18n} = useTranslation("blogStore")

   const {data:cart} = useGetCart()
   const {updateCart} = useUpdateCart()
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
             <form onSubmit={handleSubmit(submitOrder)} dir={getDir(i18n.language)}>
               <div className="flex flex-wrap-reverse gap-3 my-14 w-full font-rubik">
                  <div className={"w-full mt-5 lg:w-[400px]"}>
                     <Typography typography={"h6"} textAlign={"center"}>{t("shippingInfo")}</Typography>
                     <div className={"mt-3 mx-10"}>
                        <TextField variant="outlined" className={"mt-2 w-full"} {...register("customerName")} label={t("name")} defaultValue={user.givenName + " " + user.familyName} required type={"text"} />
                     </div>
                     <div className={"mx-10"}>
                        <TextField variant="outlined" className={"mt-2 w-full"} {...register("shippingAddress")} label={t("shippingAddress")} defaultValue={user.homeAddress} required type={"text"} />
                     </div>
                       <Controller
                         name={"city"}
                         control={control}
                         defaultValue={user.cityId ?? {
                            label: cities.length > 0 ? cities[0].attributes.name : null,
                            value: cities.length > 0 ? cities[0].id: null
                         }}
                         render={({field: {ref, onChange, ...field}}) => (
                             <Autocomplete
                                 className={"w-full"}
                                 options={cities.map(city => ({
                                    label: city.attributes.name,
                                    value: city.id
                                 }))}
                                 // getOptionLabel={(cityId) => cities.data.find(city => city.id === cityId).attributes.name}
                                 onChange={(_, data) => onChange(data)}
                                 renderInput={(params) =>  <div className={"mx-10"}>
                                     <TextField required {...field} {...params} label={t("city")} className={"mt-2 w-full"}/>
                                 </div>}
                             />
                         )}
                     />
                     <div className={"mx-10"}>
                        <TextField variant="outlined" className={"mt-2 w-full"} {...register("phoneNumber")} label={t("phoneNumber")} defaultValue={user.phoneNumber} required type={"text"} />
                     </div>
                     <div className={"mt-5 mx-10 text-center"}>
                        <div className={"text-center"}>
                           <h4>{t("order_total")}: {cart.total} {t("currency")}</h4>
                           <h4>{t("qty_total")}: {cart.totalItems}</h4>
                           <Button type={"submit"} className={'bg-amber-500 text-white mt-5 w-full'}>
                              {t("submit_order")}
                           </Button>
                        </div>
                     </div>

                  </div>
                  <div className={"w-full lg:w-[calc(100%-450px)]"}>
                     <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                           <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                              <table className="table-auto min-w-full divide-y divide-gray-200">
                                 <thead className="bg-gray-800 rounded-lg hidden lg:table-header-group">
                                    <tr>
                                       <th scope="col" className="lg:min-w-[300px] px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
                                          {t("p_name")}
                                       </th>

                                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                          {t("p_price")}
                                       </th>
                                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                          {t("p_qty")}
                                       </th>
                                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                          {t("p_total")}
                                       </th>
                                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                          {t("p_status")}
                                       </th>
                                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                          {t("p_status")}
                                       </th>
                                    </tr>
                                 </thead>
                                 <tbody className="bg-white divide-y divide-gray-200">

                                 {cart.venteEntries.map(({product, quantity, total}) => {
                                    const {name,thumbnail,selling_price} = product.attributes
                                    return (
                                        <tr key={product.id} className={`block w-[100%] lg:table-row ${i18n.language === "ar" ? "order-table-row-ar" : "order-table-row-en"}`}>
                                           <td title={t("p_name")} className={`order-table-row h-[60px] ${i18n.language === "ar" ? "after:content-[attr(title)] after:py-[20px] lg:after:content-none" : "before:content-[attr(title)] before:py-[20px] lg:before:content-none"} lg:min-w-[300px] lg:table-cell lg:h-auto`}>
                                              <div className={`flex items-center ${i18n.language === "ar" ? "right" : "left"}-1/2 lg:${i18n.language === "ar" ? "right" : "left"}-[20px]`}>
                                                 <div className="relative flex-shrink-0 h-10 w-10 shadow-sm">
                                                    {thumbnail && <ProductImage className={"w-full h-full bg-center bg-cover"}
                                                                   src={thumbnail.data}/>}
                                                 </div>
                                                 <div className="text-sm font-medium text-gray-900 ml-4">{name}</div>
                                              </div>
                                           </td>
                                           <td title={t("p_price")}  className="order-table-row lg:before:content-none lg:after:content-none lg:table-cell lg:[&>div]:relative">
                                              <div className="text-sm text-gray-900">{selling_price} {t("currency")}</div>
                                           </td>
                                           <td title={t("p_qty")}  className="order-table-row lg:before:content-none lg:after:content-none lg:table-cell lg:[&>div]:relative">
                                              <div>
                                                 <Add className={"cursor-pointer text-[1rem] mr-1"}
                                                      onClick={debounce(() => {
                                                         updateCart(product, 1)
                                                      }, 200)}/>
                                                 <span className={"px-2"}>
                                                   {quantity}
                                                </span>
                                                 <Remove className={"cursor-pointer text-[1rem] ml-1"}
                                                         onClick={debounce(() => {
                                                            updateCart(product, -1)
                                                         }, 200)}
                                                 />
                                              </div>
                                           </td>
                                           <td title={t("p_total")}  className="order-table-row lg:before:content-none lg:after:content-none lg:table-cell lg:[&>div]:relative">
                                              <div className="text-sm text-gray-900">{total} {t("currency")}</div>
                                           </td>
                                           <td title={t("p_status")}  className="order-table-row lg:before:content-none lg:after:content-none lg:table-cell lg:[&>div]:relative">
                                              <div>
                                                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                              </div>
                                           </td>
                                           <td title={t("p_action")}
                                               onClick={() => {
                                                  updateCart(product, -1000)
                                               }}
                                               className="order-table-row lg:before:content-none lg:after:content-none lg:table-cell lg:[&>div]:relative py-6"
                                           >
                                              <div>
                                                 <Button className="text-red-300 bg-red-600">
                                                    {t("remove")}
                                                 </Button>
                                              </div>
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

export async function getStaticProps() {
   const cities = await axios.get(`${process.env.BACKEND_URL}/store/cities`);

   return {
      props: {
         cities: cities.data,
         ...(await serverSideTranslations("en", ['common','blogStore']))
      },
   }
}