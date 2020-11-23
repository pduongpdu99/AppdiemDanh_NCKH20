import "./EventPage.css";
import React from "react";
import Firebase from "firebase";

import { IonContent, IonLabel, IonInput, IonItem, IonButton, IonDatetime, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol } from "@ionic/react";

interface Props{

}

interface State{

}


let data = {
	title: "Example",
	describe: "Example",
	type: "Example",
	date: {
		DD:"01",
		MM:"01",
		YYYY:"2020"
	},
	time: {
		hh:"00",
		mm:"00",
		ss:"00"
	},
	location: "Nhà A1"
}

let types = [{
	index: "type-001",
	typeName: "Vệ sinh",
	backgroundColor: "rgb(139 195 74)",
	className: "element-type"
},{
	index: "type-002",
	typeName: "Đoàn",
	backgroundColor: "rgb(3 169 244 / 1)",
	className: "element-type"
},{
	index: "type-003",
	typeName: "Tình nguyện",
	backgroundColor: "rgb(244 67 54 / 1)",
	className: "element-type"
},{
	index: "type-004",
	typeName: "Tuyển sinh",
	backgroundColor: "rgb(158 158 158 / 1)",
	className: "element-type"
},{
	index: "type-005",
	typeName: "Thể thao",
	backgroundColor: "rgb(63 81 181 / 1)",
	className: "element-type"
}];

class CreateEventPage extends React.Component<Props, State> {
	constructor(props:Props) {
		super(props);
		this.event = this.event.bind(this);
		this.dateChange = this.dateChange.bind(this);
		this.timeChange = this.timeChange.bind(this);
		this.enterDescribeText = this.enterDescribeText.bind(this);
		this.enterTitleText = this.enterTitleText.bind(this);
		this.locationChange = this.locationChange.bind(this);
	}

	private event(t:any) {
		let id = t.target.parentNode.id;
		let elements = document.getElementsByClassName("element-type");
		for(let i = 0; i<elements.length;i++)
		{
			let element = elements[i].children[0] as HTMLElement;
			element.setAttribute("style", "color: black; --background: white");
		}

		for(let i of types) {
			let index = i.index;
			if(index === id) {
				t.target.setAttribute("style", "color: white; --background: "+i.backgroundColor);
				data.type = t.target.innerText;
				break;
			}
		}
	}

	private getOptions() {
		let stages = [
			"Nhà A1","Nhà A2","Nhà B-C",
			"Nhà D","Nhà G","Nhà H","Nhà I",
			"Nhà KLF","Giảng đường"];
		
		return stages.map((text, i)=>
			<IonSelectOption value={text} key={i}>{text}</IonSelectOption>
		);
	}

	private timeChange(t:any)
	{
		let target = null;

		setTimeout(()=>{
			target = t.target.children[0] as HTMLInputElement;
			let value = target.value;
			let parts = value.split(":");

			data.time = {
				hh: parts[0],
				mm: parts[1],
				ss: parts[2]
			};
		},500);
	}

	private dateChange(t:any)
	{
		let target = null; 
		setTimeout(()=>{
			target = t.target.children[0] as HTMLInputElement;
			let value = target.value;
			let parts = value.split("-");

			data.date = {
				DD: parts[2].slice(0,2),
				MM: parts[1],
				YYYY: parts[0]
			};
		},500);
			
	}

	private createEvent()
	{
		console.log(data);
	}

	private enterTitleText(t:any)
	{
		let element = t.target.children[0] as HTMLInputElement;
		data.title = element.value;
	}

	private enterDescribeText(t:any)
	{
		let element = t.target.children[0] as HTMLInputElement;
		data.describe = element.value;
	}

	private locationChange(t:any)
	{
		let element = t.target.children[0] as HTMLElement;
		data.location = element.innerText;
	}

	render() {
		return (
			<IonContent>
				<div className="admin-container" style={{alignItems:"initial", display: "flow-root", textAlign: "left"}}>
					<div>
						<h1><strong>TẠO SỰ KIỆN</strong></h1>
					</div>
					<div style={{marginTop:15, fontSize:30}}>
						<IonLabel><h1 style={{margin:0}}><strong>TIÊU ĐỀ</strong></h1></IonLabel>
						<IonItem>
							<IonInput onIonChange={this.enterTitleText} type="text" placeholder="VD: Dọn vệ sinh"></IonInput>
						</IonItem>
					</div>
					<div style={{marginTop:15, fontSize:30}}>
						<IonLabel><h1 style={{margin:0}}><strong>MÔ TẢ</strong></h1></IonLabel>
						<IonItem>
							<IonInput onIonChange={this.enterDescribeText} type="text" placeholder="VD: Dọn vệ sinh"></IonInput>
						</IonItem>
					</div>

					<div style={{marginTop:15, fontSize:30}}>
						<IonLabel><h1 style={{margin:0}}><strong>KIỂU SỰ KIỆN</strong></h1></IonLabel>
						<div style={{height: 50,display: "flex", overflow: "auto hidden", alignContent: "center"}} id="type-event-box">
							{types.map(i=>
								<div key={i.index} id={i.index} style={{height:"100%"}} className="element-type">
								<IonButton onClick={this.event} style={{"color":"black","--background":"white"}}>
									{i.typeName}
								</IonButton>
								</div>
							)}
						</div>
					</div>


					<div style={{marginTop:15, fontSize:30}}>
						<IonLabel><h1 style={{margin:0}}><strong>THỜI GIAN</strong></h1></IonLabel>
						<div style={{height: 50,display: "flex", overflow: "auto hidden", alignContent: "center"}} id="type-event-box">
							<IonGrid style={{padding: 0}}>
								<IonRow>
									<IonCol style={{padding:0, marginRight:5}}>
										<IonItem>
											<IonDatetime displayFormat="HH:mm:ss" value="00:00:00" display-timezone="utc" onIonChange={this.timeChange}></IonDatetime>
										</IonItem>
									</IonCol>
									<IonCol style={{padding:0, marginLeft:5}}>
										<IonItem>
											<IonDatetime displayFormat="DD-MM-YYYY" min="2020" max="2030" value="2020-01-01" display-timezone="utc" onIonChange={this.dateChange}></IonDatetime>
										</IonItem>
									</IonCol>
								</IonRow>
							</IonGrid>
						</div>
					</div>

					<div style={{marginTop:15, fontSize:30}}>
						<IonLabel><h1 style={{margin:0}}><strong>ĐỊA ĐIỂM</strong></h1></IonLabel>
						<div style={{height: 50,display: "flex", overflow: "auto hidden", alignContent: "center"}} id="type-event-box">
							<IonItem style={{width:"100%"}}>
								<IonSelect value={"Nhà A1"} okText="Xác nhận" cancelText="Hủy bỏ" style={{width: "100%", textAlign: "right"}} onIonChange={this.locationChange}>
									{this.getOptions()}
								</IonSelect>
							</IonItem>
						</div>
					</div>

					<div style={{marginTop:15, fontSize:30, textAlign: "center"}}>
						<IonButton style={{width: "60%", "--border-radius": "30px", "--background" : "#ffffff45"}} onClick={this.createEvent}>Tạo sự kiện</IonButton>
					</div>
				</div>
			</IonContent>
		)
	}
}

export {CreateEventPage }