import React from 'react';
import styles from './globalStyles/FormInput.module.css';
interface FormInputProps {
    label: string; // 上方 label 的显示文字
    type: string; // 输入框类型，如 "text", "password"
    value: string; // 当前输入框的值
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // 变化时的事件处理函数
    placeholder: string; // 输入框提示文字
  }
  
export default function FormInput(props: FormInputProps) {  //default function FormInput({ label, type, value, onChange, placeholder }: FormInputProps)
    return (
        <div className={styles["from.input"]}>
            <label className={styles["label"]}>
                {props.label}
            </label>
            <input type={props.type} value={props.value} onChange={props.onChange} placeholder={props.placeholder} 
            className={styles["input"]}
            />
        </div>
    )

}