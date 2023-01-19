import React, {useEffect, useState} from 'react';
import {Button} from "./../../button/Button";
import {CounterFormTitle} from "./CounterFormTitle";
import classes from "./../Counter.module.css";
import {ErrorType} from "../../../App";

type PropsType = {
    minMaxValue: {
        min: number
        max: number
    }
    error: ErrorType
}

export const CounterForm: React.FC<PropsType> = ({minMaxValue, error}) => {

    const [counterValue, setCounterValue] = useState(minMaxValue.min)

    const disabledAddButton = counterValue === minMaxValue.max || error.error
    const disabledResetButton = counterValue === minMaxValue.min || error.error
    const counterValueMax = `${classes.counterValue} ${classes.counterValueText} ${counterValue === minMaxValue.max ? classes.errorMax : ''}`

    useEffect(() => {
        setCounterValue(minMaxValue.min)
    }, [minMaxValue])
    const addCounter = () => {
        if (counterValue < minMaxValue.max) {
            setCounterValue(counterValue + 1);
        }
    }
    const resetCounter = () => {
        setCounterValue(minMaxValue.min)
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