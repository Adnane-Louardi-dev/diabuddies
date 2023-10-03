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
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {getDir} from "../../../utils/getDir";
import withAuth from "../../../components/layout/withAuth";


function Orders() {

    const {data:orders, isLoading} = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const {data:orders} = await axios.get("/api/store/orders")
            return orders
        }
    })
    const {t, i18n} = useTranslation("blogStore")
    if(isLoading){
        return <LoadingCircle />
    }

    return <StoreLayout>
        <Typography typography={"h3"} textAlign={"center"}>{t("myOrders")}</Typography>
        <div className="my-4 overflow-x-auto sm:-mx-6 md:-mx-8" dir={getDir(i18n.language)}>
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 md:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800 rounded-lg hidden md:table-header-group">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
                                {t("orderId")}
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
                                {t("products")}
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
                                {t("qty_total")}
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
                                {t("order_total")}
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
                                {t("p_status")}
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
                                {t("p_action")}
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {orders.data.map((order) => {
                            return (
                                <tr key={order.id} className={`block w-[100%] md:table-row ${i18n.language === "ar" ? "order-table-row-ar" : "order-table-row-en"}`}>
                                    <td title={t("orderId")} className="order-table-row md:before:content-none md:after:content-none md:table-cell md:[&>div]:relative md:w-[200px]">
                                        <div className="text-sm text-gray-900 py-2">ORDER-{order.id}</div>
                                    </td>
                                    <td title={t("products")} className={`order-table-row h-[${90*order.attributes.vente_entries?.data.length}px] md:before:content-none md:after:content-none md:table-cell md:[&>div]:relative`}>
                                        <div>
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
                                        </div>
                                    </td>
                                    <td title={t("qty_total")} className="order-table-row md:before:content-none md:after:content-none md:table-cell md:[&>div]:relative ">
                                        <div>
                                            <p className="text-sm text-gray-900">{order.attributes.totalItems}</p>
                                        </div>
                                    </td>
                                    <td title={t("order_total")} className="order-table-row md:before:content-none md:after:content-none md:table-cell md:[&>div]:relative ">
                                        <div>
                                            <p className="text-sm text-gray-900">{order.attributes.total} {t("currency")}</p>
                                        </div>
                                    </td>
                                    <td title={t("p_status")} className="order-table-row md:before:content-none md:after:content-none md:table-cell md:[&>div]:relative ">
                                        <div>
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${getStatusColor(order.status)}-100 text-${getStatusColor(order.status)}-800`}>
                                                {t(order.status)}
                                            </span>
                                        </div>
                                    </td>
                                    <td title={t("p_action")}
                                        onClick={() => {
                                        }}
                                        className="order-table-row md:before:content-none md:after:content-none md:table-cell md:[&>div]:relative py-6"
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
    </StoreLayout>
}

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['blogStore']))
    }
});

export default withAuth(Orders)
