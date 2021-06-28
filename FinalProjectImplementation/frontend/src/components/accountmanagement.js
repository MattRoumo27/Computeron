import React from 'react'
import AccountCreation from './accountcreation'
import AccountLogin from './accountLogin'
import DeleteAccount from './deleteAccount'

class AccountManager extends React.Component {
	finishAccountCreation() {
		this.createFinalMessage("New account has been created!")
	}

	finishAccountLogin() {
		this.createFinalMessage("New login was successful!")
	}

	createFinalMessage(message) {
		let container = document.getElementById("accountcontainer");
		container.style.fontStyle = "italic";
		container.style.color = "green";
		container.setAttribute("class", "row");
		container.innerHTML = `<h4> ${message} </h4>`
	}

	initialRender() {
		
	}

	/* Renders the submission forms for creating an account 
		and for logging into an account */
	render() {
		return (
			<div class = "container">
				<div class="row" id="accountcontainer">
					<div class="col-sm-6">
						<AccountCreation onFinish = {() => this.finishAccountCreation()}/>
					</div>
					<div class ="col-sm-6">
						<AccountLogin onFinish = {() => this.finishAccountLogin()}/>
					</div>
				</div>
				<DeleteAccount />
			</div>
		)
	}
}

export default AccountManager;