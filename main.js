// ==========================================
// Pheunkarm Academy Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initCourseFiltering();
  initTestimonialSlider();
  initAccordion();
  initFormSubmit();
});

/**
 * 1. Sticky Header Shrink Effect
 */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });
}

/**
 * 2. Mobile Menu Navigation & Submenu Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const body = document.body;
  const coursesDropdown = document.getElementById('courses-dropdown');
  const coursesTrigger = coursesDropdown?.querySelector('.nav-link');

  if (!toggleBtn || !navMenu) return;

  // Toggle Drawer
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
    body.classList.toggle('menu-open');
  });

  // Close Drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== toggleBtn) {
      toggleBtn.classList.remove('open');
      navMenu.classList.remove('open');
      body.classList.remove('menu-open');
    }
  });

  // Mobile Dropdown Expand/Collapse for Courses
  if (coursesTrigger) {
    coursesTrigger.addEventListener('click', (e) => {
      // Only handle custom behavior on mobile sizes
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        coursesDropdown.classList.toggle('active-mobile');
      }
    });
  }
}

/**
 * 3. Course Filter Tabs
 */
function initCourseFiltering() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const courseCards = document.querySelectorAll('.course-card');

  if (tabButtons.length === 0 || courseCards.length === 0) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active to current
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all') {
          card.style.display = 'flex';
        } else if (filter === 'learn' && category === 'learn') {
          card.style.display = 'flex';
        } else if (filter === 'specialist' && category === 'specialist') {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 4. Testimonials Slider
 */
function initTestimonialSlider() {
  const slider = document.getElementById('testimonial-slider');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');
  
  if (!slider || slides.length === 0) return;
  
  let currentIndex = 0;
  let slideInterval;

  function showSlide(index) {
    // Reset classes
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Move slider container
    slider.style.transform = `translateX(-${index * 100}%)`;
    
    // Add active classes
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentIndex = index;
  }

  function nextSlide() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0;
    }
    showSlide(nextIndex);
  }

  // Dot navigation click handlers
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(targetIndex);
      resetAutoplay();
    });
  });

  // Start Autoplay
  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 6000);
  }

  // Reset Autoplay timer on manual interaction
  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  startAutoplay();
}

/**
 * 5. Accordion FAQs handler
 */
function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = header.nextElementSibling;
      const isOpen = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBody = otherItem.querySelector('.accordion-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/**
 * 6. Course Advisor form submission
 */
function initFormSubmit() {
  const advisorForm = document.getElementById('advisor-form');
  const contactForm = document.getElementById('contact-advisor-form');

  if (advisorForm) {
    advisorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      alert(`Thank you, ${name}! Your inquiry has been sent to our course advisors. We will contact you at ${email} shortly.`);
      advisorForm.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      alert(`Thank you, ${name}! Your consultation request has been sent to our course advisors. We will contact you at ${email} shortly.`);
      contactForm.reset();
    });
  }
}


