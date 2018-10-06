/*
---------------------------
ANSWER ARRAYS & USER INPUT CHARACTERS
---------------------------
*/

//Array of possible input letters (the alphabet)
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        
//Array of words.
var pupilName = [
	"potter",
	"weasley",
	"grainger",
	"creevey",
	"finnigan",
	"abbott",
	"Parkinson",
	"zabini",
	"malfoy",
	"thomas",
	"crabbe",
	"goyle",
	"brown",
	"bell",
	"patil",
	"mclaggen",
	"longbottom",
	"vane",
	"clearwater",
	"brocklehurst",
	"goldstein",
	"lovegood"
]


/*
---------------------------
DEFINING THE MAIN VARIABLES USED IN THE GAME
---------------------------
*/

//holds the current game state in the false (off) poition until the setup (initiallize) function runs when it becomes true.
//I will use this to essentially hold the game in on & off states and display the relevent feedback to the user
//i.e. runs a function to test the user input and gives the user feedback in the HTML doc. (DOM)
var gameStarted = false;

// Holds the name of the randomly seleted pupil.
var selectedPupil;

// holds the selected word after it has been convirted to underscores by the "NameToUnderscores" function
var hideName;

// holds a numerical value for the number of guesses remaining.
var remainingGuesses;

// holds an array of incorrectly input letters.
var lettersGuessed;

// holds the number of wins - set to default 0 in order to display 0 in the DOM.
var numWins = 0;

// holds the number of losses - again set to default 0 in order to display 0 in the DOM.
var numLosses = 0;

// array to hold the individual letters of the selectedName.
var nameByLetterArray = [];

// Array to hold the underscores that will replace the selectedName when the name is hidden.
var underscoresArray = [];


/*
---------------------------
'PRESS ANY KEY TO START' LISTENER & TESTING GAME-STATE
---------------------------
*/

// Listener - Tests for a keystroke to begin the game.
document.onkeyup = function (event) {
    // Test to see if the game has NOT started - Remember the default gameStarted falue is false.
	if (!gameStarted) {
		// Print startGame instructions in the DOM.
    	document.getElementById("startGame").innerHTML = "";
    	// Run the game setup (reset funtion) for the first round.
		reset();			
		// Change the game-state to gameStarted! Weeeeee!!! :) 
		gameStarted = true;
	}
	else {
        // Run playGame function upon ketystroke event.
		startGame(event.key);
	}
}

/*
---------------------------
THE SETUP - GAME START/RESET FUNCTION
---------------------------
*/

// The "set up" function - sets the game running.
function reset() {
    // states that the reset function has been called - We'll be testing for this later to allow the game to be reset.
    gameStarted = true;
    // creates a empty array in the lettersGuessed variable.
    lettersGuessed = [];      
    //The computer chooses a word at random from the 25 (number of names in the pupilName array), defines the getPupil variable and stores the random number in it.
    var getPupil = Math.floor(Math.random() * 22);
    // getPupil is now a number between 1-25, below we use this number (represented by "getPupil") to index the pupilName array and store that name in the selectedName variable.
	selectedPupil = pupilName[getPupil];
	// Programmer's "cheat" to get the answer via the console for testing purposes.
	console.log(selectedPupil);
	// Number of guesses allowed per round = 10
	remainingGuesses = 10
	// Calls the function "nameToUnderscores", applies it to "selectedPupil" and stores the result in the variable "hideName".
    hideName = nameToUnderscores(selectedPupil);	
	// Breaks the name into individual letters and places each letter in the array "nameByLetterArray.""
    nameByLetterArray = selectedPupil.split('');
    // Breaks the hidden version convirted to undersores down into a letter by letter array called "underscoresArray"
    underscoresArray = hideName.split('');

    // Prints feedback to the DOM.
    document.getElementById("selectedPupil").innerHTML = hideName;
    document.getElementById("lettersGuessed").innerHTML = "--";
	document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
}


/*
---------------------------
HIDING THE LETTERS - HANGMAN METAPHORE
---------------------------
*/

// Converts the selectedName to underscores.
function nameToUnderscores(name) {
	var underscores = "";
	for (i = 0; i < name.length; i++) {
		underscores += "_ ";
	}
	return underscores;
}

/*
---------------------------
HANDLING USER INPUT (if statments could be more concise, but it works!)
---------------------------
*/

// This function handles the user's key presses.
function startGame(letter) {
    // converts all letter inputs to lowercase.
	var letter = letter.toLowerCase();

	// Checks if the key pressed is actually a letter key or an invalid character. Valid inputs are specified in the "alphabet" array at the top of the page.
	if (alphabet.indexOf(letter) > -1) {
        // If the typed letter is within the 'nameByLetterArray" show the letter to the user.
		if (nameByLetterArray.indexOf(letter) > -1) {
			showLetter(letter);
		}
		else {
            // If ! then search lettersGuessed array to see if the user has guessed that letter already and return to prevent an undefined value.)
			if (lettersGuessed.indexOf(letter) > -1) {
				return;
			}
			else {
                // If the letter is not in the "nameByLetterArray" or the "lettersGuessed" array, reduce the remainingGuesses value by 1.
                remainingGuesses--;
                // Print user feedback to the Dom
                document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
                // Add the new incorrectly guessed letter to the lettersGuessed array.
                lettersGuessed.push(letter);
                // Displays the new incorrect letter along with the other incorect letters in the DOM.
                document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(' ');
                // Tests to see if the remainingGuesses value has reached 0, if so, displays an alert.
				if (remainingGuesses == 0) {
                    alert("Sorry! The pupil you are looking for is " + selectedPupil);
                    // Resets the game setup (reset funtion) for another round.
                    reset();
                    // Add 1 to the nimber of lost games.
                    numLosses++;
                    // Print the number of lost games to the DOM.
					document.getElementById("losses").innerHTML = numLosses;
				}
			}
		}
	}
}


/*
---------------------------
CHECKING USER'S GUESS WITH THE HIDDEN NAME
---------------------------
*/

// Function that displays a letter if it appears in the selectedPupil name.
function showLetter(letter) {
    // For loop, counts through the selectedPupil array, +1 each loop for the length of the array.
	for (i = 0; i < selectedPupil.length; i++) {
    // Checks to see if the input letter matches a letter in the "selectedPupil" array.
    	if (letter === nameByLetterArray[i]) {
        	// Reveals the found letter in the underscoresArray.
			underscoresArray[i * 2] = letter;
		}
    }
        // Swaps the underscore for the correctly guessed letter in the DOM. (Should this line be inside the showLetter funcion above?)
        document.getElementById("selectedPupil").innerHTML = underscoresArray.join("");
        // Runs the checkForWin function below.
	    checkForWin();
}


/*
---------------------------
CHECKING FOR A WIN
---------------------------
*/

// Function checks for a win by searching for any remaining unconverted underscores.
function checkForWin() {
	if (underscoresArray.indexOf("_") === -1) {
        // Alert the user with a message confirning their correctly guessed name.
        alert("Congratulations! " + selectedPupil + " is present!");
        // Increase the numerical value inside the numWins variable by +1.
        numWins++;
        // Print the total number of wins to the DOM.
        document.getElementById("wins").innerHTML = numWins;
        // Reset the game setup (reset funtion) for another round.
		reset();
	}
}