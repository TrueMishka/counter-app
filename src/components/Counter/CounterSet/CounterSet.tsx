import React, {useEffect, useState} from 'react';
import classes from "./../CounterForm/Counter.module.css";
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
}

export const CounterSet: React.FC<PropsType> = ({counterValue, setCounterValue, disabledButton, setLocalStorageCounterValue}) => {

    const onChangeMinValue = (value: number) => {
        setCounterValue({...counterValue, min: value})
    }
    const onChangeMaxValue = (value: number) => {
        setCounterValue({...counterValue, max: value})
    }


    return (
        <div className={classes.counter}>
            <div>
                <span>min value</span>
                <Input value={counterValue.min} onChange={onChangeMinValue}/>
            </div>
            <div>
                <span>max value</span>
                <Input value={counterValue.max} onChange={onChangeMaxValue}/>
            </div>
            <div>
                <Button callBack={setLocalStorageCounterValue} disabled={disabledButton}>Set</Button>
            </div>
        </div>
    );
};