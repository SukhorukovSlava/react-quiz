import React from 'react';
import cssCls from './Select.css';

const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`;
    const getOptions = options => {
        return (
            options.map((option, index) => {
                return (
                    <option
                        key={option.value + index}
                        value={option.value}
                    >
                        {option.text}
                    </option>
                );
            })
        );
    };

    return (
        <div className={cssCls.Select}>
            <label htmlFor={htmlFor}/>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                {getOptions(props.options)}
            </select>
        </div>
    );
};

export default Select;