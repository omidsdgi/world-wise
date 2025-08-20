import "@/styles/globals.css";
import "@/styles/index.css";
import type { AppProps } from "next/app";
import {AppLayout} from "@/components";
import {useRouter} from "next/router";
import {AuthProvider} from "@/contexts/FakeAuthContext";
import {CitiesProvider} from "@/contexts/LayoutContext";
import ProtectedRoute from "@/pages/protectedRoute";

export default function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const path=router.pathname;

    return(
        <AuthProvider>
            <CitiesProvider>
            {path.startsWith ("/app")?(
                <ProtectedRoute>
                    <AppLayout />
                </ProtectedRoute>
                ):(
                <Component {...pageProps} />
            )}
            </CitiesProvider>
        </AuthProvider>
    )
}