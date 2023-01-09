import React from 'react';
import classes from "./Button.module.css";

type ButtonPropsType = {
    callBack: () => void
    disabled?: boolean
    children: React.ReactNode
}

export const Button: React.FC<ButtonPropsType> = (props) => {
    const {callBack, disabled, children} = props;
    const classStyle = `${classes.button} ${disabled ? classes.buttonDisabled : ''}`
    const onClickHandler = () => {
        callBack()
    }
    return (
        <button onClick={onClickHandler} className={classStyle} disabled={disabled}>{children}</button>
    );
};