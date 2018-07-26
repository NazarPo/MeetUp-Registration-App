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
            onClick={props.onClick}
        >
            <th scope="row">{props.index + 1}</th>
            <td>{props.item.title}</td>
            <td>{createDatesArray(props.item.dates).join(', ')}</td>
            <td>{props.item.startTime}</td>
            <td align="center">
                {
                    props.item.isActive ?
                        <div className='active-meetup'>&nbsp;</div> :
                        <div className='not-active-meetup'>&nbsp;</div>
                }
            </td>
        </tr>
    )
};

export default TableRow;