import React from "react"
import { v4 as uuid } from "uuid"
import { action, makeObservable, observable } from "mobx"

import { Coords2D, Dimensions2D } from "typings/Geometry"

type WindowState =
	| "open"
	| "minimized"
	| "maximized"
	| "closed"

interface WindowData {
	id: string
	props: WindowProperties
}

interface WindowProperties {
	state: WindowState
	size: Dimensions2D
	position: Coords2D
	title: React.ReactNode
	resizable: boolean
	availableStates?: WindowState[]
}

class WindowsManager {
	constructor() {
		makeObservable(this)
	}
	
	windowsData
		: {
			[key: string]: React.ReactNode
		}
		= {}

	@observable
	windows
		: WindowData[]
		= []

	@observable
	focusedWindow?
		: string
		= ""

	getWindowById = (
		id: string
	) => {
		return this.windows.find(item => item.id == id)
	}

	@action
	create = (
		data: React.ReactNode,
		props: Partial<WindowProperties>,
	): string => {
		const id = uuid()
		const { offsetHeight, offsetWidth } = document.body
		const {
			availableStates = ["open", "maximized", "minimized", "closed"],
			resizable = false,
			size = {
				width: 0,
				height: 0,
			},
			state = "open",
			title = "",
		} = props || {}

		const position = props?.position || {
			x: Math.round(offsetWidth / 2 - size.width / 2),
			y: Math.round(offsetHeight / 2 - size.height / 2),
		}

		this.windowsData[id] = data
		this.windows.push({
			id,
			props: {
				availableStates,
				resizable,
				size,
				position,
				state,
				title,
			}
		})

		if (state != "closed")
			this.focus(id)

		return id
	}

	@action
	focus = (
		id: string
	) => {
		this.focusedWindow = id
	}

	@action
	updatePosition = (
		id: string,
		position: Coords2D
	) => {
		const window = this.getWindowById(id)
		if (!window)
			return

		window.props.position.x = position.x
		window.props.position.y = position.y
	}
}

export default new WindowsManager()