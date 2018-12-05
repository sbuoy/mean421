
function lAttribute(){
  var data = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.userPoolClientId,
  };
  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
  var cognitoUser = userPool.getCurrentUser();

  try {
    if (cognitoUser != null) {
      cognitoUser.getSession(function(err, session) {
        if (err) {
          console.log(err);
          return;
        }
        /*
        console.log('session validity: ' + session.isValid());
        console.log('session token: ' + session.getIdToken().getJwtToken()); */
      });


      var userinfo = cognitoUser.getUserAttributes(function(err,result){
        if (err) {
            //alert(err);
            return;
          }

          // save username
          localStorage.setItem("username", result[0].getValue());

          var accountInfo = '';

          /*
          for (i = 0; i < result.length; i++) {
            console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
          }
          */

          /* Update navigation */
          document.getElementById("dropdownMenu1").innerHTML = result[5].getValue() + ' ' + result[6].getValue();
          document.getElementById("signout").innerHTML += '<a href="account.html">Account Details</a><br><br>';
          document.getElementById("signout").innerHTML += '<button class="btn btn-primary" onclick="signOutCurrent();">Sign Out</button>';
          document.getElementById("signinForm").style.visibility="hidden";

          var fulladdress = (result[1].getValue()).split('\n');
          var fphonenumber =(result[4].getValue()).split('+1');

          if(window.location.href.split("/").slice(-1) == "account.html") {
            /* Update account information page */ 
            accountInfo = `
             <div class="form-group row">
                                <label for="account" class="col-4 col-form-label">First Name</label> 
                                <div class="col-8">
                                  <input id="first-name" class="form-control here"type="text" value="${result[5].getValue()}">
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="account" class="col-4 col-form-label">Last Name</label> 
                                <div class="col-8">
                                  <input id="last-name" class="form-control here"type="text" value="${result[6].getValue()}">
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="account" class="col-4 col-form-label">Street Address</label> 
                                <div class="col-8">
                                  <input id="street-address" class="form-control here"type="text" value="${fulladdress[0]}">
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="account" class="col-4 col-form-label">City</label> 
                                <div class="col-8">
                                  <input id="city" class="form-control here"type="text" value="${fulladdress[1]}">
                                </div>
                              </div>
                              
                              <div class="form-group row">
                                <label for="account" class="col-4 col-form-label">State</label> 
                                <div class="col-8">
                                  <input id="state"class="form-control here" type="text" value="${fulladdress[2]}">
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="account" class="col-4 col-form-label">Zipcode</label> 
                                <div class="col-8">
                                  <input id="zip-code" class="form-control here"  type="text" value="${fulladdress[3]}">
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="account" class="col-4 col-form-label">Country</label> 
                                <div class="col-8">
                                  <input id="country" class="form-control here" type="text" value="${fulladdress[4]}">
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="account" class="col-4 col-form-label">Phone Number</label> 
                                <div class="col-8">
                                  <input id="phone-number" class="form-control here" type="text" value="${fphonenumber[1]}">
                                </div>
                              </div> 
                                 <div class="form-group row">
                                <label for="account" class="col-4 col-form-label">Email</label> 
                                <div class="col-8">
                                  <input id="email" class="form-control here" type="text" value="${result[7].getValue()}">
                                </div>
                              </div> 
                              <div class="form-group row">
                                <div class="offset-4 col-8">
                                 <input id="submit" type="button" name="submit" class="btn btn-info" value="Submit" onclick="addAttribute():">
                                </div>
                              </div>


                                <div class="col-xs-6">
                                <h4>Change Password</h4>
                                <hr>
                                <div class="form-group row">
                                <label for="account" class="col-4 col-form-label">Old Password</label> 
                                <div class="col-8">
                                <input type="password" class="form-control" id="oldPassword" placeholder="Old Password" required>
                                    </div>
                                        </div>
                                <div class="form-group row">
                                    <label for="account" class="col-4 col-form-label">New Password</label> 
                                <div class="col-8">
                                    <input type="password" class="form-control" id="newPassword" placeholder="New Password " required>
                                    </div>
                                </div>

                                <div class="offset-4 col-8">

                               <input id="changePass" type="button" class="btn btn-lg btn-success" value="Change Password" onclick="cPassword();">
                                <input id="deleteUser" type="button" class="btn btn-lg" value="Delete Account" onclick="deleteUser();"> </br>          

                            
            `;
          }
           document.getElementById("account-info").innerHTML = accountInfo;
        });
    } else {
      if(window.location.href.split("/").slice(-1) == "account.html") {
        /* Update account information page */ 
        document.getElementById("account-info").innerHTML = '';
        document.getElementById("account-info").innerHTML += '<p>You are not logged in.</p>';
        return; 
      }
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

function deleteUser(){
	var data = {
   UserPoolId: _config.cognito.userPoolId,
   ClientId: _config.cognito.userPoolClientId,
 };

 var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
 var cognitoUser = userPool.getCurrentUser();

 try {

   if (cognitoUser != null) {
     cognitoUser.getSession(function(err, session) {
       if (err) {
         console.log(err);
         return;
       }

       console.log('session validity: ' + session.isValid());
       console.log('session token: ' + session.getIdToken().getJwtToken());
     });
     cognitoUser.deleteUser(function(err, result) {
       if (err) {
         alert(err);
         return;
       }
       console.log('call result: ' + result);
     });
   } else {
     console.log(err);
     return;
   }
 } catch (e) {
   console.log(e);
   return;
 }

 alert('Your account has been deleted.')
}
function cPassword(){
	var oldPassword =document.getElementById("oldPassword").value;
	var newPassword =document.getElementById("newPassword").value;

	var data = {
   UserPoolId: _config.cognito.userPoolId,
   ClientId: _config.cognito.userPoolClientId,
 };
 var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
 var cognitoUser = userPool.getCurrentUser();
 try {
   if (cognitoUser != null) {
     cognitoUser.getSession(function(err, session) {
       if (err) {
         console.log(err);
         return;
       }

       console.log('session validity: ' + session.isValid());
     });
     cognitoUser.changePassword(oldPassword, newPassword, function(err, result) {
       if (err) {
         alert(err);
         return;
       }
       console.log('call result: ' + result);
     });
   } else {
     console.log(err);
     return;
   }
 } catch (e) {
   console.log(e);
   return;
 }
}

function forgotpasswordbutton() {
 var poolData = {
   UserPoolId: _config.cognito.userPoolId,
   ClientId: _config.cognito.userPoolClientId
 };
 
 var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
 
 var userData = {
   Username : document.getElementById("emailReset").value,
   Pool : userPool,
 };
 
 var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
 
 cognitoUser.forgotPassword({
   onSuccess: function (result) {
     console.log('call result: ' + result);
     window.location.assign("./index.html");
		   //alert("Y")
    },
    onFailure: function(err) {
     alert(err);
     console.log(err);
   },
   inputVerificationCode() {
     window.location.href = "forgot-pass-verify.html";  
           }
         });
}

function forgotPasswordUpdate() {
 var poolData = {
   UserPoolId: _config.cognito.userPoolId,
   ClientId: _config.cognito.userPoolClientId
 };
 
 var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
 
 var userData = {
   Username : document.getElementById("forgotUser").value,
   Pool : userPool,
 };
 
 var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);


 var verificationCode = $('#forgotPassCode').val();
 var user = $('#forgotUser').val();
 var newPassword = $('#forgotPass1').val();
 var newPassword2 = $('#forgotPass2').val();

 console.log(document.getElementById("forgotUser").value);

  if(newPassword == newPassword2) {
    console.log("here");
    cognitoUser.confirmPassword(verificationCode, newPassword, this);
    alert("Sucessfully changed password.")
  } else {
    alert("Passwords do not match.")
  } 
}


function signOutCurrent(){
	VinylCutting.signOut();
	window.location.assign("./index.html");
}

function getCustomerOrders() {
  var data = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.userPoolClientId,
  };
  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
  var cognitoUser = userPool.getCurrentUser();

  try {
    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          console.log(err);
          return;
        }
      });


      var userinfo = cognitoUser.getUserAttributes(function (err, result) {
        if (err) {
          //alert(err);
          return;
        }

        // Get list of sales orders
        var API ="https://qrb010ff1b.execute-api.us-east-1.amazonaws.com/test2/CRUD?TableName=Sales_Order";
        var JSONObject ={}
        try {
          $.getJSON(API,JSONObject)
          .done(function (json) {
            var counter = 1;
            for(var i = 0; i < json.Items.length; i++) {
              if(json.Items[i].Customer_ID == result[0].getValue()) {
                var orderNum = json.Items[i].Sales_Order_Number;

                var fullName = (json.Items[i].Shipping_Information.Shipping_Name).split(" ");
                var firstName = fullName[0];
                var lastName = fullName[1];

                var shippingAddress = json.Items[i].Shipping_Information.Shipping_Address + " " +
                json.Items[i].Shipping_Information.Shipping_City + ", " + 
                json.Items[i].Shipping_Information.Shipping_State + " " + 
                json.Items[i].Shipping_Information.Shipping_Zip_Code;

                var date = json.Items[i].Date;
                var price = "$" + json.Items[i].Total;
                var status = "Processing";

                var order = `
                <tr>
                  <td>${counter}</td>
                  <td>${orderNum}</td>
                  <td>${shippingAddress}</td>
                  <td>${date}</td>
                  <td>${price}</td>
                  <td>${status}</td>
                </tr>  
                `;

                $('#customer_orders').append(order);
                counter += 1;
              }
            }
          });
        } catch(err){
          console.log(err);
        }
      });
    } 
  } catch (e) {
    console.log(e);
    return;
  }
}


window.onload = lAttribute();

if (window.location.href.split("/").slice(-1) == "myorder.html") {
  window.onload = getCustomerOrders();
}


