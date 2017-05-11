/*    JavaScript 6th Edition
 *    Chapter 12
 *    Unit 12 - Bonus Project

 *    Student Name: Adam Boehm  

 *    Filename: script.js
 */

"use strict";
// hide the span element with id #citystate
$("#citystate").hide();

// validate form 
function validateForm(event) {
   event.preventDefault();
   var formValidity = true; // reset value for revalidation
   var inputElements = document.querySelectorAll("#contactinfo input");
   var elementCount = inputElements.length;
   try {
      for (var i = 0; i < elementCount; i++) { 
         // validate all input elements in fieldset
         if (inputElements[i].value === "") {
            inputElements[i].style.background = "rgb(255,233,233)";
            formValidity = false;
         } else {
            inputElements[i].style.background = "";
         }
      }
      if (formValidity === false) { 
         throw "Please complete all fields.";
      } 
	  $("#errorText").hide();
	  $("#errorText").html("");
   }
   catch(msg) {
	  $("#errorText").show();
	  $("#errorText").html(msg);
   }
	// if form passes all checks, submit
   if (formValidity === true) {
	  $("form").submit();
   }
} 

// create event listeners  
$("#submitBtn").click(validateForm);



// function for ajax to create json string
function getLocation() {
	// variable for retrieving the value in the zip field
	var zip = $("#zipinput").val();
	// Ajax call using jQuery
	$.ajax({
		dataType: 'json',
		url: 'http://api.zippopotam.us/us/' + zip,
		success: displayData,
		error: zipFailMessage,
	});	

}

// function for assigning values retrieved from the ajax call to the city/state fields
function displayData(resultData){
	var city = $("#cityinput");
	var state = $("#stateinput");
	// assigns the values retrieved from the ajax to fill the state and zip city field
	city.val(resultData.places[0]["place name"]); 
	state.val(resultData.places[0]["state abbreviation"]);
	// change the css in the citystate span to visible
	$("#citystate").css("visibility", "visible");
	// show citystate
	$("#citystate").show();
	// call zipPass() function
	zipPass();
 }
 
// function for checking zip field input
function checkInput() {
	var zip = $("#zipinput").val();
	if (zip.length === 5) {
		if (isNaN(zip)) {
			// display error Message
			zipFailMessage();
		} else {
			// call function to make Ajax call
			getLocation();
		}	
	} else {
		// display the error message until a valid 5 digit code is entered
		if (zip.length != 5) {	
			zipFailMessage();
		} 	
	}
}

// function for displaying error message if zip input is not valid
function zipFailMessage() {
	var error = $("#errorText");
	error.html("Please enter a valid zip code");
	error.show();

}

// function for hiding error message if zip input is valid
function zipPass() {
	$("#errorText").html("");
	$("#errorText").hide();	
}


// event listener on keyup inside #zipinput field to call checkInput();
$("#zipinput").on("keyup", function() {
	checkInput();
});
