import React from 'react'
var crypto = require('crypto')

class AccountLogin extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            loginname: "",
            loginpass: "",
            rememberme: false,
            forgotpass: false,
            loginerror: ""
        }

        this.handleTextboxChange = this.handleTextboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextboxChange(event) {
        this.setState(() => {
            return { [event.target.id]: event.target.value };
        });
    }

    checkboxClicked(event) {
        this.setState((prevState) => {
            return { [event.target.id]: !prevState[event.target.id] };
        });
    }

    setLoginErrorToDefault() {
        this.setState(() => {
            return { loginerror: "" };
        });
    }

    handleSubmit() {
        this.setLoginErrorToDefault();

        let numberOfErrors = 0;
        numberOfErrors += this.areInputsNotFilled();

        /* Check if account exists on MongoDB database */
        let isAccountOnDatabase = this.findIfAccountExistsOnDatabase()
        
        isAccountOnDatabase.then(response => {
            let successfulLogin = numberOfErrors === 0 && !this.state.forgotpass && response;
            if (successfulLogin) {
                let newLogin = `New login with username ${this.state.loginname}! and remember me status ${this.state.rememberme}`;
                alert(newLogin);
                window.globalUsername = this.state.loginname;
                this.props.onFinish();
            } else if (this.state.forgotpass) {
                this.setLoginErrorToDefault();
                this.setErrorMessage("Forgot password!");
            } else if (response === false) {
                this.setLoginErrorToDefault();
                this.setErrorMessage("This account does not exits! Make sure your account information is typed correctly!")
            }
        })
    }

    async findIfAccountExistsOnDatabase() {
        const hashedPassword = crypto.createHash('sha256').update(this.state.loginpass).digest('hex')
        const response = await fetch(`https://computeron-backend.herokuapp.com/computeron/accountlookup/${this.state.loginname}/${hashedPassword}/`);
        const data = await response.json();
        if (data.info === null) {
            return false;
        } else {
            return true;
        }
    }

    areInputsNotFilled() {
        let numberOfErrors = 0;
        let inputsNotFilled = this.state.loginname === "" || this.state.loginpass === "";

        if (inputsNotFilled) {
            let errorMessage = "One or more of the login inputs are empty! ";
            this.setErrorMessage(errorMessage);
            numberOfErrors = 1;
        }

        return numberOfErrors;
    }

    setErrorMessage(errorMessage) {
        this.setState((prevState) => {
            return { loginerror: prevState.loginerror + errorMessage };
        });
    }

    render() {
        return (
			<form>
				<h5>Or login into an existing account</h5>
				<input type="text" id="loginname" placeholder="Username" onChange={(event) => this.handleTextboxChange(event)}/><br></br>
				<input type="password" id="loginpass" placeholder="Password" onChange={(event) => this.handleTextboxChange(event)}/><br></br>
				<input type="checkbox" id="rememberme" onClick={(event) => this.checkboxClicked(event)}/> Remember me <br></br>
				<input type="checkbox" id="forgotpass" onClick={(event) => this.checkboxClicked(event)}/> Forgot Password? <br></br>
				<input type="button" id="loginButton" value="Login" onClick = {this.handleSubmit}/>
				<p id="loginAccountError"> {this.state.loginerror} </p>
			</form>
		)
    }
}

export default AccountLogin;