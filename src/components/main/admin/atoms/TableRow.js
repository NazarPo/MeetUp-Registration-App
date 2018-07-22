import React from 'react';

function createDatesArray(dates) {
    let onlyDates = [];
    dates.forEach((item) => {
        onlyDates.push(new Date(item.date).toDateString());
    });
    return onlyDates;
}

const TableRow = (props) => {
    return (
        <tr
            id={props.key}
            className={props.item.isActive ? 'table-success' : 'table-danger'}
            onClick={props.onClick}
        >
            <th scope="row">{props.index + 1}</th>
            <td>{props.item.title}</td>
            <td>{createDatesArray(props.item.dates).join(', ')}</td>
            <td>{props.item.startTime}</td>
        </tr>
    )
};

export default TableRow;