import React, {useEffect, useState} from 'react';
import {Button} from "./../../button/Button";
import {CounterTitle} from "./CounterTitle";
import classes from "./Counter.module.css";

type PropsType = {
    minMaxValue: {
        min: number
        max: number
    }
    error: {
        unSave: string
        inputError: string
    }
}

export const Counter: React.FC<PropsType> = ({minMaxValue, error}) => {

    const [counterValue, setCounterValue] = useState(minMaxValue.min)

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

    const disabledAddButton = counterValue === minMaxValue.max
    const disabledResetButton = counterValue === minMaxValue.min
    const counterValueMax = `${classes.counterValue} ${classes.counterValueText} ${counterValue === minMaxValue.max ? classes.errorMax : ''}`
    const counterTitle = error.inputError
        ? <div className={`${classes.counterValueText} ${classes.counterValueText}`}>
            <span>{error.inputError}</span></div>
        : (error.unSave
            ? <div className={`${classes.counterValueText} ${classes.counterValueText}`}><span>{error.unSave}</span>
            </div>
            : <div className={counterValueMax}>
                <CounterTitle value={counterValue}/>
            </div>)

    return (
        <div className={classes.counter}>
            <h3>Counter</h3>
            {counterTitle}
            <div>
                <Button callBack={addCounter} disabled={disabledAddButton}>inc</Button>
                <Button callBack={resetCounter} disabled={disabledResetButton}>reset</Button>
            </div>
        </div>
    );
};