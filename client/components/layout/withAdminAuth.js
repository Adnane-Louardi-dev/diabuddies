import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {useGetCurrentUser} from "../../customeHooks/useGetCurrentUser";

export default function withAdminAuth(Component) {
    return function ProtectedRoute({ ...props }) {
        const router = useRouter();
        const {user, isLoading} = useGetCurrentUser()

        useEffect(() => {
            if (!isLoading && (!user || !user.isAdmin)) {
                router.push('/login');
            }
        }, [router, isLoading]);

        return <Component {...props} />;
    };
}