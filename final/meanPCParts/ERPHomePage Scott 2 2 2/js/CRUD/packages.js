 //Get method//
 $(document).ready(function () {
     $(document).ready(function () {
         $("#viewInventory").click(function () {

             $.get("https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Packages421", function (data, status) {
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
             "TableName": "Packages421",
             "Item": {
                 "orderId": document.getElementById("orderId").value,
                 "carrier": document.getElementById("carrier").value,
                 "shippingAddress": document.getElementById("shippingAddress").value,
                 "shippingCity": document.getElementById("shippingCity").value,
                 "shippingCountry": document.getElementById("shippingCountry").value,
                 "shippingSameAsBilling": document.getElementById("shippingSameAsBilling").value,
                 "shippingState": document.getElementById("shippingState").value,
                 "shippingZip": document.getElementById("shippingZip").value,
                 "status": document.getElementById("status").value
             }
         };
         $.ajax({
             url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Packages421",
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
             "TableName": "Packages421",
             "Key": {
                 "orderId": document.getElementById("orderId").value
             },
             "UpdateExpression": "set carrier = :a, shippingAddress =:b, shippingCity =:c, shippingCountry =:e, shippingSameAsBilling =:f, shippingState =:g, shippingZip =:h, zip =:i",
             "ExpressionAttributeValues": {
                 ":a": document.getElementById("carrier").value,
                 ":b": document.getElementById("shippingAddress").value,
                 ":c": document.getElementById("shippingCity").value,
                 ":e": document.getElementById("shippingCountry").value,
                 ":f": document.getElementById("shippingSameAsBilling").value,
                 ":g": document.getElementById("shippingState").value,
                 ":h": document.getElementById("shippingZip").value,
                 ":i": document.getElementById("status").value
             },
             "ReturnValues": "UPDATED_NEW"
         };

         $.ajax({
             url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Packages421",
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
             "TableName": "Packages421",
             "Key": {
                 "orderId": document.getElementById("orderId").value
             }
         };
         $.ajax({
             url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Packages421",
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
