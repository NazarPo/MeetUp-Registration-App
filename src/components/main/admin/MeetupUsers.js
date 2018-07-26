import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../components-styles/admin/MeetupUsers.css';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class MeetupUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentWillMount() {
        fetch(`http://localhost:4000/meetups/${this.props.match.params.id}/users`)
            .then(res => res.json())
            .then(res => this.setState({
                users: res
            }))
    }

    imageFormatter = (cell) => {
        return `<img src=${cell} />`
    }

    render() {
        return (
            <div className='container meetup-users-container'>
                <h4>Таблиця усіх реєстрацій на поточний Meetup</h4>
                <BootstrapTable data={this.state.users} striped hover condensed pagination>
                    <TableHeaderColumn
                        dataField='picture'
                        dataFormat={this.imageFormatter}
                        dataAlign='center'
                        width='150'
                    >Avatar</TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='nickname'
                        isKey
                        width='140'
                    >Nickname</TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='name'
                        width='140'
                    >First name</TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='secondName'
                        width='140'
                    >Second name</TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='email'
                        width='250'
                    >Email</TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='phone'
                        width='140'
                    >Phone</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default MeetupUsers;