import styles from "./Logo.module.css";
import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/">
      <Image src="/logo.png" alt="WorldWise logo" width={220} height={80} className={styles.logo} />
     </Link>
  );
}


