$(document).ready(function() {

var name;
var destination;
var start;
var frequency;
var min;
var appart;
var difference;
var nextArr;

	  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC4x-ZE5IonTN0_RId_j7eY2vcdt-0QY4M",
    authDomain: "trainhomework-2db93.firebaseapp.com",
    databaseURL: "https://trainhomework-2db93.firebaseio.com",
    projectId: "trainhomework-2db93",
    storageBucket: "trainhomework-2db93.appspot.com",
    messagingSenderId: "363310419279"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#train-submit").on("click", function(event){

  	event.preventDefault();

  	$("#tablebody").empty();

  	name = $("#train-name").val().trim();
  	destination = $("#train-destination").val().trim();
  	start = $("#train-start").val().trim();
  	frequency = $("#train-frequency").val().trim();

  	console.log("Name: " + name);
  	console.log("Destination: " + destination);
  	console.log("Start: " + start);
  	console.log("Frequency: " + frequency);

  	timeCalc();

  	database.ref().push({
  		Name: name,
  		Destination: destination,
  		Start: start,
  		Frequency: frequency,
  		Arrival: nextArr,
  		Minutes: min,
  	});

  });

  database.ref().on("value", function(snapshot) {
  	snapshot.forEach(function(childSnapshot){
  		var newRow = $("<tr>");
  		var nameCol = $("<td>");
  		var destCol = $("<td>");
  		var freqCol = $("<td>");
  		var arrCol =  $("<td>");
  		var minCol = $("<td>");

  		nameCol.html(childSnapshot.val().Name);
  		destCol.html(childSnapshot.val().Destination);
  		freqCol.html(childSnapshot.val().Frequency);
  		arrCol.html(childSnapshot.val().Arrival);
  		minCol.html(childSnapshot.val().Minutes);

  		newRow.append(nameCol, destCol, freqCol, arrCol, minCol);

  		$("#tablebody").append(newRow);

  	});
  });

  function timeCalc() {

  	var militaryTime = String(moment(start, "HH:mm").subtract(2, "years"));
  	difference = String(moment().diff(moment(militaryTime), "minutes"));
  	appart = difference % frequency;
  	min = String(frequency - appart);
  	Arrival = String(moment().add(min, "minutes"));
  	nextArr = moment(Arrival).format("hh:mm A");


  };

});