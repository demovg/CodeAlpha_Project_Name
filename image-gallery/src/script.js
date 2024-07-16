document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentIndex = 0;

    function showImage(index) {
        const galleryWidth = gallery.clientWidth;
        gallery.style.transform = `translateX(${-index * galleryWidth}px)`;
    }

    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            showImage(currentIndex);
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentIndex < gallery.children.length - 1) {
            currentIndex++;
            showImage(currentIndex);
        }
    });

    // the below code is for touch devices with Swipe functionality
    let startX;

    gallery.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });

    gallery.addEventListener('touchmove', function(e) {
        if (!startX) return;
        let endX = e.touches[0].clientX;
        let diff = startX - endX;

        if (diff > 50) {
            nextButton.click();
        } else if (diff < -50) {
            prevButton.click();
        }
        startX = null;
    });
});
