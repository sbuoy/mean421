var API ="https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test2/CRUD";
var JSONObject ={
	"TableName": "Product421",
	"Type" : "Full",
	"id" : "BLU510"

}

function setup(json){
	console.log(json);
	if(location.href.split("/").slice(-1) == "shop.html") {
		var product = '';
		for (var i = json.Items.length - 1; i >= 0; i--) {
			product = `
			<div class="box shop-item">
				<a hidden class="shop-item-serial">${json.Items[i].Product_Serial_Number}</a>
				<img class="shop-item-image" style="width: 200px; height: 200px;"src="${json.Items[i].Image}">
				<h3 class="shop-item-name">${json.Items[i].Product_Name}</h3>
				<p class="shop-item-desc">${json.Items[i].Product_Description}</p>
				<input type="submit" class="shop-item-button btn-info"  value="Add to cart" 
				serial="${json.Items[i].Product_Serial_Number}" onclick="addToCart(this.getAttribute('serial'));">
			</div>
			`;

			$('#container_items').append(product);
		}
	}
}

//get the payload
function grab() {
	try {
		$.getJSON(API,JSONObject)
		.done(function (json) {
			setup(json);
		});
	} catch(err){
		console.log(err);
	}
}

window.onload = grab();