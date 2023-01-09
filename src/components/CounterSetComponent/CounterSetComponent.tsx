import React, {useEffect, useState} from 'react';
import classes from "./Counter/Counter.module.css";
import {Input} from "../input/Input";
import {Button} from "../button/Button";
import {Counter} from "./Counter/Counter";

export const CounterSetComponent = () => {

    const [counterValue, setCounterValue] = useState({min: 0, max: 5})
    const [error, setError] = useState({unSave: '', inputError: ''})
    const localStorageMin = localStorage.getItem("minCounterValue")
    const localStorageMax = localStorage.getItem("maxCounterValue")
    const setCounterValueState = (localStorageMin: string, localStorageMax: string) => {
        setCounterValue({min: JSON.parse(localStorageMin), max: JSON.parse(localStorageMax)})
    }

    const setLocalStorageMinMaxCounterValue = () => {
        localStorage.setItem("minCounterValue", JSON.stringify(counterValue.min))
        localStorage.setItem("maxCounterValue", JSON.stringify(counterValue.max))
        setError({unSave: '', inputError: ''})
    }
    const onChangeMinValue = (value: number) => {
        setCounterValue({...counterValue, min: value})
    }
    const onChangeMaxValue = (value: number) => {
        setCounterValue({...counterValue, max: value})
    }

    useEffect(() => {
        if (localStorageMin && localStorageMax) {
            setCounterValueState(localStorageMin, localStorageMax)
        }
    }, [])

    useEffect(() => {
        checkValue()
            ? setError({...error, inputError: 'Incorrect value!', unSave: ''})
            : setError({...error, inputError: '', unSave: "Enter value and press 'set'"})
    }, [counterValue])

    const checkValue = () => counterValue.min > counterValue.max || counterValue.min === counterValue.max || counterValue.min < 0 || counterValue.max < 0
    const disabledButton = checkValue()

    return (
        <div>
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
                    <Button callBack={setLocalStorageMinMaxCounterValue} disabled={disabledButton}>Set</Button>
                </div>
            </div>
            <div>
                <Counter minMaxValue={counterValue} error={error}/>
            </div>
        </div>
    );
};