$(document).ready(function() {
  ConfigureButtons();
});

function ConfigureButtons() {
  $("#btn-add-goal").click(function() {

      let userInput = $("#goal-input").val().trim();

      if (userInput !== "") {
          let newGoal = $("<li></li>").text(userInput);
          $("#goal-list").append(newGoal);
          $("#goal-input").val("");
      }
  });
}
