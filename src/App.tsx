import React from "react"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router-dom"

import "styles/fonts"
import "styles/main"
import "styles/uni"

import Icon from "components/Icon"
import Tooltip from "components/UI/Tooltip"
import Keyboard from "stores/Keyboard"

export interface AppProps
extends RouteComponentProps<any> {

}

export interface AppState {
	
}

@observer
export default
class App
extends React.Component<AppProps, AppState> {
	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown)
		document.addEventListener("keyup", this.handleKeyUp)
	}

	handleKeyDown = (
		event: KeyboardEvent
	) => {
		if (event.repeat)
			return

		Keyboard.playKey(event.key)
	}

	handleKeyUp = (
		event: KeyboardEvent
	) => {
		Keyboard.unplayKey(event.key)
	}

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

			<Tooltip
				content={<>
					<strong>Click me</strong> to start googling! <Icon name="happy-outline" />
				</>}
				element="a"
				elementProps={{
					href: "https://google.com",
					target: "_BLANK",
					rel: "noopener",
					style: {
						color: "cornflowerblue"
					}
				} as React.AnchorHTMLAttributes<HTMLAnchorElement>}
			>
				Example with custom element
			</Tooltip>

			<Tooltip 
				content="Move cursor to the right edge of the screen"
				elementProps={{
					className: "u-paper l-1",
					style: {
						padding: 20
					}
				}}
			>
				Example with tooltip near the screen edge
			</Tooltip>

			<div style={{ margin: "0 auto", width: 600}}>
				{[...Array(5)].map((_, i) => {
					return <div
						key={i}
						className={`u-paper l-${i + 1}`}
						style={{
							height: 200,
							marginBottom: 40
						}}
					/>
				})}
			</div>
			<div style={{ height: 1200 }}>

			</div>
		</>
	}
}