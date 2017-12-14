/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
// or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.

// TODO add URL to this entry in the cookbook


 // 1. Text strings =====================================================================================================
 //    Modify these strings and messages to change the behavior of your Lambda function

 let speechOutput;
 let reprompt;
 const welcomeOutput = "Hi! Havey, Welcome use Accenture Product! Let's Shopping";
 const welcomeReprompt = "Welcome use Accenture Product!";
 const orderIntro = [
   "ok !the order number is zero zero zero 1 it contains",
   "Oh , you don't have enough money! fail to buy"
 ];

 /*var ownmoney = 40;
 var permoney = 10;*/

 /*request
   .get('http://www.mocky.io/v2/5a311e742e00004e13e3b347')
   .end(function(res){

    ownmoney = res.ownmoney;
    permoney = res.permoney;

   });*/
 /*
 var ownmoney;
 var permoney;


 var express = require('express');
 var app = express();
 app.get('http://www.mocky.io/v2/5a311e742e00004e13e3b347')
   .end(function(err,res){

    ownmoney = res.ownmoney;
    permoney = res.permoney;


   })
*/


 // 2. Skill Code =======================================================================================================

'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = "amzn1.ask.skill.ee903d0e-59b4-486b-bf81-ccc27ef378fd";  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function () {
      this.response.speak(welcomeOutput).listen(welcomeReprompt);
      this.emit(':responseReady');
    },
    'PlaceOrder': function () {
        //delegate to Alexa to collect all the required slot values
        var filledSlots = delegateSlotCollection.call(this);

        //compose speechOutput that simply reads all the collected slot values

        //activity is optional so we'll add it to the output
        //only when we have a valid activity
        /*var travelMode = isSlotValid(this.event.request, "travelMode");
        if (travelMode) {
          speechOutput += travelMode;
        } else {
          speechOutput += "You'll go ";
        }*/

        //Now let's recap the trip
       //var ownmoney = 40;
       //var permoney = 10;
       var ownmoney;
       var permoney;

       var  http = require('http');
       console.log(http.get('http://www.mocky.io/v2/5a311e742e00004e13e3b347'));
       http.get('http://www.mocky.io/v2/5a311e742e00004e13e3b347', function(res) {
       var data = '';
       res.on('data', function(chunk){
        data += iconv.decode(chunk, 'GBK');
         });
       res.on('end', function(){
        console.log(data);
        });
      }).on('error', function(e) {
         console.log("Got error: " + e.message);
        });

       /*request
         .get('http://www.mocky.io/v2/5a311e742e00004e13e3b347')
         .end(function(res){

             ownmoney = res.ownmoney;
             permoney = res.permoney;

          });*/
          //var superAgent = require('superagent');
         // var url = 'www.mocky.io/v2/5a311e742e00004e13e3b347';
         // superAgent
         //   .get(url)
          //  .end(function (err, res) {

              /*ownmoney = res.ownmoney;
              permoney = res.permoney;
            console.log("ownmoney" + ownmoney);*/
          //  console.log(body);
          //  });
    // 创建http服务

    // 使用了superagent来发起请求
     //   var superagent = require('superagent');
    // 查询本机ip，这里需要根据实际情况选择get还是post
     //   console.log('get function');
     //   console.log(superagent.get('www.mocky.io/v2/5a311e742e00004e13e3b347').buffer(true));
     //   superagent.get('www.mocky.io/v2/5a311e742e00004e13e3b347')
    //              .end(function(){
           /*   console.log("res:"+res);
              ownmoney = res.ownmoney;
              permoney = res.permoney;*/
     //         console.log('done');
     //          });


        var Product=this.event.request.intent.slots.Product.value;
        var quantity=this.event.request.intent.slots.quantity.value;
        var totalmoney = quantity*permoney;
        //speechOutput+= " from "+ fromCity + " to "+ toCity+" on "+travelDate;
        var speechOutput = "";
        if (totalmoney>=ownmoney) {
          speechOutput = orderIntro[1];
        }else{

          speechOutput = orderIntro[0];
        }
        //var speechOutput = randomPhrase(orderIntro);
        speechOutput += quantity + " for " + Product + " total money is " + totalmoney + " dollar";

        /*var activity = isSlotValid(this.event.request, "activity");
        if (activity) {
          speechOutput += " to go "+ activity;
        }*/

        //say the results
        console.log("ownmoney" + ownmoney);
        console.log("ownmoney" + permoney);
        this.response.speak(speechOutput);
        this.emit(":responseReady");
    },
    'AMAZON.HelpIntent': function () {
        speechOutput = "Here is the help function add by havey";
        reprompt = "Here is the help function add by havey";
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        speechOutput = "Here is the cancel function add by havey";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        speechOutput = "Here is the stop function add by havey";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        var speechOutput = "Here is the END function add by havey";
        this.richText.speak(speechOutput);
        this.emit(':responseReady');
    },
};

exports.handler = (event, context) => {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function delegateSlotCollection(){
  console.log("in delegateSlotCollection");
  console.log("current dialogState: "+this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
      console.log("in Beginning");
      var updatedIntent=this.event.request.intent;
      //optionally pre-fill slots: update the intent object with slot values for which
      //you have defaults, then return Dialog.Delegate with this updated intent
      // in the updatedIntent property
      this.emit(":delegate", updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
      console.log("in not completed");
      // return a Dialog.Delegate directive with no updatedIntent property.
      this.emit(":delegate");
    } else {
      console.log("in completed");
      console.log("returning: "+ JSON.stringify(this.event.request.intent));
      // Dialog is now complete and all required slots should be filled,
      // so call your normal intent handler.
      return this.event.request.intent;
    }
}

function randomPhrase(array) {
    // the argument is an array [] of words or phrases
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
/*function isSlotValid(request, slotName){
        var slot = request.intent.slots[slotName];
        //console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
        var slotValue;

        //if we have a slot, get the text and store it into speechOutput
        if (slot && slot.value) {
            //we have a value in the slot
            slotValue = slot.value.toLowerCase();
            return slotValue;
        } else {
            //we didn't get a value in the slot.
            return false;
        }
}*/
