// ==========================================
// Pheunkarm Academy Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initFavicon();
  initStickyHeader();
  initMobileMenu();
  initLiveTicker();
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

/**
 * 7. Live Market Data Ticker (Streaming below header)
 */
function initLiveTicker() {
  const header = document.getElementById('site-header');
  if (!header) return;

  // Insert custom CSS for the ticker
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes ticker-scroll-lr {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
    .market-ticker-container {
      background-color: #0b0f19;
      border-bottom: 1px solid var(--color-border);
      color: rgba(255, 255, 255, 0.85);
      padding: 0.5rem 0;
      overflow: hidden;
      font-size: 0.78rem;
      font-family: 'Courier New', Courier, monospace;
      width: 100%;
      box-shadow: inset 0 -5px 15px rgba(0,0,0,0.2);
    }
    .ticker-wrapper {
      overflow: hidden;
      display: flex;
      align-items: center;
      width: 100%;
    }
    .ticker-track {
      display: flex;
      gap: 3.5rem;
      animation: ticker-scroll-lr 45s linear infinite;
      width: max-content;
      white-space: nowrap;
      align-items: center;
    }
    .ticker-track:hover {
      animation-play-state: paused;
    }
    .ticker-item {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .ticker-up {
      color: #10b981;
    }
    .ticker-down {
      color: #ef4444;
    }
    .ticker-lbl {
      color: #9ca3af;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);

  // Asset configurations
  const assets = [
    { name: 'S&P 500', value: 5473.17, change: 0.42, decimal: 2 },
    { name: 'NASDAQ', value: 17688.88, change: 0.88, decimal: 2 },
    { name: 'DOW JONES', value: 38647.10, change: -0.15, decimal: 2 },
    { name: 'FTSE 100', value: 8146.86, change: 0.25, decimal: 2 },
    { name: 'BTC/USD', value: 68245.10, change: 1.20, decimal: 2 },
    { name: 'ETH/USD', value: 3480.55, change: -0.40, decimal: 2 },
    { name: 'SOL/USD', value: 143.62, change: 3.10, decimal: 2 },
    { name: 'GBP/USD', value: 1.2745, change: 0.08, decimal: 4 },
    { name: 'USD/JPY', value: 158.90, change: -0.12, decimal: 2 },
    { name: 'AAPL', value: 214.38, change: 1.50, decimal: 2 },
    { name: 'MSFT', value: 442.20, change: -0.30, decimal: 2 },
    { name: 'NVDA', value: 127.40, change: 4.80, decimal: 2 },
    { name: 'GOOGL', value: 176.45, change: 0.70, decimal: 2 }
  ];

  // Helper to build items HTML
  function buildTrackHTML() {
    return assets.map((asset, index) => {
      const sign = asset.change >= 0 ? '+' : '';
      const colorClass = asset.change >= 0 ? 'ticker-up' : 'ticker-down';
      const arrow = asset.change >= 0 ? '▲' : '▼';
      const isForex = asset.name.includes('/');
      const symbol = isForex ? '' : '$';
      const formattedVal = asset.value.toFixed(asset.decimal);
      return `
        <span class="ticker-item">
          <span class="ticker-lbl">${asset.name}</span>
          <span class="${colorClass}" id="t-val-${index}">${symbol}${formattedVal}</span>
          <span class="${colorClass}" id="t-chg-${index}" style="font-size: 0.7rem;">(${arrow} ${sign}${asset.change.toFixed(2)}%)</span>
        </span>
      `;
    }).join('');
  }

  // Create markup structure
  const container = document.createElement('div');
  container.className = 'market-ticker-container';

  const wrapper = document.createElement('div');
  wrapper.className = 'ticker-wrapper';

  const track = document.createElement('div');
  track.className = 'ticker-track';

  const itemsHTML = buildTrackHTML();
  track.innerHTML = itemsHTML + itemsHTML; // duplicate for seamless scrolling

  wrapper.appendChild(track);
  container.appendChild(wrapper);

  // Inject below header
  header.insertAdjacentElement('afterend', container);

  // Interval updates
  setInterval(() => {
    // Randomly update 2 assets
    for (let i = 0; i < 2; i++) {
      const idx = Math.floor(Math.random() * assets.length);
      const asset = assets[idx];

      const pct = (Math.random() * 0.12 - 0.06); // -0.06% to +0.06%
      const tick = asset.value * (pct / 100);

      asset.value += tick;
      asset.change += pct;

      const valEls = document.querySelectorAll(`#t-val-${idx}`);
      const chgEls = document.querySelectorAll(`#t-chg-${idx}`);

      const sign = asset.change >= 0 ? '+' : '';
      const colorClass = asset.change >= 0 ? 'ticker-up' : 'ticker-down';
      const removeClass = asset.change >= 0 ? 'ticker-down' : 'ticker-up';
      const arrow = asset.change >= 0 ? '▲' : '▼';
      const isForex = asset.name.includes('/');
      const symbol = isForex ? '' : '$';
      const formattedVal = asset.value.toFixed(asset.decimal);

      valEls.forEach(el => {
        el.innerText = `${symbol}${formattedVal}`;
        el.classList.remove(removeClass);
        el.classList.add(colorClass);
      });

      chgEls.forEach(el => {
        el.innerText = `(${arrow} ${sign}${asset.change.toFixed(2)}%)`;
        el.classList.remove(removeClass);
        el.classList.add(colorClass);
      });
    }
  }, 1200);
}

/**
 * 8. Dynamic Favicon Injector
 */
function initFavicon() {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23175575'/><path d='M16 8 L26 13 L16 18 L6 13 Z' fill='%230b9bd9'/><path d='M10 16.5 L10 22 C10 23.5 12.5 25 16 25 C19.5 25 22 23.5 22 22 L22 16.5 L16 19.5 Z' fill='%230b9bd9'/><circle cx='16' cy='13' r='1.5' fill='%23fff'/></svg>";
  document.head.appendChild(link);
}


