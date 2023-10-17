import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetCurrentUser } from "../../customeHooks/useGetCurrentUser";
import { HomePageSkeleton } from "../skeleton/homePageSkeleton";

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const { user, isLoading, isError } = useGetCurrentUser();

    useEffect(() => {
        if (!isLoading && !user || isError) {
          router.push("/login");
        }
    }, [router, isLoading]);
    if(!user){
      return null
    }
    return <Component {...props} />;
  };
}
