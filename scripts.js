document.addEventListener('DOMContentLoaded', function () {
    // Select elements
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const slides = document.querySelectorAll('.swiper-slide');
    const nextButton = document.querySelector('.fashion-slider-button-next');
    const prevButton = document.querySelector('.fashion-slider-button-prev');
    const pagination = document.createElement('div');
    pagination.classList.add('swiper-pagination');
  
    // Slider state
    let currentSlide = 0;
    const totalSlides = slides.length;
  
    // Initialize slider
    function initSlider() {
      slides.forEach((slide, index) => {
        slide.style.left = `${index * 100}%`;
        if (slide.getAttribute('data-slide-bg-color')) {
          slide.style.backgroundColor = slide.getAttribute('data-slide-bg-color');
        }
      });
      createPagination();
      updatePagination();
    }
  
    // Create pagination bullets
    function createPagination() {
      for (let i = 0; i < totalSlides; i++) {
        const bullet = document.createElement('span');
        bullet.classList.add('swiper-pagination-bullet');
        bullet.addEventListener('click', () => goToSlide(i));
        pagination.appendChild(bullet);
      }
      swiperWrapper.parentNode.appendChild(pagination);
    }
  
    // Update pagination
    function updatePagination() {
      const bullets = document.querySelectorAll('.swiper-pagination-bullet');
      bullets.forEach((bullet, index) => {
        bullet.classList.remove('swiper-pagination-bullet-active');
        if (index === currentSlide) {
          bullet.classList.add('swiper-pagination-bullet-active');
        }
      });
    }
  
    // Go to specific slide
    function goToSlide(slideIndex) {
      swiperWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
      currentSlide = slideIndex;
      updatePagination();
    }
  
    // Next slide
    function nextSlide() {
      if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
      } else {
        goToSlide(0); // Loop back to the first slide
      }
    }
  
    // Previous slide
    function prevSlide() {
      if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
      } else {
        goToSlide(totalSlides - 1); // Loop back to the last slide
      }
    }
  
    // Event listeners for navigation buttons
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
  
    // Initialize the slider
    initSlider();
});
  
// Initialize Swiper
document.addEventListener('DOMContentLoaded', function () {
  const fashionSlider = new Swiper('.swiper', {
    // Swiper configuration
    speed: 800,
    loop: true,
    parallax: true,
    navigation: {
      nextEl: '.fashion-slider-button-next',
      prevEl: '.fashion-slider-button-prev',
    },
    on: {
      init: function () {
        this.slides.forEach((slide) => {
          const bgColor = slide.getAttribute('data-slide-bg-color');
          if (bgColor) {
            slide.style.backgroundColor = bgColor;
          }
        });
      },
      slideChangeTransitionStart: function () {
        this.slides.forEach((slide) => {
          const bgColor = slide.getAttribute('data-slide-bg-color');
          if (bgColor) {
            slide.style.backgroundColor = bgColor;
          }
        });
      },
    },
  });
});
