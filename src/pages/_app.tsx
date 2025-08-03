import "@/styles/globals.css";
import "@/styles/index.css";
import style from "../styles/app.module.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <header>
                <h1>WorldWise</h1>
                <nav  className={style.nav}>
                    <Link href={"/public"} className={style.link}>Home</Link>
                    <Link href={"/Pricing.tsx"} className={style.link}>Pricing</Link>
                    <Link href={"/Product.tsx"} className={style.link}>Product</Link>
                </nav>
            </header>
            <main  style={{ padding: "20px", textAlign: "center" }}>
                <Component {...pageProps} />
            </main>
        </>
    )
}
