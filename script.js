$(document).ready(function () {
  // Get current date and time from Moment
  var currentDay = moment().format("dddd, MMMM Do YYYY");

  // Display current time in proper HTML
  $("#currentDay").text(currentDay);

  // Get current hour from moment and set to 12 hour format

  var nowHour = moment().format("h");

  //Sets array for hour blocks
  planTextArr = new Array(9);
  // test for initial array
  planTextArr[4] = "Picnic lunch outside";

  // set planner container as a variable

  var plannerContainer = $(".plannerContainer");

  // Get saved plans from storage, parse string to object

  var savedPlans = JSON.parse(localStorage.getItem("savedPlans"));

  if (savedPlans !== null) {
    planTextArr = savedPlans;
  } else {
    planTextArr = new Array(9);
    // planTextArr[4] = "Picnic lunch outside";
  }

  // build calendar by row for fix set of hours
  for (var hour = 9; hour <= 17; hour++) {
    // less 9 so 9am is index[0]
    // dynamically build planner row
    var index = hour - 9;
    var rowEl = $("<div>");
    rowEl.addClass("row");
    rowEl.addClass("plannerRow");
    rowEl.attr("current-hour", hour);
    rowEl.addClass("time-block");

    // build time box portion of row
    var timeDiv = $("<div>");
    timeDiv.addClass("col-md-2");
    timeDiv.addClass("hour");

    var timeBox = $("<span>");
    // timeBox.addClass('hour');
    timeBox.addClass("time-block");

    // format hours to display. To be used later in color function

    var displayHours = 0;
    var ampm = "";
    if (hour > 12) {
      displayHours = hour - 12;
      ampm = "pm";
    } else {
      displayHours = hour;
      ampm = "am";
    }

    timeBox.text(`${displayHours} ${ampm}`);

    rowEl.append(timeDiv);
    timeDiv.append(timeBox);

    // Time block built

    // build 'textarea' input

    var dailyItem = $("<textarea>");

    dailyItem.attr("id", `input-${index}`);
    dailyItem.attr("current-hour", index);
    dailyItem.attr("type", "text");
    dailyItem.attr("class", "dailyItem");
    dailyItem.addClass("col-md-9");

    dailyItem.val(planTextArr[index]);

    // adds textarea to row div
    rowEl.append(dailyItem);

    // build button portion

    var saveDiv = $("<div>");
    saveDiv.addClass("col-md-1");
    var saveBtn = $('<input type="button" value="Save" />');
    saveBtn.addClass("saveBtn");
    saveBtn.attr("id", `saveid-${index}`);
    saveBtn.attr("save-id", index);

    // Append button to div and div to Row element
    rowEl.append(saveDiv);
    saveDiv.append(saveBtn);

    // Set past present future color based on time
    rowColor(hour);

    // Add generated rows to planner container

    plannerContainer.append(rowEl);
  }

  // Define rowColor function

  function rowColor(num) {
    if (num > parseInt(nowHour)) {
      rowEl.addClass("future");
    } else if (num < parseInt(nowHour)) {
      rowEl.addClass("past");
    } else if ((num = parseInt(nowHour))) {
      rowEl.addClass("present");
    }
  }
  $(".saveBtn").on("click", function (event) {
    event.preventDefault();
    var index = $(this).attr("save-id");

    var inputId = "#input-" + index;
    var value = $(inputId).val();

    planTextArr.splice(index, 1, value);

    localStorage.setItem("savedPlans", JSON.stringify(planTextArr));

    planTextArr[index] = value;
  });
});
