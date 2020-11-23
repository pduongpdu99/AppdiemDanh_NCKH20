const COLLECTION_NAME = "feature";
String.prototype.equals = function(compareValue){
	return this === compareValue;
};

async function cll(firebase, role, collectionName, type) {
	let data = {};
	let docName = role.name + "-" + role.range;
	await firebase.firestore().collection(collectionName).doc(docName).get().then(function(doc){
		let dataDoc = doc.data();
		let keys = Object.keys(dataDoc);
		for(let key of keys) {
			let dataIndex = dataDoc[key];
			if(key.equals(type))
			{
				data = dataIndex;
				break;
			}
		}
	});
	return data;
}
let BiThuFeature = {
	"load": {
		"create": async function(firebase, role, collectionName=COLLECTION_NAME){
			let featureType = Object.keys(this)[0]; //create type
			return await cll(firebase, role, collectionName, featureType);
		},
		"read": async function(firebase, role, collectionName=COLLECTION_NAME){
			let featureType = Object.keys(this)[1]; //read type
			return await cll(firebase, role, collectionName, featureType);
		},
	}
} 


export {
	BiThuFeature
}