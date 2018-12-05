function sendJSON() {
	var jsonObj = {
		"TableName": "",
		"Item": ""
	};

	var item = {
		"OrderId": "",
		"Phone": "",
		"ItemColor": "",
		"Zip": "",
		"Country": "",
		"Item": "",
		"UnitOfMeasurement": "",
		"FullName": "",
		"Quantity": "",
		"State": "",
		"Email": "",
		"StreetAddress": "",
		"Price": ""
	};

	item.OrderId = document.getElementById("createOrderId").value;
	item.Phone = document.getElementById("createPhone").value;
	item.ItemColor = document.getElementById("createItemColor").value;
	item.Zip = document.getElementById("createZip").value;
	item.Country = document.getElementById("createCountry").value;
	item.Item = document.getElementById("createItem").value;
	item.UnitOfMeasurement = document.getElementById("createUnitOfMeasurement").value;
	item.FullName = document.getElementById("createFullName").value;
	item.Quantity = document.getElementById("createQuantity").value;
	item.State = document.getElementById("createState").value;
	item.Email = document.getElementById("createEmail").value;
	item.StreetAddress = document.getElementById("createStreetAddress").value;
	item.Price = document.getElementById("createPrice").value;

	if(document.getElementById("createTableName").value == "Sales") {
		jsonObj.TableName = "SalesOrder";
	} else if(document.getElementById("createTableName").value == "Purchase") {
		jsonObj.TableName = "PurchaseOrder";
	}

	jsonObj.Item = item;

	// POST method
	$.ajax({
		url: "https://haueca7k44.execute-api.us-east-1.amazonaws.com/prod/crud",
		type: "post",
		data: JSON.stringify(jsonObj),
		dataType: "json",
		sucess: function(jsonObj) {
			console.info(jsonObj);
			alert("Sucessfully created order!")
		}
	});
}