import React from "react"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router-dom"

import "styles/main"

import Icon from "components/Icon"

export interface AppProps
extends RouteComponentProps<any> {

}

export interface AppState {
	
}

@observer
export default
class App
extends React.Component<AppProps, AppState> {

	render() {
		return <>
			<h1>Hello, world!</h1>
			<Icon name="heart" />
		</>
	}
}