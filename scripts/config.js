// Words lists used for the game
const listeMots1 = ["Cinnamonroll", "Pétunia", "Serviette", "Chocolat"]
const listeMots2 = ["Minecraft", "Tetris", "Overcooked", "ZigZagRacer", "TheSims4"]
const listeMots3 = ["Avion", "Bateau", "Voiture", "Train", "Vélo", "Trottinette"]


// Phrase lists
const listePhrases1 = ["Pas de panique !", "La vie, l’univers et le reste", "Merci pour le poisson", "Je veux du chocolat ou je pique une crise"]
const listePhrases2 = ["Le petit chat est mignon", "J'adore programmer en JavaScript", "TippyType est super cool", "Je tape plus vite maintenant"]


// Group all word lists together
const listeMotsGlobale = [listeMots1, listeMots2, listeMots3]

// Group all phrase lists together
const listePhrasesGlobale = [listePhrases1, listePhrases2]

// Function to get a random list from an array of lists
function getRandomList(listsArray) {
    const randomIndex = Math.floor(Math.random() * listsArray.length)
    return listsArray[randomIndex]
}

// Function to get either a random word list or a random phrase list
function getRandomListByType(type) {
    if (type === "Mots") {
        return getRandomList(listeMotsGlobale)
    } else if (type === "Phrases") {
        return getRandomList(listePhrasesGlobale)
    }
    // Default to random word list if type is not specified
    return getRandomList(listeMotsGlobale)
}