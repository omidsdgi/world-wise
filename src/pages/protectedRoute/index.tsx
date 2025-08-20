import {ReactNode, useEffect} from "react";
import {useRouter} from "next/router";
import {useAuth} from "@/contexts/FakeAuthContext";

export default function ProtectedRoute({children}: {children: ReactNode}) {
    const router = useRouter();
    const {isAuthenticated} = useAuth();

     useEffect(() => {
         if (!isAuthenticated) router.push("/");
     },[isAuthenticated,router])
    return <>{children}</>
}