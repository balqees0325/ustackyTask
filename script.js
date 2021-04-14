const modal = document.querySelector('.modal-bg');
const cartButton = document.querySelector('.cart-button');
const continueShopBtn = document.querySelector(".btn1");
const checkoutBtn = document.querySelector(".btn2");
const closeModal = document.querySelector(".close");

const toggleModal = () => {
  modal.classList.toggle('showModal');
}
cartButton.addEventListener('click', toggleModal);
closeModal.addEventListener("click", toggleModal);
continueShopBtn.addEventListener("click", toggleModal);
checkoutBtn.addEventListener("click", toggleModal);

// form validation
const inputName = document.querySelector(".name");
const inputEmail = document.querySelector(".email");
const inputTel = document.querySelector(".phone");
const inputError = document.querySelector(".inputError");
const emailError = document.querySelector(".emailError");
const telError = document.querySelector(".telError");


// Name validation.
const validateName = () => {
  if (inputName.value === "") {
		inputName.style.borderColor = "red";
		inputError.innerText = "Please enter your name";
	} else {
		inputName.value.style.borderColor = "green";
		inputError.innerText = "";
	}
}
// validateEmail;
const validateEmail = () => {
  if(inputEmail.value == '') {
    inputEmail.style.borderColor = "red";
    emailError.innerText = 'Please enter your email';
  } else if(!inputEmail.value.includes('@')) {
    inputEmail.style.borderColor = "red";
		emailError.innerText = "Please enter valid email";
  } else {
    inputEmail.value.style.borderColor = "green";
		emailError.innerText = "";
  }
}

// Phone number validation.
const validateTel = () => {
  if (inputTel.value === "") {
		inputTel.style.borderColor = "red";
		telError.innerText = "Please enter your phone number";
	} else if (!inputTel.length === 11) {
		inputTel.style.borderColor = "red";
		telError.innerText = "Please enter correct phone-number";
	} else {
		inputTel.value.style.borderColor = "green";
		telError.innerText = "";
	}
}
// product list.
var products = [
	{
		index: 1,
		id: "p1",
		name: "Samsung TV",
		price: 500000,
	},
	{
		index: 2,
		id: "p2",
		name: "Pixel 4a",
		price: 250000,
	},
	{
		index: 3,
		id: "p3",
		name: "PS 5",
		price: 300000,
	},
	{
		index: 4,
		id: "p4",
		name: "MacBook Air",
		price: 800000,
	},
	{
		index: 5,
		id: "p5",
		name: "Apple Watch",
		price: 95000,
	},
	{
		index: 6,
		id: "p6",
		name: "Air Pods",
		price: 75000,
	},
];




