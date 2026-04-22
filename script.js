document.addEventListener('DOMContentLoaded', function () {
    setupMenuButton();
    showLoadingSpinner();

    setTimeout(hideLoadingSpinner, 3000);

    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterPlaces);
    }

    setupPlaceClicks();

    if (typeof initializeWizard === 'function') {
        initializeWizard();
    }
});

const placeMap = {
    "sätraskogen": "satraskogen-highlight",
    "nacka": "nacka-highlight",
    "hagsätraskogen": "hagsatraskogen-highlight",
    "hansta": "hansta-highlight",
    "judarskogen": "judarskogen-highlight",
    "kungliga nationalstadsparken": "nationalstadsparken-highlight",
    "grimsta": "grimsta-highlight",
    "älvsjöskogen": "alvsjoskogen-highlight",
    "rågsved": "ragsved-highlight",
    "flaten": "flaten-highlight",
    "igelbäcken": "igelbacken-highlight",
    "årstaskogen": "arstaskogen-highlight"
};

function showLoadingSpinner() {
    var spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'block';
    }
}

function hideLoadingSpinner() {
    var spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

function toggleMenu() {
    var menyCollapse = document.querySelector('.meny-collapse');
    if (!menyCollapse) return;

    if (menyCollapse.style.display === 'block') {
        menyCollapse.style.display = 'none';
    } else {
        menyCollapse.style.display = 'block';
    }
}

function goBack() {
    window.history.back();
}

function setupMenuButton() {
    var menyButton = document.querySelector('.meny-btn');
    if (menyButton) {
        menyButton.addEventListener('click', toggleMenu);
    }
}

function filterPlaces() {
    var inputElement = document.getElementById('searchInput');
    var ul = document.getElementById('placesList');

    if (!inputElement || !ul) return;

    var input = inputElement.value.toLowerCase().trim();
    var li = ul.getElementsByTagName('li');
    var found = false;

    if (input === '') {
        ul.style.display = 'none';
        for (var j = 0; j < li.length; j++) {
            li[j].style.display = 'none';
        }
        return;
    }

    for (var i = 0; i < li.length; i++) {
        var txtValue = li[i].textContent || li[i].innerText;

        if (txtValue.toLowerCase().includes(input)) {
            li[i].style.display = '';
            found = true;
        } else {
            li[i].style.display = 'none';
        }
    }

    ul.style.display = found ? 'block' : 'none';
}

function setupPlaceClicks() {
    var ul = document.getElementById('placesList');
    if (!ul) return;

    var li = ul.getElementsByTagName('li');

    for (var i = 0; i < li.length; i++) {
        li[i].addEventListener('click', function () {
            var placeName = this.textContent || this.innerText;
            document.getElementById('searchInput').value = placeName;
            document.getElementById('placesList').style.display = 'none';
            selectPlace(placeName);
        });
    }
}

function highlightArea(areaId) {
    var highlights = document.querySelectorAll('.highlight');

    highlights.forEach(function (highlight) {
        highlight.style.display = 'none';
    });

    var selectedHighlight = document.getElementById(areaId);
    if (selectedHighlight) {
        selectedHighlight.style.display = 'block';
    }
}

function selectPlace(placeName) {
    var normalizedName = placeName.toLowerCase().trim();
    var highlightId = placeMap[normalizedName];

    if (highlightId) {
        highlightArea(highlightId);
    } else {
        alert('Ingen markerad plats finns ännu för ' + placeName + '.');
    }
}

function search() {
    var inputElement = document.getElementById('searchInput');
    var ul = document.getElementById('placesList');

    if (!inputElement || !ul) return;

    var input = inputElement.value.toLowerCase().trim();
    var li = ul.getElementsByTagName('li');
    var visibleMatches = [];

    for (var i = 0; i < li.length; i++) {
        if (li[i].style.display !== 'none') {
            visibleMatches.push(li[i]);
        }
    }

    if (visibleMatches.length === 1) {
        var placeName = visibleMatches[0].textContent || visibleMatches[0].innerText;
        inputElement.value = placeName;
        ul.style.display = 'none';
        selectPlace(placeName);
    } else if (visibleMatches.length > 1) {
        ul.style.display = 'block';
    } else if (placeMap[input]) {
        ul.style.display = 'none';
        selectPlace(input);
    } else {
        alert('Ingen matchning hittades.');
    }
}

function toggleButton(event, buttonId) {
    var button = document.getElementById(buttonId);
    var buttons = document.querySelectorAll('.toggle-button');

    buttons.forEach(function (btn) {
        btn.classList.remove('active');
    });

    if (button) {
        button.classList.add('active');
    }
}

function showWizard() {
    var wizard = document.getElementById('wizardContainer');
    if (wizard) {
        wizard.classList.add('active');
    }
}

function nextStep(currentStep) {
    const fullName = document.getElementById('fullName') ? document.getElementById('fullName').value : '';
    const email = document.getElementById('email') ? document.getElementById('email').value : '';
    const address = document.getElementById('address') ? document.getElementById('address').value : '';
    const postalCode = document.getElementById('postalCode') ? document.getElementById('postalCode').value : '';
    const activeButton = document.querySelector('.toggle-button.active');
    const deliveryOption = activeButton ? activeButton.innerText : '';

    if (currentStep === 1 && fullName && email) {
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('email', email);

        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
    } else if (currentStep === 2 && address && postalCode && deliveryOption) {
        localStorage.setItem('address', address);
        localStorage.setItem('postalCode', postalCode);
        localStorage.setItem('deliveryOption', deliveryOption);

        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');

        document.getElementById('displayFullName').innerText = localStorage.getItem('fullName');
        document.getElementById('displayEmail').innerText = localStorage.getItem('email');
        document.getElementById('displayAddress').innerText = localStorage.getItem('address');
        document.getElementById('displayPostalCode').innerText = localStorage.getItem('postalCode');
        document.getElementById('displayDeliveryOption').innerText = localStorage.getItem('deliveryOption');
    } else {
        alert('Vänligen fyll i alla fält.');
    }
}

function previousStep(currentStep) {
    if (currentStep === 1) {
        document.getElementById('step1').classList.add('active');
        document.getElementById('step2').classList.remove('active');
    } else if (currentStep === 2) {
        document.getElementById('step2').classList.add('active');
        document.getElementById('step3').classList.remove('active');
    }
}

function submitWizard() {
    alert('Beställning bekräftad!');
    localStorage.clear();
}

function openBox() {
    alert('Boxen är öppnad nu!');
}
