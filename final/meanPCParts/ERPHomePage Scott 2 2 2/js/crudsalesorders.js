

var API = "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Sales_Order421";
var JSONObject = {}

function setup() {
	payload = JSON.parse(sessionStorage.getItem("payload"));
	var counter = 1;

	for (var i = 0; i < payload.Items.length; i++) {
		var orderNum = payload.Items[i].Sales_Order_Number;

		var fullName = (payload.Items[i].Shipping_Information.Shipping_Name).split(" ");
		var firstName = fullName[0];
		var lastName = fullName[1];

		var shippingAddress = payload.Items[i].Shipping_Information.Shipping_Address + " " +
			payload.Items[i].Shipping_Information.Shipping_City + ", " +
			payload.Items[i].Shipping_Information.Shipping_State + " " +
			payload.Items[i].Shipping_Information.Shipping_Zip_Code;

		var date = payload.Items[i].Date;
		var price = "$" + payload.Items[i].Total;
		var status = "Processing";

		var tableRow = `
			<tr>
                <td>${counter}</td>
                <td>${orderNum}</td>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${shippingAddress}</td>
                <td>${date}</td>
                <td>${price}</td>
                <td><span class="label label-info">${status}</span></td>
            </tr>
		`;

		// Append to table
		$('#salesTable').append(tableRow);
		counter += 1;
	}

	// get product payload
	var API2 ="https://mhq011eieb.execute-api.us-east-1.amazonaws.com/product";
	var JSONObject2 ={
		"TableName": "Product421",
		"Type" : "Full",
		"id" : "YEL477"

	}

	$.getJSON(API2,JSONObject2)
	.done(function (json) {
		sessionStorage.setItem("payload-product", JSON.stringify(json));
	});

}

