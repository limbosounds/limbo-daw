import { makeObservable, observable } from "mobx"

import { MixerChannel } from "entities/MixerChannel"
import Core from "./Core"

class Mixer {
	private createMaster = (): MixerChannel => {
		const master = new MixerChannel()
		master.bindOut(Core.audioContext.destination)

		return master
	}

	constructor() {
		makeObservable(this)
	}

	@observable
	channels
		: MixerChannel[]
		= [ this.createMaster() ]

	get master(): MixerChannel {
		return this.channels[0]
	}

	createChannel = () => {
		const channel = new MixerChannel()
		channel.bindOut(this.master.inNode)
	}
}

export default new Mixer()