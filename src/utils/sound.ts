import { Note, Tone } from "../typings/Sound"

export const toneOrdering: Tone[] = [
	"C",
	"C#",
	"D",
	"D#",
	"E",
	"F",
	"F#",
	"G",
	"G#",
	"A",
	"A#",
	"B",
]

export const getNoteIndex = (
	note: Note
): number => {
	return toneOrdering.indexOf(note.tone) + note.octave * 12
}

export const getNotesDistance = (
	fromNote: Note,
	toNote: Note,
): number => {
	return getNoteIndex(toNote) - getNoteIndex(fromNote)
}

export const getNoteFrequency = (
	note: Note,
	base: Note = {
		octave: 4,
		tone: "A",
	}
): number => {
	let baseFrequency = 440
	if (base.octave != 4 && base.tone != "A")
		baseFrequency = getNoteFrequency(base)

	const distance = getNotesDistance(base, note)
	return +(baseFrequency * (2 ** (distance / 12))).toFixed(2)
}