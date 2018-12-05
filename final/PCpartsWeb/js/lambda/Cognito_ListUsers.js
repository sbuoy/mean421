'use strict'

console.log('Loading the list user function');
// inform and alert logger
const AWS = require('aws-sdk');
//need to use to interact with aws services

const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18', region: 'us-east-1'});// cognito access 

//Function will do all the work to get the user pool
//All the payload data is in Events 
exports.handler = function(event, context, callback) {
    // Callback to finish response
    const done = (res)  => callback(null, {
        body: res, 
        headers: {
            'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"
        }
    });//return payload header need
    async function getUserOfAuthenticatedUser(event) {
    let request = {
        UserPoolId: event.body.userpool, // Set your cognito user pool id
    };
    let users = await cognito.listUsers(request).promise();
    console.log("got user:", users);
    done(users);
}
getUserOfAuthenticatedUser(event);
};
