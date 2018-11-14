
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
            <hr>
            <div class="container bootstrap snippet">
            <div class="row">
            <div class="col-sm-10">
            <h1>My account</h1>
            </div>

            </div>
            <div class="row">
            <div class="col-sm-3">
            <!--left col-->
            <div class="text-center">
            <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar">     <h6></h6>

            </div>
            </hr><br>
            <ul class="list-group">
            <li class="list-group-item text-muted">Activity </li>
            <a href="myorder.html" class="list-group-item text-right"><span class="pull-left"><strong>Order</strong></span> </a>

            </ul>
            </div>
            <!--/col-3-->
            <div class="col-sm-6">



            <div class="tab-content">
            <div class="tab-pane active" id="home">
            <hr>
            <form class="form" action="##" method="post" id="registrationForm">
            <div class="form-group">
              <b>First Name: </b><input id="acc-first-name" type="text" value="${result[5].getValue()}"><br>
              <b>Last Name: </b><input id="acc-last-name" type="text" value="${result[6].getValue()}"><br>
              <b>Street Address: </b><input id="acc-Streetaddress" type="text" value="${fulladdress[0]}"><br>
              <b>City: </b><input id="acc-City" type="text" value="${fulladdress[1]}"><br>
              <b>State: </b><input id="acc-State" type="text" value="${fulladdress[2]}"><br>
              <b>Zipcode: </b><input id="acc-Zipcode" type="text" value="${fulladdress[3]}"><br>
              <b>Country: </b><input id="acc-Country" type="text" value="${fulladdress[4]}"><br>
              <b>Phone Number: </b><input id="acc-phone" type="text" value="${fphonenumber[1]}"><br>
              <b>Email: </b><input id="acc-email" type="text" value="${result[7].getValue()}"><br><br>
              <input id="updateUser" type="button" class="btn btn-lg" value="Update" onclick="addAttributes();">
            <div>
            <br>
            <div class="col-xs-6">
            <label for="first_name">
            <h4>Change Password</h4>
            </label>
            <input type="password" class="form-control" id="oldPassword" placeholder="Old Password" required>
            </div>
            <div class="col-xs-6">
            <input type="password" class="form-control"  id="newPassword" placeholder="New Password " required>
            </div>
            </div>
            <div class="col-xs-6">

            <input id="changePass" type="button" class="btn btn-lg btn-success" value="Change Password" onclick="cPassword();">
            <input id="deleteUser" type="button" class="btn btn-lg" value="Delete Account" onclick="deleteUser();">
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



window.onload = lAttribute();

/*
*  Event Handlers
*/
//document.getElementById("changePass").onclick = cPassword;