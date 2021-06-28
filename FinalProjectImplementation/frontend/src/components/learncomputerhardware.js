import React from 'react'
import Constants from '../constants/computertypes'
import Motherboard from '../hardwareImages/Motherboard.jpeg'
import CPU from '../hardwareImages/CPU.png'
import RAM from '../hardwareImages/RAM.jpeg'
import GPU from '../hardwareImages/GPU.png'
import Storage from '../hardwareImages/Storage.jpeg'
import PSU from '../hardwareImages/PSU.jpeg'
import Case from '../hardwareImages/Case.jpg'
import Heatsink from '../hardwareImages/Heatsink.jpeg'

let hardware = {
    motherboard: "Motherboard",
    cpu: "Processor (CPU)",
    ram: "RAM (Random Access Memory)",
    gpu: "Graphics Card (GPU)",
    storage: "Storage (Hard drive or SSD)",
    psu: "Power Supply (PSU)",
    case: "Computer Case",
    heatsink: "CPU Heatsink"
};

class ComputerHardwareInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partHeader: "",
            partInfo: "",
            partLogText: "",
            partsLogged: [], 
            img: false, 
            signedIn: false
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
    }

    /* Displays the relevant text information upon the click of a button */
    handleButtonClick(partName, partInformation) {
        this.setState((prevState, prevProps) => {
            return { partHeader: partName, partInfo: partInformation };
        });

        this.setState((prevState, prevProps) => {
            return { img: this.handleImageSelection(partName) }
        });
    }

    handleImageSelection(partName) {
        let img;
        switch (partName) {
            case hardware.motherboard:
                img = Motherboard;
                break;
            case hardware.cpu:
                img = CPU;
                break;
            case hardware.ram:
                img = RAM;
                break;
            case hardware.gpu:
                img = GPU;
                break;
            case hardware.storage:
                img = Storage;
                break;
            case hardware.psu:
                img = PSU;
                break;
            case hardware.case:
                img = Case;
                break;
            case hardware.heatsink:
                img = Heatsink;
                break;
            default:
                console.error("Received a bad part name argument in handleImageSelection(partName)");
                break;
        }

        return img;
    }

    /* Tracks when the text box value changes and updates accordingly */
    handleTextChange(event) {
        this.setState((prevState, prevProps) => {
            return { partLogText: event.target.value };
        });
    }

    /* Make sure the submit does not spazz out */
    handleSubmit(event) {
        event.preventDefault()
    }

    /* Add a part to the array state variable */
    handlePartLog() {
        if (this.state.partLogText === "") {
            return;
        } 
        else if (window.globalUsername === '') {
            this.setState(() => {
                return { partLogText: "Please create an account or sign in first. "};
            })
        } 
        else if (this.state.signedIn === false && window.globalUsername !== '') {
            this.setState(() => {
                return { signedIn: true }
            }, 
            () => this.getPartLogger().then(response => {
                this.setState(() => {
                    return { partLogText: "", partsLogged: response.concat(this.state.partLogText) }
                }, () => this.updatePartLog());
            }));
        } else {
            this.setState((prevState) => {
                return { partLogText: "",  partsLogged: prevState.partsLogged.concat(this.state.partLogText) }
            }, () => this.updatePartLog());
        }
    }

    async getPartLogger() {
        const response = await fetch(`https://computeron-backend.herokuapp.com/computeron/partLogger/${window.globalUsername}/`);
        const data = await response.json();
        return data.info
    }

    updatePartLog() {
        let data = {
            username: window.globalUsername,
            partsLogged: this.state.partsLogged
        };
        let options = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch('https://computeron-backend.herokuapp.com/computeron/partLogger/', options);
    }
    
    /* Give an alert to the user when they want to see the parts they have logged into the system */
    showParts() {
        if (window.globalUsername === '') {
            this.setState(() => {
                return { partLogText: "Please create an account or sign in first. "}
            });
            return
        } else if (this.state.signedIn === false && window.globalUsername !== '') {
            this.setState(() => {
                return { signedIn: true }
            },
            () => this.getPartLogger().then(response => {
                this.setState(() => {
                    return { partsLogged: response }
                }, () => this.showAlertOfParts());
            }));
        } else {
            this.showAlertOfParts();
        }
    }

    showAlertOfParts() {
        let text = "Parts: \n";

        /* Iterate through the current parts logged list and add each part to the string */
        for (let i = 0; i < this.state.partsLogged.length; i++) {
            text += this.state.partsLogged[i] + '\n';
        }

        /* Show an alert on the page */
        alert(text);
    }

    render() {
        return (
            <div class="container">
                {this.renderButtons()}
                {this.renderHardwareDesciption()}
            </div>
        )
    }

    renderButtons() {
        return (
            <div class="row">
                <div class="col">
                    <form onSubmit= {this.handleSubmit}>
                        <h5> Click the buttons below to read more about computer hardware...</h5>
                        <button id="mboardinfo" onClick={() => this.handleButtonClick(hardware.motherboard, Constants.MOTHERBOARDDESCRIPTION)}> Motherboard</button>
                        <button id="cpuinfo" onClick={() => this.handleButtonClick(hardware.cpu, Constants.CPUDESCRIPTION)}> Processor (CPU) </button>
                        <button id="raminfo" onClick={() => this.handleButtonClick(hardware.ram, Constants.RAMDESCRIPTION)} > RAM (Random Access Memory) </button>
                        <button id="gpuinfo" onClick={() => this.handleButtonClick(hardware.gpu, Constants.GPUDESCRIPTION)}> Graphics Card (GPU) </button>
                        <button id="storageinfo" onClick={() => this.handleButtonClick(hardware.storage, Constants.STORAGEDESCRIPTION)}> Storage (Hard drive or SSD) </button>
                        <button id="psuinfo" onClick={() => this.handleButtonClick(hardware.psu, Constants.PSUDESCRIPTION)}> Power Supply (PSU) </button>
                        <button id="caseinfo" onClick={() => this.handleButtonClick(hardware.case, Constants.CASEDESCRIPTION)}> Computer Case </button>
                        <button id="heatsinkinfo" onClick={() => this.handleButtonClick(hardware.heatsink, Constants.HEATSINKDESCRIPTION)}> CPU Heatsink </button> <br></br>
                        <input type="text" id="partlog" value={this.state.partLogText} onChange = {this.handleTextChange} placeholder="Log any parts for your current build that you already have chosen"/>
                        <input type="button" id="submitpartlog" value="Submit" onClick= {() => this.handlePartLog()}/>
                        <input type="button" id="showparts" value="Show Parts" onClick={() => this.showParts()}/>
                    </form>
                </div>
            </div>
        )
    }

    renderHardwareDesciption() {
        return (
            <div class="row">
                <div class="col">
                    <div id="hardwareinfo">
                        <h3 id="hardwareinfoheader"> {this.state.partHeader} </h3>
                        <p id="hardwareinfodesc"> {this.state.partInfo} </p>
                    </div>
                </div>
                <div class="col">
                    <div id="hardwareimage">
                        {this.renderHardwareImage()}
                    </div>
                </div>
            </div>
        )
    }

    renderHardwareImage() {
        let imageContainer = document.getElementById("hardwareimage");
        if (imageContainer == null) {
            return;
        } else {
            let imageJSX = `<img id='hardwarePhoto' src=${this.state.img} alt='hardwareComponent' />`
            if (this.state.img !== false) {
                imageContainer.innerHTML = imageJSX;
            } else {
                imageContainer.innerHTML = "";
            }
        }
    }
}

export default ComputerHardwareInfo;