$(function() {

// On submit for adding new goals to a board (need to double check ID/CLASS)
  $("#confirm-goal-btn").on("submit", function(event) {
    event.preventDefault();

    let goalAdded = {
        goalDescription : $("#goal-desc").val().trim(),
        goalImage : $("#goal-image").val().trim()
    }
    // POST Request for adding a goal to the database 
    $.ajax("/api/goals", {
        type: "POST",
        data: goalAdded
    }).then(function () {
        console.log("goal added");
        location.reload();
    })

})

// on click for deleting a goal by id 

$("#").on("click", function(event) { // add id for deleting goal 
    let id = $(this).data("id"); 

    // Delete request for deleting goal from database
    $.ajax("/api/boards/goals/" + id, {
        type: "DELETE"
    }).then(function() {
        location.reload(); 
    })
      

})
// on click for updating a goal
    $("#").on("click", function(event) { // add id for editing goal
        let id = $(this).data("id"); 

        let updatedGoal = $("#goal-desc").val().trim()
    
        // PUT request for deleting goal from database
        $.ajax("/api/boards/goals/" + id, {
            type: "PUT",
            data: updatedGoal
        }).then(function() {
            location.reload(); 
        })
      

    })




});