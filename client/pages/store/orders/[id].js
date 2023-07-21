import commerce from "../../../lib/commerce";
import {useRouter} from "next/router";
import {useQuery} from "@tanstack/react-query";
import LoadingCircle from "../../../components/loadingCircle";
import {StoreLayout} from "../../../components/store/storeLayout";
import Typography from "@mui/material/Typography";
import {useGetCurrentUser} from "../../../customeHooks/useGetCurrentUser";
import {Button} from "@mui/material";
import ProductSmall from "../../../components/store/productSmall";
import TextField from "@mui/material/TextField";
import React from "react";
import {useForm} from "react-hook-form";
import {useGetCart} from "../../../customeHooks/useCart";


export default function Checkout() {

    const router = useRouter()
    const {query: {id}} = router
    const {register, handleSubmit} = useForm();

    const {user, isLoading:isUserLoading} = useGetCurrentUser()
    const {data:checkout, isLoading} = useQuery({
        queryKey: ["checkout", id],
        queryFn: async () => {
            return await commerce.checkout.getLive(id)
        }
    })
    const {data:cart, isLoading:isCartLoading} = useGetCart()

    if(isLoading||isUserLoading){
        return <LoadingCircle />
    }

    // return <>
    //     <h1>{checkout.id}</h1>
    //     <pre>
    //             {JSON.stringify(checkout,null,2)}
    //         </pre>
    // </>

    return <StoreLayout>
        <form onSubmit={handleSubmit(submitOrder)} className={"flex"}>
            <div className={"w-[75%]"}>
                <Typography typography={"h4"}>Contact Information</Typography>
                <TextField variant="outlined" className={"block"} {...register("email")} label={"Email"} defaultValue={user.email} required type={"email"} />
                <TextField variant="outlined" className={"mt-2 block"} {...register("shippingAddress")} label={"Shipping address"} defaultValue={user.homeAddress} required type={"text"} />
                <TextField variant="outlined" className={"mt-2"} {...register("city")} label={"City"} required type={"text"} />
                <TextField variant="outlined" className={"mt-2"} {...register("phoneNumber")} label={"PhoneNumber"} defaultValue={user.phoneNumber} required type={"text"} />
            </div>
            <div className={"w-[25%]"}>
                <div className={"h-[330px] overflow-y-auto"}>
                    {checkout.line_items.map(line_item => (
                        <ProductSmall {...line_item}  />
                    ))}
                </div>
                <hr />
                <div className={"flex"}>
                    <TextField
                        variant="outlined"
                        size={"small"}
                        label={"Giftcard"}
                        className="mt-2 w-full"
                    />
                    <Button className={"bg-amber-500 text-white ml-2 mt-2 h-13 w-40"}>
                        Apply
                    </Button>
                </div>
                <div className={"flex justify-between pt-2 text-xl"}>
                    <p>Total</p>
                    <p>{checkout.total.formatted_with_code}</p>
                </div>
                <Button className={"bg-amber-500 text-white mt-5 w-full"}
                        disabled={isCartLoading}
                        type={"submit"}
                    >
                    Checkout
                </Button>
            </div>

        </form>
        <pre>
                {JSON.stringify(checkout,null,2)}
            </pre>
    </StoreLayout>
}

