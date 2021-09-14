import React from "react"
import { observer } from "mobx-react"

import "styles/components/interface/taskbar/components/buttons"
import ButtonRack from "./Rack"

export interface TaskbarButtonsProps {

}

export interface TaskbarButtonsState {

}

@observer
export default
class TaskbarButtons
extends React.Component<TaskbarButtonsProps, TaskbarButtonsState> {
	render() {
		return <>
			<div className="c-taskbar-buttons">
				<ButtonRack />
				<ButtonRack />
			</div>
		</>
	}
}