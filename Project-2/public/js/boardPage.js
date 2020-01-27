let Cryptr = require("cryptr");
let editMode = false;
let cryptr = new Cryptr("TheSecret");
let sampleImagesCreated = false;
let visionBoardSize = {
  width: parseInt("800px", 10),
  height: parseInt("375px", 10)
};

$(document).ready(function () {
  // When the page is loaded, these functions will run:
  localStorage.clear();
  SetupBackgroundSlideshow();
  ConfigureButtons();
  CheckIfLoggedIn();
});

function SetupBackgroundSlideshow() {
  let backgrounds = [
  ];

  $("#content-area").css("background-image", "url('../images/backgrounds/nature-1.gif')");
}

function ConfigureButtons() {

  $('.modal').on('hidden.bs.modal', function (e) {
    $(this)
      .find("input,textarea,select")
      .val('')
      .end()
      .find("input[type=checkbox], input[type=radio]")
      .prop("checked", "")
      .end();
  });

  // Display the 'Create New Account' modal when '#signup-btn' is clicked
  $("#signup-btn").click(function () {
    $("#signup-modal").modal('toggle');
  });

  // Confirms signup & adds new user to the database if valid
  $("#confirm-signup-btn").click(function() {
    
    let newUser = {
      name: $("#newuser-name").val().trim(),
      password: cryptr.encrypt($("#newuser-password").val().trim())
    };

    VerifyNewUser(newUser);
  });

  // Removes any stored data from local storage and switches back to login page
  $("#logout-btn").click(function() {

    localStorage.removeItem("ID");
    
    $("#boards-list-side").fadeOut('fast');
    $("#vision-board-side").fadeOut('fast');
    $("#user-welcome").text("");
    $("#user-welcome").attr("userid", "");
    $("#login-area").fadeIn();
    
  });

  // Display the 'Login' modal when '#login-btn' is clicked
  $("#login-btn").click(function () {
    $("#login-modal").modal('toggle');
  });

  // Confirms login then shows the main page content
  $("#confirm-login-btn").click(function () {
    let user = {
      name: $("#user-name").val().trim(),
      password: cryptr.encrypt($("#user-password").val().trim())
    };

    VerifyUserLogin(user);
  });

  // Display the 'Add New Goal' modal when '#add-btn' is clicked
  $("#add-btn").click(function () {
    $("#goal-modal").modal('toggle');
  });

  // Changes the images on the board to 'edit' mode
  $("#edit-btn").click(function () {

    editMode = true;

    let previews = $(".boardIMG").css({
      "border-color": "white",
      "border-style": "dashed"
    });
  });


  // Changes the images on the board back to normal (exit edit mode)
  $("#done-btn").click(function () {

    editMode = false;

    let previews = $(".boardIMG").css({
      "border-color": "black",
      "border-style": "solid"
    });
  });

  // Display the 'Create New Board' modal when '#create-new-board' is clicked
  $("#create-new-board").click(function () {
    $("#board-modal").modal('toggle');
  });

  // Creates a ".user-board-preview" when user clicks "OK" to create a new board:
  $("#confirm-board-btn").click(function () {

    // Checks if board name is valid before creating the board
    let board = {
      title: $("#board-name").val().trim(),
      type: $("#board-type option:selected").text(),
      UserId: $("#user-welcome").attr("userid")
    };

    if (board.title === "") {
      $("#board-name").val("");
      $("#board-name").attr("placeholder", "Enter a valid name!");
    } else {  
      GenerateNewBoard(board);
    }

  });

  // Show fullscreen view of the vision board when 'fullscreen' button is clicked
  $("#full-scr-btn").click(function () {

    var elem = document.getElementById("vision-board-area");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  });

  $(".boardIMG").click(function () {
    if (editMode) {
      $("#editGoal-modal").modal('toggle');
    }
  });

  $("#update-goal-btn").click(function () {
    $("#edit-mode").modal('hide');
  });

}

