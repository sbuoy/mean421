

var API = "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Sales_Order";
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

