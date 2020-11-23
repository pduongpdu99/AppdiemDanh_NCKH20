import "./EventPage.css";
import React from "react";
import Firebase from "firebase";
import { images } from "../../../data/image/data.js";
import { IonContent, IonLabel, IonItem, IonButton, IonButtons, IonIcon } from "@ionic/react";
import { IonCard,IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonImg } from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";

interface Props{

}

interface State{

}

class ReadEventPage extends React.Component<Props, State> {
	constructor(props:Props) {
		super(props);
	}

	render() {
		let lineCss = {
			width: "40%",
			height: 1,
			borderBottom: "1px #bdbdbd dashed",
			margin: "10px 0px",
			display: "inline-block",
			position: "relative",
		} as any;
		return (
			<IonContent>
				<div className="admin-container" style={{display: "block"}}>
					<div>
						<h1 style={{textAlign:"left", marginLeft: 10}}><strong>XEM SỰ KIỆN</strong></h1>
					</div>
					<div style={{marginTop:15, fontSize:30}}>
						<IonCard>
							<IonImg src={images["VỆ SINH"]} style={{width:'100%'}}></IonImg>
							<IonCardContent>
								<IonCardTitle>
									<div style={{textAlign: "center"}}>
										<IonLabel>
											<strong>
												<a href="./" style={{textDecoration: "none", color: "black", fontSize: 16}}>
													{"Dọn vệ sinh".toUpperCase()}
												</a>
											</strong>
										</IonLabel>
									</div>
									<article style={lineCss}></article>
								</IonCardTitle>
								<IonCardSubtitle style={{textAlign:"left"}}>
									<div style={{textAlign: "justify"}}>Hoạt động dọn dẹp vệ sinh cuối năm học nhằm bắt đầu năm học mới</div>
									<div style={{marginTop: 10}}><strong>Địa điểm:</strong> Nhà H</div>
									<div><strong>Ngày:</strong> 20/11/2020</div>
									<div><strong>Giờ:</strong> 07:00:00</div>
									<div><strong>Phụ trách:</strong> Phạm Dương</div>
									<div><strong>Lớp:</strong> DCT17, DCT18</div>
								</IonCardSubtitle>
								<div style={{textAlign:"right"}}>
									<IonButtons style={{width:"fit-content", display:"inline-block"}}>
										<IonButton color="dark">
											<IonIcon slot="icon-only" icon={createOutline}></IonIcon> 
										</IonButton>
										<IonButton color="dark">
											<IonIcon slot="icon-only" icon={trashOutline}></IonIcon> 
										</IonButton>
									</IonButtons>
								</div>
							</IonCardContent>
						</IonCard>
					</div>
				</div>
			</IonContent>
		);
	}
}

export { ReadEventPage }