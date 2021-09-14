import React from "react"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router-dom"

import "styles/fonts"
import "styles/main"
import "styles/uni"

// import WindowsManager from "stores/WindowsManager"
import Windows from "components/Windows"
import Taskbar from "components/Interface/Taskbar"

export interface AppProps
extends RouteComponentProps<any> {

}

export interface AppState {
	
}

@observer
export default
class App
extends React.Component<AppProps, AppState> {
	// componentDidMount() {
	// 	WindowsManager.create(
	// 		<>
	// 			<h1 style={{ color: "black" }}>
	// 				Hello, world!
	// 			</h1>
	// 			<Link to="/">Link to '/'</Link> <br />
	// 			<Link to="/kappa">Link to '/kappa'</Link> <br />
	// 			<Link to="/pride">Link to '/pride'</Link> <br />
	// 		</>,
	// 		{
	// 			size: { width: 800, height: 600 },
	// 			title: "Test window",
	// 		}
	// 	)

	// 	WindowsManager.create(
	// 		<>
	// 			<h1 style={{ color: "black" }}>
	// 				Hello, world!
	// 			</h1>
	// 		</>,
	// 		{
	// 			size: { width: 400, height: 300 },
	// 			title: "Test window",
	// 		}
	// 	)
	// }

	render() {
		return <>
			<Taskbar />
			<Windows />
		</>
	}
}