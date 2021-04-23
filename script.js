// modal toggle.
const modal = document.querySelector('.modal-bg');
const cartButton = document.querySelector('.cart-button');
const continueShopBtn = document.querySelector(".btn1");
const checkoutBtn = document.querySelector(".btn2");
const closeModal = document.querySelector(".close");
const formPayment = document.querySelector('#paymentForm');

const toggleModal = () => {
  modal.classList.toggle('showModal');
}
cartButton.addEventListener('click', toggleModal);
closeModal.addEventListener("click", toggleModal);
continueShopBtn.addEventListener("click", toggleModal);
checkoutBtn.addEventListener("click", toggleModal);

// paystackform.
const paystackModal = () => {
	formPayment.classList.add("modal");
};
checkoutBtn.addEventListener("click", paystackModal);
// summary modal toggle.
const showSummaryModal = () => {
	const summaryModal = document.querySelector(".summary-modal-bg");
	summaryModal.classList.add("summaryModal");
};
// checkoutBtn.addEventListener("click", showSummaryModal);


// form validation
const inputName = document.querySelector(".name");
const inputEmail = document.querySelector(".email");
const inputTel = document.querySelector(".phone");
const inputError = document.querySelector(".inputError");
const emailError = document.querySelector(".emailError");
const telError = document.querySelector(".telError");
const totalAmount = document.querySelector(".totalAmount");


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
var productQuantity = 0;
//array of products items.
// display cart function.
function incrementDisplayFunc(){
		productQuantity++;

}

function displayCartItem() {
	var cart = JSON.parse(localStorage.getItem("cart"));
	var displayCart = document.querySelector('.displayCart');
	console.log(cart);
	displayCart.innerHTML = '';
	cart.forEach((prdt) =>{
		var productName = prdt.name
		var productPrice = prdt.price;
		var productPlus = '+';
		var productMinus = '-';
		
		var productNumber = 1;
		var removeBtn = 'Remove';

		  displayCart.innerHTML+='<tr>'+
                             "<td>"+productNumber+
                             " </td>"+
                             "<td>"+productName+"</td>"+
                             "<td>"+productPrice+"</td>"+
                             "<td>"+
														 "<span>"+productMinus+"</span>"+
														 "<span>"+productQuantity+"</span>"+
														 "<span onclick='incrementDisplayFunc()'>"+productPlus+"</span>"+
														 "</td>"+ 
														 "<td>"+
														 '<button class="remove-btn">'+removeBtn+'</button>'+
														 "</td>"
                             "</tr>";
														  
														 
	})
}
 
// end of display func

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
				let dataId = this.getAttribute("data-id");
				console.log(dataId);
				var cart = JSON.parse(localStorage.getItem("cart"));
				localStorage.getItem('newArray');
				var newArray = cart.filter((item)=>(item.index -1) != dataId);
				localStorage.setItem('newArray', JSON.stringify(newArray));
				var cart = newArray;
				localStorage.setItem("cart", JSON.stringify(cart));
			}
			
				displayCartItem();
		})
	}
)

// checkout function.
function checkoutFunc(){
	validateName();
	validateEmail();
	validateTel();

}


// paystack api.
// function payWithPaystack(e) {

// 	let handler = PaystackPop.setup({
// 		key: "pk_test_d520292b986cf572ac53f5f92c5fe1e246f9b925", // Replace with your public key
// 		email: inputEmail.value,
// 		amount: totalAmount.value * 100,
// 		ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
// 		// label: "Optional string that replaces customer email"
// 		onClose: function () {
// 			alert("Window closed.");
// 		},
// 		callback: function (response) {
// 			showSummaryModal();
// 		} handler.openIframe();
// }
function payWithPaystack(e) {
  e.preventDefault();
  let handler = PaystackPop.setup({
		key: "pk_test_d520292b986cf572ac53f5f92c5fe1e246f9b925", // Replace with your public key
		email: inputEmail.value,
		amount: totalAmount.value * 100,
		ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
		// label: "Optional string that replaces customer email"
		onClose: function () {
			alert("Window closed.");
		},
		callback: function (response) {
			showSummaryModal();
		},
	});
  handler.openIframe();
}

checkoutBtn.addEventListener("click", payWithPaystack);


// display summary function.
const displayCartSummary = () => {
	var cart = JSON.parse(localStorage.getItem("cart"));
	var displayCart = document.querySelector('.cartSummary');
	console.log(cart);
	cartSummary.innerHTML = '';
	for(let prdt=0; prdt= cart.length; prdt++){
		var productSn = 'S/N';
		var productBought = 'Item';
		var productQuantity = 0;
		var productNumber = 1;
		var productName = prdt.name
		

		  cartSummary.innerHTML+='<tr class=".cartSummary">'+
                             "<th>"+productSn+
                             " </th>"+
                             "<th>"+productBought+"</th>"+
                             "<th>"+productQuantity+"</th>"+
														 "</tr>";
														 '<tr class=".cartSummary">'+
                             "<td>"+productNumber+"</td>"+
														 "<td>"+productName+"</td>"+
														 "<td>"+productQuantity+"</td>"+
                             "</tr>";
														 
	}
}