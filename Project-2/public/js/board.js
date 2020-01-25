$(function() {

    // On submit for adding a new board {need create board... need form/button class for this to work}
  $(".create-board").on("submit", function(event) {
    event.preventDefault();
    let addedBoard = {
        boardName : $("boardName").val().trim()
    }
    // POST request for inserting new board to database
    $.ajax("/api/boards", {
        type: "POST",
        data: addedBoard
    }).then(function () {
        console.log("board added");

        // reload the page for updated list
        location.reload();
    })
  });
   // on click event for deleting board using "deleteBoard" class that is needed 
  $(".deleteBoard").on("click", function(event) {
      let id = $(this).data("id"); 
      // Put request for deleting board from database
      $.ajax("/api/boards/" + id, {
        type: "DELETE"
      }).then(function() {
          location.reload(); 
      })
      

  })

});
