// Global variables for game state
if (typeof window.gameStats === 'undefined') {
    window.gameStats = {
        score: 0,
        wordsAttempted: 0
    }
}

// Function that displays the final score
function afficherResultat(scoreVal, nombreTotalMots) {
    let spanScore = document.querySelector(".ZoneScore span")
    if (spanScore) {
        let affichageScore = `${scoreVal} / ${nombreTotalMots}`
        spanScore.innerHTML = affichageScore
    }
    
    // Update global stats for the timer to use
    window.gameStats.score = scoreVal
    window.gameStats.wordsAttempted = nombreTotalMots
}

// Function that displays the word or phrase on the screen
function afficherPropositionMots(motAAfficher) {
    let zoneProposition = document.querySelector(".ZoneProposition")
    if (zoneProposition) {
        zoneProposition.innerText = motAAfficher
    }
}

// Function to share the final score with an email
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score TippyType&body=Coucou, c'est ${nom} et je viens de réaliser le score ${score} sur le site de TippyType! Est-ce que tu parviendras à faire mieux? ;)`
    location.href = mailto
}

// Function that creates an error message
function afficherMsgErreur(msgErreur) {
    let spanMsgErreur = document.getElementById("erreurMessage")

    if (!spanMsgErreur) {
        let parentElement = document.querySelector(".PopUp") 
        if (parentElement) {
            spanMsgErreur = document.createElement("span")
            spanMsgErreur.id = "erreurMessage"
            parentElement.append(spanMsgErreur)
        }
    }
    
    if (spanMsgErreur) {
        spanMsgErreur.innerText = msgErreur
    }
}

// Function that checks validity of the name
function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error(`La chaine de caractere ${nom} est trop courte.`)
    } 
}

// Function that checks validity of the email user
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error(`L'email ${email} n'est pas valide.`)
    }
}

// Function that groups functions which checks validity of user input in the form to send an email
function gererFormulaire(scoreEmail) {
    try {
        let baliseNom = document.getElementById("Nom")
        let nom = baliseNom.value
        validerNom(nom) 

        let baliseEmail = document.getElementById("Email")
        let email = baliseEmail.value
        validerEmail(email)
        afficherMsgErreur("")
        afficherEmail(nom, email, scoreEmail)

    } catch (erreur) {
        afficherMsgErreur(erreur.message)
    }
}

