import React, {useEffect, useState} from "react";
import PDFDocumentModule from "../components/pdfDocumentModule";
import DateToggleBtn from "../components/dateToggleBtn";
import moment from "moment/moment";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useRouter} from "next/router";
import LoadingCircle from "../components/loadingCircle";
import {useGetCurrentUser} from "../customeHooks/useGetCurrentUser";
// const PDFViewer = dynamic(
//   import("@react-pdf/renderer").then((module) => module.PDFViewer),
//   {
//     loading: ({ error, isLoading, pastDelay, retry }) => {
//       return <div>{isLoading}</div>;
//     },
//     ssr: false,
//   }
// );
// const PDFDocumentModule = dynamic(() => import("../components/pdfDocumentModule"), {
//   ssr: false,
// });

function Pdf() {
    const router = useRouter()
    const [fromDate, setFromDate] = useState(moment(new Date()).format("DD/MM/YYYY"));
    const [toDate, setToDate] = useState(moment().format("DD/MM/YYYY"));

    const {user, isLoading: isUserLoading} = useGetCurrentUser();
    const {isLoading, data, error, refetch} = useQuery({
        queryKey: ['chartData',fromDate,toDate],
        queryFn: async () => {
            const result = await axios.get(`/api/charts?from=${fromDate}&to=${toDate}`, {withCredentials: true})
            return result.data
        },
        onSuccess: () => {
            router.push({href: "/charts", query: {from: fromDate, to: toDate}});
        },
        onError: (e) => {
            console.error(e)
        },
        enabled: router.isReady
    })

    useEffect(() => {
        refetch();
    }, [fromDate, toDate]);

    if(isLoading || isUserLoading){
        return <LoadingCircle />
    }
    return (
    <>
        <DateToggleBtn setDate={setFromDate}/>
        <PDFDocumentModule user={user} data={data} />
    </>
    );
}

export default Pdf;
