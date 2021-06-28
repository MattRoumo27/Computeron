import React from 'react'

function RenderTitle(props) {
	return (
		<div class="container">
			<h1 id="title">
				Computeron
			</h1>
		</div>
	)
}

function RenderWelcome(props) {
	return (
		<div class="container">
			<h2> Welcome </h2>
			<p id="aboutdescription">
				Computeron is an application created by one developer, Matt Roumeliotis. It is designed to help learn
                about personal computer systems.
                The world of computers can get complicated very quickly upon a single glance. This website will help
                novice and advanced
                computer enthusiasts learn more about the hardware components that go into personal computers, and it
                will help them
                learn how to build their own personal computer from scratch that can be used daily.
			</p>
		</div>
	)
}

export {RenderTitle, RenderWelcome};