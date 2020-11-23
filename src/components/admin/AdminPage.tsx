import React from "react";
import Firebase from "firebase";
import { LoginSite } from "./sites"; 
import { BiThuSite } from "./BiThuSite";
import { BCHSite } from "./BCHSite";
import { KEYWORD } from "./Elements";
// import css file
import "./AdminPage.css";
import FIREBASE_CONFIG from "../Firebase";
Firebase.initializeApp(FIREBASE_CONFIG);

interface Props {

}

interface State {

}

function removeItemLocalStorage(key:string) {
	localStorage.removeItem(key);
}
function setItemLocalStorage(key:string, value:string) {
	localStorage.setItem(key, value);
}
function getItemLocalStorage(key:string) {
	return localStorage.getItem(key);
}

class AdminPage extends React.Component<Props, State> {

	private static Site:any;

	private keySignin:string = KEYWORD.SIGNIN;

	constructor(props: Props) {
		super(props);
		AdminPage.Site = <LoginSite/>;
		this.loadStatus();
	}

	async loadStatus(){
		let firestore = Firebase.firestore();
		let current = false;
		let data = {} as any;

		await firestore.collection(KEYWORD.MANAGEMENT).get().then(function(snapshot){
			snapshot.forEach(function(doc){
				data = doc.data();
			});
		});
		setItemLocalStorage(this.keySignin, data.current + "");
	}

	render() {
		let siteElement = {
			"bithu": <BiThuSite/>,
			"gvcn": <BiThuSite/>,
			"bch": <BCHSite/>,
			"loptruong": <BCHSite/>
		} as any;


		let signin = getItemLocalStorage(this.keySignin);
		let name = getItemLocalStorage(KEYWORD.ROLE_NAME);
		if(signin !== null && signin === "true" && name !== null){
			return siteElement[name]
		} else {
			return AdminPage.Site;
		}
	}
}

export default AdminPage;