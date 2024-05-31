document.addEventListener('DOMContentLoaded', function () {
    setupMenuButton();
    showLoadingSpinner(); // Visa spinnaren när sidan laddas

    setTimeout(hideLoadingSpinner, 3000); // Dölj spinnaren efter 3 sekunder

    // Add event listener for the search input
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            filterPlaces();
        });
    }

    // Initialize the wizard
    initializeWizard();
});

function showLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'block';
}

function hideLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'none';
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
function showLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'block';
}

// Function to filter places based on search input
function filterPlaces() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var ul = document.getElementById("placesList");
    var li = ul.getElementsByTagName('li');
    var found = false;

    ul.style.display = "none"; // Dölj listan som standard

    for (var i = 0; i < li.length; i++) {
        var txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toLowerCase().indexOf(input) > -1) {
            li[i].style.display = "";
            ul.style.display = "block"; // Visa listan om det finns matchningar
            found = true;
        } else {
            li[i].style.display = "none";
        }
    }

    if (!found) {
        ul.style.display = "none"; // Dölj listan om inga matchningar hittades
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
    } else {
        alert('Ingen matchning hittades.');
    }
}
function toggleButton(event, buttonId) {
    var button = document.getElementById(buttonId);
    var buttons = document.querySelectorAll('.toggle-button');

    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });

    button.classList.add('active');
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
