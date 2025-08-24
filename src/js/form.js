document.addEventListener('DOMContentLoaded', function() {
    let guestCount = 0;

    function guestTemplate(index) {
        return `
        <fieldset class="guest-fieldset" data-index="${index}">
            <div class="first-row">
                <legend>Qui êtes-vous ?</legend>
                <button type="button" class="delete-btn" onclick="removeGuest(${index})">supprimer</button>
            </div>
            <div class="row">
                <div class="field">
                    <label for="prenom_${index}">Prénom</label>
                    <input type="text" id="prenom_${index}" name="guests[${index}][prenom]" placeholder="Prénom" required>
                </div>
                <div class="field">
                    <label for="nom_${index}">Nom</label>
                    <input type="text" id="nom_${index}" name="guests[${index}][nom]" placeholder="Nom" required>
                </div>
            </div>
            <fieldset>
                <legend>Indiquez votre présence au cocktail</legend>
                <span class="reminder">Rappel: </span>
                <div class="radio-group">
                    <label><input type="radio" name="guests[${index}][cocktail]" value="present" required> Je serai présent</label>
                    <label><input type="radio" name="guests[${index}][cocktail]" value="absent"> Je ne pourrai pas être là</label>
                </div>
            </fieldset>
            <fieldset>
                <legend>Indiquez votre présence au dîner</legend>
                <div class="radio-group">
                    <label>
                        <input type="radio" name="guests[${index}][diner]" value="present" required> Je serai présent
                    </label>
                    <label>
                        <input type="radio" name="guests[${index}][diner]" value="absent"> Je ne pourrai pas être là
                    </label>
                </div>
            </fieldset>
            <div id="menu-fields-${index}" style="display:none;">
                <fieldset>
                    <legend>Menu souhaité</legend>
                    <div class="radio-group">
                        <label><input type="radio" name="guests[${index}][menu]" value="vegetarien"> Végétarien 🥦</label>
                        <label><input type="radio" name="guests[${index}][menu]" value="viande"> Viande 🥩</label>
                        <label><input type="radio" name="guests[${index}][menu]" value="poisson"> Poisson 🐟</label>
                    </div>
                </fieldset>
                <div class="field">
                    <label for="allergies_${index}">Listez vos allergies / intolérances alimentaires</label>
                    <input type="text" id="allergies_${index}" name="guests[${index}][allergies]" placeholder="Entrez votre réponse ici">
                </div>
            </div>
        </fieldset>
        `;
    }

    function addGuest() {
        const container = document.getElementById('guests-container');
        container.insertAdjacentHTML('beforeend', guestTemplate(guestCount));

        // Add event listeners for dinner radio buttons for this guest
        const dinerPresent = container.querySelector(`input[name="guests[${guestCount}][diner]"][value="present"]`);
        const dinerAbsent = container.querySelector(`input[name="guests[${guestCount}][diner]"][value="absent"]`);
        const menuFields = document.getElementById(`menu-fields-${guestCount}`);

        function toggleMenuFields() {
            if (dinerPresent.checked) {
                menuFields.style.display = 'block';
            } else {
                menuFields.style.display = 'none';
            }
        }

        dinerPresent.addEventListener('change', toggleMenuFields);
        dinerAbsent.addEventListener('change', toggleMenuFields);

        // Initialize menu fields visibility
        toggleMenuFields();

        guestCount++;
    }

    window.removeGuest = function(index) {
        const fieldset = document.querySelector(`.guest-fieldset[data-index="${index}"]`);
        if (fieldset) fieldset.remove();
    };

    // Initial guest
    addGuest();
    document.getElementById('add-guest-btn').addEventListener('click', addGuest);
});