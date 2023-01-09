import React, {useEffect, useState} from 'react';
import './App.css';
import {CounterSet} from "./components/Counter/CounterSet/CounterSet";
import {CounterForm} from "./components/Counter/CounterForm/CounterForm";

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
    const [error, setError] = useState({unSave: '', inputError: ''})
/*    const localStorageEqualState = localStorageMin && localStorageMax
            ? (counterValue.min === JSON.parse(localStorageMin) && counterValue.max === JSON.parse(localStorageMax))
            : false*/

    const checkValue = () => counterValue.min > counterValue.max
        || counterValue.min === counterValue.max
        || counterValue.min < 0
        || counterValue.max < 0

    const disabledButton = checkValue()

    const setLocalStorageMinMaxCounterValue = () => {
        localStorage.setItem("minCounterValue", JSON.stringify(counterValue.min))
        localStorage.setItem("maxCounterValue", JSON.stringify(counterValue.max))
        setError({unSave: '', inputError: ''})
    }

    useEffect(() => {
        if (localStorageMin && localStorageMax) {
            setCounterValue({min: JSON.parse(localStorageMin), max: JSON.parse(localStorageMax)})
        }
    }, [])

    useEffect(() => {
        if (localStorageMin && localStorageMax) {
            if (counterValue.min !== JSON.parse(localStorageMin) || counterValue.max !== JSON.parse(localStorageMax)) {
                checkValue()
                    ? setError({...error, inputError: 'Incorrect value!', unSave: ''})
                    : setError({...error, inputError: '', unSave: "Enter value and press 'set'"})
            }
        }
    }, [counterValue])

    return (
        <div className="App">
            <CounterSet
                counterValue={counterValue}
                setCounterValue={setCounterValue}
                disabledButton={disabledButton}
                setLocalStorageCounterValue={setLocalStorageMinMaxCounterValue}/>
            <CounterForm minMaxValue={counterValue} error={error}/>
        </div>
    );
}

export default App;
