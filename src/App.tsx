import React from "react"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router-dom"

import "styles/fonts"
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
			{[100, 400, 700].map(fontWeight => {
				return <div key={fontWeight}>
					<h1 style={{ fontWeight }}>Lorem ipsum dolor sit amet.</h1>
					<p style={{ fontWeight }}>Lorem ipsum dolor sit amet.</p>
					<p style={{ fontWeight, fontStyle: "italic" }}>Lorem ipsum dolor sit amet.</p>
				</div>
			})}
			<Icon name="heart" />
		</>
	}
}