// This function creates and adds the 10 squares for goals on the vision board:
function CreateSampleImages() {

  if (!sampleImagesCreated) {

    sampleImagesCreated = true;

  // Array of 10 colors (1 for each goal) that will be randomly chosen as the default background color for each goal on the vision board
  let colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "lightgreen",
    "purple",
    "pink",
    "skyblue",
    "darkred"
  ];

  // Gets bounding box for the vision board
  let visionBoardBox = $("#vision-board")[0].getBoundingClientRect();

  // Since there will be 2 rows of images on the vision board, each image's width is set to the vision board's width / 5 (5 images per row), minus a minor offset to give spacing
  let imgWidth = (visionBoardBox.width / 5) - (6 / 5);

  // Similar to the imgWidth, each image's height is set to the vision board's height / 2 (2 rows), minus a minor offset for spacing
  let imgHeight = visionBoardBox.height / 2 - (6 / 2);

  // "imgTop"/y-value & "imgLeft"/x-value will be updated for each image, so they are initliazed at (0,0) before the loop below
  let imgTop = 0;
  let imgLeft = 0;

  // "randColor" will determine the background color for each image
  let randColor;

  // Loop that creates each vision board image (10 total)
  for (let i = 0; i < 10; i++) {

    // For each iteration, pick a random color from the "colors" array to be the default background color
    randColor = Math.floor(Math.random() * colors.length);

    // Creates the new image
    let newImg = $(`<div class='boardIMG' id='img-${i}'>`); // adds ".boardIMG" class to image, sets id to img-[current i value]. results should have img-0 to img-9
    newImg.css({
      position: "absolute",
      padding: "25px",
      top: imgTop,
      left: imgLeft,
      width: imgWidth,
      height: imgHeight,
      "background-color": colors[randColor],
      transform: "rotateZ(-10deg)" // applies the minor rotation to each image
    });

    $("#vision-board").append(newImg);

    // When "i = 4", this means it is time to start adding images to the second row, 
    // so the x value (imgLeft) is reset to 0 and the y value (imgTop) is set to the second row.
    if (i === 4) {
      imgLeft = 0;
      imgTop += imgHeight;
    } else { // updates each image's x value (imgLeft)
      imgLeft += imgWidth;
    }

    // Once an image is created, remove the used color (randColor) from the "colors" array to make sure no color is used twice
    colors.splice(randColor, 1);
  }

  let imgID;

  // "imgUpdate" will raise all of the images on the first row by 12px, and lower all images on the bottom row by 12px
  // It is initalized at -12 for the top row and will be changed in the loop
  let imgUpdate = "-=12px"

  // The loop below will apply a minor offset to every other image's y-value and rotation to add to the boards style
  for (let i = 0; i < 10; i++) {
    imgID = `img-${i}`; // Gets ID of each image using the id created in the previous loop

    if (i % 2 === 0) { // Since 'i' goes from 0-9, this will be true for every other image
      $(`#${imgID}`).css({
        top: imgUpdate,
        transform: "rotate(10deg)" // this is the opposite of the rotation set in the previous loop
      });
    }

    // When "i = 4" we have reached the second row.
    // Change "imgUpdate" from -12px to 12px so it will lower the images instead of raising them
    if (i === 4) { imgUpdate = "+=12px" };

  }
}
}

function ShowHomePage(user) {
  $("#login-area").fadeOut('fast', function() {
    $("#boards-list-side").fadeIn();
    $("#vision-board-side").fadeIn();

    $("#user-welcome").text(`hello, ${user}!`);
    $("#user-welcome").fadeIn();

    CreateSampleImages();
  });
}

function CheckIfLoggedIn() {

  if (localStorage.getItem("ID")) {
    let username = cryptr.decrypt(localStorage.getItem("ID"));
    ShowHomePage(username);
  }

}

/*---------------------------------------------------------------------------------*/
// AJAX FUNCTIONS --- Requests to the database are done in the following functions //
/*---------------------------------------------------------------------------------*/

function CreateUser(userInfo) {
    $.ajax({
      method: "POST",
      url: "/api/user",
      data: userInfo
    }).then(function(result) {
      let userID = cryptr.encrypt(userInfo.name);
      localStorage.setItem("ID", userID);
      $("#signup-modal").modal('hide');
      $("#user-welcome").attr("userid", result.id);
      ShowHomePage(userInfo.name);
    });
}

function VerifyNewUser(userInfo) {

  $.ajax({
    method: "GET",
    url: "api/createuser/" + userInfo.name
  }).then(function(result) {
    console.log(result);
    if (result !== null) {
      $("#newuser-name").val("");
      $("#newuser-name").addClass("invalid-field");
      $("#newuser-password").val("");
      $("#newuser-name").attr("placeholder", "Username Already Exists");
      return;
    } else {
      $("#newuser-name").removeClass("invalid-field");
      CreateUser(userInfo);
    }
  });
}

function VerifyUserLogin(userInfo) {
  $.ajax({
    method: "GET",
    url: "api/user/" + userInfo.name
  }).then(function(result) {    
    if (result === null || (cryptr.decrypt(userInfo.password) !== cryptr.decrypt(result.password))) {
      $("#user-name").val("");
      $("#user-name").addClass("invalid-field");
      $("#user-password").val("");
      $("#user-name").attr("placeholder", "Invalid Username/Password");
      return;
    } else {
      if (!localStorage.getItem("ID")) {
        let userID = cryptr.encrypt(userInfo.name);
        localStorage.setItem("ID", userID);
      }
      $("#user-name").removeClass("invalid-field");
      $("#user-welcome").attr("userid", result.id);
      $("#login-modal").modal('hide');
      ShowHomePage(userInfo.name);
      CheckForCreatedBoards(result.id);
    }
  });
}

function GenerateNewBoard(boardInfo) {
  $.ajax({
    method: "POST",
    url: "api/boards/" + boardInfo.UserId,
    data: boardInfo
  }).then(function(result) {
    if (!result) {
      console.log("New Board failed.");
    } else {
      CreateBoardPreview(result.id);
    }
  });
}

function CheckForCreatedBoards(userID) {
  $.ajax({
    method: "GET",
    url: "api/boards/" + userID
  }).then(function(result) {
    
    console.log(result);
    
    for (i = 0; i < result.length; i++) {
      CreateBoardPreview(result[i].id);
    }
  });
}

function CreateBoardPreview(id) {
  let newBoard = $(`<div class='user-board-preview' boardID='${id}'>`);

  // Set width/height to 30% of the main vision board's size
  newBoard.css({
    width: visionBoardSize.width * 0.3,
    height: visionBoardSize.height * 0.3
  });

  // Add the board preview to the '#user-boards' div and display with an animation
  $("#user-boards").append(newBoard);
  newBoard.hide();
  newBoard.show({ duration: 100 });

  $("#board-modal").modal('hide');
}