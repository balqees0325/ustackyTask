// modal toggle.
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
//array of products items.


const addToCartButtons = document.querySelectorAll('.addToCart');
const cartCount = document.querySelector(".cart-btn span");
Array.from(addToCartButtons).forEach(
	item => {
		item.addEventListener('click', function() {
			if (item.innerText === "ADD TO CART") {
				let dataId = this.getAttribute("data-id");
				console.log(dataId);
				item.innerText = "Remove from Cart";
				item.style.backgroundColor = "#ffcd9e";
				cartCount.innerText++;
				itemsArray = [];
				// console.log(itemsArray);
				itemsArray.push(products[dataId]);
				//save to localstorage.
				if (localStorage.getItem("cart") === null) {
					var cart = [];
					cart.push(products[dataId]);
					localStorage.setItem("cart", JSON.stringify(cart));
				} else {
					var cart = JSON.parse(localStorage.getItem("cart"));
					cart.push(products[dataId]);
					localStorage.setItem("cart", JSON.stringify(cart));
				}
				// end of save to localstorage.

			} else{
				item.innerText = "ADD TO CART";
				item.style.backgroundColor = "#ff7a00";
				cartCount.innerText--;
				deleteCart();
			}
		})
	}
)
// delete cart function.
const deleteCart = () => {
	// start of array.from
	Array.from(addToCartButtons).forEach(prodcutClicked => {
		prodcutClicked.addEventListener('click', function() {
			let data = this.getAttribute("data-id");
				console.log(data);
			var cart = JSON.parse(localStorage.getItem("cart"));
			cart.forEach((btn) => {
				if(btn.index === data){
					cart.splice(btn.index, 1);
					console.log(data);
					localStorage.setItem("cart", JSON.stringify(cart));
				}
			});
			
		})
	})
	// end of array.from
	
}
// display cart function.
const displayCartItem = () => {
	var cart = JSON.parse(localStorage.getItem("cart"));
	const displayCart = document.querySelector('displayCart');
	displayCart.innerHTML = '';
	cart.forEach(item => {
		var productName = cart.name
		var productPrice = cart.price;
		var productPlus = '-';
		var productMinus = '+';
		var productQuantity = 0;
	})
}
