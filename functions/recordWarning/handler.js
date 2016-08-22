'use strict';

var AWS = require("aws-sdk");

var dynamo = new AWS.DynamoDB.DocumentClient();;

var PubNub = require('pubnub');
var pubnubmodule = new PubNub({
    publish_key: "pub-c-9339f7dd-e9a8-41d7-b3a4-037d25972fc2",
    subscribe_key: "sub-c-34f9f230-6ef5-11e4-bcf0-02ee2ddab7fe"
});

const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const dataTable = projectName + '-zombiedata-' + stage;

module.exports.handler = function(event, context, cb) {

 console.log('Received event:', JSON.stringify(event, null, 2));

  var now = new Date();
  event.dateTimeReceived = now.toISOString();
  event.id = "123";

  var params = {
    "TableName": dataTable,
    "Item": event
  };

  console.log('Storing payload:', JSON.stringify(params, null, 2));
 
  /*
  pubnubmodule.publish({
      channel: 'leontest1',
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
