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
