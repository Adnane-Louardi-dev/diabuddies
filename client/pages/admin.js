import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import withAdminAuth from "../components/withAdminAuth";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import LoadingCircle from "../components/loadingCircle";
import {ProductImage} from "../components/store/ProductImage";
import React from "react";
import {orderStatusEnum} from "../utils/enums";
import {getStatusColor} from "../utils/getColors";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Admin() {

    const queryClient = useQueryClient()
    const {data:orders, isLoading} = useQuery({
        queryKey: ["allOrders"],
        queryFn: () => {
            return axios.get("/api/orders/all")
        }
    })

    const {mutate:updateOrderStatus, isLoading:updatingOrderStatus} = useMutation({
        mutationKey: ["updateOrderStatus"],
        mutationFn: ({orderId, status}) => {
            return axios.put("/api/orders/", {orderId,status})
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["allOrders"])
        }
    })

    if(isLoading){
        return <LoadingCircle />
    }
    return <Container maxWidth={"xl"}>
        <ResponsiveAppBar />
        <Typography typography={"h3"} textAlign={"center"}>All Orders</Typography>
        <div className="my-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800 rounded-lg">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Client
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Products
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Total Quantity
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
                        {orders.data.map((order) => {
                            const cart = JSON.parse(order.cart)
                            return (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">Name: {order.userId.givenName + " " +order.userId.familyName}</div>
                                        <div className="text-sm text-gray-900">Shipping Adress: {order.shippingAddress}</div>
                                        <div className="text-sm text-gray-900">City: {order.city}</div>
                                        <div className="text-sm text-gray-900">PhoneNumber: {order.phoneNumber}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {cart.venteEntries.map(({product, quantity, total},index) => (
                                                <React.Fragment key={product.id}>
                                                    <div className="flex items-center my-3">
                                                        <div className="relative flex-shrink-0 h-10 w-10 shadow-sm">
                                                            <ProductImage className={"w-full h-full bg-center bg-cover"}
                                                                          src={product.thumbnail.src}/>
                                                        </div>
                                                        <div className="ml-4 w-full text-gray-900 text-sm font-medium ">
                                                            <p>{product.name}</p>
                                                            <p className={"pt-1"}>
                                                                <span>Total Produit: {quantity} * {product.selling_price} = </span>
                                                                <span className={"text-blue-700"}>{total} DH</span></p>
                                                        </div>
                                                    </div>
                                                    {index !== cart.venteEntries.length - 1 && <hr/>}
                                                </React.Fragment>
                                            )
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{cart.totalItems}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{cart.total} DH</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${getStatusColor(order.status)[0]} text-${getStatusColor(order.status)[1]}`}>
                                            {orderStatusEnum[order.status]}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-center text-md font-medium rounded-lg cursor-pointer">
                                        <FormControl fullWidth>
                                            <InputLabel id={`status-label-${order.id}`}>Status</InputLabel>
                                            <Select
                                                labelId={`status-label-${order.id}`}
                                                id={`status-select-${order.id}`}
                                                defaultValue={order.status}
                                                renderValue={(status) => orderStatusEnum[status]}
                                                onChange={(event)=>{
                                                    updateOrderStatus({orderId:order._id, status: event.target.value})
                                                }}
                                            >
                                                {Object.entries(orderStatusEnum).map(([value, label]) => (
                                                    <MenuItem value={value} key={value}>{label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Container>
}


export default withAdminAuth(Admin)