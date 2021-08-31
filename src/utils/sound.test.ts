import * as should from "should"

import "mocha"

import {
	getNoteFrequency,
	getNoteIndex, getNotesDistance,

} from "./sound"

import { Note } from "../typings/Sound"

describe("utils", () => {
	describe("sound.ts", () => {
		describe("getNoteIndex()", () => {
			const tests: {
				note: Note
				expected: number,
			}[] = [
				{
					note: { octave: 0, tone: "C" },
					expected: 0,
				},
				{
					note: { octave: 0, tone: "B" },
					expected: 11,
				},
				{
					note: { octave: 1, tone: "C" },
					expected: 12,
				},
				{
					note: { octave: 1, tone: "A" },
					expected: 21,
				},
				{
					note: { octave: 2, tone: "D" },
					expected: 26,
				},
			]

			tests.forEach((test, i) => {
				const { note, expected } = test
				it(`Case ${i + 1}, ${note.tone}${note.octave}`, done => {
					should(getNoteIndex(note)).be.exactly(expected)
					done()
				})
			})
		})

		describe("getNotesDistance()", () => {
			const tests: {
				from: Note,
				to: Note,
				expected: number
			}[] = [
				{
					from: { octave: 4, tone: "D" },
					to: { octave: 4, tone: "F" },
					expected: 3,
				},
				{
					from: { octave: 4, tone: "F" },
					to: { octave: 4, tone: "D" },
					expected: -3,
				},
				{
					from: { octave: 4, tone: "D" },
					to: { octave: 2, tone: "A" },
					expected: -17,
				},
				{
					from: { octave: 2, tone: "A" },
					to: { octave: 4, tone: "D" },
					expected: 17,
				},
			]

			tests.forEach((test, i) => {
				const { from, to, expected } = test
				it(`Case ${i + 1}, from ${from.tone}${from.octave} to ${to.tone}${to.octave}`, done => {
					should(getNotesDistance(from, to)).be.exactly(expected)
					done()
				})
			})
		})
		
		describe("getNoteFrequency()", () => {
			const tests: {
				note: Note,
				base?: Note,
				expected: number
			}[] = [
				{
					note: { octave: 1, tone: "B" },
					expected: 61.74,
				},
				{
					note: { octave: 4, tone: "A" },
					base: { octave: 1, tone: "B" },
					expected: 440,
				},
				{
					note: { octave: 6, tone: "F" },
					expected: 1396.96,
				},
				{
					note: { octave: 4, tone: "A" },
					base: { octave: 6, tone: "F" },
					expected: 440,
				},
			]

			tests.forEach((test, i) => {
				const { note, base, expected } = test
				it(`Case ${i + 1}, note ${note.tone}${note.octave}${base ? `, based on ${base.tone}${base.octave}` : ""}` , done => {
					should(getNoteFrequency(note, base)).be.approximately(expected, 0.05)
					done()
				})
			})
		})
		
	})
})