// Invitation type handler
// Check URL parameters immediately to determine invitation type
const urlParams = new URLSearchParams(window.location.search);
const inviteType = urlParams.get('invite');
const isFriendsInvitation = inviteType !== 'full';

document.addEventListener('DOMContentLoaded', function() {
    // Apply invitation-specific styling and content
    handleInvitationType(isFriendsInvitation);
});

function handleInvitationType(isFriendsInvitation) {
    if (isFriendsInvitation) {        
        // Modify agenda to show only cocktail reception
        modifyAgendaForCocktail();
        
        // Update all form links to preserve the invitation type.
        updateFormLinks();

        // Remove the houses from the accomodations section
        removeAccomodationHouses();
    }
}

function removeAccomodationHouses() {
    const accomodationCards = document.querySelectorAll('.accommodation-card');
    if (accomodationCards) {
        // Remove the house accomodation card only
        accomodationCards.forEach(card => {
            const title = card.querySelector('.card-header h2');
            if (title && title.textContent.includes('Pébrier')) {
                card.style.display = 'none';
            }
        });
    }
}


function modifyAgendaForCocktail() {    
    // Hide entire agenda-day sections for 17 mai
    const dayTitles = document.querySelectorAll('.agenda-day h2');
    dayTitles.forEach(day => {
        if (day.textContent.includes('17 mai')) {
            day.style.display = 'none';
        }
    });
    
    // Update agenda title to reflect what's included
    const agendaTitle = document.querySelector('.agenda h1');
    if (agendaTitle) {
        agendaTitle.textContent = 'Programme de la journée';
    }
}


function updateFormLinks() {
    // Update all links pointing to form.html to replace invite parameter with cocktail
    const formLinks = document.querySelectorAll('a[href*="form.html"]');
    formLinks.forEach(link => {
        const href = link.getAttribute('href');
        let newHref = href;
        
        if (href.includes('invite=full')) {
            console.log('Found invite=full parameter in link:', href);
            // Replace existing invite parameter with cocktail
            newHref = href.replace('?invite=full', '');
        } 
        
        link.setAttribute('href', newHref);
    });

    // Update onclick handlers for buttons that redirect to form.html
    const formButtons = document.querySelectorAll('button[onclick*="form.html"]');
    formButtons.forEach(button => {
        const onclick = button.getAttribute('onclick');
        if (onclick) {
            let newOnclick = onclick;
            
            if (onclick.includes('invite=')) {
                // Replace existing invite parameter with cocktail
                newOnclick = onclick.replace('?invite=full', '');
            } 
                        
            button.setAttribute('onclick', newOnclick);
        }
    });
}
