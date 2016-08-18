'use strict';
var shuffledPostcodes = shuffle(require('VICLATLON.json'));
var counter = 0;

module.exports.handler = function(event, context, cb) {
  

  var postcode = shuffledPostcodes[counter];

  counter++;

  if (counter >= shuffledPostcodes.length)
    counter = 0;

  console.log("#### Postcode ####");
  console.log(postcode);

  return cb(null, postcode );
};


function shuffle(originalArray) {
  var tmpCounter = originalArray.length, tempVal, i;

  while (tmpCounter > 0) {
    i = Math.floor(Math.random() * tmpCounter);
    tmpCounter--;
    tempVal = originalArray[tmpCounter];
    originalArray[tmpCounter] = originalArray[i];
    originalArray[i] = tempVal;
  }
  return originalArray;
}