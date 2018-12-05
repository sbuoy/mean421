function Updateuserinfo(attributeList){
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
      });

      cognitoUser.updateAttributes(attributeList, function(err, result) {
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

function addAttributes(){
  var attributeList = [];
  var attributename = ["address","email","family_name", "given_name", "phone_number"];// these are the attributes from the cognite that the customers has
  var attrFirstName = document.getElementById("acc-first-name").value;
  var attrLastName =  document.getElementById("acc-last-name").value;
  var attrAddress =  document.getElementById("acc-Streetaddress").value+"\n"+document.getElementById("acc-City").value+"\n"+document.getElementById("acc-State").value+"\n"+document.getElementById("acc-Zipcode").value+"\n"+document.getElementById("acc-Country").value;
  var attrPhone =  "+1"+document.getElementById("acc-phone").value;
  var attrEmail =  document.getElementById("acc-email").value;

  var attributevalue = [attrAddress, attrEmail, attrLastName, attrFirstName, attrPhone];//update all the attributes , almost copy all feild use your sign up as example grap the dom and feed values 
  for (var i=0; i<attributename.length; i++) {
    var attribute = {
      Name : attributename[i],
      Value : attributevalue[i]
    };
    var attribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute);
    attributeList.push(attribute);
  }
  console.log(attributeList);
  Updateuserinfo(attributeList);
}