import React from 'react';

type PropsType = {
    value: number
}

export const CounterFormTitle:React.FC<PropsType> = ({value}) => {
    return (
        <span>{value}</span>
    );
};