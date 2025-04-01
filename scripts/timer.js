/*********************************************************************************
 * 
 * Timer functionality for TippyType
 * Handles countdown timer with different difficulty levels
 * 
 *********************************************************************************/

// Global variables for timer
let timer
let timeTotal = 120 // Default: 2 minutes (easy mode)
let timeRemaining = timeTotal
let gameActive = false

// Global variables to share game state with script.js
window.gameStats = {
    score: 0,
    wordsAttempted: 0
}

// Initialize the timer based on selected difficulty
function initializeTimer(duration) {
    // Set time based on selected duration
    timeTotal = parseInt(duration)
    timeRemaining = timeTotal
    
    // Update display
    updateTimerDisplay()
}

// Start the countdown timer
function startTimer() {
    // If a timer is already running, clear it
    if (timer) {
        clearInterval(timer)
    }
    
    // Set game as active
    gameActive = true
    
    // Enable input and button
    document.getElementById("inputUser").disabled = false
    document.getElementById("btnValiderMot").disabled = false
    
    // Focus on input
    document.getElementById("inputUser").focus()
    
    // Start countdown
    timer = setInterval(function() {
        timeRemaining--
        updateTimerDisplay()
        
        if (timeRemaining <= 0) {
            endGame()
        }
    }, 1000)
}

// Update timer display
function updateTimerDisplay() {
    // Update text
    let timerSpan = document.querySelector(".timer-text span")
    if (timerSpan) {
        timerSpan.textContent = timeRemaining
    }
    
    // Update progress bar
    let progressBar = document.querySelector(".timer-bar")
    if (progressBar) {
        let percentage = (timeRemaining / timeTotal) * 100
        progressBar.style.width = percentage + "%"
        
        // Change color based on time remaining
        if (percentage > 50) {
            progressBar.style.backgroundColor = "#ffbde0" // Pink
        } else if (percentage > 25) {
            progressBar.style.backgroundColor = "#FFA500" // Orange
        } else {
            progressBar.style.backgroundColor = "#FF0000" // Red
        }
    }
}

// End game when time is up
function endGame() {
    // Stop timer
    clearInterval(timer)
    gameActive = false
    
    // Disable input
    document.getElementById("inputUser").disabled = true
    document.getElementById("btnValiderMot").disabled = true
    
    // Show game over message
    let wordDisplay = document.querySelector(".ZoneProposition")
    if (wordDisplay) {
        wordDisplay.innerText = "Temps écoulé ! Partie terminée."
    }
    
    // Get final score from global stats
    let score = window.gameStats.score
    let wordsAttempted = window.gameStats.wordsAttempted
    
    // Create and show stats
    let statsDiv = document.createElement("div")
    statsDiv.className = "statistiques"
    
    // Calculate stats
    let accuracy = wordsAttempted > 0 ? Math.round((score / wordsAttempted) * 100) : 0
    let wordsPerMinute = Math.round((score / (timeTotal / 60)))
    
    statsDiv.innerHTML = `
        <h3>Vos Statistiques</h3>
        <p>Mots corrects: ${score}</p>
        <p>Mots tentés: ${wordsAttempted}</p>
        <p>Précision: ${accuracy}%</p>
        <p>Vitesse: ${wordsPerMinute} mots par minute</p>
    `
    
    // Add stats to page
    let scoreZone = document.querySelector(".ZoneScore")
    scoreZone.after(statsDiv)
    
    // Add restart button
    let restartDiv = document.createElement("div")
    restartDiv.className = "bouton-rejouer"
    
    let restartButton = document.createElement("button")
    restartButton.id = "btnRejouer"
    restartButton.textContent = "Nouvelle Partie"
    restartButton.addEventListener("click", resetGame)
    
    restartDiv.appendChild(restartButton)
    statsDiv.after(restartDiv)
}

// Reset game
function resetGame() {
    // Remove stats and restart button
    let statsDiv = document.querySelector(".statistiques")
    if (statsDiv) {
        statsDiv.remove()
    }
    
    let restartDiv = document.querySelector(".bouton-rejouer")
    if (restartDiv) {
        restartDiv.remove()
    }
    
    // Re-enable difficulty selection
    let difficultyRadios = document.querySelectorAll(".ChoixDifficulteContainer input")
    difficultyRadios.forEach(radio => {
        radio.disabled = false
    })
    
    // Re-enable game type selection
    let typeRadios = document.querySelectorAll(".ChoixListes input")
    typeRadios.forEach(radio => {
        radio.disabled = false
    })
    
    // Disable validation button to avoid errors
    let btnValiderDifficulte = document.getElementById("btnValiderDifficulte")
    if (btnValiderDifficulte) {
        btnValiderDifficulte.disabled = false
    }
    
    // Reset message
    document.querySelector(".ZoneProposition").innerText = "Sélectionnez une difficulté et cliquez sur Valider pour commencer"
    
    // Reset score display
    document.querySelector(".ZoneScore span").innerText = "0"
    
    // Reset game stats
    window.gameStats = {
        score: 0,
        wordsAttempted: 0
    }
}