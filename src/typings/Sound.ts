export type Tone =
| "C"
	| "C#"
| "D"
	| "D#"
| "E"
| "F"
	| "F#"
| "G"
	| "G#"
| "A"
	| "A#"
| "B"

export type Note = {
	octave: number
	tone: Tone
}

export type Waveform =
	| "sine"
	| "square"
	| "triangle"