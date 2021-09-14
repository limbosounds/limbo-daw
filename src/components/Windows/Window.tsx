import React from "react"
import { observer } from "mobx-react"

import { Coords2D } from "typings/Geometry"

import WindowsManager from "stores/WindowsManager"
import { toJS } from "mobx"

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

	private dragStartPosition?
		: Coords2D

	private windowBeforeDragPosition?
		: Coords2D

	get isDragged(): boolean {
		return !!this.dragStartPosition
			&& !!this.windowBeforeDragPosition
	}

	get windowProps() {
		return WindowsManager.getWindowById(this.props.id)!.props
	}

	componentDidMount() {
		document.addEventListener("mousemove", this.moveDrag)
		document.addEventListener("mouseup", this.endDrag)
	}

	componentWillUnmount() {
		document.removeEventListener("mousemove", this.moveDrag)
		document.removeEventListener("mouseup", this.endDrag)
	}

	startDrag = (
		event: React.MouseEvent<HTMLElement>
	) => {
		const { pageX: x, pageY: y } = event
		this.dragStartPosition = { x, y }
		this.windowBeforeDragPosition = { ...toJS(this.windowProps.position) }
	}

	moveDrag = (
		event: MouseEvent
	) => {
		if (!this.isDragged)
			return

		const { pageX: nx, pageY: ny } = event
		const { x, y } = this.dragStartPosition!

		const dx = nx - x
		const dy = ny - y

		WindowsManager.updatePosition(
			this.props.id,
			{ 
				x: this.windowBeforeDragPosition!.x + dx, 
				y: this.windowBeforeDragPosition!.y + dy, 
			}
		)
	}

	endDrag = () => {
		if (!this.isDragged)
			return

		this.dragStartPosition = undefined
		this.windowBeforeDragPosition = undefined
	}

	render() {
		const { id } = this.props

		const windowContent = WindowsManager.windowsData[id]
		const props = this.windowProps
		
		if (!props)
			return null

		const {
			size,
			position,
			title,
			state,
			getTriggerRef,
		} = props

		const isFocused = WindowsManager.focusedWindow == id

		const trigger = getTriggerRef?.()

		const { x: ox, y: oy }: Coords2D = {
			x: trigger?.getBoundingClientRect().left || 0,
			y: trigger?.getBoundingClientRect().top || 0,
		}

		const { x: px, y: py } = position
		
		return <>
			<div
				className={`c-window ${isFocused ? "focused" : ""} ${state}`}
				style={{
					width: size.width + this.borderSize * 2,
					height: size.height + this.borderSize + this.headerSize,
					left: px,
					top: py,
					padding: `${this.headerSize}px ${this.borderSize}px ${this.borderSize}px ${this.borderSize}px`,
					transformOrigin: `${ox - px}px ${oy - py}px`,
				}}
				onMouseDown={() => WindowsManager.focus(id)}
			>
				<header
					style={{
						height: this.headerSize,
						left: this.borderSize,
						right: this.borderSize
					}}
					onMouseDown={this.startDrag}
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