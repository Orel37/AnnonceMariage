// Invitation type handler
// Check URL parameters immediately to determine invitation type
const urlParams = new URLSearchParams(window.location.search);
const inviteType = urlParams.get('invite');
const isCocktailOnly = inviteType !== 'full';

document.addEventListener('DOMContentLoaded', function() {
    // Apply invitation-specific styling and content
    handleInvitationType(isCocktailOnly);
});

function handleInvitationType(isCocktailOnly) {
    if (isCocktailOnly) {
        // Hide accommodations section for cocktail-only invites
        hideAccommodations();
        
        // Modify agenda to show only cocktail reception
        modifyAgendaForCocktail();
        
        // Update introduction text
        updateIntroductionText();
        
        // Update landing page text
        updateLandingPageText();
        
        // Update navbar (remove accommodations link)
        updateNavbar();
        
        // Update all form links to include cocktail parameter
        updateFormLinks();
        
        // Modify form for cocktail-only guests
        modifyFormForCocktail();
    }
}

function hideAccommodations() {
    const accommodationsSection = document.getElementById('hebergements');
    if (accommodationsSection) {
        accommodationsSection.style.display = 'none';
    }
}

function modifyAgendaForCocktail() {
    // Find all agenda events
    const agendaEvents = document.querySelectorAll('.agenda-event');
    
    agendaEvents.forEach(event => {
        const eventTitle = event.querySelector('.event h3');
        
        if (eventTitle) {
            const title = eventTitle.textContent.toLowerCase();
            
            // Hide only evening party and brunch for cocktail-only guests
            // Keep religious ceremony and vin d'honneur visible
            if (title.includes('soirée festive') ||
                title.includes('brunch')) {
                event.style.display = 'none';
            }
        }
    });
    
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

function updateIntroductionText() {
    const introSection = document.querySelector('#details');
    if (introSection) {
        const paragraphs = introSection.querySelectorAll('p');
        
        // Update the first paragraph for cocktail invitation
        if (paragraphs[0]) {
            paragraphs[0].innerHTML = `Nous avons le plaisir de vous inviter à notre <strong>cérémonie religieuse et vin d'honneur</strong> qui auront lieu 
                le 16 mai 2026, au Jas du Pébrier, à Roquebrune-sur-Argens.`;
        }
        
        if (paragraphs[1]) {
            paragraphs[1].innerHTML = `Après notre union civile à la mairie d'Antibes le 16 mai dernier, 
                nous souhaitons vous inviter autour d'un verre pour partager ce moment avec vous.`;
        }
        
        if (paragraphs[2]) {
            paragraphs[2].innerHTML = `Vous trouverez ici toutes les informations pratiques concernant cet événement, 
                et pourrez également nous confirmer votre présence via <a href="./src/html/form.html?invite=cocktail">ce formulaire</a> !`;
        }
    }
}

function updateLandingPageText() {
    // Update the landing page if needed - could modify subtitle or add indication
    const locationContainer = document.querySelector('.location');
    if (locationContainer) {
        // Add a subtle indicator for cocktail invitation
        const existingIndicator = document.querySelector('.invite-type-indicator');
        if (!existingIndicator) {
            const indicator = document.createElement('p');
            indicator.className = 'invite-type-indicator';
            indicator.style.fontSize = '0.9em';
            indicator.style.fontStyle = 'italic';
            indicator.style.marginTop = '1rem';
            indicator.style.color = 'var(--white)';
            indicator.textContent = 'Cérémonie et vin d\'honneur';
            locationContainer.appendChild(indicator);
        }
    }
}

function updateNavbar() {
    // Hide accommodations link from navbar for cocktail guests
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#hebergements') {
            link.parentElement.style.display = 'none';
        }
    });
}

function modifyFormForCocktail() {
    // Check if we're on the form page
    if (!document.querySelector('.rsvp-form')) {
        return; // Not on form page, exit
    }
    
    // Update form title/subtitle
    updateFormText();
}

function removeDinnerFieldsFromExistingGuests() {
    // Find all existing guest fieldsets and remove dinner-related content
    const guestFieldsets = document.querySelectorAll('.guest-fieldset');
    guestFieldsets.forEach(fieldset => {
        // Remove dinner presence fieldset - look for fieldset containing "dîner"
        const allFieldsets = fieldset.querySelectorAll('fieldset');
        allFieldsets.forEach(fs => {
            const legend = fs.querySelector('legend');
            if (legend && legend.textContent.toLowerCase().includes('dîner')) {
                fs.remove();
            }
        });
        
        // Remove menu fields by ID pattern
        const menuFields = fieldset.querySelector('[id*="menu-fields"]');
        if (menuFields) {
            menuFields.remove();
        }
    });
}

function updateFormLinks() {
    // Update all links pointing to form.html to replace invite parameter with cocktail
    const formLinks = document.querySelectorAll('a[href*="form.html"]');
    formLinks.forEach(link => {
        const href = link.getAttribute('href');
        let newHref = href;
        
        if (href.includes('invite=')) {
            // Replace existing invite parameter with cocktail
            newHref = href.replace(/invite=[^&]*/, 'invite=cocktail');
        } else {
            // Add the cocktail parameter if not already present
            const separator = href.includes('?') ? '&' : '?';
            newHref = href + separator + 'invite=cocktail';
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
                newOnclick = onclick.replace(/invite=[^&'"]*/g, 'invite=cocktail');
            } else {
                // Add the cocktail parameter if not already present
                newOnclick = onclick.replace('form.html', 'form.html?invite=cocktail');
            }
            
            button.setAttribute('onclick', newOnclick);
        }
    });
}

function updateFormText() {
    // Update the form subtitle to reflect cocktail-only invitation
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        subtitle.innerHTML = `Toutes les informations renseignées dans ce formulaire resteront privées et seront
            partagées uniquement à Aurore et Aurélien.<br>
            <strong>Vous êtes invité(e) à la cérémonie religieuse et au vin d'honneur.</strong>`;
    }
}
