import React from 'react';
import styles from './globalStyles/LoginButton.module.css';

// 定义按钮的参数类型
interface LoginButtonProps {
    label: string; // 按钮上的文字
}

// LoginButton 组件
export default function LoginButton(props: LoginButtonProps) {
    return (
        <button
            className={styles["loginButton"]} // 按钮的 CSS 样式
            type="submit"                     // 表示这个按钮是“提交按钮”，可以触发表单提交
        >
            {props.label}                     {/* 显示传进来的按钮文字 */}
        </button>
    );
}