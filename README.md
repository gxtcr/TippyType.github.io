# TippyType - L'application pour écrire plus vite

TippyType est une application web simple et ludique conçue pour aider les utilisateurs à améliorer leur vitesse de frappe au clavier. Elle propose des exercices basés sur des mots ou des phrases aléatoires que l'utilisateur doit reproduire le plus rapidement possible.

## Fonctionnalités

- **Deux modes d'exercice** : Les utilisateurs peuvent choisir entre taper des mots individuels ou des phrases complètes
- **Sélection aléatoire de listes** : Plusieurs listes de mots et de phrases sont sélectionnées aléatoirement à chaque partie
- **Changement dynamique de liste** : Possibilité de changer de liste à tout moment sans quitter le jeu
- **Suivi du score** : L'application calcule et affiche le score de l'utilisateur en temps réel
- **Interface responsive** : Design adapté aux différentes tailles d'écran (desktop et mobile)
- **Partage de score** : Possibilité d'envoyer son score par email à ses amis pour les défier

## Structure du projet

- **main.html** : Structure HTML principale de l'application
- **style.css** : Feuille de style pour l'interface utilisateur
- **scripts/**
  - **config.js** : Contient les listes de mots et phrases utilisées dans le jeu et les fonctions de sélection aléatoire
  - **popup.js** : Gère l'affichage et les interactions avec la popup de partage
  - **script.js** : Contient les fonctions principales du jeu (affichage, validation, score)
  - **main.js** : Point d'entrée de l'application qui initialise le jeu

## Système de listes aléatoires

L'application utilise un système de sélection aléatoire pour offrir une expérience variée à chaque partie :
- Plusieurs listes de mots (listeMots, listeMots2, listeMots3) et de phrases (listePhrases, listePhrases2)
- Une sélection aléatoire est effectuée au chargement de la page
- Le bouton "Changer de liste" permet de sélectionner aléatoirement une nouvelle liste du même type (mots ou phrases)
- Lors du changement de mode (mots/phrases), une nouvelle liste aléatoire est également sélectionnée

## Comment jouer

1. Sélectionnez votre mode de jeu (Mots ou Phrases) en utilisant les boutons radio
2. Une liste aléatoire du type choisi sera sélectionnée
3. Tapez le mot ou la phrase qui s'affiche dans la zone de proposition
4. Cliquez sur "Valider" ou appuyez sur Entrée
5. Votre score s'affiche et s'actualise après chaque validation
6. À tout moment, vous pouvez cliquer sur "Changer de liste" pour obtenir une nouvelle liste aléatoire
7. À la fin du jeu, vous pouvez partager votre score via le bouton "Partager"

## Fonctionnalités techniques

- Sélection aléatoire des listes grâce à Math.random()
- Validation en temps réel des entrées utilisateur
- Gestion des événements pour les interactions utilisateur
- Expressions régulières pour la validation des emails
- Popup modal pour le partage de score
- Gestion d'erreurs pour les formulaires

## Style et design

L'application utilise une palette de couleurs douce dominée par le rose (#ea94ba) avec un design épuré et moderne. La typographie "Jersey 10" donne un aspect ludique et convivial à l'interface.

## Compatibilité

TippyType est compatible avec tous les navigateurs web modernes et s'adapte à différentes tailles d'écran grâce à son design responsive.

## Développement futur

Possibilités d'améliorations :
- Ajout de niveaux de difficulté
- Chronomètre pour mesurer la vitesse de frappe
- Statistiques plus détaillées sur les performances
- Plus de listes de mots et phrases
- Possibilité de créer des listes personnalisées
- Classement des meilleurs scores

---

© Gxtcr