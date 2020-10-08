import React from "react"

import store from "stores/Tooltip"

export interface TooltipProps {
	content: React.ReactNode,
	element?: React.ElementType,
	elementProps?: any
}

export interface TooltipState {

}

export default
class Tooltip
extends React.PureComponent<TooltipProps, TooltipState> {
	static defaultProps = {
		element: "div",
		elementProps: {}
	}

	componentWillUnmount() {
		store.triggerFadeOut()
	}

	handleMouseEnter = () => {
		store.setMessage(this.props.content)
	}

	handleMouseLeave = () => {
		store.triggerFadeOut()
	}

	render() {
		const Element = this.props.element!
		return <>
			<Element
				{...this.props.elementProps!}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				{this.props.children}
			</Element>
		</>
	}
}