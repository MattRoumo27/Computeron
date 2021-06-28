import React from 'react'
import Constants from '../constants/computertypes'

let kindsOfComputers = {
    "gaming": "Gaming Computer",
    "workstation": "Workstation Computer",
    "everyday": "Everyday Computer",
    "all-in-one": "All-in-one Computer"
};

class TypesOfComputerQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            computerHeader: "",
            computerInfo: "",
            textBoxValue: ""
        }

        this.handleTextChange = this.handleTextChange.bind(this)
    }

    changeInfoBasedOffRadioButtonInput(kindOfComputer, computerInfo) {
        /* Clear the text box if there is any text in it */
        this.clearTextboxValue();
        this.setState((prevState, prevProps) => {
            return { computerHeader: kindOfComputer, computerInfo: computerInfo };
        });
    }

    clearTextboxValue() {
        this.setState((prevState, prevProps) => {
            return { textBoxValue: "" };
        });
    }

    handleTextChange(event) {
        this.setState((prevState, prevProps) => {
            return { textBoxValue: event.target.value };
        });
    }

    selectClicked() {
        let kindOfComputer = "";
        let computerInfo = "";

        switch (this.state.textBoxValue) {
            case kindsOfComputers.gaming:
                kindOfComputer = kindsOfComputers.gaming;
                computerInfo = Constants.GAMINGPCDESCRIPTION;
                break;
            case kindsOfComputers.workstation:
                kindOfComputer = kindsOfComputers.workstation;
                computerInfo = Constants.WORKSTATIONPCDESCRIPTION;
                break;
            case kindsOfComputers.everyday:
                kindOfComputer = kindsOfComputers.everyday;
                computerInfo = Constants.EVERYDAYDESCRIPTION;
                break;
            case kindsOfComputers['all-in-one']:
                kindOfComputer = kindsOfComputers['all-in-one'];
                computerInfo = Constants.ALLINONEDESCRIPTION;
                break;
            default:
                kindOfComputer = "Please Enter A Valid Computer Type";
                computerInfo = "";
                break;
        }

        this.changeInfoBasedOffRadioButtonInput(kindOfComputer, computerInfo);
    }

    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-sm-5">
                        { this.renderForm() }
                    </div>
                    <div class="col-sm-7" id="computerinfo"> 
                        <h3> { this.state.computerHeader } </h3>
                        <p> { this.state.computerInfo } </p>
                    </div>
                </div>
            </div>
        )
    }

    /* Render the form that the user submits to the question */
    renderForm() {
        return (
            <form id="kindofpc">
                <h6 class="questionheader">Read more about the different kinds of personal computers</h6>
                <input type="radio" id="gaming" name="pc" onClick = {() => this.changeInfoBasedOffRadioButtonInput(kindsOfComputers.gaming, Constants.GAMINGPCDESCRIPTION)}/> Gaming Computer<br />
                <input type="radio" id="workstation" name="pc" onClick = {() => this.changeInfoBasedOffRadioButtonInput(kindsOfComputers.workstation, Constants.WORKSTATIONPCDESCRIPTION)}/> Workstation Computer<br />
                <input type="radio" id="everyday" name="pc" onClick = {() => this.changeInfoBasedOffRadioButtonInput(kindsOfComputers.everyday, Constants.EVERYDAYDESCRIPTION)}/> Everyday Computer<br />
                <input type="radio" id="allinone" name="pc" onClick = {() => this.changeInfoBasedOffRadioButtonInput(kindsOfComputers['all-in-one'], Constants.ALLINONEDESCRIPTION)}/> All-in-one Computer<br />
                <input type="text" id="typekind" value={this.state.textBoxValue} onChange={this.handleTextChange} placeholder="Or type exactly how it's listed above. Leave empty if not using"/> <br />
                <input type="button" id="processCheckButton" value="Select" onClick={() => this.selectClicked()}/>
            </form>
        )
    }
}

export default TypesOfComputerQuestion;