function createSalesOrder() {
	var salesOrder = {
		"TableName": "Sales_Order421",
		"Item": ""
	}

	var date = new Date();
	date.setHours(date.getHours()-5);
	date.toISOString();

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

	payload.Customer_ID = 'Admin';

	// Add shipping information
	shippingInformation.Shipping_Name = document.getElementById("create-first-name").value 
	+ " " + document.getElementById("create-last-name").value;
	shippingInformation.Shipping_Address = document.getElementById("create-street-address").value;
	shippingInformation.Shipping_City = document.getElementById("create-city").value;
	shippingInformation.Shipping_State = document.getElementById("create-state").value;
	shippingInformation.Shipping_Zip_Code = document.getElementById("create-zip-code").value;
	shippingInformation.Shipping_Country = document.getElementById("create-country").value;
	shippingInformation.Shipping_Phone_Number = document.getElementById("create-phone-number").value;
	shippingInformation.Shipping_Email = document.getElementById("create-user-email").value;

	payload.Shipping_Information = shippingInformation;

	var cart = document.getElementById("create-cart").value + ",";	// Append extra comma to extra last item 
	var items = cart.split(",");

	var total = 0;

	productPayload = JSON.parse(sessionStorage.getItem("payload-product"));


	for(var i = 0; i < items.length - 1; i++) {
		var productDesign = {
			"Product_Serial_Number": "",
			"Quantity": ""
		}
		productDesign.Product_Serial_Number = items[i];
		productDesign.Quantity = 1;
		payload.Product_Design.push(productDesign);
		console.log(payload.Product_Design);

		for (var j = productPayload - 1; j >= 0; j--) {
			if(items[i] == productPayload[j].Product_Serial_Number)
			{
				var price = productPayload[j].Product_Price;
				price = Number(price.substring(1));
				total += price;
			}
		}
	} 
	payload.Total = total.toFixed(2);;

	

	// Add date
	payload.Date = date;

	// Add payment method
	payload.Payment_Method = "Credit";

	// Add to sales order payload
	salesOrder.Item = payload;

	console.log(salesOrder);

	// POST method
	$.ajax({
		url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Sales_Order421",
		type: "POST",
		data: JSON.stringify(salesOrder),
		dataType: "json",
		success: function() {
			alert("Sucessfully created order!")
			location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown) {
            alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

            $('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
	});
}

function search() {
	var counter = 1;
	var orderNum = document.getElementById("search-order-number").value;
	var firstName = document.getElementById("search-first-name").value;
	var lastName = document.getElementById("search-last-name").value;
	var shippingAddress = document.getElementById("search-shipping-address").value;
	var date = document.getElementById("search-date").value;
	var price = document.getElementById("search-price").value;
	var status = document.getElementById("search-status").value;

	payload = JSON.parse(sessionStorage.getItem("payload"));
	payloadRefined = {
		"Items": []
	};
	var add = true;

	for(var i = 0; i < payload.Items.length; i++) {
		add = true;
		var fullName = (payload.Items[i].Shipping_Information.Shipping_Name).split(" ");
		var payloadShippingAddress = payload.Items[i].Shipping_Information.Shipping_Address + " " +
			payload.Items[i].Shipping_Information.Shipping_City + ", " +
			payload.Items[i].Shipping_Information.Shipping_State + " " +
			payload.Items[i].Shipping_Information.Shipping_Zip_Code;

		if(orderNum != "" && !String(payload.Items[i].Sales_Order_Number).includes(orderNum)) {
			add = false;
		}

		if(firstName != "" && !String(fullName[0]).includes(firstName)) {
			add = false;
		}

		if(lastName != "" && !String(fullName[1]).includes(lastName)) {
			add = false;
		}

		if(shippingAddress != "" && !String(payloadShippingAddress).includes(shippingAddress)) {
			add = false;
		}

		if(date != "" && !String(payload.Items[i].Date).includes(date)) {
			add = false;
		}

		if(price != "" && !String(payload.Items[i].Total).includes(price)) {
			add = false;
		}

		if(add) {
			payloadRefined.Items.push((payload.Items[i]));
		}
	}

	console.log(payloadRefined);

	// Remove all elements of the current table
	var myNode = document.getElementById("searchSalesTable");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}

	for (var i = 0; i < payloadRefined.Items.length; i++) {
		var orderNum = payloadRefined.Items[i].Sales_Order_Number;

		var fullName = (payloadRefined.Items[i].Shipping_Information.Shipping_Name).split(" ");
		var firstName = fullName[0];
		var lastName = fullName[1];

		var shippingAddress = payloadRefined.Items[i].Shipping_Information.Shipping_Address + " " +
			payloadRefined.Items[i].Shipping_Information.Shipping_City + ", " +
			payloadRefined.Items[i].Shipping_Information.Shipping_State + " " +
			payloadRefined.Items[i].Shipping_Information.Shipping_Zip_Code;

		var date = payloadRefined.Items[i].Date;
		var price = "$" + payloadRefined.Items[i].Total;
		var status = "Processing";

		var tableRow = `
			<tr>
                <td>${counter}</td>
                <td>${orderNum}</td>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${shippingAddress}</td>
                <td>${date}</td>
                <td>${price}</td>
                <td><span class="label label-info">${status}</span></td>
            </tr>
		`;

		// Append to table
		$('#searchSalesTable').append(tableRow);
		counter += 1;
	}

}

function setUpdateValues() {
	var payload = JSON.parse(sessionStorage.getItem("payload"));
	for(var i = 0; i < payload.Items.length; i++) {
		if(payload.Items[i].Sales_Order_Number == document.getElementById("update-sales-id").value) {
			console.log(payload.Items[i]);
			var fullName = payload.Items[i].Shipping_Information.Shipping_Name.split(" ");
			var firstName = fullName[0];
			var lastName = fullName[1];

			// Fill in text boxes
			document.getElementById("update-first-name").value = firstName;
			document.getElementById("update-last-name").value = lastName;
			document.getElementById("update-street-address").value = payload.Items[i].Shipping_Information.Shipping_Address;
			document.getElementById("update-country").value = payload.Items[i].Shipping_Information.Shipping_Country;
			document.getElementById("update-city").value = payload.Items[i].Shipping_Information.Shipping_City;
			document.getElementById("update-zip-code").value = payload.Items[i].Shipping_Information.Shipping_Zip_Code;
			document.getElementById("update-state").value = payload.Items[i].Shipping_Information.Shipping_State;
			document.getElementById("update-phone-number").value = payload.Items[i].Shipping_Information.Shipping_Phone_Number;
			document.getElementById("update-user-email").value = payload.Items[i].Shipping_Information.Shipping_Email;

			var products = "";

			for(var j = 0; j < payload.Items[i].Product_Design.length; j++) {
				products += payload.Items[i].Product_Design[j].Product_Serial_Number;

				if(j !=  payload.Items[i].Product_Design.length -1) {
					products += ",";
				}
			}

			document.getElementById("update-cart").value = products;


		}
	}
}

function updateSalesOrder() {
	var fullName = document.getElementById("update-first-name").value + " " + document.getElementById("update-last-name").value;

	var shippingInfo = {
		"Shipping_Address": document.getElementById("update-street-address").value,
		"Shipping_City": document.getElementById("update-city").value,
		"Shipping_Country": document.getElementById("update-country").value,
		"Shipping_Email": document.getElementById("update-user-email").value,
		"Shipping_Name": fullName,
		"Shipping_Phone_Number": document.getElementById("update-phone-number").value,
		"Shipping_State": document.getElementById("update-state").value,
		"Shipping_Zip_Code": document.getElementById("update-zip-code").value
	}

	var cart = []
	var products = (document.getElementById("update-cart").value).split(",");
	for(var i = 0; i < products.length; i++) {
		var product = {
			"Product_Serial_Number": products[i],
			"Quantity": 1
		}
		cart.push(product);
	}

	var payload = {
		"TableName": "Sales_Order421",
		"Key": {
			"Sales_Order_Number": parseInt(document.getElementById("update-sales-id").value)
		},
		"UpdateExpression": "set Product_Design = :a, Shipping_Information = :b",
		"ExpressionAttributeValues": {
			":a": cart,
			":b": shippingInfo
		}
	}

	// PUT method
	$.ajax({
		url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Sales_Order421",
		type: "PUT",
		data: JSON.stringify(payload),
		dataType: "json",
		success: function() {
			alert("Your Order Successfully updated");
			location.reload(); 
		},
		error: function() {
			alert("An error occured.");
		}
	});

}

function deleteOrder() {
	var payload = {
		"TableName": "Sales_Order",
		"Key": {
			"Sales_Order_Number": parseInt(document.getElementById("delete-order").value)
		}
	}

	console.log(payload);

	// DELETE method
	$.ajax({
		url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Sales_Order421",
		type: "DELETE",
		data: JSON.stringify(payload),
		dataType: "json",
		success: function() {
			alert("Your Order Successfully Deleted.");
			location.reload(); 
		},
		error: function() {
			alert("An error occured.");
		}
	});

}

//get the payload
function grab() {
	try {
		$.getJSON(API, JSONObject)
			.done(function (json) {
				sessionStorage.setItem("payload", JSON.stringify(json));
				setup();
			});
	} catch (err) {
		console.log(err);
	}
}

window.onload = grab();

