import "@/styles/globals.css";
import "@/styles/index.css";
import type { AppProps } from "next/app";
import App from "@/pages/App";
import {useRouter} from "next/router";

export default function AppLayout({ Component, pageProps }: AppProps) {
    const router = useRouter();

    // اگر مسیر با /app شروع می‌شود، layout App را استفاده کن
    if (router.pathname.startsWith('/app')) {
        return (
            <App>
                <Component {...pageProps} />
            </App>
        );
    }

    // در غیر این صورت، کامپوننت را مستقیماً render کن
    return <Component {...pageProps} />;
}