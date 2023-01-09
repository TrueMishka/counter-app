import React from 'react';

type PropsType = {
    value: number
}

export const CounterTitle:React.FC<PropsType> = ({value}) => {
    return (
        <span>{value}</span>
    );
};