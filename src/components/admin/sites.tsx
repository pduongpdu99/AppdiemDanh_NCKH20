import React from "react";
import Firebase from "firebase";

// Component
import {IonContent, IonItem, IonGrid, IonCol, IonButton, IonLabel, IonIcon, IonInput} from "@ionic/react";
import {setItemLocalStorage, } from "../module/functions";

// icon
import { logoGoogle } from "ionicons/icons";

interface Props {

}

interface State {

}

const loginWith = (
	<div className="login-with-element">
		<div style={{width: "33.33333333%"}}>
			<article style={{width: "100%", borderBottom: "1px solid #ffffff57"}}></article>
		</div>
		<div style={{width: "83.333%", fontSize: 12}}>
			<IonLabel>Hoặc kết nối với</IonLabel>
		</div>
		<div style={{width: "33.33333333%"}}>
			<article style={{width: "100%", borderBottom: "1px solid #ffffff57"}}></article>
		</div>
	</div>
);
const ADMIN_CHILD = "administrator";
class LoginSite extends React.Component<Props, State>{

	state:{};
	private username:string;
	private password:string;

	public static admin:any;

	constructor(props:Props){
		super(props);

		this.state = {
			usernameField:"",
			passwordField:""
		}
		this.username = "";
		this.password = "";
		LoginSite.admin = {} as any;

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async readAdminList()
	{
		let ref = Firebase.database().ref();
		let val = [] as any;

		await ref.child(ADMIN_CHILD).once("value").then(snapshot => {
			let json = (snapshot.val() == null) ? [] : snapshot.val();
			let list = Object.keys(json);
			for(let i of list) 
				val.push(json[i]);
		});

		return val;
	}

	async handleSubmit(e:any) {
		let val = [] as any;
		val = await this.readAdminList();
		const NAME_KEY = "admin-name";
		const PASS_KEY = "password";

		let validAdmin = false;
		let adminObject = {} as any;
		for(let i of val)
		{
			i[NAME_KEY] += "";
			i[PASS_KEY] += "";
			let validAdminName = i[NAME_KEY] === this.username;
			let validAdminPass = i[PASS_KEY] === this.password;
			if(validAdminName === true && validAdminPass === true) {
				validAdmin = true;
				LoginSite.admin = i;
				adminObject = i.role;
				setItemLocalStorage("role-name", adminObject.name);
				setItemLocalStorage("role-range", adminObject.range);
				break;
			} else continue;
		}

		if(validAdmin) { 
			LoginSite.admin["username"] = null;
			LoginSite.admin["password"] = null;
			LoginSite.admin["fullname"] = LoginSite.admin["lastname"] + " " + LoginSite.admin["firstname"];

			Firebase.firestore().collection("management").doc("admin").set({"data":LoginSite.admin});
			Firebase.firestore().collection("management").doc("signin").set({"current": true});
			setItemLocalStorage("signin","true");
			setItemLocalStorage("admin-fullname", LoginSite.admin["fullname"]);
			setItemLocalStorage("admin-unit", LoginSite.admin.role["unit"]);
			setTimeout(()=>window.location.reload(),2000);
		} else {

			// alert("Dăng nhập thất bại");
		}
	}

	handleChange(e:any) {
		let index = e.target;
		let indexName = "";
		if(index !== undefined) {
			indexName = index.attributes["name"].value;

			if(indexName === "username") {
				this.username = e.target.value;
			} else {
				this.password = e.target.value;
			}
		}
		this.setState({
			usernameField: this.username,
			passwordField: this.password
		});
	}

	render() {
		return (<IonContent>
			<div className="admin-container">
				<form className="form-login">
					<div style={{marginBottom: 25}}>
						<h2 style={{textAlign: "center", fontWeight: "bold", margin: 0, marginBottom: 5}}>APP ĐIỂM DANH</h2>
						<h6 style={{textAlign: "center", margin: 0, fontSize: 12}}>--- QUẢN TRỊ VIÊN ---</h6>
					</div>
					<IonGrid>
						<IonItem>
							<IonCol size="10">
								<IonInput type="text" name="username" placeholder="Nhập tài khoản" onIonChange={this.handleChange}/>
							</IonCol>
						</IonItem>
						<IonItem>
							<IonCol size="10">
								<IonInput type="password" name="password" placeholder="Nhập mật khẩu" onIonChange={this.handleChange}/>
							</IonCol>
						</IonItem>
						<IonButton expand="full" color="light" onClick={this.handleSubmit}>Đăng nhập</IonButton>
					</IonGrid>
					<div className="login-with">
						{loginWith}
						<IonGrid>
							<IonButton expand="full" color="danger">
								<IonIcon style={{marginRight: 10}}icon={logoGoogle}></IonIcon>
								<IonLabel><strong>Google</strong></IonLabel>
							</IonButton>
						</IonGrid>
					</div>
				</form>
			</div>
		</IonContent>)
	}
}


// ================================
export {LoginSite}