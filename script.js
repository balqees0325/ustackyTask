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
var productData = {	
		 products:[
			{
				index: 1,
				id: "p1",
				name: "Samsung TV",
				price: 500000,
				image: './Images/product2.png'
			},
			{
				index: 2,
				id: "p2",
				name: "Pixel 4a",
				price: 250000,
				image: './Images/product2.png'
			},
			{
				index: 3,
				id: "p3",
				name: "PS 5",
				price: 300000,
				image: './Images/product2.png'
			},
			{
				index: 4,
				id: "p4",
				name: "MacBook Air",
				price: 800000,
				image: './Images/product2.png'
			},
			{
				index: 5,
				id: "p5",
				name: "Apple Watch",
				price: 95000,
				image: './Images/product2.png'
			},
			{
				index: 6,
				id: "p6",
				name: "Air Pods",
				price: 75000,
				image: './Images/product2.png'
			},
		],
	getter: function(item){
		return this.data[item]
	},
	html: function(){
		let div = '';
		let $this = this;
		let itemInCart, truth = false; 
		for (var i = 0; i < this.products.length; i++) {
		
			div +=		
			'<div class="product">'+
		      	'<div class="prt-2">'+
			        '<div class="img">'+
			        '<img class="image" src="'+this.products[i].image+'" alt="product1">'+
			        '<div class="price">'+
			        '<h4><span>&#8358;</span>'+this.products[i].price+'</h4>'+
			        '</div>'+
			        '</div>'+
			        '<h2>Pixel 4a</h2>';
					itemInCart = JSON.parse(localStorage.getItem('cartItems'));	
					if (itemInCart != null) {						
						itemInCart.forEach(function(e,index){				
							if (e.name === $this.products[i].name) {							        		
								truth = true
							}
						})
					}							
					if (truth) {
						div +=  '<button class="added-cart" data-state="1" data-name="'+$this.products[i].name+'" data-id="'+$this.products[i].id+'" data-price="'+$this.products[i].price+'" onclick="addToCart(event)">remove from cart</button>';							
					}else{
						div += '<button data-state="0" data-name="'+$this.products[i].name+'" data-id="'+$this.products[i].id+'" data-price="'+$this.products[i].price+'" onclick="addToCart(event)">add to cart</button>';
					}
			div +='</div>'+
		  	'</div>';
		}
		return div;
	},
	setter: function(item,value){
		this.data[item] = value;
	}
	
}

var cart = {
	items:[	],//price/quantity, name
	setter:function(name,price,id){	
		let ch = this.items.forEach(function(e,index){
					if (e.id == id) {
						return index
					}
					return false
				})
		if (ch) {
			this.items[ch].quantity += 1;
			this.items[ch].price = price * this.items[ch].quantity;
			this.update();
		}else{
			this.items.push({id: id, name:name, price:price, quantity:1});
			this.update()
			cart.count = this.items.length;
		}
		localStorage.setItem('cartItems',JSON.stringify(this.items));
	},
	count:0,
	getter(){
		let html =`<table class="table">
				    <thead>
				      <tr>
				        <th> S/N</th>
				        <th> Item</th>
				        <th> Price</th>
				        <th> Quantity</th>
				        <th>x</th>
				      </tr>
				    </thead>
				    <tbody>`;
		for (var i = 0; i < this.items.length; i++) {
			this.items[i]
				html += `<tr>
							<td>${i+1}</td>
							<td>${this.items[i].name}</td>
							<td><span>&#8358</span> ${this.items[i].price}</td>
							<td><span onclick="incrementCartItem('${this.items[i].id}',-1)" class="cart-qty">-</span> ${this.items[i].quantity} <span class="cart-qty" onclick="incrementCartItem('${this.items[i].id}',1)" >+</span></td>
							<td><span class='timesbtn' onclick='removeItemFromCart("${this.items[i].id}")'>remove</span></td>
						</tr>
				    `;
		}
		html+= `</tbody>
				</table>`;
				return html;
	},
	deleteItem(id){
		let $this = this;
		this.items.forEach(function(e,index){
			if (e.id == id) {
				$this.items.splice(index,1);
				$this.count = $this.items.length;
				localStorage.setItem('cartItems',JSON.stringify($this.items));								

			}
		})
	},
	incrementCartItem(id, type){
		let $this = this;
		this.items.forEach(function(e,index){
			if (e.id == id) {
				let price = $this.items[index].price/$this.items[index].quantity;
				if (type ==1) {					
					$this.items[index].quantity +=1;
					$this.items[index].price = price * $this.items[index].quantity;				
				}else{
					if ($this.items[index].quantity > 1) {
						$this.items[index].quantity -=1;
						$this.items[index].price = price * $this.items[index].quantity;				
					}else{
						alert('minimum reached');
					}

				}
				localStorage.setItem('cartItems',JSON.stringify($this.items));								

			}
		})
	},
	clearCart(){
		this.items = [];
		localStorage.setItem('cartItems',JSON.stringify(this.items));				
	},
	update: function(){
		return this.getter();
	}
}

var cartUpdater = function() {
	document.querySelector('.cart-item-list').innerHTML= cart.update();	
	document.querySelector('.cart-item').innerHTML= cart.count;		
}
var removeItemFromCart= function(id){	
	let evt = document.querySelector(`[data-id=${id}]`);
	evt.classList.remove('added-cart');
	evt.setAttribute('data-state',0);
	evt.innerHTML = "add to cart";
	cart.deleteItem(id);
	cartUpdater();

}
var clearCart = function() {
	cart.clearCart();
}
var localData = function(){
	if (localStorage.getItem('cartItems') != null){			
		cart.items = JSON.parse(localStorage.getItem('cartItems'));
		cart.count = cart.items.length;
		cartUpdater();
	}
}
function incrementCartItem(id,type) {
	if (type == 1) {	
		cart.incrementCartItem(id, 1);
	}else if(type == -1){
		cart.incrementCartItem(id, -1);
	}
	cartUpdater();
}

function addToCart(event) {
	let evt = event.target;	
	let state =	evt.getAttribute('data-state');
	let price =	evt.getAttribute('data-price');
	let name =	evt.getAttribute('data-name');	
	let id =	evt.getAttribute('data-id');		
	if (Number(state) === 0) {
		evt.classList.add('added-cart');
		evt.setAttribute('data-state',1);
		evt.innerHTML = "remove from cart";
		cart.setter(name,price,id)		
	}else if(Number(state) === 1){
		evt.classList.remove('added-cart');
		evt.setAttribute('data-state',0);
		evt.innerHTML = "add to cart";
		cart.deleteItem(id);
	}
	cartUpdater();
}
localData();

document.querySelector('.products').innerHTML = productData.html();
// product list.




