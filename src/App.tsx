import React, {useEffect, useState} from 'react';
import './App.css';
import {CounterSet} from "./components/Counter/CounterSet/CounterSet";
import {CounterForm} from "./components/Counter/CounterForm/CounterForm";

export type ErrorType = {
    error: boolean
    unSave: string
    inputError: string
}

function App() {
    const localStorageMin = localStorage.getItem("minCounterValue")
    const localStorageMax = localStorage.getItem("maxCounterValue")
    const initCounterValue = () => {
        if (localStorageMin && localStorageMax) {
            return {min: JSON.parse(localStorageMin), max: JSON.parse(localStorageMax)}
        } else {
            return {min: 0, max: 5}
        }
    }
    const [counterValue, setCounterValue] = useState(initCounterValue)
    const [error, setError] = useState<ErrorType>({error: false, unSave: '', inputError: ''})

    const stateValueEqualLocalValue = localStorageMin && localStorageMax
        ? (counterValue.min === JSON.parse(localStorageMin) && counterValue.max === JSON.parse(localStorageMax))
        : false
    const incorrectValue = counterValue.min > counterValue.max
        || counterValue.min === counterValue.max
        || counterValue.min < 0
        || counterValue.max < 0
    const disabledButton = stateValueEqualLocalValue || incorrectValue

    const setLocalStorageMinMaxCounterValue = () => {
        localStorage.setItem("minCounterValue", JSON.stringify(counterValue.min))
        localStorage.setItem("maxCounterValue", JSON.stringify(counterValue.max))
        setError({error: false, unSave: '', inputError: ''})
    }

    useEffect(() => {
        if (localStorageMin && localStorageMax) {
            setCounterValue({min: JSON.parse(localStorageMin), max: JSON.parse(localStorageMax)})
        } else {
            setError({...error, error: true, inputError: '', unSave: 'Enter value and press Set'})
        }
    }, [])

    useEffect(() => {
        if (localStorageMin && localStorageMax) {
            counterValue.min !== JSON.parse(localStorageMin) || counterValue.max !== JSON.parse(localStorageMax)
                ? incorrectValue
                    ? setError({...error, error: true, inputError: 'Incorrect value!', unSave: ''})
                    : setError({...error, error: true, inputError: '', unSave: 'Enter value and press Set'})
                : setError({...error, error: false, inputError: '', unSave: ''})
        }
    }, [counterValue])

    return (
        <div className="App">
            <CounterSet
                counterValue={counterValue}
                setCounterValue={setCounterValue}
                disabledButton={disabledButton}
                setLocalStorageCounterValue={setLocalStorageMinMaxCounterValue}
                error={error.error}
            />
            <CounterForm minMaxValue={counterValue} error={error}/>
        </div>
    );
}

export default App;
