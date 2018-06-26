 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCBPzOVlPZ2hvxYonexelXNaVCzPuh5ylw",
    authDomain: "trainscheduler-218f4.firebaseapp.com",
    databaseURL: "https://trainscheduler-218f4.firebaseio.com",
    projectId: "trainscheduler-218f4",
    storageBucket: "trainscheduler-218f4.appspot.com",
    messagingSenderId: "576382698941"
  };
  firebase.initializeApp(config);




var database = firebase.database();

$("#submitButton").on("click", function (event) {
event.preventDefault();

var format = moment().format('h: mm: ss a');
var name = $("#name-input").val();
var destination = $("#destination-input").val();
var firstTrain = $("#train-time").val();
var frequency = $("#frequency-input").val();


var timeArr = firstTrain.split(":");
var firstTrainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
var maxMoment = moment().max(moment(), firstTrainTime);
var tMinutes;
var tArrival;

// If the first train is later than the current time, set arrival to the first train time
if (maxMoment === firstTrainTime) {
tArrival = firstTrainTime.format("hh:mm A");
tMinutes = firstTrainTime.diff(moment(), "minutes");
} else {


// Calculate  minutes till arrival. 
var timeDifference = moment().diff(firstTrainTime, "minutes");
var tRemainder = timeDifference % frequency;
tMinutes = frequency - tRemainder;
// To calculate the arrival time, add the tMinutes to the current time
tArrival = moment().add(tMinutes, "m").format("hh:mm A");
}

database.ref().push({
name: name,
destination: destination,
trainTime: tArrival,
frequencyinput: frequency,
diffTime: tMinutes

});
});


database.ref().on("child_added", function (snapshot) {



$("tbody").append('<tr>');
$("tbody").append('<td>' + snapshot.val().name + '</td>');
$("tbody").append('<td>' + snapshot.val().destination + '</td>');
$("tbody").append('<td>' + snapshot.val().frequencyinput + '</td>');
$("tbody").append('<td>' + snapshot.val().trainTime + '</td>');
$("tbody").append('<td>' + snapshot.val().diffTime + '</td>');
$("tbody").append('</tr>');
});
