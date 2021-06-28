import React from 'react'
var crypto = require('crypto')

class AccountCreation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            username: "",
            password: "",
            confirmpassword: "",
            createAccountError: "",
            interests: "",
            accountgaming: false,
            accountworkstation: false, 
            accounteveryday: false,
            accountallinone: false,
            termsofservice: false,
        }

        this.handleTextboxChange = this.handleTextboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleTextboxChange(event) {
        this.setState(() => {
            return { [event.target.id]: event.target.value }
        });
    }

    checkboxClicked(event) {
        this.setState((prevState) => {
            return { [event.target.id]: !prevState[event.target.id]}
        });
    }

    /* Need to check for valid parameters */
    handleSubmit() {
        /* Clear any previous error messages first */
        this.setState(() => {
            return { createAccountError: "" };
        });

        let numberOfErrors = 0;

        /* Check if all the information is correctly formatted */ 
        numberOfErrors += this.checkIfInputsAreCorrectOnSubmit();
        numberOfErrors += this.checkIfInvalidNameOnSubmit();
        numberOfErrors += this.checkIfPasswordsMatchOnSubmit();
        numberOfErrors += this.checkIfEmailIsValidOnSubmit();
        numberOfErrors += this.checkIfTermsOfServiceHasBeenCheckedOnSubmit();
        numberOfErrors += this.checkIfInterestsHaveBeenCheckedOnSubmit();

        let allInterests = this.assignInterestsOnSubmit(numberOfErrors);

        /* Set the interests and then check if account creation was successful */
        this.setState(() => {
            return { interests: allInterests };
        }, () => this.checkIfSuccessfulAccountCreation(numberOfErrors));
    }

    setErrorMessage(errorMessage) {
        this.setState((prevState) => {
            return { createAccountError: prevState.createAccountError + errorMessage };
        }, () => console.log(this.state));
    }

    assignInterestsOnSubmit() {
        console.log(this.state);
        let allInterests = ""
        if (this.state.accountgaming === true) {
            allInterests += "Gaming computers. ";
        }
        if (this.state.accountworkstation === true) {
            allInterests += "Workstation computers. ";
        }
        if (this.state.accounteveryday === true) {
            allInterests += "Everyday computers. ";
        }
        if (this.state.accountallinone === true) {
            allInterests += "All-in-one computers. ";
        }

        return allInterests;
    }

    checkIfInputsAreCorrectOnSubmit() {
        let numberOfErrors = 0;
        let areInputsNotFilled = this.state.name === "" || this.state.email === "" || this.state.username === ""
            || this.state.password === "" || this.state.confirmpassword === "";

        if (areInputsNotFilled) {
            let errorMessage = "Some inputs are not filled in. ";
            console.error(errorMessage);
            this.setErrorMessage(errorMessage);
            numberOfErrors += 1;
        }

        return numberOfErrors;
    }

    checkIfInvalidNameOnSubmit() {
        let numberOfErrors = 0;
        let invalidName = this.state.name.match('[^a-zA-Z- ]+');

        if (invalidName) {
            let errorMessage = "The name field is not a valid name ";
            console.error(errorMessage);
            this.setErrorMessage(errorMessage);
            numberOfErrors += 1;
        }

        return numberOfErrors;
    }

    checkIfPasswordsMatchOnSubmit() {
        let numberOfErrors = 0;
        let doPasswordsNotMatch = this.state.password !== this.state.confirmpassword;

        if (doPasswordsNotMatch) {
            let errorMessage = "Passwords do not match each other. ";
            console.error(errorMessage);
            this.setErrorMessage(errorMessage);
            numberOfErrors += 1;
        }

        return numberOfErrors;
    }

    checkIfEmailIsValidOnSubmit() {
        let numberOfErrors = 0;
        let isEmailNotValid = !this.state.email.includes("@") || (!this.state.email.endsWith(".com")
            && !this.state.email.endsWith(".net") && !this.state.email.value.endsWith(".edu"));

        if (isEmailNotValid) {
            let errorMessage = "The email address given is not a valid email address. ";
            console.error(errorMessage);
            this.setErrorMessage(errorMessage);
            numberOfErrors += 1;
        }

        return numberOfErrors;
    }

    checkIfTermsOfServiceHasBeenCheckedOnSubmit() {
        let numberOfErrors = 0;
        let termsOfServiceChecked = this.state.termsofservice;

        if (!termsOfServiceChecked) {
            let errorMessage = "The Terms of Service have not been agreed to. ";
            console.error(errorMessage);
            this.setErrorMessage(errorMessage);
            numberOfErrors += 1;
        }

        return numberOfErrors;
    }

    checkIfInterestsHaveBeenCheckedOnSubmit() {
        let numberOfErrors = 0;
        let interestsChecked = this.state.accountgaming || this.state.accountworkstation || this.state.accounteveryday
            || this.state.accountallinone;

        if (!interestsChecked) {
            let errorMessage = "Please choose at least one interest. ";
            console.error(errorMessage);
            this.setErrorMessage(errorMessage);
            numberOfErrors += 1;
        }

        return numberOfErrors;
    }

    checkIfSuccessfulAccountCreation(numberOfErrors) {
        if (numberOfErrors !== 0) {
            return
        }
        this.postAccountData().then(databaseSuccess => {
            let successfulAccountCreation = databaseSuccess;
            if (successfulAccountCreation) {
                console.log(this.state.interests)
                console.log("No errors during the create account process!");
                let newAccountMessage = "New account has been created with name: " + this.state.name + ", email: " + this.state.email +
                    ", username: " + this.state.username + ", and with interests: " + this.state.interests;
                alert(newAccountMessage);
                window.globalUsername = this.state.username;
                this.props.onFinish();
            } else if (databaseSuccess === false) {
                this.setErrorMessage('Username has already been taken! Choose a different username for your account.');
            }
        });
    }

    async postAccountData() {
        const hashedPassword = crypto.createHash('sha256').update(this.state.password).digest('hex')
        let data = {
            name: this.state.name, 
            email: this.state.email, 
            username: this.state.username, 
            password: hashedPassword,
            partsLogged: []
        };

        let options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const response = await fetch('https://computeron-backend.herokuapp.com/computeron/', options);
        const responseData = await response.json();
        console.log("Response is: ", responseData);
        if (responseData.info === null) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
			<form>
				<h5>Create an account to save your computer builds</h5>
				<input type="text" id="name" placeholder="Name" onChange={(event) => this.handleTextboxChange(event)}/><br></br>
				<input type="email" id="email" placeholder="Email" onChange={(event) => this.handleTextboxChange(event)} /><br></br>
				<input type="text" id="username" placeholder="Username" onChange={(event) => this.handleTextboxChange(event)} /><br></br>
				<input type="password" id="password" placeholder="Password" onChange={(event) => this.handleTextboxChange(event)} /><br></br>
				<input type="password" id="confirmpassword" placeholder="Confirm password" onChange={(event) => this.handleTextboxChange(event)} /><br></br>
				<h6>Choose the types of computers you are interested in. </h6>
				<input type="checkbox" id="accountgaming" onClick={(event) => this.checkboxClicked(event)}/> Gaming Computer &nbsp; 
				<input type="checkbox" id="accountworkstation" onClick={(event) => this.checkboxClicked(event)}/> Workstation Computer<br></br>
				<input type="checkbox" id="accounteveryday" onClick={(event) => this.checkboxClicked(event)}/> Everday Computer &nbsp;
				<input type="checkbox" id="accountallinone" onClick={(event) => this.checkboxClicked(event)}/> All-in-one <br></br>
				<input type="checkbox" id="termsofservice" onClick={(event) => this.checkboxClicked(event)}/> <b>Accept the terms of service</b> <br></br>
				<input type="button" id="createAccountButton" value="Create Account" onClick = {this.handleSubmit}/>
				<p id="createAccountError"> {this.state.createAccountError} </p>
			</form>
		)
    }
}

export default AccountCreation;