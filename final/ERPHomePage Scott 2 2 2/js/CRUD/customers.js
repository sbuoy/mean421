//CRUD//
//Get method//

$(document).ready(function () {
    $(document).ready(function () {
        $("#viewInventory").click(function () {

            $.get("https://sy0kafo9h9.execute-api.us-east-1.amazonaws.com/ListUser/user", function (data, status) {

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
            "TableName": "CustInfo421",
            "Item": {
                "Email": document.getElementById("Email").value,
                "address": document.getElementById("address").value,
                "city": document.getElementById("city").value,
                "country": document.getElementById("country").value,
                "firstName": document.getElementById("firstName").value,
                "lastName": document.getElementById("lastName").value,
                "phone": document.getElementById("phone").value,
                "state": document.getElementById("stateid").value,
                "zip": document.getElementById("zip").value
            }
        };
        $.ajax({
            url: "https://sy0kafo9h9.execute-api.us-east-1.amazonaws.com/ListUser/user",
            type: "POST",
            data: /* $("#form").serialize() */ JSON.stringify(jsonDoc),
            dataType: "json",
            sucess: function (jsonDoc) {
                console.info(jsonDoc);
            }
        });
        alert("Successfully Submited!")
    });

    $("#updateInventory").click(function () {
        // Update method
        var jsonDoc = {
            "TableName": "CustInfo421",
            "Key": {
                "Email": document.getElementById("Email").value
            },
            "UpdateExpression": "set address = :a, city =:b, country =:c, firstName =:e, lastName =:f, phone =:g, stateid =:h, zip =:i",
            "ExpressionAttributeValues": {
                ":a": document.getElementById("address").value,
                ":b": document.getElementById("city").value,
                ":c": document.getElementById("country").value,
                ":e": document.getElementById("firstName").value,
                ":f": document.getElementById("lastName").value,
                ":g": document.getElementById("phone").value,
                ":h": document.getElementById("stateid").value,
                ":i": document.getElementById("zip").value
            },
            "ReturnValues": "UPDATED_NEW"
        };

        $.ajax({
            url: "https://sy0kafo9h9.execute-api.us-east-1.amazonaws.com/ListUser/user",
            type: "PUT",
            data: JSON.stringify(jsonDoc),
            dataType: "json",
            sucess: function (jsonDoc) {
                console.info(jsonDoc);
            }
        });
        alert("Updated Customer Information!")
    });
    $("#deleteInventory").click(function () {
        // deleteInventory method
        var jsonDoc = {
            "TableName": "CustInfo421",
            "Key": {
                "Email": document.getElementById("Email").value
            }
        };
        $.ajax({
            url: "https://sy0kafo9h9.execute-api.us-east-1.amazonaws.com/ListUser/user",
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
