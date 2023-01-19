import React, {useEffect, useState} from 'react';
import './App.css';
import {CounterSet} from "./components/Counter/CounterSet/CounterSet";
import {CounterForm} from "./components/Counter/CounterForm/CounterForm";

let localStorageMin = 0;
let localStorageMax = 5;

export type ErrorType = {
    error: boolean
    unSave: string
    inputError: string
}

function App() {

    const [counterValue, setCounterValue] = useState(localStorageMin)
    const [minValue, setMinValue] = useState(localStorageMin);
    const [maxValue, setMaxValue] = useState(localStorageMax);
    const [error, setError] = useState<ErrorType>({error: false, unSave: '', inputError: ''})

    const initCounterValue = () => {
        let LSMin = localStorage.getItem("minCounterValue")
        let LSMax = localStorage.getItem("maxCounterValue")

        if (LSMin && LSMax) {
            localStorageMin = +LSMin;
            localStorageMax = +LSMax;
            setMinValue(+LSMin);
            setMaxValue(+LSMax)
            setCounterValue(localStorageMin);
        }
    }

    const stateValueEqualLocalValue = minValue === localStorageMin && maxValue === localStorageMax
    const incorrectValue = minValue > maxValue || minValue === maxValue || minValue < 0 || maxValue < 0
    const disabledButton = stateValueEqualLocalValue || incorrectValue

    const setLocalStorageMinMaxCounterValue = () => {
        localStorage.setItem("minCounterValue", JSON.stringify(minValue))
        localStorage.setItem("maxCounterValue", JSON.stringify(maxValue))
        setError({error: false, unSave: '', inputError: ''})
    }

    useEffect(() => {
        initCounterValue()
    }, [])

    useEffect(() => {
        minValue !== localStorageMin || maxValue !== localStorageMax
            ? incorrectValue
                ? setError({error: true, inputError: 'Incorrect value!', unSave: ''})
                : setError({error: true, inputError: '', unSave: 'Enter value and press Set'})
            : setError({error: false, inputError: '', unSave: ''})
    }, [minValue, maxValue])

    return (
        <div className="App">
            <CounterSet
                minValue={minValue}
                maxValue={maxValue}
                setMinValue={setMinValue}
                setMaxValue={setMaxValue}
                disabledButton={disabledButton}
                setLocalStorageCounterValue={setLocalStorageMinMaxCounterValue}
                error={incorrectValue}
            />
            <CounterForm counterValue={counterValue} setCounterValue={setCounterValue} minValue={minValue}
                         maxValue={maxValue} error={error}/>
        </div>
    );
}

export default App;
