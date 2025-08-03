import styles from "./PageNav.module.css";
import Link from "next/link";
import {Logo} from "@/components/Logo";

export  function PageNav() {
    return (
        <nav className={styles.nav}>
            <Logo/>

            <ul>
                <li>
                    <Link href= "/Product">Product</Link>
                </li>
                <li>
                    <Link href="/Pricing">Pricing</Link>
                </li>
                <li>
                    <Link href="/Login" className={styles.ctaLink}>Login</Link>
                </li>
            </ul>
        </nav>
    );
}