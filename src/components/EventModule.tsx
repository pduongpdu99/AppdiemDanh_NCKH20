import React from "react";
import { IonItem, IonLabel, IonInput,IonSelect, IonSelectOption, IonButton } from "@ionic/react";
import Firebase from "firebase";
import FIREBASE_CONFIG from "./Firebase";
import "./EventModule.css";

const EVENT_CHILD = "event";

Firebase.initializeApp(FIREBASE_CONFIG);

class EventModule extends React.Component<any,any> {

	state = {

	}

	dulieu:{title:string,content:string,type:string}= {
		title:"",
		content:"",
		type:"",
	}
	eventContain: {}[] = [];

	constructor(props:any) {
		super(props);

		this.eventContain = [];
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

	}

	// CRUD
	async eventCreate(events:any) {
		let ref = Firebase.database().ref();
		ref.child(EVENT_CHILD).set(events);
	};

	eventUpdate(at:string, e:any) {
		let ref = Firebase.database().ref();
		ref.child(EVENT_CHILD).child(at).set(e);
	};

	async eventDelete(at:string) {
		let ref = Firebase.database().ref();
		ref.child(EVENT_CHILD).child(at).remove();
		await this.eventRead();
		this.reloadData();
	};

	async eventRead(){
		var contain:any = [];
		await Firebase.database().ref().child("event").once("value").then(function(snapshot){
			let events = snapshot.val();
			contain = (events == null)?[]:events;
		});
		this.eventContain = contain;
	};	
	//====================

	reloadData(){
		let eventIDs = [] as any;
		eventIDs = Object.keys(this.eventContain);
		console.log(this.eventContain)

		let size = eventIDs.length;
		let events = {} as any;
		let CHU_SO = 4;

		for(let i = 0;i<size;i++)
		{
			let id = "E"+("0".repeat(CHU_SO-((i+1)+"").length)) + (i+1);
			let json = this.eventContain[eventIDs[i]];
			let obj = {} as any;
			obj[id] = json;
			events = Object.assign(events, obj);
		}
		this.eventCreate(events);
	}

	// handle events
	async handleSubmit(event:any) {
		let dt = this.dulieu;
		event.preventDefault();	
		await this.eventRead(); 
		await this.setState(dt);

		let eventIDs = [] as any;
		eventIDs = Object.keys(this.eventContain);

		let size = eventIDs.length;
		let events = {} as any;
		let CHU_SO = 4;

		for(let i = 0;i<size;i++)
		{
			let id = "E"+("0".repeat(CHU_SO-((i+1)+"").length)) + (i+1);
			let json = this.eventContain[eventIDs[i]];
			let obj = {} as any;
			obj[id] = json;
			events = Object.assign(events, obj);
		}

		let id = "E"+("0".repeat(CHU_SO-((size+1)+"").length)) + (size+1);
		let json = this.dulieu;
		if(json["title"].length == 0 || json.type.length == 0) {
			// Thong bao
		} else events[id] = json;
		this.eventCreate(events);
	};

	handleChange(event:any) {
		let key:string = event.target.attributes["name"].value;
		let value = event.target.value;;
		if(key === "title") {
			this.dulieu["title"] = value;
		} else if(key === "content") {
			this.dulieu["content"] = value;
		} else {
			this.dulieu["type"] = value;
		}
	};


	render() {
		let titleElement = <IonInput type="text" name="title" onIonChange={this.handleChange} placeholder="Enter title activity" onChange={this.handleChange}/>;
		let contentElement = <IonInput type="text" name="content" onIonChange={this.handleChange} placeholder="Enter content activity" onChange={this.handleChange}/>;
		let typeElement = (
			<IonSelect okText="Okey" cancelText="Dismiss" onIonChange={this.handleChange} name="type">
				<IonSelectOption>Vệ sinh</IonSelectOption>
				<IonSelectOption>Họp</IonSelectOption>
			</IonSelect>
			);

		return (
			<form>
			<IonItem>
				<IonLabel><b>Title</b></IonLabel>
				{titleElement}
			</IonItem>	
			<IonItem>
				<IonLabel><b>Content</b></IonLabel>
				{contentElement}
			</IonItem>	
			<IonItem>
				<IonLabel><b>Type</b></IonLabel>
				{typeElement}
			</IonItem>	
			<IonButton color="success" className="create-button" onClick={this.handleSubmit}>Tạo</IonButton>
			</form>
		);
	}
}


export default EventModule;