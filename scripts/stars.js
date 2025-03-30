document.addEventListener('DOMContentLoaded', function() {
    // Créer le conteneur d'étoiles
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    document.body.appendChild(starsContainer);
    
    // Nombre d'étoiles à créer
    const starCount = 120;
    
    // Créer les étoiles
    for (let i = 0; i < starCount; i++) {
        createStar(starsContainer);
    }
    
    // Animation des étoiles
    let position = 0;
    const speed = 0.05; // Vitesse de défilement
    
    function animateStars() {
        position += speed;
        
        // Réinitialiser la position lorsqu'elle atteint 100%
        if (position >= 100) {
            position = 0;
        }
        
        starsContainer.style.transform = `translateY(-${position}%)`;
        requestAnimationFrame(animateStars);
    }
    
    // Fonction pour créer une étoile
    function createStar(container) {
        const star = document.createElement('div');
        
        // Classe de base pour toutes les étoiles
        star.className = 'star';
        
        // Position aléatoire
        const x = Math.random() * 100; // Position horizontale en pourcentage
        const y = Math.random() * 200; // Position verticale en pourcentage (sur 200% pour couvrir toute la zone d'animation)
        
        // Taille aléatoire
        const size = Math.random();
        if (size < 0.4) {
            star.classList.add('small');
        } else if (size < 0.7) {
            star.classList.add('medium');
        } else {
            star.classList.add('large');
        }
        
        // Opacité aléatoire pour plus de réalisme
        star.style.opacity = 0.3 + Math.random() * 0.7;
        
        // Positionnement
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // Ajouter l'étoile au conteneur
        container.appendChild(star);
    }
    
    // Démarrer l'animation
    animateStars();
});