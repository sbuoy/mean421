var data = {
	UserPoolId: _config.cognito.userPoolId,
	ClientId: _config.cognito.userPoolClientId,
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
var cognitoUser = userPool.getCurrentUser();

function createPayload() {
	var salesOrder = {
		"TableName": "Sales_Order",
		"Item": ""
	}

	var date = new Date();

	var payload = {
		"Sales_Order_Number": parseInt(date.getTime()),
		"Customer_ID": "",
		"Shipping_Information": "",
		"Product_Design": [],
		"Date": "",
		"Payment_Method": "",
		"Total": ""
	};

	var shippingInformation = {
		"Shipping_Name": "",
		"Shipping_Address": "",
		"Shipping_City": "",
		"Shipping_State": "",
		"Shipping_Zip_Code": "",
		"Shipping_Country": "",
		"Shipping_Phone_Number": "",
		"Shipping_Email": ""
	};

	// Add customer identifier
	payload.Customer_ID = localStorage.getItem("username");

	// Add shipping information
	shippingInformation.Shipping_Name = document.getElementById("first-name").value 
	+ " " + document.getElementById("last-name").value;
	shippingInformation.Shipping_Address = document.getElementById("street-address").value;
	shippingInformation.Shipping_City = document.getElementById("city").value;
	shippingInformation.Shipping_State = document.getElementById("state").value;
	shippingInformation.Shipping_Zip_Code = document.getElementById("zip-code").value;
	shippingInformation.Shipping_Country = document.getElementById("country").value;
	shippingInformation.Shipping_Phone_Number = document.getElementById("phone-number").value;
	shippingInformation.Shipping_Email = document.getElementById("email").value;

	payload.Shipping_Information = shippingInformation;

	// Create product payload
	var cart = localStorage.getItem("cart");
	var items = cart.split(",");

	// End at index before last to avoid empty string
	for(var i = 0; i < items.length - 1; i++) {
		var productDesign = {
			"Product_Serial_Number": "",
			"Quantity": ""
		}

		productDesign.Product_Serial_Number = items[i];
		productDesign.Quantity = 1;
		payload.Product_Design.push(productDesign);
	}

	// Add date
	var salesDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
	payload.Date = salesDate;

	// Add payment method
	payload.Payment_Method = "Credit";

	// Add total
	total = localStorage.getItem("total");
	payload.Total = total;

	// Add to sales order payload
	salesOrder.Item = payload;
	console.log(salesOrder);


	// POST method
	$.ajax({
		url: "https://citd078vva.execute-api.us-east-1.amazonaws.com/default/SOM",
		type: "POST",
		data: JSON.stringify(salesOrder),
		dataType: "json",
		success: function(salesOrder) {
			console.info(salesOrder);
			alert("Sucessfully created order!")
			localStorage.setItem("cart", null);
			window.location.href = "confirmation.html";
		},
		error: function() {
			alert("An error occured.");
		}
	});
}

// Check on first name
$(document).ready(function(){
    $("input").change(function(){
        var str = document.getElementById("first-name").value;
    var n = str.length;
    if(n>35){
    alert("First name cannot be over 35 characters.");
    }
    });
})

// Check if user is logged in before sending an order and cart is not empty
function sendSalesOrder() {
	var cart = localStorage.getItem("cart");
	cart = cart.split(",");

	var allTextFilled = true;
	console.log("length of first name");
	console.log((document.getElementById("first-name").value).length);

	if(document.getElementById("first-name").value == "") {
		allTextFilled = false;
	}

	if(document.getElementById("last-name").value == "") {
		allTextFilled = false;
	}

	if(document.getElementById("street-address").value == "") {
		allTextFilled = false;
	}

	if(document.getElementById("country").value == "") {
		allTextFilled = false;
	}

	if(document.getElementById("city").value == "") {
		allTextFilled = false;
	}

	if(document.getElementById("zip-code").value == "") {
		allTextFilled = false;
	}

	if(document.getElementById("state").value == "") {
		allTextFilled = false;
	}

	if(document.getElementById("phone-number").value == "") {
		allTextFilled = false;
	}

	if(document.getElementById("email").value == "") {
		allTextFilled = false;
	}

	if(document.getElementById("state").value == "") {
		allTextFilled = false;
	}

	if(document.getElementById("card-holder").value == "") {
		allTextFilled = false;
	}

	if(document.getElementById("exp-month").value == "") {
		allTextFilled = false;
	}

	if(document.getElementById("exp-year").value == "") {
		allTextFilled = false;
	}

	if(document.getElementById("cvc").value == "") {
		allTextFilled = false;
	}

	if(allTextFilled) {
		if(cart.length == 1 && (cart[0] == "null" || cart[0] == "")) {
			alert("Cart cannot be empty.");
		} else {
			if(cognitoUser != null ) {
				createPayload();
			} else {
				alert("Please sign in to checkout items.");
			}z
		}
	} else {
		alert("Please fill out missing fields.");
	}
}

function populateShippingInfo() {
	try {
		if (cognitoUser != null) {
			cognitoUser.getSession(function(err, session) {
				if (err) {
					console.log(err);
					return;
				}
			});


			var userinfo = cognitoUser.getUserAttributes(function(err,result){
				if (err) {
            //alert(err);
            return;
        	}
        	var fulladdress = (result[1].getValue()).split('\n');
        	var phone = "";

        	// Remove leading +# in phone
        	if(result[4].getValue()[0] == "+") {
        		phone = result[4].getValue().substring(2);
        	}

        	document.getElementById("first-name").value = result[5].getValue();
        	document.getElementById("last-name").value = result[6].getValue();
        	document.getElementById("street-address").value = fulladdress[0];
        	document.getElementById("country").value = fulladdress[4];
        	document.getElementById("city").value = fulladdress[1];
        	document.getElementById("zip-code").value = fulladdress[3];
        	document.getElementById("state").value = fulladdress[2];
        	document.getElementById("phone-number").value = phone;
        	document.getElementById("email").value = result[7].getValue();
    });
		} else {
			return; 
		}
	}
	catch (e) {
		console.log(e);
		return;
	}
}

window.onload = populateShippingInfo();
