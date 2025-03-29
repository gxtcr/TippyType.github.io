/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à l'affichage et à la 
 * fermeture de la popup de partage. 
 * 
 *********************************************************************************/


/**
 * Cette fonction affiche la popup pour partager son score. 
 */

/*
function afficherPopup() {
    let popupBackground = document.querySelector(".PopUpBackground")
    // La popup est masquée par défaut (display:none), ajouter la classe "active"
    // va changer son display et la rendre visible. 
    popupBackground.classList.add("active")
}
*/
/**
 * Cette fonction cache la popup pour partager son score. 
 */
function cacherPopup() {
    let popupBackground = document.querySelector(".PopUpBackground")
    // La popup est masquée par défaut (display:none), supprimer la classe "active"
    // va rétablir cet affichage par défaut. 
    popupBackground.classList.remove("active")
}

function afficherPopup() {
    let popupBackground = document.querySelector(".PopUpBackground");
    if (popupBackground) {
        popupBackground.classList.add("active");
    } else {
        console.error("❌ ERREUR : Impossible de trouver '.PopUpBackground'");
    }
}


/**
 * Cette fonction initialise les écouteurs d'événements qui concernent 
 * l'affichage de la popup. 
 */
function initAddEventListenerPopup() {
    // On écoute le click sur le bouton "partager"
    let btnPartage = document.getElementById("btnPartager")
    let popupBackground = document.querySelector(".PopUpBackground")
    
    btnPartage.addEventListener("click", () => {
        // Quand on a cliqué sur le bouton partagé, on affiche la popup
        afficherPopup()
    })

    let btnRetour = document.getElementById("btnRetour")
    btnRetour.addEventListener("click", () => {
        cacherPopup()
    })
    
    // Gérer le clic en dehors de la popup pour la fermer
    popupBackground.addEventListener("click", (event) => {
        // Si on a cliqué précisément sur la popupBackground 
        // (et pas un autre élément qui se trouve dedans)
        if (event.target === popupBackground) {
            // Alors on cache la popup
            cacherPopup()
        }
    })
}
