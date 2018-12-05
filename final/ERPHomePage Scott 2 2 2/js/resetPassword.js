function forgotpasswordbutton() {
    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };
	
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	
    var userData = {
        Username : document.getElementById("inputUsername").value,
        Pool : userPool,
    };
	
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
		
    cognitoUser.forgotPassword({
        onSuccess: function (result) {
            console.log('call result: ' + result);
            window.location.href = 'signin.html';
        },
        onFailure: function(err) {
            alert(err);
			console.log(err);
        },
        inputVerificationCode() {
            var verificationCode = prompt('Please input verification code ' ,'');
            var newPassword = prompt('Enter new password ' ,'');
            cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
        
    });
  }
$(function onDocReady() {
    $('#forgotPassword').click(forgotpasswordbutton);

});
