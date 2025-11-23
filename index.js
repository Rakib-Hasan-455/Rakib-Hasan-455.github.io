document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with the class 'nav-link'
    var navLinks = document.querySelectorAll('.nav-link');
    document.getElementById("homeLink").classList.add("text-gray-200");
    // Add click event listener to each nav link
    navLinks.forEach(function (navLink) {
        navLink.addEventListener('click', function () {
            // Remove the 'active' class from all links
            navLinks.forEach(function (link) {
                link.classList.remove('bg-gray-500');
                link.classList.remove('text-gray-200');
            });
            // Add the 'active' class to the clicked link
            navLink.classList.add('bg-gray-500');
            navLink.classList.add('text-gray-200');
        });
    });
});


window.addEventListener('scroll', function () {

    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('nav a');

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        console.log(id)
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('bg-gray-500');
                links.classList.remove('text-gray-200');
                document.querySelector('nav a[href*=' + id + ']').classList.add('bg-gray-500');
                document.querySelector('nav a[href*=' + id + ']').classList.add('text-gray-200');
            });
        }
    });
});



const slabs = [
    { limit: 375000, rate: 0.0 },
    { limit: 300000, rate: 0.1 },
    { limit: 400000, rate: 0.15 },
    { limit: 500000, rate: 0.2 },
    { limit: 2000000, rate: 0.25 },
    { limit: Infinity, rate: 0.3 }
];

// new date only year minus 1
let previousYear = new Date().getFullYear() - 1;

const prevLabels = document.getElementsByClassName('prevYearLabel');
for (let el of prevLabels) {
    el.textContent = (new Date().getFullYear() - 1) + ' July';
}

const nextLabels = document.getElementsByClassName('nextYearLabel');
for (let el of nextLabels) {
    el.textContent = new Date().getFullYear() + ' June';
}

document.getElementById('monthlyIncome').addEventListener('input', function () {
    const monthlyIncome = this.value;
    const bonusField = document.getElementById('yearlyBonus');

    if (document.activeElement !== bonusField) {
        bonusField.value = monthlyIncome;
    }

    calculateTax();
});

document.getElementById('yearlyBonus').addEventListener('input', function () {
    calculateTax();
});

function calculateTax() {
    debugger;
    const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value) || 0;
    const yearlyBonus = parseFloat(document.getElementById('yearlyBonus').value) || 0;
    const yearlyTotal = monthlyIncome * 12 || 0;

    const totalIncome = yearlyTotal  + 0;
    const lessAmount = Math.max(totalIncome / 3, 450000/3);
    const taxableIncome = totalIncome - lessAmount;

    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('lessAmount').textContent = lessAmount.toFixed(2);
    document.getElementById('taxableIncome').textContent = taxableIncome.toFixed(2);

    let remainingIncome = taxableIncome;
    let totalTax = 0;

    slabs.forEach((slab, index) => {
        document.getElementById(`remaining${index + 1}`).textContent = Math.min(remainingIncome.toFixed(2), slab.limit);
        const balance = Math.min(remainingIncome, slab.limit);
        const tax = balance * slab.rate;
        remainingIncome -= balance;
        totalTax += tax;
        document.getElementById(`tax${index + 1}`).textContent = tax.toFixed(2);
    });

    document.getElementById('payableTax').textContent = totalTax.toFixed(2);
    document.getElementById('taxPerMonth').textContent = (totalTax / 12).toFixed(2);
}


// Modal Logic
const taxCalculatorButton = document.getElementById('taxCalculatorButton');
const taxCalculatorModal = document.getElementById('taxCalculatorModal');

taxCalculatorButton.addEventListener('click', () => {
    taxCalculatorModal.classList.remove('hidden');
    $('body').css('overflow', 'hidden'); // Disable scrolling
    createTexTableBody();
});

function createTexTableBody() {

    const tbody = document.getElementById("taxTableBody");
    tbody.innerHTML = "";

    let previousLimit = 0;

    slabs.forEach((slab, index) => {
        const isEvenRow = index % 2 !== 0;
        const tr = document.createElement("tr");
        if (isEvenRow) tr.classList.add("bg-gray-100");

        const labelTd = document.createElement("td");
        labelTd.className = "p-2";

        if (slab.limit === Infinity) {
            labelTd.innerHTML = `Remaining - <span id="remaining${index + 1}">0</span> @ ${slab.rate * 100}%`;
        } else if (index === 0) {
            labelTd.innerHTML = `Up to - <span id="remaining${index + 1}">0</span> / ${slab.limit.toLocaleString()} @ ${slab.rate * 100}%`;

        } else {
            labelTd.innerHTML = `Next - <span id="remaining${index + 1}">0</span> / ${(slab.limit).toLocaleString()} @ ${slab.rate * 100}%`;
        }

        const valueTd = document.createElement("td");
        valueTd.className = "p-2 text-right";
        valueTd.id = `tax${index + 1}`;
        valueTd.textContent = "0.00";

        tr.appendChild(labelTd);
        tr.appendChild(valueTd);
        tbody.appendChild(tr);
    });
}

// const modalContent = taxCalculatorModal.querySelector('div'); // The modal content div

// Close modal when clicking outside the modal content
// window.addEventListener('click', (event) => {
//     if (event.target === taxCalculatorModal && !modalContent.contains(event.target)) {
//         taxCalculatorModal.classList.add('hidden');
//     }
// });
const closeModalButton = document.getElementById('closeModal');

// Close modal when clicking the close button
closeModalButton.addEventListener('click', () => {
    taxCalculatorModal.classList.add('hidden');
    $('body').css('overflow', ''); // Disable scrolling
});