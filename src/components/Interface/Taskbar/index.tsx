import { observer } from "mobx-react"
import React from "react"

import "styles/components/interface/taskbar"
import TaskbarButtons from "./components/buttons"

export interface TaskbarProps {

}

export interface TaskbarState {

}

@observer
export default
class Taskbar
extends React.Component<TaskbarProps, TaskbarState> {
	render() {
		return <>
			<section className="c-taskbar">
				<div className="project-info">
					<div className="project-name">
						temp_project.flp
					</div>
					<div className="hover-info">
						<span>
							Some hover info here
						</span>
						<strong>
							kappa
						</strong>
					</div>
				</div>
				<TaskbarButtons />
			</section>
		</>
	}
}