import React from "react"
import ReactDOM from "react-dom"
import { observer } from "mobx-react"

import "styles/components/windows"

import WindowsManager from "stores/WindowsManager"
import Window from "./Window"

export interface WindowsProps {
	
}

export interface WindowsState {

}

@observer
export default
class Windows
extends React.Component<WindowsProps, WindowsState> {
	render() {
		return ReactDOM.createPortal(
			<>
				{WindowsManager.windows.map(item => {
					if (item.props.state == "closed")
						return null

					return <Window
						key={item.id}
						id={item.id}
					/>
				})}
			</>,
			document.body
		)
	}
}