    //Get method//
    $(document).ready(function () {
        $(document).ready(function () {
            $("#viewInventory").click(function () {

                $.get("https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Sales_Order", function (data, status) {
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
                "TableName": "Sales_Order",
                "Item": {
                    "Sales_Order_Number": document.getElementById("Sales_Order_Number").value,
                    "Date": document.getElementById("Date").value,
                    "Payment_Method": document.getElementById("Payment_Method").value,
                    //"Product_Design": document.getElementById("Product_Design").value,
                    "Product_Serial_Number": document.getElementById("Product_Serial_Number").value,
                    //"Quantity": document.getElementById("Quantity").value,
                    "Shipping_Information": document.getElementById("Shipping_Information").value,
                   // "Shipping_Address": document.getElementById("Shipping_Address").value,
                    //"Shipping_City": document.getElementById("Shipping_City").value,
                   // "Shipping_Country": document.getElementById("Shipping_Country").value,
                   // "Shipping_Email": document.getElementById("Shipping_Email").value,
                   // "Shipping_Name": document.getElementById("Shipping_Name").value,
                   // "Shipping_Phone_Number": document.getElementById("Shipping_Phone_Number").value,
                  //  "Shipping_State": document.getElementById("Shipping_State").value,
                   // "Shipping_Zip_Code": document.getElementById("Shipping_Zip_Code").value,
                    "Total": document.getElementById("Total").value,
                    "Customer_ID": document.getElementById("Customer_ID").value,
                }

            };
            $.ajax({
                url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Sales_Order",
                type: "POST",
                data: /* $("#form").serialize() */ JSON.stringify(jsonDoc),
                dataType: "json",
                sucess: function (jsonDoc) {
                    console.info(jsonDoc);
                }
            });
            alert("Successfully Submited!")
        });

        // Update method
        $("#updateInventory").click(function () {
            var jsonDoc = {
                "TableName": "Sales_Order",
                "Key": {
                    "Sales_Order_Number": document.getElementById("Sales_Order_Number").value
                },
                "UpdateExpression": "set  Product_Serial_Number= :a, Payment_Method =:e, Date =:b, Total =:h, Product_Design =:f, Shipping_Information =:g,  Customer_ID =:i,  ", //* Quantity =:c, Shipping_Address =:d, Shipping_City =:o, Shipping_Country =:j, Shipping_Email =:v, Shipping_Name =:x, Shipping_Phone_Number =:u, Shipping_State =:z, Shipping_Zip_Code =:s,*//
                "ExpressionAttributeValues": {
                    ":b": document.getElementById("Date").value,
                    ":e": document.getElementById("Payment_Method").value,
                    ":f": document.getElementById("Product_Design").value,
                    ":g": document.getElementById("Shipping_Information").value,
                    ":h": document.getElementById("Total").value,
                    ":i": document.getElementById("Customer_ID").value,
                    ":a": document.getElementById("Product_Serial_Number").value,
                   // ":c": document.getElementById("Quantity").value,
                  //  ":d": document.getElementById("Shipping_Address").value,
                  //  ":o": document.getElementById("Shipping_City").value,
                  //  ":j": document.getElementById("Shipping_Country").value,
                   // ":v": document.getElementById("Shipping_Email").value,
                  //  ":x": document.getElementById("Shipping_Name").value,
                  //  ":u": document.getElementById("Shipping_Phone_Number").value,
                  //  ":z": document.getElementById("Shipping_State").value,
                  //  ":s": document.getElementById("Shipping_Zip_Code").value,  
                },
                "ReturnValues": "UPDATED_NEW"
            };

            $.ajax({
                url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Sales_Order",
                type: "PUT",
                data: JSON.stringify(jsonDoc),
                dataType: "json",
                sucess: function (jsonDoc) {
                    console.info(jsonDoc);
                }
            });
            if (alert("Updated Sales Order Info!")) {} else window.location.reload();

        });
        $("#deleteInventory").click(function () {
            // deleteInventory method
            var jsonDoc = {
                "TableName": "Sales_Order",
                "Key": {
                    "Sales_Order_Number": document.getElementById("Sales_Order_Number").value
                }
            };
            $.ajax({
                url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Sales_Order",
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
