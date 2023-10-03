import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useRouter} from "next/router";


export const useHomeArticles = () => useQuery({
    queryKey: ["articles", 3],
    queryFn: async () => {
        const { data } = await axios.get("/api/blog/articles/3");
        return data;
    },
});

export const useHomeProducts = () => useQuery({
    queryKey: ["products", 3],
    queryFn: async () => {
        const { data } = await axios.get("/api/store/products/");
        return data.data;
    },
});

export const useIndexCharts = (date) => {
    const router = useRouter();
    return useQuery({
        queryKey: ["indexChart"],
        queryFn: async () => {
            const result = await axios.get(`/api/?date=${date}`, { withCredentials: true });
            return result.data;
        },
        onSuccess: (data) => {
            router.push({ href: "/app", query: { date: date } });
            navigator.serviceWorker?.controller?.postMessage({ action: "logBook", data: data.logBook });
        }
    });
}
