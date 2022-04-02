var boxColors = ["red","green","blue","yellow"];

var randomSequence = [];
var userSequence = [];

var level = 0;

var started = false;

$(document).on("keydown",function() {
  if (started === false) {
    started = true;
    nextSequence();
  }
});

$(".btn").on("click",function(event) {
  var chosenColor = event.target.id;
  userSequence.push(chosenColor);

  //Animate Chosen key
  $("." + chosenColor).addClass("pressed");
  setTimeout(function() {
    $("." + chosenColor).removeClass("pressed");
  },100);

  //Play Audio
  addSound(chosenColor);

  checkSequence(userSequence.length-1);
});

function checkSequence(last_entry) {
  if (userSequence[last_entry] === randomSequence[last_entry]) {
    if (userSequence.length === randomSequence.length) {
      setTimeout(function() {nextSequence()},1000);
    }
  }
  else {
    $("#level-title").text("Game Over, Press Any Key to Restart");

    //Game Over Animation
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    addSound("wrong");

    //Start over
    startOver();
  }
}


function nextSequence() {
  userSequence = [];
  var ranNumber = Math.floor(Math.random()*4);
  var nextColor = boxColors[ranNumber];
  randomSequence.push(nextColor);


  //Animate color
  $("." + nextColor).fadeOut(100).fadeIn(100);

  //Sound Effect
  addSound(nextColor);

  //Change level
  level++;
  $("#level-title").text("Level " + level);
}


function addSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function startOver() {
  started = false;
  level = 0;
  randomSequence = [];
}
