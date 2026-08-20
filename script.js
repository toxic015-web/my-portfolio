// Show a message when the page loads
console.log("Portfolio website loaded successfully!");


// Example button interaction
const buttons = document.querySelectorAll(".btn");

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        console.log("Button clicked!");
    });
});


// --- Dark / Light Mode Toggle ---
// Theme is applied before first paint by an inline script in <head>;
// this just wires up the button and persists the user's choice.

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function updateToggleLabel() {
    const isDark = root.getAttribute("data-theme") === "dark";
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

if (themeToggle) {
    updateToggleLabel();

    themeToggle.addEventListener("click", function () {
        const current = root.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";

        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        updateToggleLabel();
    });
}


// --- Mobile Nav Toggle ---

const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.classList.toggle("open", isOpen);
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close the mobile menu after picking a link
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open menu");
        });
    });
}


// --- Active Section Highlighting ---
// Highlights the nav link for whichever section is currently in view.

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

if (sections.length && navAnchors.length && "IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");

                    navAnchors.forEach(function (anchor) {
                        anchor.classList.toggle(
                            "active",
                            anchor.getAttribute("href") === "#" + id
                        );
                    });
                }
            });
        },
        {
            // Counts a section as "current" once it crosses the upper-middle of the viewport
            rootMargin: "-40% 0px -55% 0px",
            threshold: 0,
        }
    );

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}
