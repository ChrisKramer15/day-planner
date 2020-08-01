$(document).ready(function () {
  var currentDay = moment().format("dddd, MMMM Do YYYY");
  $("#currentDay").text(currentDay);
  var nowHour = moment().format("k");
  planTextArr = new Array(9);
  planTextArr[4] = "Picnic lunch outside";
  var plannerContainer = $(".plannerContainer");
  var savedPlans = JSON.parse(localStorage.getItem("savedPlans"));
  if (savedPlans !== null) {
    planTextArr = savedPlans;
  } else {
    planTextArr = new Array(9);
  }
  for (var hour = 9; hour <= 17; hour++) {
    var index = hour - 9;
    var rowEl = $("<div>");
    rowEl.addClass("row");
    rowEl.addClass("plannerRow");
    rowEl.attr("current-hour", hour);
    rowEl.addClass("time-block");
    var timeDiv = $("<div>");
    timeDiv.addClass("col-md-2");
    timeDiv.addClass("hour");
    var timeBox = $("<span>");
    timeBox.addClass("time-block");
    var displayHours = 0;
    var ampm = "";
    if (hour > 11 && hour !== 12) {
      displayHours = hour - 12;
      ampm = "pm";
    } else if (hour === 12) {
      displayHours = hour;
      ampm = "pm";
    } else {
      displayHours = hour;
      ampm = "am";
    }
    timeBox.text(`${displayHours} ${ampm}`);
    rowEl.append(timeDiv);
    timeDiv.append(timeBox);
    var dailyItem = $("<textarea>");
    dailyItem.attr("id", `input-${index}`);
    dailyItem.attr("current-hour", index);
    dailyItem.attr("type", "text");
    dailyItem.attr("class", "dailyItem");
    dailyItem.addClass("col-md-9");
    dailyItem.val(planTextArr[index]);
    rowEl.append(dailyItem);
    var saveDiv = $("<div>");
    saveDiv.addClass("col-md-1");
    var saveBtn = $('<input type="button" value="Save" />');
    saveBtn.addClass("saveBtn");
    saveBtn.attr("id", `saveid-${index}`);
    saveBtn.attr("save-id", index);
    rowEl.append(saveDiv);
    saveDiv.append(saveBtn);
    rowColor(hour);
    console.log(hour);
    plannerContainer.append(rowEl);
  }
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
