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
            // Použijeme vlastní modální okno místo alert()
            showCustomAlert("Debug Mód aktivován. Pro vypnutí stiskněte CTRL + ALT.");
            feedbackDiv.innerHTML = `<strong class="noto-sans-100">Debug mód je aktivní!</strong><br><p class="noto-sans-100">Tajné číslo je: ${randomNumber}</p>`; // Show the random number
            feedbackDiv.style.color = "#FFFBDE"; // Change feedback color for Admin Mode
        } else {
            isAdminMode = false;
            showCustomAlert("Debug mód deaktivován!"); // Použijeme vlastní modální okno místo alert()
            feedbackDiv.innerHTML = ""; // Clear feedback when Admin Mode is turned off
        }
    }

    // Handle Enter key press to submit guess
    // Zkontrolujeme, zda je focus na input poli a zda není input zakázaný
    if (event.key === 'Enter' && document.activeElement === userGuessInput && !userGuessInput.disabled) {
        handleGuess(); // Call the function to handle guess submission
    }
});

// Function to handle the guess submission (both button click and Enter key press)
function handleGuess() {
    // Pokud je input zakázaný, nic nedělej
    if (userGuessInput.disabled) {
        return;
    }

    const userGuess = parseInt(userGuessInput.value);
    attempts++;

    // Validate the guess is within the range of 1-1000
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 1000) {
        feedbackDiv.textContent = "Prosím vložte platné číslo od 1 do 1000!";
        feedbackDiv.style.color = "#F79B72";
    } else if (userGuess > randomNumber) {
        feedbackDiv.textContent = "Číslo je moc velké! Zkuste to znovu.";
        feedbackDiv.style.color = "orange";
    } else if (userGuess < randomNumber) {
        feedbackDiv.textContent = "Číslo je moc malé! Zkuste to znovu.";
        feedbackDiv.style.color = "orange";
    } else {
        feedbackDiv.textContent = `Správně! Uhádl jsi číslo za ${attempts} pokusů.`;
        feedbackDiv.style.color = "#DDDDDD";
        guessButton.style.display = "none";
        resetButton.style.display = "block";
        userGuessInput.disabled = true; // <-- TOTO JE PŘIDÁNO: Zakáže input po uhodnutí
    }

    // Vymažeme input pouze pokud hra neskončila (tj. číslo nebylo uhodnuto)
    if (userGuess !== randomNumber) {
        userGuessInput.value = "";
    }
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
    userGuessInput.disabled = false; // <-- TOTO JE PŘIDÁNO: Povolí input při resetu
    userGuessInput.focus(); // Vrátí focus na input
    // Pokud byl admin mód aktivní, zobrazíme tajné číslo i po resetu
    if (isAdminMode) {
        feedbackDiv.innerHTML = `<strong class="noto-sans-100">Debug mód je aktivní!</strong><br><p class="noto-sans-100">Tajné číslo je: ${randomNumber}</p>`;
        feedbackDiv.style.color = "#FFFBDE";
    }
});

// --- Funkce pro vlastní modální okno (náhrada za alert) ---
// Tuto část by bylo ideální přidat do HTML a nastylovat v CSS,
// ale pro jednoduchost ji zde vytváříme dynamicky.

function showCustomAlert(message) {
    // Odstraníme existující alert, pokud nějaký je
    const existingAlert = document.getElementById('custom-alert-modal');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Vytvoření prvků modálního okna
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'custom-alert-modal';
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalOverlay.style.display = 'flex';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.zIndex = '1000'; // Zajistí, že je nad ostatním obsahem

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.textAlign = 'center';
    modalContent.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    modalContent.style.fontFamily = '"Noto Sans", sans-serif'; // Použijeme stejný font

    const modalMessage = document.createElement('p');
    modalMessage.textContent = message;
    modalMessage.style.marginBottom = '15px';
    modalMessage.style.color = '#333';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'OK';
    closeButton.style.padding = '10px 20px';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.backgroundColor = '#007bff'; // Příklad barvy
    closeButton.style.color = 'white';
    closeButton.style.cursor = 'pointer';

    // Sestavení modálního okna
    modalContent.appendChild(modalMessage);
    modalContent.appendChild(closeButton);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Funkce pro zavření modálního okna
    closeButton.onclick = function() {
        modalOverlay.remove();
    };
    // Zavření i kliknutím mimo obsah
    modalOverlay.onclick = function(event) {
        if (event.target === modalOverlay) {
            modalOverlay.remove();
        }
    };
}
