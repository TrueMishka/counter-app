import React, {useEffect, useState} from 'react';
import {Button} from "./../../button/Button";
import {CounterFormTitle} from "./CounterFormTitle";
import classes from "./../Counter.module.css";
import {ErrorType} from "../../../App";

type PropsType = {
    counterValue: number
    setCounterValue: (counterValue: number) => void
    minValue: number
    maxValue: number
    error: ErrorType
}

export const CounterForm: React.FC<PropsType> = ({counterValue, setCounterValue, minValue, maxValue, error}) => {

    const disabledAddButton = counterValue === maxValue || error.error
    const disabledResetButton = counterValue === minValue || error.error
    const counterValueMax = `${classes.counterValue} ${classes.counterValueText} ${counterValue === maxValue ? classes.errorMax : ''}`

    useEffect(() => {
        setCounterValue(minValue)
    }, [minValue, maxValue])

    const addCounter = () => {
        if (counterValue < maxValue) {
            setCounterValue(counterValue + 1);
        }
    }

    const resetCounter = () => {
        setCounterValue(minValue)
    }

    const counterTitle = error.inputError
        ? <div className={`${classes.counterValueText} ${classes.counterValueText}`}>
            <span>{error.inputError}</span></div>
        : (error.unSave
            ? <div className={`${classes.counterValueText} ${classes.counterValueText}`}><span>{error.unSave}</span>
            </div>
            : <div className={counterValueMax}>
                <CounterFormTitle value={counterValue}/>
            </div>)

    return (
        <div className={classes.counterItem}>
            <h3>Counter</h3>
            {counterTitle}
            <div>
                <Button callBack={addCounter} disabled={disabledAddButton}>inc</Button>
                <Button callBack={resetCounter} disabled={disabledResetButton}>reset</Button>
            </div>
        </div>
    );
};