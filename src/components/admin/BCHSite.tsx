import React from "react";
import Firebase from "firebase";
import { IonContent } from "@ionic/react";
import { AdElement } from "./Elements";
import { 
	getItemLocalStorage, 
	setItemLocalStorage, 
	removeItemLocalStorage 
} from "../module/functions";
import { BCHFeature } from "../module/bch-lop-function";

interface Props {

}

interface State {

}

let bch = (
	<AdElement/>
);

class BCHSite extends React.Component<Props, State> {
	state = {
		features:{} as any
	};

	constructor(props:Props) {
		super(props);

		this.state = {
			features: {} as any
		} as any;
	}

	async componentWillMount(){
		let name = getItemLocalStorage("role-name");
		let range = getItemLocalStorage("role-range");
		let role={name: name, range: range};
		let createList = await BCHFeature["load"]["create"](Firebase, role);
		let readList = await BCHFeature["load"]["read"](Firebase, role);

		this.setState({
			features: {
				create: createList,
				read: readList
			}
		} as any);
	}

	render() {
		let range = getItemLocalStorage("role-range");
		bch = (<AdElement features={this.state.features}/>);
		
		if(range !== null) {
			let bchElement = {
				"lop": bch,
			} as any;
			
			return (<IonContent> {bchElement[range]} </IonContent> )
		} else {
			return (<IonContent></IonContent> );
		}	
	}
}

export { BCHSite }