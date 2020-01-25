$(function() {
$("").on("submit", function(event) { // add id 
    event.preventDefault();

    let newUser = {
        name : $("#goal-desc").val().trim(),
        email : $("#goal-image").val().trim(),
        password : $("")
    }
    // POST Request for adding a user to the database 
    $.ajax("/api/user", {
        type: "POST",
        data: newUser
    }).then(function () {
        console.log("user added");
        location.reload();
    })

});
});