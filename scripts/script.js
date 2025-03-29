

function afficherResultat(scoreVal, nombreTotalMots) {
    let spanScore = document.querySelector (".ZoneScore span")
    let affichageScore = `${scoreVal} / ${nombreTotalMots}`
    spanScore.innerHTML = affichageScore
}

function afficherPropositionMots (motAAfficher) {
    let zoneProposition = document.querySelector(".ZoneProposition")
    zoneProposition.innerText = motAAfficher
}


function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Coucou, c'est ${nom} et je viens de réaliser le score ${score} sur le site de TippyType! Est-ce que tu parviendras à faire mieux? ;)`
    location.href = mailto
}

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

function validerNom (nom) {
    if (nom.length < 2) {
        throw new Error(`La chaine de caractere ${nom} est trop courte.`)
    } 
}


function validerEmail (email) {
    let emailRegExp = new RegExp ("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error(`L'email ${email} n'est pas valide.`)
    }
}


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

//Fonction qui lance le jeu

function lancerJeu() {

    let scoreVal = 0
    let i = 0
    let listeProposition = listeMots

    let boutonValider = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputUser")

    afficherPropositionMots(listeProposition[i])
    boutonValider.addEventListener("click", () =>  {
        console.log(inputEcriture.value)
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
        console.log(event.target.value)
        if (event.target.value === "Mots") {
            listeProposition = listeMots
        } else {
            listeProposition = listePhrases
        }
        afficherPropositionMots(listeProposition[i])
    }
)}

const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    let scoreEmail = `${scoreVal} / ${i}`
    gererFormulaire(scoreEmail)
})

    afficherResultat(scoreVal, i)

}






