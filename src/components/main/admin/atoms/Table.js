import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../../../components-styles/admin/Table.css';
import TableRow from './TableRow';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedRowId: 0,
            isRowClicked: false
        }
    }

    onRowClickHandler = (id) => {
        this.setState({
            clickedRowId: id,
            isRowClicked: true
        })
    };

    render() {
        if(this.state.isRowClicked){
            let link = `/admin/meet-up/${this.state.clickedRowId}`;
            return <Redirect to={link} />
        }
        return (
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Назва</th>
                        <th scope="col">Дата</th>
                        <th scope="col">Час початку</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        [].map.call(this.props.meetUpsList, (meetUp, index) => {
                            return (
                                <TableRow
                                    key={meetUp._id}
                                    item={meetUp}
                                    onClick={() => this.onRowClickHandler(meetUp._id)}
                                    index={index}
                                />
                            )
                        })
                    }
                </tbody>
            </table>
        );
    }
}

export default Table;