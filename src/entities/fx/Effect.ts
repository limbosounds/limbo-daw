export
class Effect {
	node
		: AudioNode

	bindOut = (
		destination: AudioNode
	) => {
		this.node.disconnect()
		this.node.connect(destination)
	}
}