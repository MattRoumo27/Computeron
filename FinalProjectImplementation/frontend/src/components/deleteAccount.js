import React from 'react'

class DeleteAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ""
        }

        this.handleDeleteAccount = this.handleDeleteAccount.bind(this)
    }

    setMessageState(message) {
        this.setState(() => {
            return { message: message };
        });
    }

    handleDeleteAccount() {
        if (window.globalUsername === '') {
            this.setMessageState("Need to create or login to an account before deleting it.");
        } else {
            let accountData = { username: window.globalUsername }
            let options = {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(accountData)
            }
            fetch('https://computeron-backend.herokuapp.com/computeron/', options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    this.setMessageState("Account successfully deleted! Reload the page to make a new account or sign into a different one!");
                } else {
                    this.setMessageState("Error occurred when trying to delete account!")
                }
            });
        }
    }

    render() {
        return (
            <div class="row" id="deleteaccountcontainer">
                <div class="col-sm-6">
                    <input type="button" id="deleteaccountbutton" value="Delete Account" onClick = {this.handleDeleteAccount}/>
                </div>
                <div class="col-sm-6">
                    <p id="deleteaccountmessage"> {this.state.message}</p>
                </div>
            </div>
        )
    }
}

export default DeleteAccount;