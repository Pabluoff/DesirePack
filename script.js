const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener('click', () => {
    //Animate Links
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
});



document.addEventListener("DOMContentLoaded", function () {
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slideWidth = slides[0].clientWidth;
    let currentSlide = 1;

    function goToSlide(index) {
        slidesContainer.style.transition = 'transform 0.5s ease';
        slidesContainer.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= totalSlides) {
            currentSlide = 1;
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                slidesContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            }, 500);
        }
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        if (currentSlide <= 0) {
            currentSlide = totalSlides - 2;
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                slidesContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            }, 500);
        }
        goToSlide(currentSlide);
    }

    document.querySelector('.next-btn').addEventListener('click', nextSlide);
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);

    setInterval(nextSlide, 3000); // Troca de slide automática a cada 3 segundos
});



