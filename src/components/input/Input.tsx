import React, {ChangeEvent} from 'react';

type PropsType = {
    value: number
    onChange: (value: number) => void
}

export const Input:React.FC<PropsType> = ({value, onChange}) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.currentTarget.value))
    }

    return (
        <input type={'number'} value={value} onChange={onChangeHandler}/>
    );
};