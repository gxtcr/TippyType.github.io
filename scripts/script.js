
// function that displays the final score
function afficherResultat(scoreVal, nombreTotalMots) {
    let spanScore = document.querySelector (".ZoneScore span")
    let affichageScore = `${scoreVal} / ${nombreTotalMots}`
    spanScore.innerHTML = affichageScore
}

// function that displays the word or phrase on the screen
function afficherPropositionMots (motAAfficher) {
    let zoneProposition = document.querySelector(".ZoneProposition")
    zoneProposition.innerText = motAAfficher
}


// Function to share the final score with an email
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Coucou, c'est ${nom} et je viens de réaliser le score ${score} sur le site de TippyType! Est-ce que tu parviendras à faire mieux? ;)`
    location.href = mailto
}

// Functiun that creates an error messageif this is the case
function afficherMsgErreur (msgErreur){
    let spanMsgErreur = document.getElementById("erreurMessage")

    if (!spanMsgErreur){
        let parentElement = document.querySelector(".PopUp") 
        spanMsgErreur = document.createElement("span")
        spanMsgErreur.id = "erreurMessage"
        parentElement.append(spanMsgErreur)
    }
    spanMsgErreur.innerText = msgErreur
}

// Function that checks validity of the name
function validerNom (nom) {
    if (nom.length < 2) {
        throw new Error(`La chaine de caractere ${nom} est trop courte.`)
    } 
}

// Function that checks validity of the email user
function validerEmail (email) {
    let emailRegExp = new RegExp ("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error(`L'email ${email} n'est pas valide.`)
    }
}

// Function that groups functions which checks validity of user input in the form to send an email
function gererFormulaire (scoreEmail) {
    try {
        let baliseNom = document.getElementById("Nom")
        nom = baliseNom.value
        validerNom(nom) 

        let baliseEmail = document.getElementById("Email")
        email = baliseEmail.value
        validerEmail(email)
        afficherMsgErreur("")
        afficherEmail(nom, email, scoreEmail)

    } catch (erreur) {
    afficherMsgErreur(erreur.message)
    }
}

// Function that makes the game working
function lancerJeu() {

    let scoreVal = 0
    let i = 0
    let dureeJeu= 120

    // default level "Facile"
    let niveauActuel = "Facile";
    let radioFacile = document.getElementById("Facile");
    if (radioFacile) {
        radioFacile.checked = true;
    }



    // Get a random word list initially
    let listeProposition = getRandomList(listeMotsGlobale)
    let currentType = "Mots" // Default type

    let boutonValider = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputUser")

    inputEcriture.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            
            // Simulate a click on the validation button if the button is not disabled
            if (!boutonValider.disabled) {
                boutonValider.click();
            }
        }
    })
    //Set the default radio button to "Mots"
    let radioMots = document.getElementById("Mots")
    if (radioMots) {
        radioMots.checked = true
    }

    afficherPropositionMots(listeProposition[i])

    boutonValider.addEventListener("click", () =>  {
        if (inputEcriture.value === listeProposition[i]) {
            scoreVal++
        }
        i++
        afficherResultat(scoreVal, i)
        inputEcriture.value = ""

        if (listeProposition[i] === undefined) {
            afficherPropositionMots("Le jeu est fini.")
            boutonValider.disabled = true
            inputEcriture.disabled = true
        } else {
            afficherPropositionMots(listeProposition[i])
        }

    })

    let listeBtnRadio = document.querySelectorAll(".ChoixListes input")

    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener ("change", (event) => {
            currentType = event.target.value

            // Reset the game state
            scoreVal = 0
            i = 0

            // Get a random list based on the selected type
            listeProposition = getRandomListByType(currentType)

            // Reset the UI
            afficherPropositionMots(listeProposition[i])
            afficherResultat(scoreVal, i)
            inputEcriture.value = ""
            boutonValider.disabled = false
            inputEcriture.disabled = false
        }
    )}

    // Add button to switch to a new random list of the same type
    let btnChangerListe = document.getElementById("btnChangerListe")
    if (btnChangerListe) {
        btnChangerListe.addEventListener("click", () => {
            // Reset the game state
            scoreVal = 0
            i = 0
            
            // Get a new random list of the current type
            listeProposition = getRandomListByType(currentType)
            
            // Reset the UI
            afficherPropositionMots(listeProposition[i])
            afficherResultat(scoreVal, i)
            inputEcriture.value = ""
            boutonValider.disabled = false
            inputEcriture.disabled = false
        })
    }
    const form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${scoreVal} / ${i}`
        gererFormulaire(scoreEmail)
    })

        afficherResultat(scoreVal, i)

}






