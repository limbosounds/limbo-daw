import { Waveform } from "typings/Sound"

export interface OscillatorProps {
	defaultWaveform?: Waveform
	defaultFrequency?: number
}

export default class Oscillator {
	private waveform
		: Waveform
		= this.props?.defaultWaveform || "sine"

	private freq
		: number
		= this.props?.defaultFrequency || 440

	private osc
		: OscillatorNode
		= this.context.createOscillator()

	constructor(
		private readonly context: AudioContext,
		private readonly props?: OscillatorProps,
	) {
		this.setWaveform(this.waveform)
		this.setFrequency(this.freq)
	}

	setWaveform = (
		waveform: Waveform
	) => {
		// TODO implement it through reactions
		this.waveform = waveform
		this.osc.type = this.waveform
	}

	setFrequency = (
		frequency: number
	) => {
		// TODO implement it through reactions
		this.freq = frequency
		this.osc.frequency.setValueAtTime(this.freq, this.context.currentTime)
	}

	play = () => {
		this.osc.connect(this.context.destination)
		this.osc.start()
	}

	stop = () => {
		this.osc.stop()
		this.osc.disconnect()
	}
}