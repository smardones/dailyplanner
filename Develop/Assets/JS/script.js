var today = moment().format("dddd, MMMM Do");
var tasks = [];

var loadTasks = function() {
    var loadedTasks = JSON.parse(localStorage.getItem("tasks"));
    
    $.each(loadedTasks, function(index, value) {
        createTask(value.hour, value.task);
    })
    
}
    
var createTask = function(returnedHour, returnedTask) {
    var newDiv = $("<div>")
        .addClass("task-display col-10")
        .text(returnedTask);
    var existingDiv = $("[data-task-hour=" + returnedHour + "]");
    
    tasks.push({hour: returnedHour, task: returnedTask})

    $(existingDiv).replaceWith(newDiv);
    }


    


// Display current day at top
$(".current-day").text(today);

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Enable clickable editing
$(".task-display").on("click", function() {
    var text = $(this).text();
    var textInput = $("<textarea>")
    .addClass("col-10 text-input")
    .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
})

$(".saveBtn").on("click", function() {
    var saveId = $(this).closest(".time-block").attr("data-hour");
    var textInputValue = $("[data-hour=" + saveId + "]").find(".text-input").val();
    var textField = $("[data-hour=" + saveId + "]").find(".text-input");
    var newDiv = $("<div>")
        .addClass("task-display col-10")
        .text(textInputValue);
    $(textField).replaceWith(newDiv);

    tasks.push({hour: saveId, task: textInputValue})
    console.log(tasks);

    saveTasks();
});


// var auditTime = function() {
//     var hourId = $(".time-block").attr("data-hour");

//     console.log(hourId);
    
//     var currentHour = moment().format("HH");
//     console.log(currentHour);

    // if (moment(currentHour).isBefore(hourId)) {
    //         console.log("This works")
    //     }

    
// }

// auditTime();
loadTasks();