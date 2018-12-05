var API ="https://mhq011eieb.execute-api.us-east-1.amazonaws.com/product";
var JSONObject ={
	"TableName": "Product",
	"Type" : "Full",
	"id" : "YEL477"

}

// Send JSON formatted string to cart
function addToCart(serialNumber) {
	var cart = localStorage.getItem("cart");
	var data = cart ? (cart + serialNumber + ",") : serialNumber + ",";

	// Check to see if serial number exists in cart
	if(cart == "" || cart == null) {
		localStorage.setItem("cart", data);
		updateCartNav();
	}
	else if(cart.includes(serialNumber)) {
		alert("Item already in cart.")
	} else {
		localStorage.setItem("cart", data);
		console.log(localStorage.getItem("cart"));
		updateCartNav();
	}
}

function updateTotal(pageName) {
	var cartPrices = document.getElementsByClassName("itemPrice");
	var total = 0;
	for(var i = 0; i < cartPrices.length; i++) {
		price = parseFloat((cartPrices[i].innerHTML).substring(1));
		total += price;
	}

	if(pageName == "cart.html") {
		console.log(total.toFixed(2));
		localStorage.setItem("total", total.toFixed(2));
		document.getElementById("subtotal").innerHTML = `$${total.toFixed(2)}`;
		document.getElementById("total").innerHTML = `$${total.toFixed(2)}`;
	} else if(pageName == "payment.html") {
		var totalAmountDisplay = localStorage.getItem("total");
		var totalAmount = `
			<div class="total">Total<span class="price">$${totalAmountDisplay}</span></div>
		`;
		document.getElementById("products").innerHTML += totalAmount;
	}
}
// Remove item from cart
// Update navigation and load cart to page 
function removeItem(serial) {
	var cart = localStorage.getItem("cart");

	if(cart.includes(serial+",")) {
		cart = cart.replace(serial+",", "");
	} else if(cart.includes(serial)) {
		cart = cart.replace(serial, "");
	}

	if(cart == "null," || cart == "null") {
		cart = null;
	}

	localStorage.setItem("cart", cart);
	updateCartNav();
	grab(window.location.href.split("/").slice(-1));
}

function loadCartToPage(json) {
	document.getElementById("items").innerHTML = "";
	var cart = localStorage.getItem("cart");
	console.log(cart);
	// do loop stuff to display cart
	// add quantity and remove buttons
	// add total at end
	for (var i = json.Items.length - 1; i >= 0; i--) {
		if(cart.includes(json.Items[i].Product_Serial_Number)) {
			// display
			// Quantity
			/*
			                          <div class="col-md-3 quantity">
                            <label for="quantity">Quantity:</label>
                            <input id="quantity" type="number" value ="1" class="form-control quantity-input">
                          </div>


			*/
			var cartItem = '';
			cartItem = `
				<div class="product">
                  <div class="row">
                    <div class="col-md-3">
                      <img class="img-fluid mx-auto d-block image" src="${json.Items[i].Image}">
                    </div>
                    <div class="col-md-8">
                      <div class="info">
                        <div class="row">
                          <div class="col-md-3 product-name">
                            <div class="product-name">
                              <a>${json.Items[i].Product_Name}</a>
                              <div class="product-info">
                                <div>Color: <span class="value">Black/White</span></div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-3 price">
                            <span class="itemPrice">${json.Items[i].Product_Price}</span>
                          </div>
                          <div class="col-md-3 price">
                            <button class="btn btn-primary" serial="${json.Items[i].Product_Serial_Number}" onclick="removeItem(this.getAttribute('serial'));">Remove</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
			`;

			if(cart != null) {
				document.getElementById("items").innerHTML += cartItem;
			}
		}
	}
	updateTotal(window.location.href.split("/").slice(-1));
}

//get the payload
function grab(pageName) {
	try {
		$.getJSON(API,JSONObject)
		.done(function (json) {
			if(pageName == "cart.html") {
				loadCartToPage(json);
			} else if(pageName == "payment.html") {
				displayPaymentItems(json);
			}
		});
	} catch(err){
		console.log(err);
	}
}

function updateCartNav() {
	console.log(localStorage.getItem("cart"));
	if(localStorage.getItem("cart") == null) {
		document.getElementById("cart-display").innerHTML = "Cart (0)";
	} else {
		// match with } closing JSON bracket to get number of items
		var items = (localStorage.getItem("cart").match(/,/g)||[]).length;
		document.getElementById("cart-display").innerHTML = "Cart (" + items + ")";
	}
}

function clearCart() {
	localStorage.setItem("cart", "");
	updateCartNav();
	grab(window.location.href.split("/").slice(-1));
}

function displayPaymentItems(json) {
	document.getElementById("products").innerHTML = "";
	var cart = localStorage.getItem("cart");
	for (var i = json.Items.length - 1; i >= 0; i--) {
		if(cart.includes(json.Items[i].Product_Serial_Number)) {
			var paymentItem = '';
			paymentItem = `
				<div class="item">
	            	<span class="price">${json.Items[i].Product_Price}</span>
	            	<p class="item-name">${json.Items[i].Product_Name}</p>
	            	<p class="item-description">${json.Items[i].Product_Description}</p>
          		</div>
			`;

			if(cart != null) {
				document.getElementById("products").innerHTML += paymentItem;
			}
		}
	}

	// Calculate total using this element: <div class="total">Total<span class="price">$8.97</span></div>
	if(cart != null) {
		updateTotal(window.location.href.split("/").slice(-1));
	}
}

if(window.location.href.split("/").slice(-1) == "cart.html") {
	grab(window.location.href.split("/").slice(-1));
} else if(window.location.href.split("/").slice(-1) == "payment.html") {
	// Display items
	grab(window.location.href.split("/").slice(-1));
}

window.onload = updateCartNav();