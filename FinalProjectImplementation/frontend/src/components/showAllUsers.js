import React from 'react'

class ShowAllUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        fetch('https://computeron-backend.herokuapp.com/computeron/')
            .then(response => response.json())
            .then(data => {
                this.setState(() => {
                    return { users: data.info };
                });
            });
    }

    render() {
        return (
            <div className = "container">
                <h3>All Accounts Using Computeron</h3>
                <div className="col-sm-6">
                    <button id ="showusersbutton" onClick = {() => this.getUsers()}>Press to refresh list!</button>
                </div>
                <ol>
                    {this.state.users.map((account) =>
                    <li key = {account.username}><b>Name:</b> {account.name}, <b>Username:</b> {account.username},
                        <span> </span>
                        <b>Parts Logged:</b> {account.partsLogged.join(', ')}</li>)}
                </ol>
            </div>
        )
    }
}

export default ShowAllUsers;