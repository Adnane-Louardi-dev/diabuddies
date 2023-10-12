import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetCurrentUser } from "../../customeHooks/useGetCurrentUser";
import { HomePageSkeleton } from "../skeleton/homePageSkeleton";

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const { user, isLoading } = useGetCurrentUser();

    useEffect(() => {
      setTimeout(() => {
        if (!isLoading && !user) {
          router.push("/login");
        }
      }, 1000);
    }, [router, isLoading]);

    if (isLoading) {
      return <HomePageSkeleton />;
    }
    return <Component {...props} />;
  };
}
