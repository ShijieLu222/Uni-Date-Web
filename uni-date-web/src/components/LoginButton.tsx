import React from 'react';
import styles from './globalStyles/LoginButton.module.css';

interface LoginButtonProps {
    label: string;
    onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export default function LoginButton(props: LoginButtonProps) {
    return (
        <button
            className={styles["loginButton"]}
            onClick={props.onClick}>
            {props.label}
        </button>
    );
}