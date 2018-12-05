

var API = "https://9c28xk5i38.execute-api.us-east-1.amazonaws.com/ListUser/user";
var JSONObject = {}

function setup() {
	payload = JSON.parse(sessionStorage.getItem("payload"));
	var counter = 1;

	for (var i = 0; i < payload.Users.length; i++) {
		var customerId = payload.Users[i].Username;
		var customerFirstName = payload.Users[i].Attributes[5].Value;
		var customerLastName = payload.Users[i].Attributes[6].Value;

		var address = (payload.Users[i].Attributes[1].Value).split('\n');
		var streetAddress = address[0];
		var city = address[1];
		var state = address[2];
		var zip = address[3];
		var country = address[4];

		var email = payload.Users[i].Attributes[7].Value;
		var phone = payload.Users[i].Attributes[4].Value;
		var status = payload.Users[i].UserStatus;

		var tableRow = `
			<tr>
                <td>${counter}</td>
                <td>${customerId}</td>
                <td>${customerFirstName}</td>
                <td>${customerLastName}</td>
                <td>${streetAddress}</td>
                <td>${city}</td>
                <td>${state}</td>
                <td>${zip}</td>
                <td>${country}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td><span class="label label-info">${status}</span></td>
            </tr>
		`;

		// append to table
		$('#customerTable').append(tableRow);
		counter += 1;
	}
}

function search() {
	var counter = 1;
	var id = document.getElementById("search-customer-id").value;
	var firstName = document.getElementById("search-first-name").value;
	var lastName = document.getElementById("search-last-name").value;
	var streetAddress = document.getElementById("search-street-address").value;
	var city = document.getElementById("search-city").value;
	var state = document.getElementById("search-state").value;
	var zip = document.getElementById("search-zip-code").value;
	var country = document.getElementById("search-country").value;
	var email = document.getElementById("search-email").value;
	var phone = document.getElementById("search-phone-number").value;
	var status = document.getElementById("search-status").value;

	payload = JSON.parse(sessionStorage.getItem("payload"));
	payloadRefined = {
		"Users": []
	};

	// Cycle through all cases and check

	var add = true;
	for (var i = 0; i < payload.Users.length; i++) {
		var address = (payload.Users[i].Attributes[1].Value).split('\n');
		add = true;

		if (id != "" && !String(payload.Users[i].Username).includes(id)) {
			add = false;
		}

		if (firstName != "" && !String(payload.Users[i].Attributes[5].Value).includes(firstName)) {
			add = false;
		}

		if (lastName != "" && !String(payload.Users[i].Attributes[6].Value).includes(lastName)) {
			add = false;
		}

		if (streetAddress != "" && !String(address[0]).includes(streetAddress)) {
			add = false;
		}

		if (city != "" && !String(address[1]).includes(city)) {
			add = false;
		}

		if (state != "" && !String(address[2]).includes(state)) {
			add = false;
		}

		if (zip != "" && !String(address[3]).includes(zip)) {
			add = false;
		}

		if (country != "" && !String(address[4]).includes(country)) {
			add = false;
		}

		if (email != "" && !String(payload.Users[i].Attributes[7].Value).includes(email)) {
			add = false;
		}

		if (phone != "" && !String(payload.Users[i].Attributes[4].Value).includes(phone)) {
			add = false;
		}

		if (status != "" && !String(payload.Users[i].UserStatus).includes(status)) {
			add = false;
		}

		if (add) {
			payloadRefined.Users.push(payload.Users[i]);

		}
	}

	// Remove all elements of the current table
	var myNode = document.getElementById("searchCustomerTable");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}

	// Print payload after refining search
	for (var i = 0; i < payloadRefined.Users.length; i++) {
		var customerId = payloadRefined.Users[i].Username;
		var customerFirstName = payloadRefined.Users[i].Attributes[5].Value;
		var customerLastName = payloadRefined.Users[i].Attributes[6].Value;

		var address = (payloadRefined.Users[i].Attributes[1].Value).split('\n');
		var streetAddress = address[0];
		var city = address[1];
		var state = address[2];
		var zip = address[3];
		var country = address[4];

		var email = payloadRefined.Users[i].Attributes[7].Value;
		var phone = payloadRefined.Users[i].Attributes[4].Value;
		var status = payloadRefined.Users[i].UserStatus;

		var tableRow = `
			<tr>
                <td>${counter}</td>
                <td>${customerId}</td>
                <td>${customerFirstName}</td>
                <td>${customerLastName}</td>
                <td>${streetAddress}</td>
                <td>${city}</td>
                <td>${state}</td>
                <td>${zip}</td>
                <td>${country}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td><span class="label label-info">${status}</span></td>
            </tr>
		`;

		// append to table
		$('#searchCustomerTable').append(tableRow);
		counter += 1;
	}
}

function deleteCustomer() {
	var payload = {
		"username": document.getElementById("delete-customer-id").value
	}

	console.log(payload);

	// DELETE method
	$.ajax({
		url: API,
		type: "DELETE",
		data: JSON.stringify(payload),
		dataType: "json",
		success: function() {
			alert("Successfully deleted customer.");
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