// Function that makes the game work
function lancerJeu() {
    console.log("Lancement du jeu...")
    
    // Initialize game state
    let scoreVal = 0
    let i = 0

    // Get a random word list initially
    let listeProposition = getRandomList(listeMotsGlobale)
    let currentType = "Mots" // Default type

    // Get DOM elements
    let boutonValider = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputUser")
    let boutonValiderDifficulte = document.getElementById("btnValiderDifficulte")

    // Initially disable input until difficulty is selected
    if (inputEcriture) inputEcriture.disabled = true
    if (boutonValider) boutonValider.disabled = true

    // Handle Enter key
    if (inputEcriture) {
        inputEcriture.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault()
                
                // Simulate a click on the validation button if not disabled
                if (boutonValider && !boutonValider.disabled) {
                    boutonValider.click()
                }
            }
        })
    }

    // Set default radio buttons
    let radioMots = document.getElementById("Mots")
    if (radioMots) {
        radioMots.checked = true
    }

    let radioFacile = document.getElementById("Facile")
    if (radioFacile) {
        radioFacile.checked = true
    }

    // Show initial message
    afficherPropositionMots("Sélectionnez une difficulté et cliquez sur Valider pour commencer")
    
    // Initialize timer with default time
    if (typeof initializeTimer === 'function') {
        initializeTimer(120)
    }
    
    // *** NOUVELLE FONCTIONNALITÉ ***
    // Event listeners pour les boutons radio de difficulté
    let difficultyRadios = document.querySelectorAll(".ChoixDifficulteContainer input[type='radio']")
    difficultyRadios.forEach(radio => {
        radio.addEventListener("change", function() {
            // Mettre à jour l'affichage du timer immédiatement quand on change de difficulté
            let difficultyValue = this.value
            console.log("Difficulté sélectionnée:", difficultyValue, "secondes")
            
            // Mettre à jour l'affichage du timer sans démarrer le compte à rebours
            if (typeof initializeTimer === 'function') {
                initializeTimer(difficultyValue)
            }
        })
    })

    // Handle difficulty validation button
    if (boutonValiderDifficulte) {
        boutonValiderDifficulte.addEventListener("click", function() {
            console.log("Bouton difficulté cliqué")
            
            // Get selected difficulty
            let selectedDifficulty = document.querySelector(".ChoixDifficulteContainer input[type='radio']:checked")
            if (!selectedDifficulty) {
                alert("Veuillez sélectionner un niveau de difficulté")
                return
            }

            // Get selected type
            let selectedType = document.querySelector(".ChoixListes input:checked")
            if (!selectedType) {
                alert("Veuillez sélectionner un type (Mots ou Phrases)")
                return
            }
            
            console.log("Difficulté:", selectedDifficulty.value, "Type:", selectedType.value)
            
            // Get difficulty value and type
            let difficultyValue = selectedDifficulty.value
            currentType = selectedType.value
            
            // Disable difficulty selection during game
            let difficultyRadios = document.querySelectorAll(".ChoixDifficulteContainer input")
            difficultyRadios.forEach(radio => {
                radio.disabled = true
            })
            
            // Disable type selection during game
            let typeRadios = document.querySelectorAll(".ChoixListes input")
            typeRadios.forEach(radio => {
                radio.disabled = true
            })
            
            // Disable difficulty button
            boutonValiderDifficulte.disabled = true
            
            // Reset game state
            scoreVal = 0
            i = 0
            
            // Get a new list based on selected type
            listeProposition = getRandomListByType(currentType)
            
            // Initialize timer with selected difficulty
            if (typeof initializeTimer === 'function') {
                initializeTimer(difficultyValue)
            }
            
            // Reset display
            afficherPropositionMots(listeProposition[i])
            afficherResultat(scoreVal, i)
            
            // Start the game
            if (typeof startTimer === 'function') {
                startTimer()
            } else {
                console.error("La fonction startTimer n'existe pas")
                // Activer l'input manuellement si startTimer n'existe pas
                if (inputEcriture) inputEcriture.disabled = false
                if (boutonValider) boutonValider.disabled = false
            }
        })
    }

    // Handle word validation
    if (boutonValider) {
        boutonValider.addEventListener("click", () => {
            // Only process if game is active
            if (typeof gameActive !== 'undefined' && !gameActive) {
                console.log("Jeu non actif, validation ignorée")
                return
            }
            
            console.log("Validation du mot:", inputEcriture.value)
            
            // Check if answer is correct
            if (inputEcriture.value === listeProposition[i]) {
                scoreVal++
            }
            
            // Move to next word
            i++
            
            // Update score
            afficherResultat(scoreVal, i)
            
            // Clear input
            inputEcriture.value = ""

            // Check if we need a new list
            if (!listeProposition[i]) {
                console.log("Fin de la liste, obtention d'une nouvelle liste")
                // Get a new list if we reach the end
                listeProposition = getRandomListByType(currentType)
                i = 0
            }
            
            // Show next word
            afficherPropositionMots(listeProposition[i])
        })
    }

    // Handle type selection changes
    let listeBtnRadio = document.querySelectorAll(".ChoixListes input")
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            // Only change type if game is not active
            if (typeof gameActive === 'undefined' || !gameActive) {
                currentType = event.target.value
                console.log("Type changé pour:", currentType)
            }
        })
    }

    // Handle "Change List" button
    let btnChangerListe = document.getElementById("btnChangerListe")
    if (btnChangerListe) {
        btnChangerListe.addEventListener("click", () => {
            // Only change list if game is not active
            if (typeof gameActive === 'undefined' || !gameActive) {
                console.log("Changement de liste demandé")
                // Get selected type
                let selectedType = document.querySelector(".ChoixListes input:checked")
                if (selectedType) {
                    currentType = selectedType.value
                }
                
                // Get a new list of the selected type
                listeProposition = getRandomListByType(currentType)
                
                // Update display
                afficherPropositionMots("Sélectionnez une difficulté et cliquez sur Valider pour commencer")
            }
        })
    }
    
    // Handle form submission for sharing score
    const form = document.querySelector("form")
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            let scoreEmail = `${scoreVal} / ${i}`
            gererFormulaire(scoreEmail)
        })
    }

    // Display initial score
    afficherResultat(scoreVal, i)
    
    console.log("Initialisation du jeu terminée")
}