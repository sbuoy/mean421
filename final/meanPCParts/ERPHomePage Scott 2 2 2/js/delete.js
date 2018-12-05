function deletePO() {
   var id = +document.getElementById("deleteField").value;

   $.ajax({
       method: "DELETE",
       url: "https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test/CRUD?TableName=Inventory421",
       data: JSON.stringify({
           TableName: "PurchReq421",
           Key:{
               "prOrderId": document.getElementById("prOrderId").value
           }
       }),
       success: reloadPage,
       contentType: "application/json",
       error: function ajaxError(jqXHR, textStatus, errorThrown) {
           console.error("Error creating order: ‘, textStatus, ‘, Details: , errorThrown");
           console.error("Response: ’, jqXHR.responseText");
           alert("An error occured when requesting your unicorn:\n’ + jqXHR.responseText");
       }
   });
   alert(id + 'has been deleted');
}

