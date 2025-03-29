# TippyType - L'application pour écrire plus vite

TippyType est une application web simple et ludique conçue pour aider les utilisateurs à améliorer leur vitesse de frappe au clavier. Elle propose des exercices basés sur des mots ou des phrases que l'utilisateur doit reproduire le plus rapidement possible.

## Fonctionnalités

- **Deux modes d'exercice** : Les utilisateurs peuvent choisir entre taper des mots individuels ou des phrases complètes
- **Suivi du score** : L'application calcule et affiche le score de l'utilisateur en temps réel
- **Interface responsive** : Design adapté aux différentes tailles d'écran (desktop et mobile)
- **Partage de score** : Possibilité d'envoyer son score par email à ses amis pour les défier

## Structure du projet

- **main.html** : Structure HTML principale de l'application
- **style.css** : Feuille de style pour l'interface utilisateur
- **scripts/**
  - **config.js** : Contient les listes de mots et phrases utilisées dans le jeu
  - **popup.js** : Gère l'affichage et les interactions avec la popup de partage
  - **script.js** : Contient les fonctions principales du jeu (affichage, validation, score)
  - **main.js** : Point d'entrée de l'application qui initialise le jeu

## Comment jouer

1. Sélectionnez votre mode de jeu (Mots ou Phrases) en utilisant les boutons radio
2. Tapez le mot ou la phrase qui s'affiche dans la zone de proposition
3. Cliquez sur "Valider" ou appuyez sur Entrée
4. Votre score s'affiche et s'actualise après chaque validation
5. À la fin du jeu, vous pouvez partager votre score via le bouton "Partager"

## Fonctionnalités techniques

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

---

© Gwenou
