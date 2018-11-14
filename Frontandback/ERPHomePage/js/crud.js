//GetInventory method//
    
        $(document).ready(function() {
		   $(document).ready(function() {
            $("#viewInventory").click(function() {
			
                $.get("https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Inventory", function(data, status) {
                    // alert("Data: " + data + "\nStatus: " + status);
                    //$("#InventoryV1").text(JSON.stringify(data));
					var $table = $('#Items');
					$('#Items').bootstrapTable({
						data: data.Items
					});
					
                });
            });
        });
			
			
            $("#submit").click(function () {
                // POSTInventory method
                var jsonDoc = {
                    "TableName": "Inventory",
                    "Item": {
                        "color": document.getElementById("color").value,
                        "description": document.getElementById("description").value,
                        "itemname": document.getElementById("itemname").value,
                        "itemId": document.getElementById("itemId").value,
                        "locationId": document.getElementById("locationId").value,
                        "price": document.getElementById("price").value,
                        "quantity": document.getElementById("quantity").value,
                        "safetyStock": document.getElementById("safetyStock").value,
                        "size": document.getElementById("size").value,
                        "height": document.getElementById("height").value,
                        "length": document.getElementById("lengthId").value,
                        "width": document.getElementById("width").value,
                        "stockOnHand": document.getElementById("stockOnHand").value
                        
                    }
                };
                $.ajax({
                    url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Inventory",
                    type: "POST",
                    data: /* $("#form").serialize() */JSON.stringify(jsonDoc),
                    dataType: "json",
                    sucess: function (jsonDoc) {
                        console.info(jsonDoc);
                    }
                });
                alert("Successfully Submited!")
            });
			
            $("#updateInventory").click(function () {
                // updateInventory method
                var jsonDoc = {
                    "TableName": "Inventory",
                    "Key": {
                        "itemId": document.getElementById("itemId").value
                    },
                    "UpdateExpression": "set color = :a, description =:b, itemname =:c, locationId =:e, price =:f, quantity =:g, safetyStock =:h, size =:i, height =:j, lengthId =:k, width =:m, stockOnHand =:n",
                    "ExpressionAttributeValues": {
                       ":a": document.getElementById("color").value,
						":b": document.getElementById("description").value,
						":c": document.getElementById("itemname").value,
						":e": document.getElementById("locationId").value,
						":f": document.getElementById("price").value,
                        ":g": document.getElementById("quantity").value,
                        ":h": document.getElementById("safetyStock").value,
                        ":i": document.getElementById("size").value,
                        ":j": document.getElementById("height").value,
                        ":k": document.getElementById("lengthId").value,
                        ":m": document.getElementById("width").value,
                        ":n": document.getElementById("stockOnHand").value    
					},
					"ReturnValues": "UPDATED_NEW"
					};
					
					$.ajax({
                    url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Inventory",
                    type: "PUT",
                    data: JSON.stringify(jsonDoc),
                    dataType: "json",
                    sucess: function (jsonDoc) {
                        console.info(jsonDoc);
                    }
                });
                alert("Updated PO Info!")
            });
            $("#deleteInventory").click(function () {
                // deleteInventory method
                var jsonDoc = {
                    "TableName": "Inventory",
                    "Key": {
                        "itemId": document.getElementById("itemId").value
                    }
                };
                $.ajax({
                    url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Inventory",
                    type: "delete",
                    data: JSON.stringify(jsonDoc),
                    dataType: "json",
                    sucess: function (jsonDoc) {
                        console.info(jsonDoc);
                    }
                });
                alert("Deleting record!")
            });
        });
    