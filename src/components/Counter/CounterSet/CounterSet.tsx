import React from 'react';
import classes from "./../Counter.module.css";
import {Input} from "../../input/Input";
import {Button} from "../../button/Button";

type CounterType = {
    min: number
    max: number
}

type PropsType = {
    minValue: number
    maxValue: number
    setMinValue: (minValue: number) => void
    setMaxValue: (maxValue: number) => void
    disabledButton: boolean
    setLocalStorageCounterValue: () => void
    error: boolean
}

export const CounterSet: React.FC<PropsType> = (
    {
        minValue,
        maxValue,
        setMinValue,
        setMaxValue,
        disabledButton,
        setLocalStorageCounterValue,
        error
    }) => {

    const onChangeMinValue = (value: number) => {
        setMinValue(value)
    }
    const onChangeMaxValue = (value: number) => {
        setMaxValue(value)
    }

    return (
        <div className={classes.counterItem}>
            <div>
                <Input value={minValue} onChange={onChangeMinValue} title={'Min'} error={error}/>
                <Input value={maxValue} onChange={onChangeMaxValue} title={'Max'} error={error}/>
            </div>
            <div>
                <Button callBack={setLocalStorageCounterValue} disabled={disabledButton}>Set</Button>
            </div>
        </div>
    );
};