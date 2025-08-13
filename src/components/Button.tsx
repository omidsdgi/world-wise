import styles from './Button.module.css'
import React from "react";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'primary' | 'back' |'position';
}
export default function Button({children,onClick,type}:ButtonProps ) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${type ?styles[type] : ""}`} >
            {children}
        </button>
    );
}