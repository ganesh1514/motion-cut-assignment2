document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        slides[index].classList.add('active');

        const progress = slides[index].querySelector('.progress');
        if (progress) {
            progress.style.width = '0';
            setTimeout(() => {
                progress.style.width = '100%';
            }, 50);
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    let slideInterval = setInterval(nextSlide, 5000);

    document.querySelector('.slider').addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    document.querySelector('.slider').addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    document.querySelector('.slider').addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.querySelector('.slider').addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
});