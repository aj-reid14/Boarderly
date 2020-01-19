$(document).ready(function() {
  ConfigureButtons();
  CreateSampleImages();
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

let colors = [
  "red", 
  "blue",
  "green",
  "yellow",
  "orange",
  "brown",
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
    let newImg = $(`<div id='img-${i}'>`);
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