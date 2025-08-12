import styles from "./PageNav.module.css";
import Link from "next/link";
import {Logo} from "@/components/Logo";

export  function PageNav() {
    return (
        <nav className={styles.nav}>
            <Logo/>

            <ul>
                <li>
                    <Link href= "/product">Product</Link>
                </li>
                <li>
                    <Link href="/pricing">Pricing</Link>
                </li>
                <li>
                    <Link href="/logo" className={styles.ctaLink}>Login</Link>
                </li>
            </ul>
        </nav>
    );
}