AWS.config.region = 'us-east-1'; // 1. Enter your region

	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: 'us-east-1:37cbddc6-00db-4d92-bb47-0860447a14ff' // 2. Enter your identity pool
	});

	AWS.config.credentials.get(function (err) {
	    if (err) alert(err);
	    console.log(AWS.config.credentials);
	});

	var bucketName = 'vinyl-cutting-dev'; // Enter your bucket name
	var bucket = new AWS.S3({
	    params: {
	        Bucket: bucketName
	    }
	});

	var fileChooser = document.getElementById('file-chooser');
	var button = document.getElementById('upload-button');
	var results = document.getElementById('results');
	button.addEventListener('click', function () {

	    var file = fileChooser.files[0];

	    if (file) {

	        results.innerHTML = '';
	        var objKey = 'testing/' + file.name;
	        var params = {
	            Key: objKey,
	            ContentType: file.type,
	            Body: file,
	            ACL: 'public-read'
	        };

	        bucket.putObject(params, function (err, data) {
	            if (err) {
                    if ((results.innerHTML = 'ERROR: ' + err) == 'ERROR: AccessDenied: Access Denied') {
                        results.innerHTML = 'Successful upload';
                    } else {
                        results.innerHTML = 'ERROR: ' + err;
                    } 
	            } else {
	                listObjs();
	            }
	        });
	    } else {
	        results.innerHTML = 'Nothing to upload.';
	    }
	}, false);

	function listObjs() {
	    var prefix = 'testing';
	    bucket.listObjects({
	        Prefix: prefix
	    }, function (err, data) {
	        if (err) {
	            results.innerHTML = 'ERROR: ' + err;
	        } else {
	            var objKeys = "";
	            data.Contents.forEach(function (obj) {
	                objKeys += obj.Key + "<br>";
	            });
	            results.innerHTML = objKeys;
	        }
	    });
	}

	function deleteit() {
	    debugger;
	    document.getElementById("uploadPreview").src = "no_image.png";
	    document.getElementById("file-chooser").value = "";
	    event.preventDefault();
	}

    function PreviewImage() {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("file-chooser").files[0]);
        oFReader.onload = function(oFREvent) {
            document.getElementById("uploadPreview").src = oFREvent.target.result;
        };
    }

    function addCustomToCart() {
        var cart = localStorage.getItem("cart");
        var data = cart ? (cart + "," + "custom item") : "custom item";
        localStorage.setItem("cart", data);
        alert("Added custom item to cart.");
        updateCartNav();
    }