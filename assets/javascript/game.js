//Game Object
var hangMan = {
	guessWords: ["Owls", "Laura", "Cooper", "Audrey", "LogLady", "Leland", "Coffee", "Truman", "Jacoby", "Badalamenti"],
	wins: 0,  
	losses: 0,
	correctLettersGuessed: [],
	incorrectLetters: [],
	maxGuesses: 10,
	counter: 0,
	currentCorrectLetter: 0,
	oPlayArea: {},
	oBadArea: {},
	oWordDisplay: {},
	currentWord: [],

//Object methods
//Method to start the game 
	gameInit: function() {
		document.getElementById("startButton").style.display = "none";
		this.oPlayArea = document.getElementById("playArea");
		this.oBadArea = document.getElementById("badArea");
		this.oWordDisplay = document.getElementById("wordDisplay");
		this.currentWord = this.guessWords[this.counter];
		this.oPlayArea.style.display = "block";		
		this.updateWordDisplay();
		document.onkeyup = function(event) {
     		var userGuess = event.key;
     		if(this.counter > this.guessWords.length){
     			return;
     		}
     		if(this.currentWord.toLowerCase().indexOf(userGuess) >-1) {
     			this.correctLettersGuessed.push(userGuess);
     			this.updateWordDisplay();
     			this.currentCorrectLetter++;
     		} else {
     			this.incorrectLetters.push(userGuess);
     			this.updateBadArea(userGuess);
     			this.guessStatus();

     		}
		}.bind(this); //this = nooseMan
	},
	//Method for correct letters
	findLetterInCorrectGuesses: function(letter) {
		for (var j = 0; j < this.correctLettersGuessed.length; j++) {
			if (letter === this.correctLettersGuessed[j]) {
				return true;
			}
		}
		return false;
	},

	updateWordDisplay: function() {
		console.log(this.currentWord);
		var html = "";
		var won = true;
		for (var i = 0; i < this.currentWord.length; i++) {
			var currentLetter = this.currentWord[i].toLowerCase();
  			if(this.findLetterInCorrectGuesses(currentLetter)){
				html+=currentLetter + "&nbsp;";
			} else {
				html+="_&nbsp;";
				won = false;
			}
		}		
		this.oWordDisplay.innerHTML = html;
		if(won){
			this.updateWinsStatus();
			this.winMessage();
			this.reset();
		}
	},
	winMessage: function(){		
		var self = this;
		setTimeout(()=>{
			document.getElementById("wordDisplay").innerHTML = " CORRECT! ";
		},700);
		setTimeout(()=>{
			self.updateWordDisplay();
		},2000);	
	},
	lossMessage: function(){
		var self = this;
		document.getElementById("wordDisplay").innerHTML = "Sorry, you're out of guesses! ";
		setTimeout(()=>{
			self.updateWordDisplay();
		},1700);
	},
	updateBadArea: function(userGuess) {
		document.getElementById("badArea").innerHTML += userGuess + " ";				
	},
	guessStatus:function() {
		var len = this.incorrectLetters.length;
		if (len === this.maxGuesses) {
			this.losses++;
			document.getElementById("losses").innerHTML = this.losses;
			this.lossMessage();
			this.reset();
		}
	},
	updateWinsStatus: function(){
		this.wins++;
		document.getElementById("wins").innerHTML = this.wins;
	},
	reset: function(){
		this.counter++;
		this.currentWord = this.guessWords[this.counter];
		this.incorrectLetters = [];
		this.correctLettersGuessed = [];
		this.oBadArea.innerHTML = "";
		if (this.counter === this.guessWords.length) {
			alert("GAME OVER!");
			document.onkeyup = function() {

			};
		}
	}
}

window.onload = function(){
	document.getElementById("startButton").onclick=startGame;
}
function startGame(){
	//copy of the hangMan object 	
	var nooseMan = Object.create(hangMan);
	nooseMan.gameInit();
}
//Audio
var myVideo = document.getElementById("video1");

function playPause(button) {
	console.log(myVideo);
	if (myVideo.paused) {
		myVideo.play();
		button.innerText = "Pause ❚❚"
	} else {
		myVideo.pause();
		button.innerText = "Play ›"
	}
}