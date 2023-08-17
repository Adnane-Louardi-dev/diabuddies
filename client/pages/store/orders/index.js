import {StoreLayout} from "../../../components/store/storeLayout";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import LoadingCircle from "../../../components/loadingCircle";
import Typography from "@mui/material/Typography";
import {ProductImage} from "../../../components/store/ProductImage";
import {Button} from "@mui/material";
import React from "react";
import {getStatusColor} from "../../../utils/getColors";
import {orderStatusEnum} from "../../../utils/enums";


export default function Orders() {

    const {data:orders, isLoading} = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const {data:orders} = await axios.get("/api/store/orders")
            return orders
        }
    })
    if(isLoading){
        return <LoadingCircle />
    }

    return <StoreLayout>
        <Typography typography={"h3"} textAlign={"center"}>My Orders</Typography>
        <div className="my-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800 rounded-lg">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Order Id
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
                        {orders.data.map((order) => {
                            return (
                                <tbody className="bg-white divide-y divide-gray-200" key={order.id}>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">Cart Number:{order.id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {order.attributes.vente_entries?.data.map((vente_entry,index) => {
                                            const product = vente_entry.attributes.product.data.attributes
                                            return (
                                                <>
                                                <div className="flex items-center my-3">
                                                    <div className="relative flex-shrink-0 h-[75px] w-[75px] shadow-sm">
                                                        {product.thumbnail &&
                                                            <ProductImage className={"w-full h-full bg-center bg-cover"}
                                                                       src={product.thumbnail.data}/>}
                                                    </div>
                                                    <div className="ml-4 w-full text-gray-900 text-sm font-medium ">
                                                        <p>{product.name}</p>
                                                        <p className={"pt-1"}>Total Produit: <span className={"text-blue-700"}>{vente_entry.attributes.total} DH</span></p>
                                                    </div>
                                                </div>
                                                {index !== order.attributes.vente_entries.length - 1 && <hr/>}
                                            </>
                                        )})}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{order.attributes.totalItems}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{order.attributes.total} DH</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${getStatusColor(order.status)}-100 text-${getStatusColor(order.status)}-800`}>
                                            {orderStatusEnum[order.status]}
                                        </span>
                                    </td>
                                    <td
                                        onClick={() => {
                                        }}
                                        className="py-4 px-6 whitespace-nowrap text-center text-md font-medium rounded-lg cursor-pointer"
                                    >
                                        <Button className="text-red-400 ">
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                        </tbody>
                        )
                        })}
                    </table>
                </div>
            </div>
        </div>
    </StoreLayout>
}