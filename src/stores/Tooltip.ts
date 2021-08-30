import React from "react" // for types usage
import { observable, action, makeObservable } from "mobx"

class TooltipStore {
	constructor() {
		makeObservable(this)
	}
	// Setting the default coordinates to make em always defined
	@observable position
		: Coordinates2D
		= {
			x: 0,
			y: 0
		}

	@observable fadeOut
		: boolean
		= false

	@observable display
		: boolean
		= false

	@observable message?
		: React.ReactNode

	@action
	setMessage = (
		message: React.ReactNode
	) => {
		this.message = message
		this.display = true
		this.fadeOut = false
	}

	@action
	updatePosition = (
		x?: number,
		y?: number
	) => {
		if (!this.fadeOut && this.display) {
			this.position.x = typeof x == "number" ? x : this.position.x
			this.position.y = typeof y == "number" ? y : this.position.y
		}
	}

	@action
	handleFadeOut = (
		event: React.AnimationEvent<HTMLDivElement>
	) => {
		if (event.animationName == "fadeOut") { // can be set as a global parameter
			this.display = false
			this.fadeOut = false
		}
	}

	@action
	triggerFadeOut = () => {
		this.fadeOut = true
	}
}

export default new TooltipStore()