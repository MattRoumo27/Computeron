import './App.css';
import React from 'react';

/* Components */
import {RenderTitle, RenderWelcome} from './components/titleandwelcome'
import ComputerHardwareInfo from './components/learncomputerhardware'
import AccountManager from './components/accountmanagement'
import TypesOfComputerQuestion from './components/learntypesofcomputers'
import AlreadyChosenItems from './components/alreadychosenitems'
import ShowAllUsers from './components/showAllUsers'
import ShowTweets from './components/showTweets'

window.globalUsername = '';

class App extends React.Component {
	render() {
		return (
			<div class="container">
				<RenderTitle />
				<RenderWelcome />
				<ComputerHardwareInfo />
				<AccountManager />
				<TypesOfComputerQuestion />
				<AlreadyChosenItems />
				<ShowAllUsers />
				<ShowTweets />
			</div>
		)
	}
}

export default App;
