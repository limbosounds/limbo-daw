import Oscillator from "entities/Oscillator"
import { Note } from "typings/Sound"
import { getNoteFrequency } from "utils/sound"

class Keyboard {
	private context
		: AudioContext
		= new AudioContext()

	referrence
		: {
			[key: string]: Note
		}
		= {
			z: { tone: "C", octave: 4 },
			q: { tone: "C", octave: 5 },
			w: { tone: "D", octave: 5 },
			e: { tone: "E", octave: 5 },
			r: { tone: "F", octave: 5 },
			t: { tone: "G", octave: 5 },
			y: { tone: "A", octave: 5 },
			u: { tone: "B", octave: 5 },
			i: { tone: "C", octave: 6 },
		}

	playedKeys
		: { [key: string]: Oscillator }
		= {}

	playKey = (
		key: string
	) => {
		const note = this.referrence[key]
		if (!note)
			return

		if (typeof this.playedKeys[key] == "undefined") {
			this.playedKeys[key] = new Oscillator(
				this.context,
				{ defaultFrequency: getNoteFrequency(note) }
			)
		}

		this.playedKeys[key].play()
	}

	unplayKey = (
		key: string
	) => {
		if (typeof this.playedKeys[key] == "undefined")
			return

		this.playedKeys[key].stop()
		delete this.playedKeys[key]
	}
}

export default new Keyboard()