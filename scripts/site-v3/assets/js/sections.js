// sections.js - Count-up stats, industry tabs, scroll reveal, FAQ accordion

// Count-up stats when visible
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  const speed = 200; // Lower is faster

  const animateCountUp = (counter) => {
    const target = +counter.getAttribute('data-count');
    
    // Skip if data-count is not a valid number
    if (isNaN(target)) {
      return;
    }
    
    let start = 0;
    const increment = target / speed;
    
    const updateCount = () => {
      start += increment;
      if (start < target) {
        counter.textContent = Math.floor(start);
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCount();
  };

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCountUp(entry.target);
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Industry tabs functionality
function initIndustryTabs() {
  const tabsContainer = document.querySelector('.tabs-container');
  if (!tabsContainer) return;

  const tabs = tabsContainer.querySelectorAll('[role="tab"]');
  const panels = tabsContainer.querySelectorAll('[role="tabpanel"]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active state from all tabs
      tabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.tabIndex = -1;
        t.classList.remove('active');
      });
      
      // Set active state on clicked tab
      tab.setAttribute('aria-selected', 'true');
      tab.tabIndex = 0;
      tab.classList.add('active');
      
      // Hide all panels
      panels.forEach(panel => {
        panel.setAttribute('hidden', 'true');
        panel.setAttribute('aria-hidden', 'true');
      });
      
      // Show the corresponding panel
      const panelId = tab.getAttribute('aria-controls');
      const activePanel = document.getElementById(panelId);
      if (activePanel) {
        activePanel.removeAttribute('hidden');
        activePanel.setAttribute('aria-hidden', 'false');
      }
    });
    
    // Keyboard navigation
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        let currentIndex = Array.from(tabs).indexOf(tab);
        let newIndex;
        
        if (e.key === 'ArrowRight') {
          newIndex = (currentIndex + 1) % tabs.length;
        } else { // ArrowLeft
          newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        }
        
        tabs[newIndex].focus();
        tabs[newIndex].click();
      }
    });
  });
}

// Scroll reveal functionality
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.section, .stats-band, .works-with, .hero, .industry-tabs, .services-block, .commercial-band, .compare, .how-it-works, .coverage-teaser, .plans-block, .section');
  
  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // For elements that should be visible without JS, we still add the class
        // but ensure they're visible by default in CSS
      }
    });
  }, revealOptions);
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// FAQ accordion - already handled by HTML details/summary, but ensuring accessibility
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const summary = item.querySelector('.faq-summary');
    if (!summary) return;
    
    // Ensure proper keyboard accessibility
    summary.setAttribute('tabindex', '0');
    summary.setAttribute('role', 'button');
    summary.setAttribute('aria-expanded', 'false');
    
    summary.addEventListener('click', () => {
      const isOpen = item.hasAttribute('open');
      item.toggleAttribute('open');
      summary.setAttribute('aria-expanded', String(!isOpen));
    });
    
    summary.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = item.hasAttribute('open');
        item.toggleAttribute('open');
        summary.setAttribute('aria-expanded', String(!isOpen));
      }
    });
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (!prefersReducedMotion.matches) {
    initCountUp();
    initScrollReveal();
  }
  
  initIndustryTabs();
  initFAQAccordion();
});

// Re-check animations if reduce motion setting changes
if (window.matchMedia) {
  const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionMediaQuery.addEventListener('change', (e) => {
    if (!e.matches) {
      // Re-enable animations
      initCountUp();
      initScrollReveal();
    }
    // Note: We don't disable animations as elements might already be animated
  });
}