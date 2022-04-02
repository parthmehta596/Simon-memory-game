
var buttonColors = ["green","red","yellow","blue"];

var colorSequence = [];

var userSequence = [];

var level = 0;
var started = false;

//Start
$(document).on("keydown", function() {
  if (started===false) {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

//User Input
$(".btn").on("click",function(event) {
  var userColor = event.target.id;
  userSequence.push(userColor);
  playAudio(userColor);
  animatePress(userColor);
  checkAnswer(userSequence.length-1);
});

function checkAnswer(currentLevel) {

  if (userSequence[currentLevel]===colorSequence[currentLevel]) {
    if (userSequence.length === colorSequence.length) {

      setTimeout(function() {nextSequence();},1000);

    }
}
  else {
    gameOver();
    playAudio("wrong");
  }
}


//Next Sequence
function nextSequence() {
  userSequence = [];
//Random Number

  var randomNumber = Math.floor(Math.random() * 4);
  var chosenColor = buttonColors[randomNumber];

  colorSequence.push(chosenColor);

// Flash Animation
  $("." + chosenColor).fadeOut(100).fadeIn(100)

//Audio
  playAudio(chosenColor);

// H1
  level++;
  $("#level-title").text("Level "+level);

}

function playAudio(color) {
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}


function animatePress(color) {
$("." + color).addClass("pressed");
  setTimeout(function() {
    $("." + color).removeClass("pressed");
  },100);
}

//Game Over
function gameOver() {
$("#level-title").text("Game Over, Press Any Key to Restart");
$("body").addClass("game-over");
setTimeout(function() {$("body").removeClass("game-over");},200);
startOver();
}

//Start over
function startOver() {
  level = 0;
  started = false;
  colorSequence = [];
}
