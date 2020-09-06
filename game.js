//alert("Hello Game.");


var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//Starts the game when key is pressed.
$(document).one("keypress", function() {
  nextSequence();
  $("#level-title").text("Level " + level);
  started = true;
});


$(".btn").click(function() {
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer((userClickedPattern.length) - 1);
  console.log(gamePattern);
  console.log(userClickedPattern);

});


//Randomly generates the next color in the sequence.
function nextSequence() {
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  level++;
  setTimeout(function() {
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#level-title").text("Level " + level);
    userClickedPattern = []; //returns user's selection to blank
  }, 750);
}

//This plays the sounds.
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

//Animates the press of each button.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success.");
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong.");
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  $(document).one("keypress", function() {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  });

}
