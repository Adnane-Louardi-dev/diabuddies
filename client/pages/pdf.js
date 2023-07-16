import React, {useEffect, useState} from "react";
import DateToggleBtn from "../components/dateToggleBtn";
import moment from "moment/moment";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useRouter} from "next/router";
import LoadingCircle from "../components/loadingCircle";
import {useGetCurrentUser} from "../customeHooks/useGetCurrentUser";
import {UserPDF} from "../components/pdf/UserPdf";
import dynamic from "next/dynamic";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {DownloadingOutlined, PrintOutlined} from "@mui/icons-material";
import {Button} from "@mui/material";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Box from "@mui/material/Box";

const PDFViewer = dynamic(
    import("@react-pdf/renderer").then((module) => module.PDFViewer),
    {
        loading: ({ error, isLoading, pastDelay, retry }) => {
            return <div>{isLoading}</div>;
        },
        ssr: false,
    }
);


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
    <Container maxWidth={"xl"}>
        <ResponsiveAppBar user={user} />
        <Box className={"flex justify-between"}>
            <DateToggleBtn setDate={setFromDate}/>

            <PDFDownloadLink document={<UserPDF user={user} data={data} />}
                             filename={`${user.givenName}-${user.familyName.replace(" ","-")}-${moment().format("DD-MM-YYYY")}`}
            >
                {({ blob, url, loading, error }) => (
                    <Button>
                        <PrintOutlined /> Download {loading && <DownloadingOutlined />}
                    </Button>
                        )}
            </PDFDownloadLink>
        </Box>
        <PDFViewer width="100%" height="750px" >
            <UserPDF user={user} data={data}/>
        </PDFViewer>

    </Container>
    );
}

export default Pdf;
