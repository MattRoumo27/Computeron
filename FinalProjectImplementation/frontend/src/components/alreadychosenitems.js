import React from 'react'

class AlreadyChosenItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partsChosenHeader: "",
            partsChosenBody: "",
            partsChosenCurrently: ""
        }

        this.submitForm = this.submitForm.bind(this);
    }

    checkBoxClick(name, event) {
        console.log(event.target);
        let partChosen = name + " has been checked. ";
        if (event.target.checked === true) {
            this.setState((prevState, prevProps) => {
                return { partsChosenCurrently: prevState.partsChosenCurrently + partChosen };
            });
        } else {
            this.setState((prevState, prevProps) => {
                return { partsChosenCurrently: prevState.partsChosenCurrently.replace(partChosen, '') };
            });
        }

    }

    submitForm() {
        if (this.state.partsChosenCurrently === "") {
            this.setState((prevState, prevProps) => {
                return { partsChosenHeader: "", partsChosenBody: "", partsChosenCurrently: "" };
            });
        } else {
            this.setState((prevState, prevProps) => {
                return { partsChosenHeader: "Computer Parts Summary", partsChosenBody: prevState.partsChosenCurrently}
            });
        }
    }

    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-sm-5">
                        {this.renderQuestionForm()}
                    </div>
                    <div class="col-sm-7" id="partsinfo">
                        <h3> {this.state.partsChosenHeader} </h3>
                        <p> {this.state.partsChosenBody} </p>
                    </div>
                </div>
            </div>
        )
    }

    /* Render the form asked by the question */
    renderQuestionForm() {
        return (
            <form>
                <h6 class="questionheader">With your current computer build, what items do you already have chosen?</h6>
                <input type="checkbox" id="motherboard" name="parts" onClick={(event) => this.checkBoxClick("Motherboard", event)}/> Motherboard<br />
                <input type="checkbox" id="cpu" name="parts" onClick={(event) => this.checkBoxClick("Processor (CPU)", event)} /> Processor (CPU)<br />
                <input type="checkbox" id="ram" name="parts" onClick={(event) => this.checkBoxClick("RAM (Random Access Memory)", event)} /> RAM (Random Access Memory)<br />
                <input type="checkbox" id="gpu" name="parts"  onClick={(event) => this.checkBoxClick("Graphics Card (GPU)", event)}/> Graphics Card (GPU)<br />
                <input type="checkbox" id="storage" name="parts" onClick={(event) => this.checkBoxClick("Storage (Hard Drive or SSD)", event)} /> Storage (Hard drive or SSD)<br />
                <input type="checkbox" id="power" name="parts" onClick={(event) => this.checkBoxClick("Power Supply (PSU)", event)} /> Power Supply (PSU)<br />
                <input type="checkbox" id="case" name="parts" onClick={(event) => this.checkBoxClick("Computer Case", event)} /> Computer Case<br />
                <input type="checkbox" id="heatsink" name="parts" onClick={(event) => this.checkBoxClick("CPU Heatsink", event)} /> CPU Heatsink (not required if using stock
                cooler)<br />
                <input type="button" id="partsButton" value="Done" onClick={this.submitForm}/>
            </form>
        )
    }
}

export default AlreadyChosenItems;