let hamburger = document.querySelector(".navbar-hamburger");
let navLinks = document.querySelector(".navbar-links");
let navItems = document.querySelectorAll(".navbar-item");

hamburger.addEventListener("click", () => {
    let currentMaxHeight = navLinks.style.maxHeight;
    if (currentMaxHeight) {
        navLinks.style.maxHeight = "";
    } else {
        navLinks.style.maxHeight = `${(navItems.length - 2) * 100}%`;
    }
});