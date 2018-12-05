//Get method//
        $(document).ready(function() {
            $(document).ready(function() {
                $("#viewInventory").click(function() {

                    $.get("https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=PurchReq421", function(data, status) {
                        var $table = $('#Items');
                        $('#Items').bootstrapTable({
                            data: data.Items
                        });

                    });
                });
            });

            $("#submit").click(function() {
                // POSTInventory method
                var jsonDoc = {
                    "TableName": "PurchReq421",
                    "Item": {
                        "prOrderId": document.getElementById("prOrderId").value,
                        "color": document.getElementById("color").value,
                        "itemID": document.getElementById("itemID").value,
                        "orderDate": document.getElementById("orderDate").value,
                        "orderStatus": document.getElementById("orderStatus").value,
                        "price": document.getElementById("price").value,
                        "quantity": document.getElementById("quantity").value,
                        "vendorCity": document.getElementById("vendorCity").value,
                        "vendorCountry": document.getElementById("vendorCountry").value,
                        "vendorEmail": document.getElementById("vendorEmail").value,
                        "vendorName": document.getElementById("vendorName").value,
                        "vendorPhone": document.getElementById("vendorPhone").value,
                        "vendorState": document.getElementById("vendorState").value,
                        "vendorStreet": document.getElementById("vendorStreet").value
                    }
                };
                $.ajax({
                    url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=PurchReq421",
                    type: "POST",
                    data: /* $("#form").serialize() */ JSON.stringify(jsonDoc),
                    dataType: "json",
                    sucess: function(jsonDoc) {
                        console.info(jsonDoc);
                    }
                });
                alert("Successfully Submited!")
            });

            $("#updateInventory").click(function() {
                // Update method
                var jsonDoc = {
                    "TableName": "PurchReq421",
                    "Key": {
                        "prOrderId": document.getElementById("prOrderId").value
                    },
                    "UpdateExpression": "set color = :a, itemID =:b, orderDate =:c, orderStatus =:e, price =:f, quantity =:g, vendorCity =:h, vendorCountry =:i, vendorEmail =:j, vendorName =:k, vendorPhone =:m, vendorState =:n, vendorStreet =:l",
                    "ExpressionAttributeValues": {
                        ":a": document.getElementById("color").value,
                        ":b": document.getElementById("itemID").value,
                        ":c": document.getElementById("orderDate").value,
                        ":e": document.getElementById("orderStatus").value,
                        ":f": document.getElementById("price").value,
                        ":g": document.getElementById("quantity").value,
                        ":h": document.getElementById("vendorCity").value,
                        ":i": document.getElementById("vendorCountry").value,
                        ":j": document.getElementById("vendorEmail").value,
                        ":k": document.getElementById("vendorName").value,
                        ":m": document.getElementById("vendorPhone").value,
                        ":n": document.getElementById("vendorState").value,
                        ":l": document.getElementById("vendorStreet").value
                    },
                    "ReturnValues": "UPDATED_NEW"
                };

                $.ajax({
                    url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=PurchReq421",
                    type: "PUT",
                    data: JSON.stringify(jsonDoc),
                    dataType: "json",
                    sucess: function(jsonDoc) {
                        console.info(jsonDoc);
                    }
                });
                alert("Updated PO Info!")
            });
            $("#deleteInventory").click(function() {
                // deleteInventory method
                var jsonDoc = {
                    "TableName": "PurchReq421",
                    "Key": {
                        "prOrderId": document.getElementById("prOrderId").value
                    }
                };
                $.ajax({
                    url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=PurchReq",
                    type: "delete",
                    data: JSON.stringify(jsonDoc),
                    dataType: "json",
                    sucess: function(jsonDoc) {
                        console.info(jsonDoc);
                    }
                });
                alert("Deleting record!")
            });
        });
   