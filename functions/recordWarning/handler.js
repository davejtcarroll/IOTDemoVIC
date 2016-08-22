'use strict';

var AWS = require("aws-sdk");

var dynamo = new AWS.DynamoDB.DocumentClient();;

var PubNub = require('pubnub');
var pubnubmodule = new PubNub({
      publishKey : 'pub-c-50a538d6-ec6a-44ab-ac29-1bfb5d8ade2a',
      subscribeKey : 'sub-c-82bcd692-57b3-11e6-a5a4-0619f8945a4f'
});

const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const dataTable = projectName + '-zombiedata-' + stage;

module.exports.handler = function(event, context, cb) {

 console.log('Received event:', JSON.stringify(event, null, 2));

  var now = new Date();
  event.dateTimeReceived = now.toISOString();
  event.src = "123";
  
  var params = {
    "TableName": dataTable,
    "Item": event
  };

  console.log('Storing payload:', JSON.stringify(params, null, 2));
 
  /*
  pubnubmodule.publish({
      channel: 'demo_tutorial',
      message: {"author":"lambda", "message": JSON.stringify(event.payload)}
  });
*/

  dynamo.put(params,function(err, data){
      if(err)
        console.log("fail", err);

      console.log("success: ", data);

      cb(err,data);
  });
    

};
