import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {useGetCurrentUser} from "../customeHooks/useGetCurrentUser";
import LoadingCircle from "./loadingCircle";
import Container from "@mui/material/Container";
import {Logo} from "./Logo";
import {HomePageSkeleton} from "./skeleton/homePageSkeleton";

export default function withAuth(Component) {
    return function ProtectedRoute({ ...props }) {
        const router = useRouter();
        const {user, isLoading} = useGetCurrentUser()

        useEffect(() => {
            if (!isLoading && !user) {
                router.push('/login');
            }
        }, [router, isLoading]);

        if(isLoading){
            return <HomePageSkeleton />
        }
        return <Component {...props} />;
    };
}