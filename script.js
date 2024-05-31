document.addEventListener("DOMContentLoaded", function() {
    const loadingSpinner = document.getElementById("loadingSpinner");
    const body = document.querySelector("body");
    loadingSpinner.style.display = "block";
    body.style.display = "none";

    window.onload = function() {
        loadingSpinner.style.display = "none";
        body.style.display = "block";
    };
});

    // Initialize the wizard
    function showWizard() {
        document.getElementById('wizardContainer').style.display = 'block';
    }
function toggleButton(event, buttonId) {
    // Förhindra standardbeteendet
    event.preventDefault();

    // Hämta alla toggle-knappar
    var buttons = document.querySelectorAll('.toggle-button');
    // Inaktivera alla knappar
    buttons.forEach(function(button) {
        button.classList.remove('active');
    });
    // Aktivera den valda knappen
    var selectedButton = document.getElementById(buttonId);
    selectedButton.classList.add('active');
}

function toggleMenu() {
    var menyCollapse = document.querySelector('.meny-collapse');
    if (menyCollapse.style.display === 'block') {
        menyCollapse.style.display = 'none';
    } else {
        menyCollapse.style.display = 'block';
    }
}

function goBack() {
    window.history.back();
}

// Function to add event listener to the menu button
function setupMenuButton() {
    var menyButton = document.querySelector('.meny-btn');
    menyButton.addEventListener('click', toggleMenu);
}

// Function to filter places based on search input
function filterPlaces() {
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("placesList");
    li = ul.getElementsByTagName('li');

    // Show the list of places if the search input is not empty
    if (filter.trim() !== "") {
        ul.style.display = "block";
    } else {
        ul.style.display = "none";
    }

    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

// Highlight Sätraskogen on the map
function highlightArea(areaId) {
    // Hide all highlighted areas
    var highlights = document.querySelectorAll('.highlight');
    highlights.forEach(function(highlight) {
        highlight.style.display = 'none';
    });
    
    // Show the selected area
    var highlight = document.getElementById(areaId);
    if (highlight) {
        highlight.style.display = 'block';
    }
}

// Search function to highlight Sätraskogen
function search() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    if (input === 'sätraskogen') {
        highlightArea('satraskogen-highlight');
    }
}

function showWizard() {
    document.getElementById('wizardContainer').classList.add('active');
}

function nextStep(currentStep) {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const postalCode = document.getElementById('postalCode').value;
    const deliveryOption = document.querySelector('.toggle-button.active') ? document.querySelector('.toggle-button.active').innerText : '';

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
