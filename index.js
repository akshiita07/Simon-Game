var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickPattern = [];
var levelNumber = 0;

var startedFlag = 0;

//on clicking of any key-start game
$(document).keydown(function (event) {
    // console.log(event.key); to know which key was pressed by user
    if (startedFlag === 0) {
        restartGame();
        startedFlag = 1;
    }
})

function nextSequence() {
    //to choose a random color
    //generate random number between 0,1,2,3 0-3 to select a color from array of colors
    var rno = (Math.floor(Math.random() * 4));
    colorSelected = colors[rno];
    // console.log(colors[rno]); GENERATES COLORS BETWEEN  green,red,yellow,blue
    gamePattern.push(colorSelected);

    //print this array
    console.log("Game pattern array: " + gamePattern);

    //select any random id out of green,red,yellow,blue and add flash effect to it
    $("#" + colorSelected).fadeOut(100).fadeIn(100);
    
    //also play corresponding sound
    playSound(colorSelected);
    

    levelNumber++;
    $("#level-title").text("Level " + levelNumber);
}

function playSound(nameSound) {
    var soundSelected = new Audio("./sounds/" + nameSound + ".mp3")
    soundSelected.play();
}

function restartGame() {
    levelNumber = 0;
    //any random button press

    gamePattern = [];
    userClickPattern = [];

    nextSequence();

}

//when user clicks a button
$(".btn").click(function () {
    // console.log(event.currentTarget.id);     returns id of which button color selected by user

    //METHOD2--returns id of which button color selected by user
    // console.log($(this).attr("id"));

    // which colored button was chosen by user:
    // console.log(this);
    var userChosen = this;

    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    //to see contents of user selected colors array
    console.log("User chosen array: " + userClickPattern);

    //also play corresponding sound
    playSound(userChosenColor);

    //add animation to button pressed:
    //when user presses a CORRECT button add class ".pressed" to it for 100 msec using set timeout
    $(userChosen).addClass("pressed");
    setTimeout(function () {
        $(userChosen).removeClass("pressed");
    }, 300);

    //to check ans that user has clicked
    checkAnswer(userClickPattern.length - 1);
})

// 1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        //if user has written full sequence:
        if (userClickPattern.length === gamePattern.length) {
            console.log("success");

            userClickPattern = [];

            //start game again only if whole sequence matches
            setTimeout(nextSequence, 800);
        }
        else {
            console.log("sequence not complete yet...");
        }

    }

    else {
        console.log("wrong button selected by user");
        playSound("wrong");

        //if wrong button pressed then game over add class: ".game-over"
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startedFlag = 0;
    }

}