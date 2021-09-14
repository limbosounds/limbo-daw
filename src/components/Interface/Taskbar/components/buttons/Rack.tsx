import React from "react"
import { observer } from "mobx-react"

import WindowsManager from "stores/WindowsManager"

import Icon from "components/Icon"

export interface ButtonRackProps {

}

export interface ButtonRackState {

}

@observer
export default
class ButtonRack
extends React.Component<ButtonRackProps, ButtonRackState> {
	private windowId
		: string

	private buttonRef
		: HTMLElement

	componentDidMount() {
		this.windowId = WindowsManager.create(
			<><h1>{this.getWindowState()}</h1></>,
			{
				getTriggerRef: () => this.buttonRef,
				availableStates: ["minimized", "open"],
				title: "Channel rack",
				size: {
					width: 400,
					height: 600,
				},
			}
		)
	}

	getWindowState = () => {
		return WindowsManager.getWindowById(this.windowId)?.props.state || "open"
	}

	isWindowFocused = (): boolean => {
		return WindowsManager.focusedWindow == this.windowId
	}

	toggleWindowState = () => {
		if (this.getWindowState() == "open") {
			if (this.isWindowFocused())
				WindowsManager.setWindowState(this.windowId, "minimized")
			else
				WindowsManager.focus(this.windowId)
		} else {
			WindowsManager.setWindowState(this.windowId, "open")
			WindowsManager.focus(this.windowId)
		}
	}
	
	render() {
		const buttonState = this.getWindowState() == "open"
			? this.isWindowFocused()
				? "active"
				: "visible"
			: ""

		return <>
			<div 
				ref={r => this.buttonRef = (r! || undefined)}
				className={`c-taskbar-button ${buttonState} c-rack`}
				onClick={this.toggleWindowState}
			>
				<Icon
					name="reorder-four-sharp"
					size="large"
				/>
			</div>
		</>
	}
}