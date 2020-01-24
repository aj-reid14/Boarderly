
$(document).ready(function () {
  // When the page is loaded, these functions will run:
  ConfigureButtons();
  CreateSampleImages();
});

function ConfigureButtons() {

  // Display the 'Add New Goal' modal when '#add-btn' is clicked
  $("#add-btn").click(function () {
    $("#goal-modal").modal('toggle');

  });

  // Creates a ".user-board-preview" when user clicks to create a new board:
  $("#create-new-board").click(function () {

    let newBoard = $("<div class='user-board-preview'>");
    let visionBoardRect = $("#vision-board")[0].getBoundingClientRect();

    // Set width/height to 30% of the main vision board's size
    newBoard.css({
      width: visionBoardRect.width * 0.3,
      height: visionBoardRect.height * 0.3
    });

    // Add the board preview to the '#user-boards' div and display with an animation
    $("#user-boards").append(newBoard);
    newBoard.hide();
    newBoard.show({ duration: 100 });

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
  })
}

// This function creates and adds the 10 squares for goals on the vision board:
function CreateSampleImages() {

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