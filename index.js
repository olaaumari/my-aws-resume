document.addEventListener('DOMContentLoaded', function() {
    let clickCounter = 0;
    const clickDisplay = document.getElementById('clickDisplay');

    const clickableElements = document.querySelectorAll('a.certification-badge, a.download-btn, .contact-info a');

    clickableElements.forEach(element => {
        element.addEventListener('click', async function(e) {
            clickCounter++;
            // Mise à jour de l'affichage
            clickDisplay.textContent = clickCounter;
            
            // Appel à la fonction Lambda AWS
            try {
                const response = await fetch(secrets.AWS_LAMBDA_FUNCTION);
                const data = await response.json();
                console.log('Nombre total de clics (Lambda):', data);
            } catch (error) {
                console.error('Erreur lors de l\'appel à Lambda:', error);
            }

            // Log dans la console
            if (this.classList.contains('certification-badge')) {
                console.log('Certification cliquée:', this.querySelector('i').nextSibling.textContent.trim());
            } else if (this.classList.contains('download-btn')) {
                console.log('CV téléchargé');
            } else {
                console.log('Contact cliqué:', this.textContent.trim());
            }
        });
    });

    // Appel initial à Lambda pour obtenir le nombre total de clics
    async function getInitialClicks() {
        try {
            const response = await fetch('AWS_LAMBDA_FUNCTION');
            const data = await response.json();
            clickCounter = parseInt(data);
            clickDisplay.textContent = clickCounter;
        } catch (error) {
            console.error('Erreur lors de l\'appel initial à Lambda:', error);
        }
    }

    // Appeler la fonction pour obtenir le nombre initial de clics
    getInitialClicks();
});
