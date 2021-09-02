import { computed, observable, reaction } from "mobx"

import Core from "stores/Core"

import { Effect } from "./Effect"

export
class Gain
extends Effect {
	@observable
	private _amount
		: number
		= 1

	protected autoUpdateGain = reaction(
		() => this._amount,
		() => {
			this.node.gain.setValueAtTime(this._amount, Core.audioContext.currentTime)
		}
	)

	constructor() {
		super()
		this.node.gain.setValueAtTime(1, Core.audioContext.currentTime)
	}

	node
		= new GainNode(Core.audioContext)

	@computed
	get amount(): number {
		return this._amount
	}

	set amount(
		value: number
	) {
		this._amount = value
	}
}