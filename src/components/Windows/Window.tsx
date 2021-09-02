import React from "react"
import { observer } from "mobx-react"

import WindowsManager from "stores/WindowsManager"

export interface WindowProps {
	id: string
}

export interface WindowState {

}

@observer
export default
class Window
extends React.Component<WindowProps, WindowState> {
	private borderSize
		: number
		= 4

	private headerSize
		: number
		= 40

	render() {
		const { id } = this.props

		const windowContent = WindowsManager.windowsData[id]
		const props = WindowsManager.getWindowById(id)?.props
		console.log(props)
		if (!props)
			return null

		const {
			size,
			position,
			title,
		} = props

		const isFocused = WindowsManager.focusedWindow == id
		
		return <>
			<div
				className={`c-window ${isFocused ? "focused" : ""}`}
				style={{
					width: size.width + this.borderSize * 2,
					height: size.height + this.borderSize + this.headerSize,
					left: position.x,
					top: position.y,
					padding: `${this.headerSize}px ${this.borderSize}px ${this.borderSize}px ${this.borderSize}px`
				}}
			>
				<header
					style={{
						height: this.headerSize,
						left: this.borderSize,
						right: this.borderSize
					}}
				>
					<h3>
						{title}
					</h3>
					<div className="actions">

					</div>
				</header>
				<div className="window-content">
					{windowContent}
				</div>
			</div>
		</>
	}
}