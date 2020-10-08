import "typings/IonIcon"

import React from "react"

export interface IconProps {
	name: string,
	size?: string
}

export interface IconState {

}

export default
class Icon
extends React.Component<IconProps, IconState> {
	render() {
		return <span className="c-icon">
			<ion-icon 
				name={this.props.name}
				size={this.props.size}
			/>
		</span>
	}
}