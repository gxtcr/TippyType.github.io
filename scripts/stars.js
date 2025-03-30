document.addEventListener('DOMContentLoaded', function() {
    // Créer le conteneur d'étoiles
    const starsContainer = document.createElement('div')
    starsContainer.className = 'stars-container'
    document.body.appendChild(starsContainer)
    
    // Nombre d'étoiles à créer
    const starCount = 100;
    
    // Créer les étoiles
    for (let i = 0; i < starCount; i++) {
        createStar(starsContainer)
    }
    
    // Animation des étoiles - scintillement
    function animateStars() {
        const stars = document.querySelectorAll('.star')
        stars.forEach(star => {
            // Ajout d'une animation de scintillement aléatoire
            if (Math.random() < 0.01) {
                star.style.opacity = 0.3 + Math.random() * 0.7
            }
        });
        
        requestAnimationFrame(animateStars);
    }
    
    // Fonction pour créer une étoile
    function createStar(container) {
        const star = document.createElement('div')
        
        // Classe de base pour toutes les étoiles
        star.className = 'star'
        
        // Position aléatoire
        const x = Math.random() * 100; // Position horizontale en pourcentage
        const y = Math.random() * 100; // Position verticale en pourcentage
        
        // Taille et type aléatoires
        const size = Math.random()
        if (size < 0.7) {
            // Petites étoiles simples (points)
            star.classList.add('small')
        } else if (size < 0.9) {
            // Étoiles moyennes
            star.classList.add('medium')
        } else {
            // Grandes étoiles brillantes avec rayons
            star.classList.add('large')
            
            // Ajouter des rayons pour certaines étoiles
            if (Math.random() < 0.7) {
                const rays = document.createElement('div')
                rays.className = 'star-rays'
                star.appendChild(rays)
            }
        }
        
        // Opacité aléatoire pour plus de réalisme
        star.style.opacity = 0.5 + Math.random() * 0.5
        
        // Positionnement
        star.style.left = `${x}%`
        star.style.top = `${y}%`
        
        // Ajouter l'étoile au conteneur
        container.appendChild(star)
    }
    
    // Démarrer l'animation
    animateStars()
})