function removeItemLocalStorage(key="") {
	localStorage.removeItem(key);
}
function setItemLocalStorage(key="", value="") {
	localStorage.setItem(key, value);
}
function getItemLocalStorage(key="") {
	return localStorage.getItem(key);
}

export {
	removeItemLocalStorage,
	setItemLocalStorage,
	getItemLocalStorage
}