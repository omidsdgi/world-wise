import "@/styles/globals.css";
import "@/styles/index.css";
import type { AppProps } from "next/app";
import {AppLayout} from "@/components";
import {useRouter} from "next/router";
import {AuthProvider} from "@/contexts/FakeAuthContext";

export default function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const path=router.pathname;

    return(
        <AuthProvider>
            {path.startsWith ("/app")?(
            <AppLayout/>
                ):(
                <Component {...pageProps} />
            )}
            <Component {...pageProps} />)
        </AuthProvider>
    )
}