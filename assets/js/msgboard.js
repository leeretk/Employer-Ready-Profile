
var config = {
        apiKey: "AIzaSyBxhsSVuUdpKqx6EQXdwGupeOFyss6D3YU",
        authDomain: "portfolio-contacts-599f4.firebaseapp.com",
        databaseURL: "https://portfolio-contacts-599f4.firebaseio.com",
        projectId: "portfolio-contacts-599f4",
        storageBucket: "portfolio-contacts-599f4.appspot.com",
        messagingSenderId: "810458093542",
        appId: "1:810458093542:web:22e37d66c4fc5fc9afe827"
  };

  firebase.initializeApp(config);
  var database = firebase.database();
  
var name = 0;
var email = 0;
var message = "";
var date=0;

///// ADD RECORDS TO THE DATABASE //////

$("#add-new-contact").on("click", function () {
  event.preventDefault();
  
  clickCounter++;
  console.log()

  //grabs user input//
  // clickCounter = $("#counter-input").val().trim();
  name = $("#name-input").val().trim();
  email = $("#email-input").val().trim();
  message = $("#message-input").val().trim();
  date=$("#date-input").val().trim();

  //creates local "temporary" object for holding train data//
  var contactPush = {
    clickCounter: clickCounter,
    name: name,
    email: email,
    message: message,
    date: date,
    };

  //uploads data to the database
  database.ref().push(trainPush);

  console.log("got a Lead" + contactPush);
  console.log(contactPush.name);
  console.log(contactPush.email);
  console.log(contactPush.message);
  console.log(contactPush.date);

 // Clears all of the text-boxes
  $("#counter-input").val("");
  $("#name-input").val("");
  $("#email-input").val("");
  $("#message-input").val("");
  $("#date-input").val("");
  
});

//create a firebase event

database.ref().on("child_added", function(childSnapshot){
  console.log(childSnapshot.val());
  var contactCounter=childSnapshot.val().clickCounter;
  var contactName =childSnapshot.val().name;
  var contactEmail =childSnapshot.val().email;
  var contactMessage =childSnapshot.val().message;
  var contactDate =childSnapshot.val().date;

 // Prettify Date

 var contactDatePretty = moment.unix(contactDate).format('LLLL');

//  var trainMinutesAwayPretty = moment.unix(trainMinutesAway).format(":mm");
//  var trainFrequencyPretty = moment.unix(trainFrequency).format(":mm");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(contactCounter),
    $("<td>").text(contactEmail),
    $("<td>").text(contactMessage),
    $("<td>").text(contactName),
    $("<td>").text(contactDatePretty),
  );

 // Append the new row to the table
 $("#contact-table > tbody").append(newRow);

});
