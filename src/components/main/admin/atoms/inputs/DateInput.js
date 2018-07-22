import React from 'react';

const DateInput = (props) => {
    return(
        <input
            id={props.id}
            type="date"
            className="form-control meetup-date"
            value={props.value}
            onChange={props.onChange}
        />
    );
};

export default DateInput;