import React from "react"
import { observer } from "mobx-react"
import { Route, Switch } from "react-router-dom"

import "typings/global/Geometry"

import App from "App"
import TooltipDisplay from "components/UI/Tooltip/Display"

export interface ProviderProps {

}

export interface ProviderState {

}

@observer
export default
class Provider
extends React.Component<ProviderProps, ProviderState> {
	render() {
		return <>
			<Switch>
				<Route
					path="/"
					component={App}
				/>
			</Switch>
			
			{/* It is necessary to render this display component at the root of application to enable tooltips */}
			<TooltipDisplay />
		</>
	}
}