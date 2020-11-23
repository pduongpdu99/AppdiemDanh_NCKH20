import {IonContent, IonItem, IonGrid, IonCol, IonButton, IonLabel, IonIcon, IonInput, IonRow} from "@ionic/react";
import React from "react";
import Firebase from "firebase";
import { BITHU, GVCN, BCH, LOPTRUONG, CVHT } from "../module/rolename";
import { TRUONG, KHOA, LOP } from "../module/rolerange";
import { 
	getItemLocalStorage, 
	setItemLocalStorage, 
	removeItemLocalStorage 
} from "../module/functions";

const KEYWORD = {
	SIGNIN: "signin",
	MANAGEMENT: "management",
	ROLE: {
		"BITHU": BITHU,
		"GVCN": GVCN,
		"CVHT": CVHT,
		"BCH": BCH,
		"LOPTRUONG": LOPTRUONG
	},
	RANGE: {
		"TRUONG": TRUONG,
		"KHOA": KHOA,
		"LOP": LOP,
	},
	ROLE_NAME: "role-name",
	ROLE_RANGE: "role-range"
} as any;

const URL = {
	"createEventList":"create-event",
	"readEventList":"read-event",
	"createLabList":"create-lab",
	"readLabList":"read-lab",
} as any;

let logoutElement = (<IonButton expand="full" color="danger" onClick={signout}>
	<IonLabel>Đăng xuất</IonLabel>
</IonButton>);

function signout() {
	removeItemLocalStorage("signin");
	removeItemLocalStorage("role-name");
	removeItemLocalStorage("role-range");
	removeItemLocalStorage("admin-unit");
	removeItemLocalStorage("admin-fullname");
	Firebase.firestore().collection("management").doc("signin").set({"current": false})
	setTimeout(()=>window.location.reload(),1000);
}

// elements
function AdElement(props:any){
	let name = getItemLocalStorage("role-name")+"";
	let range = getItemLocalStorage("role-range")+"";
	let unit = getItemLocalStorage("admin-unit")+"";
	let fullname = getItemLocalStorage("admin-fullname");

	let features = props.features;
	let featureKeys = Object.keys(features);
	let nghiepVu = {} as any;
	let JSXComponent = (<div></div>);

	if(featureKeys.length !== 0)
	{
		for(let i = 0;i<featureKeys.length;i++) {
			let feature = features[featureKeys[i]];
			if(feature.length !== 0){
				let keys = Object.keys(feature);
				let obj = {} as any;
				for(let j = 0;j<keys.length;j++){
					obj[keys[j]] = feature[keys[j].toString()];
				}
				Object.assign(nghiepVu, obj);
			}
		}

		let keys = Object.keys(nghiepVu) as any;
		JSXComponent = keys.map((key:any) => {
			return (<a style={{marginTop: 10, textDecoration:"none"}} key={key} href={"./"+URL[key]}>
				<IonButton expand="full" color="light" >
					<IonLabel>{nghiepVu[key]}</IonLabel>
				</IonButton>
			</a>)}
		);
	}


	if(name!==null&&range!==null) {
		let upperName = (name+"").toUpperCase() as any, 
			upperRange = (range+"").toUpperCase() as any;
		let role = KEYWORD.ROLE[upperName];
		let rang = KEYWORD.RANGE[upperRange];

		return (
			<IonContent>
				<div className="admin-container" style={{alignItems:"initial", display: "flow-root", textAlign: "left"}}>
					<div>
						<h2><strong>QUẢN TRỊ VIÊN</strong></h2>
					</div>
					<div style={{marginTop: 50}}>
						<h3 style={{marginBottom: 5}}><strong>THÔNG TIN</strong></h3>
						<div className="contain-box">
							<div>
								<div style={{width:80, display: "inline-flex"}}>
									<strong style={{marginRight:5}}>Họ và tên</strong>
								</div>: {fullname}
							</div>
							<div>
								<div style={{width:80, display: "inline-flex"}}>
									<strong style={{marginRight:5}}>Vai trò</strong>
								</div>: {role}
							</div>
							<div>
								<div style={{width:80, display: "inline-flex"}}>
									<strong style={{marginRight:5}}>{rang}</strong>
								</div>: {unit}
							</div>
						</div>
					</div>
					<div style={{marginTop: 30}}>
						<h3 style={{marginBottom: 5}}><strong>NGHIỆP VỤ</strong></h3>
					</div>
					{JSXComponent}
					<div style={{marginTop: 50}}>
						{logoutElement}
					</div>
					
				</div>
			</IonContent>
		);
	};

	return <IonContent></IonContent>
}

export { AdElement, KEYWORD }