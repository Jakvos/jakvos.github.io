// Game variables
let randomNumber = Math.floor(Math.random() * 1000) + 1; // Random number between 1 and 1000
let attempts = 0;

// DOM elements
const guessButton = document.getElementById("guess-btn");
const resetButton = document.getElementById("reset-btn");
const feedbackDiv = document.getElementById("feedback");
const userGuessInput = document.getElementById("user-guess");

// Admin Mode check
let isAdminMode = false; // Flag to track admin mode status

// Function to handle the key press detection for Ctrl + Alt
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.altKey) {
        // Toggle Admin Mode when Ctrl + Alt is pressed
        if (!isAdminMode) {
            isAdminMode = true;
            alert("Admin Mode Activated!"); // Alert to notify the user
            feedbackDiv.innerHTML = `<strong>Admin Mode is Active!</strong><br>The secret number is: ${randomNumber}`; // Show the random number
            feedbackDiv.style.color = "purple"; // Change feedback color for Admin Mode
        } else {
            isAdminMode = false;
            alert("Admin Mode Deactivated!"); // Alert to notify the user
            feedbackDiv.innerHTML = ""; // Clear feedback when Admin Mode is turned off
        }
    }

    // Handle Enter key press to submit guess
    if (event.key === 'Enter') {
        handleGuess(); // Call the function to handle guess submission
    }
});

// Function to handle the guess submission (both button click and Enter key press)
function handleGuess() {
    const userGuess = parseInt(userGuessInput.value);
    attempts++;

    // Validate the guess is within the range of 1-1000
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 1000) {
        feedbackDiv.textContent = "Please enter a valid number between 1 and 1000!";
        feedbackDiv.style.color = "red";
    } else if (userGuess > randomNumber) {
        feedbackDiv.textContent = "Too high! Try again.";
        feedbackDiv.style.color = "orange";
    } else if (userGuess < randomNumber) {
        feedbackDiv.textContent = "Too low! Try again.";
        feedbackDiv.style.color = "orange";
    } else {
        feedbackDiv.textContent = `Correct! You guessed the number in ${attempts} attempts.`;
        feedbackDiv.style.color = "green";
        guessButton.style.display = "none";
        resetButton.style.display = "block";
    }

    userGuessInput.value = ""; // Clear input field
    userGuessInput.focus(); // Focus back to the input field
}

// Function to handle the button click for guess submission
guessButton.addEventListener("click", function() {
    handleGuess(); // Call the handleGuess function on button click
});

// Reset the game
resetButton.addEventListener("click", function() {
    randomNumber = Math.floor(Math.random() * 1000) + 1; // Generate a new number between 1 and 1000
    attempts = 0;
    guessButton.style.display = "block";
    resetButton.style.display = "none";
    feedbackDiv.textContent = "";
    userGuessInput.value = "";
});
