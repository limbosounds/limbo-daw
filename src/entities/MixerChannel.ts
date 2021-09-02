import { action, computed, observable } from "mobx"
import { Effect } from "./fx/Effect"

import { Gain } from "./fx/Gain"

export
class MixerChannel {
	outGain
		= new Gain()

	@observable
	effects
		: Effect[]
		= []

	get outNode(): AudioNode {
		return this.outGain.node
	}

	@computed
	get inNode(): AudioNode {
		return this.effects[0]?.node || this.outGain
	}

	@computed
	get lastFX(): Effect | undefined {
		return this.effects[this.effects.length - 1]
	}

	bindOut = (
		destination: AudioNode
	) => {
		this.outNode.disconnect()
		this.outNode.connect(destination)
	}

	@action
	createEffect = (
		EffectClass: new () => Effect
	) => {
		const effectInstance = new EffectClass()
		if (this.lastFX)
			this.lastFX.bindOut(effectInstance.node)

		effectInstance.bindOut(this.outNode)
		this.effects.push(effectInstance)
	}
}