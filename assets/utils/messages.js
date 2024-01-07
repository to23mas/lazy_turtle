export const addErrorMessage = (message) => {
	clearErrorMessage();
	document.getElementById('errorBox').innerHTML += message;
}

export const clearErrorMessage = () => {
	document.getElementById('errorBox').innerHTML = '';
}

