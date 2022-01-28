//array boja dugmica
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern = [];

var started = false;
var level = 0;

//ceka keypress tastature i testira var started, vidi da je false, pretvara ga u true
$(document).keypress(function() {
    if (!started) {  
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function() {
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
 //pokrece zvuk(function)
    playSound(userChosenColour);
//pokrece animaciju dugmeta
    animatePress(userChosenColour);
//calluje funkciju, gleda index zadnjeg odgovora u userClickedPattern array-u
    checkAnswer(userClickedPattern.length-1);
});

//kontrola odgovora
function checkAnswer(currentLevel){
    //kontrolise zadnji odgovor
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        playSound("correct");
        console.log("success");
  
        if (userClickedPattern.length === gamePattern.length){
  
            //call-uje nextSequence posle 1 sekunde
            setTimeout(function () {
            nextSequence();
          }, 2000);
  
        }
  
      } else {

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 300);
          $("#level-title").text("Game Over, Press Any Key to Restart ");
          startOver();
        console.log("wrong");
      }
  };

/*------------next level------------*/
//rng funkcija daje rng od 0 do 3
function nextSequence() {
//resetuje array userovih klikova
    userClickedPattern = [];

//dodaje nivo
    level++;

    //menja ime nivoa na h1
    $("#level-title").text("Level " + level);
  
    //rng 
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
  //animira dugme i pusta odgovarajuci zvuk
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }
  //funkcija za pustanje zvuka
  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  //funkcija za animaciju dugmeta, dodaje i brise .pressed klasu posle 
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  };
  

function startOver(){
    level = 0;
    gamePattern=[];
    started = false;
};

