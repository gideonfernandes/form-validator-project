const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

// Show input error message
function showError(input, message){
	const formControl = input.parentElement;
	formControl.className = "form-control error";
	const smallElement = formControl.querySelector("small");
	smallElement.innerText = message;
};

// Show success outline
function showSuccess(input){
	const formControl = input.parentElement;
	formControl.className = "form-control success";
};

// Check email is valid
function checkEmail(input){
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(regex.test(input.value.trim())){
		showSuccess(input);
	} else {
		showError(input, "Email não está válido");
	};
};

// Check required fields
function checkRequired(inputArr){
	inputArr.forEach(input => {
		if(input.value.trim() === ""){
			showError(input, `${getFieldName(input)} é obrigatório`);
		} else {
			showSuccess(input);
		};
	});
};

// Check input length
function checkLength(input, min, max){
	if(input.value.length < min){
		showError(input, `${getFieldName(input)} deve conter ao menos ${min} caracteres`);
	} else if(input.value.length > max){
		showError(input, `${getFieldName(input)} não deve conter mais do que ${max} caracteres`);
	} else {
		showSuccess(input);
	};
};

// Get fieldname
function getFieldName(input){
	const formControl = input.parentElement;
	const labelContent = formControl.querySelector("label").textContent;
	return labelContent;
};

// Check passwords match
function checkPasswordsMatch(input1, input2){
	if(input1.value !== input2.value){
		showError(input2, `senhas não correspondem`);
	};
};

// Event listeners
form.addEventListener("submit", (e) => {
	e.preventDefault();

	checkRequired([username, email, password, password2]);
	checkLength(username, 3, 15);
	checkLength(password, 6, 25);
	checkEmail(email);
	checkPasswordsMatch(password, password2);
});