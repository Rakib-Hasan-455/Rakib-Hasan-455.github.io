(function(){
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isOpen = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
        toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.add('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // close on link click (for single-page anchors)
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        menu.classList.add('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
        toggle.setAttribute('aria-expanded', 'false');
    }));
})();

let styleDeskBg = 'sm:bg-gray-500';
let styleDeskBgOpacity = 'sm:bg-opacity-100';
let styleDeskText = 'sm:text-gray-200';
let styleMobBg = 'bg-gray-400';
let styleMobBgOpacity = 'bg-opacity-30';
let styleMobText = 'text-gray-500';

document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with the class 'nav-link'
    var navLinks = document.querySelectorAll('.nav-link');
    document.getElementById("homeLink").classList.add(styleDeskBg);
    document.getElementById("homeLink").classList.add(styleDeskText);
    document.getElementById("homeLink").classList.add(styleDeskBgOpacity);
    document.getElementById("homeLinkMob").classList.add(styleMobBg);
    document.getElementById("homeLinkMob").classList.add(styleMobText);
    document.getElementById("homeLinkMob").classList.add(styleMobBgOpacity);
    // Add click event listener to each nav link
    navLinks.forEach(function (navLink) {
        navLink.addEventListener('click', function () {
            // Remove the 'active' class from all links
            navLinks.forEach(function (link) {
                link.classList.remove(styleMobBg);
                link.classList.remove(styleMobBgOpacity);
                link.classList.remove(styleMobText);
            });
            // Add the 'active' class to the clicked link
            navLink.classList.add(styleDeskBg)
            navLink.classList.add(styleDeskBgOpacity)
            navLink.classList.add(styleDeskText)
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
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove(styleDeskBg);
                link.classList.remove(styleDeskBgOpacity);
                link.classList.remove(styleDeskText);
                link.classList.remove(styleMobBg);
                link.classList.remove(styleMobBgOpacity);
                link.classList.remove(styleMobText);
                document.querySelectorAll(`nav a[href*="${id}"]`)
                    .forEach(navLink => {
                        navLink.classList.add(styleDeskBg)
                        navLink.classList.add(styleDeskBgOpacity)
                        navLink.classList.add(styleDeskText)
                    });
                document.querySelectorAll(`nav a[href*="${id}"]`)
                    .forEach(navLink => {
                        navLink.classList.add(styleMobBg)
                        navLink.classList.add(styleMobBg)
                        navLink.classList.add(styleMobBgOpacity)
                    });

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