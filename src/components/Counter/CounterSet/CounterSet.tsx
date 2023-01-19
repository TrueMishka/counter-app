import React from 'react';
import classes from "./../Counter.module.css";
import {Input} from "../../input/Input";
import {Button} from "../../button/Button";


type CounterType = {
    min: number
    max: number
}

type PropsType = {
    counterValue: CounterType
    setCounterValue: (counterValue: CounterType) => void
    disabledButton: boolean
    setLocalStorageCounterValue: () => void
    error: boolean
}

export const CounterSet: React.FC<PropsType> = (
    {
        counterValue,
        setCounterValue,
        disabledButton,
        setLocalStorageCounterValue,
        error
    }) => {

    const onChangeMinValue = (value: number) => {
        setCounterValue({...counterValue, min: value})
    }
    const onChangeMaxValue = (value: number) => {
        setCounterValue({...counterValue, max: value})
    }

    return (
        <div className={classes.counterItem}>
            <div>
                <Input value={counterValue.min} onChange={onChangeMinValue} title={'Min'} error={error}/>
                <Input value={counterValue.max} onChange={onChangeMaxValue} title={'Max'} error={error}/>
            </div>
            <div>
                <Button callBack={setLocalStorageCounterValue} disabled={disabledButton}>Set</Button>
            </div>
        </div>
    );
};