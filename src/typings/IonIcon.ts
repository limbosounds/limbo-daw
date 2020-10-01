export {}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"ion-icon": {
				name: string,
				size?: string
			}
		}
	}
}