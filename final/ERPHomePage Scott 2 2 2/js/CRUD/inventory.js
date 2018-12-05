    //Get method//
        $('#viewInventory').submit(function() {
            var commentary = $('#Items').val();
            if (commentary === undefined || commentary === "") {
                $('#Items').attr('name', 'empty_commentary');
            } else {
                $('#Items').attr('name', 'commentary');
            }
        });


        $(document).ready(function() {
            $(document).ready(function() {
                $("#viewInventory").click(function() {

                    $.get("https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Inventory421", function(data, status) {
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
                    "TableName": "Inventory421",
                    "Item": {
                        "itemId": document.getElementById("itemId").value,
                        "color": document.getElementById("color").value,
                        "description": document.getElementById("description").value,
                        "itemName": document.getElementById("itemName").value,
                        "locationName": document.getElementById("locationName").value,
                        "price": document.getElementById("price").value,
                        "quantity": document.getElementById("quantity").value,
                        "safetyStock": document.getElementById("safetyStock").value,
                        "size": document.getElementById("size").value,
                        "stockOnHand": document.getElementById("stockOnHand").value,
                    }
                };
                $.ajax({
                    url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Inventory421",
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
                    "TableName": "Inventory421",
                    "Key": {
                        "itemId": document.getElementById("itemId").value
                    },
                    "UpdateExpression": "set color = :a, description =:b, itemName =:i, locationName =:c, price =:p, quantity =:q, safetyStock= :s, size= :z, stockOnHand= :o",
                    "ExpressionAttributeValues": {
                        ":a": document.getElementById("color").value,
                        ":b": document.getElementById("description").value,
                        ":i": document.getElementById("itemName").value,
                        ":c": document.getElementById("locationName").value,
                        ":p": document.getElementById("price").value,
                        ":q": document.getElementById("quantity").value,
                        ":s": document.getElementById("safetyStock").value,
                        ":z": document.getElementById("size").value,
                        ":o": document.getElementById("stockOnHand").value
                    },
                    "ReturnValues": "UPDATED_NEW"
                };

                $.ajax({
                    url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Inventory421",
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
                    "TableName": "Inventory421",
                    "Key": {
                        "itemId": document.getElementById("itemId").value
                    }
                };
                $.ajax({
                    url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Inventory421",
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