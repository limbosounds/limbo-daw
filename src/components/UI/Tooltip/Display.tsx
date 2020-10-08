import React from "react"
import { observer } from "mobx-react"

import "styles/components/ui/tooltip/display"

import store from "stores/Tooltip"

export interface TooltipDisplayProps {

}

export interface TooltipDisplayState {

}

@observer
export default
class TooltipDisplay
extends React.PureComponent<TooltipDisplayProps, TooltipDisplayState> {
	componentDidMount() {
		document.addEventListener("mousemove", this.handleMouseMove)
	}

	handleMouseMove = (
		event: MouseEvent
	) => {
		store.updatePosition(event.clientX, event.clientY)
	}

	render() {
		const { display } = store
		return <>
			<div className="c-tooltip-display">
				<div className="td-inner-wrapper">
					{display &&
						<TooltipContent />
					}
				</div>
			</div>
		</>
	}
}

@observer
class TooltipContent
extends React.PureComponent<{}, { shifted: boolean }> {
	static OFFSET_X
		: number
		= 10

	static OFFSET_Y
		: number
		= 10

	state = {
		shifted: false
	}

	div
		: HTMLDivElement

	componentDidUpdate() {
		const { x } = store.position
		this.setState({
			shifted: x + this.div.offsetWidth + TooltipContent.OFFSET_X >= document.body.offsetWidth
		})
	}

	render() {
		const { fadeOut, message } = store
		const { x, y } = store.position
		const { shifted } = this.state
		const { OFFSET_X, OFFSET_Y } = TooltipContent
		return <div
			ref={r => this.div = r!}
			className={`tooltip u-fade-${fadeOut ? "out" : "in"}`}
			onAnimationEnd={store.handleFadeOut}
			style={{
				transform: `translate(${x + OFFSET_X}px, ${y + OFFSET_Y}px) translateX(${shifted ? `calc(-100% - ${OFFSET_X}px)` : 0}) translateZ(0)`
			}}
		>
			{message}
		</div>
	}
}