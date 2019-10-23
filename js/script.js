// Variables
var score, roundScore, activePlayer;
var gamePlaying = true;

score = [0, 0];
roundScore = 0;
activePlayer = 0;

// set current and global scores to 0
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

// start game without displaying dice
document.querySelector(".dice").style.display = "none";
document.querySelector(".dice2").style.display = "none";

// on click display dice with appropriate image
document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {

        // Generate a random number for dice
        var dice = Math.floor((Math.random() * 6) + 1);
        var dice2 = Math.floor((Math.random() * 6) + 1);

        // display number in the dice
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "img/dice-" + dice + ".png";

        var diceDOM2 = document.querySelector(".dice2");
        diceDOM2.style.display = "block";
        diceDOM2.src = "img/dice-" + dice2 + ".png";


        // dice behaviour
        if (dice === dice2) { // Player loose his score if dice and dice2 are same number
            score[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent = "0";
            nextPlayer();
        } else { // if any of the dice is one, change player
            roundScore += dice + dice2;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        }
    }
});



// click hold button to save score
document.querySelector(".btn-hold").addEventListener("click", hold);

function hold() {

    var chooseScore = document.querySelector("#chooseScore").value;
    var setScore;

    if (chooseScore) { // If a Score is set in the input field, the winning score will be its value
        setScore = chooseScore;
    } else { // if a score is not set in the input field, the winning score will be 50
        setScore = 50;
    }

    if (gamePlaying) {
        // add current scroe to global score
        score[activePlayer] += roundScore;
        // update UI
        document.getElementById("score-" + activePlayer).textContent = score[activePlayer];

        // activePlayer with global score = or > of setScore is the winner
        if (score[activePlayer] >= setScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
};


function nextPlayer() {
    setTimeout(function() {
        if (activePlayer === 0) {
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }

        roundScore = 0; // start roundScore from 0 everytime activePlayer change

        // update roundScore to 0 everytime activePlayer change in user interface
        document.getElementById("current-0").textContent = 0;
        document.getElementById("current-1").textContent = 0;
        // change activePlayer in user interface
        // use toggle to add class if is not there, and if is there remove it
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");

        document.querySelector(".dice").style.display = "none";
        document.querySelector(".dice2").style.display = "none";
    }, 300);
}


// New game button
document.querySelector(".btn-new").addEventListener("click", reload);

function reload() {
    location.reload();
    gamePlaying = true;
}