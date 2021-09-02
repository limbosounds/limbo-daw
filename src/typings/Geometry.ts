export interface Dimensions2D {
	width: number
	height: number
}

export interface Dimensions3D
extends Dimensions2D {
	length: number
}

export interface Coords2D {
	x: number
	y: number
}

export interface Coords3D
extends Coords2D {
	z: number
}