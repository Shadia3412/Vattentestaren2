document.addEventListener('DOMContentLoaded', function () {
    setupMenuButton();
    
    // Add event listener for the search input
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            filterPlaces();
            search();
        });
    }

    // Initialize the wizard
    initializeWizard();
});

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