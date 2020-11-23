import { IonContent } from "@ionic/react";
import { AdElement } from "./Elements";
import Firebase from "firebase";
import React from "react";
import { 
	getItemLocalStorage, 
	setItemLocalStorage, 
	removeItemLocalStorage 
} from "../module/functions";
import { BiThuFeature } from "../module/bithu-function";

let btTruong = (
	<AdElement/>
);
let btKhoa = (
	<AdElement/>
);

interface Props {

}

interface State {

}

class BiThuSite extends React.Component<Props, State> {
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
		let createList = await BiThuFeature["load"]["create"](Firebase, role);
		let readList = await BiThuFeature["load"]["read"](Firebase, role);

		this.setState({
			features: {
				create: createList,
				read: readList
			}
		} as any);
	}

	render() {
		let range = getItemLocalStorage("role-range");
		btTruong = (<AdElement features={this.state.features}/>);
		btKhoa = (<AdElement features={this.state.features}/>);
		let biThuElement = { "truong": btTruong, "khoa": btKhoa, } as any;	

		if(range !== null) {
			return (<IonContent> {biThuElement[range]} </IonContent> )
		} else {
			return (<IonContent></IonContent> );
		}		
	}
}

export { BiThuSite }