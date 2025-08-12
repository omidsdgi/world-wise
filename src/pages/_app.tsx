import "@/styles/globals.css";
import "@/styles/index.css";
import type { AppProps } from "next/app";
import {AppLayout} from "@/components";
import {useRouter} from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const path=router.pathname;

    if (path.startsWith ("/app")){
        return(
            <AppLayout>
                <Component {...pageProps} />;
            </AppLayout>
        )}
    return <Component {...pageProps} />
}