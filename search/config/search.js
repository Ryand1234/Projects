var obj = require('./data')
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);
var k=0;
var Arr = []
 for (var i in obj.extracted_information)
 {
 		k+=1;
 		Arr.push(i);
 }
 module.exports = {
 	reload : function(){
 			var patt = $("#txt").val();
 			console.log("hello")
 			console.log(patt)
 			if(patt != undefined)
 			{
 				console.log("YO");
	 			document.getElementById("val1").innerHTML = Arr.filter(function(x){return x.indexOf(patt)>-1;});
 			}
	},
	empty : function(){
			var new1 = $("#txt").val();
			if (new1 != undefined)
			{
				if (patt != new1)
				{
					document.getElementById("val1").innerHTML = Arr.filter(function(x){return x.indexOf(new1)>-1;}) ;		
				}
				else	
				{
					document.getElementById("val1").innerHTML = "";

				}
			}
		}
};/*
function empty(){
	
}
module.exports = empty*/