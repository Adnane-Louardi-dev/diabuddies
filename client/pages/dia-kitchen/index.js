import {useRouter} from "next/router";
import {useEffect} from "react";
import {HomePageSkeleton} from "../../components/skeleton/homePageSkeleton";


export default function diaKitchen(){
    const router = useRouter();
    useEffect(() => {
        router.push("/dia-kitchen/recipes")
    }, []);
    return <HomePageSkeleton />
}