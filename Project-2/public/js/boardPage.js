$(document).ready(function() {
  ConfigureButtons();
  CreateSampleImages();
});

function ConfigureButtons() {

  $("#add-btn").click(function() {
    $("#goal-modal").modal('toggle');

  });

  $("#create-new-board").click(function() {
    let newBoard = $("<div class='user-board-preview'>");
    let visionBoardRect = $("#vision-board")[0].getBoundingClientRect();

    newBoard.css({
      width: visionBoardRect.width * 0.3,
      height: visionBoardRect.height * 0.3
    });

    $("#user-boards").append(newBoard);
    newBoard.hide();
    newBoard.show({duration: 100});

  });
}

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
]

function CreateSampleImages() {
  let visionBoardBox = $("#vision-board")[0].getBoundingClientRect();
  let imgWidth = (visionBoardBox.width / 5) - (6 / 5);
  let imgHeight = visionBoardBox.height / 2 - (6 / 2);
  let imgTop = 0;
  let imgLeft = 0;
  let randColor;

  for (let i = 0; i < 10; i++) {
    randColor = Math.floor(Math.random() * colors.length);
    let newImg = $(`<div class='boardIMG' id='img-${i}'>`);
    newImg.css({
      position: "absolute",
      padding: "25px",
      top: imgTop,
      left: imgLeft,
      width: imgWidth,
      height: imgHeight,
      "background-color": colors[randColor],
      transform: "rotateZ(-10deg)"
    });

    $("#vision-board").append(newImg);

    if (i === 4) {
      imgLeft = 0;
      imgTop += imgHeight;
    } else {
      imgLeft += imgWidth;
    }

    colors.splice(randColor, 1);
  }

  let imgID;
  let imgUpdate = "-=12px"
  for (let i = 0; i < 10; i++) {
    imgID = `img-${i}`;

    if (i % 2 === 0) {
      $(`#${imgID}`).css({
        top: imgUpdate,
        transform: "rotate(10deg)"
      });
    }
    
    if (i === 4) {imgUpdate = "+=12px"};
    
  }
}