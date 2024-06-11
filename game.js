// create a variables
const buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];
let level = 0;
//------------------------------------------------------------------------------------

// Create a next sequence function that runs the patterns and play sounds

let nextSequence = () => {
  var randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
  // const showSequence = () => {
  //   $("." + randomChosenColour).animate(
  //     {
  //       opacity: "0.25",
  //     },
  //     100
  //   );
  //   $("." + randomChosenColour).animate(
  //     {
  //       opacity: "100%",
  //     },
  //     100
  //   );

  // };

  // $(document).ready(showSequence());
};
//------------------------------------------------------------------------------------

//Create function animate pressed
let animatePress = (currentColour) => {
  $("." + currentColour).addClass("pressed");
};
//------------------------------------------------------------------------------------

//Create a function that plays sounds:

function playSound(name) {
  let soundSelected = new Audio("sounds\\" + name + ".mp3");
  return soundSelected.play();
}

//------------------------------------------------------------------------------------
//Start the Game when you press keypad 'A'

$(document).ready(function () {
  $(document).on("keydown", function (e) {
    if (e.key === "a" && gamePattern.length === 0) {
      nextSequence();
    }
  });
});

//------------------------------------------------------------------------------------

//Select button with sound animation

$(".btn").on("click", function () {
  let userChosenColour = this.id;

  $("." + userChosenColour).animate(
    {
      opacity: "0.25",
    },
    100
  );
  $("." + userChosenColour).animate(
    {
      opacity: "100%",
    },
    100
  );
  // alert(this.id);
  animatePress(userChosenColour);
  setTimeout(function () {
    $("." + userChosenColour).removeClass("pressed");
  }, 100);

  playSound(this.id);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
});

//------------------------------------------------------------------------------------

// Check if pattern & click match. Next level. Reset array

function checkAnswer(currentLevel) {
  if (
    (gamePattern.length > 0) &
    (userClickedPattern[currentLevel] === gamePattern[currentLevel])
  ) {
    if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
      setTimeout(function () {
        return nextSequence();
      }, 1000);
      userClickedPattern = [];
      // console.log("success");
    }
    // effects when user gets pattern wrong
  } else if (
    (gamePattern.length > 0) &
    (userClickedPattern[currentLevel] != gamePattern[currentLevel])
  ) {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    startOver();
    $(document).on("keydown", function () {
      return nextSequence();
    });
  }
}
checkAnswer();

//------------------------------------------------------------------------------------
//To restart the game

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

//-----------------------------------------------------------------------------------
