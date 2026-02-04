/* ═══════════════════════════════════════════════════════════
   SAQIB DIN - ULTRA PREMIUM PORTFOLIO JAVASCRIPT
   Enhanced Interactions & Sophisticated Animations
   ═══════════════════════════════════════════════════════════ */

"use strict";

// ═════════ DOM READY ═════════
document.addEventListener("DOMContentLoaded", () => {
  initializeAll();
});

// ═════════ INITIALIZATION ═════════
function initializeAll() {
  updateYear();
  initializeScrollAnimations();
  initializeSmoothScroll();
  initializeSkillAnimations();
  initializeHeaderEffects();
  initializeParallax();
  initializeCardTilt();
  initializeCursorTrail();
  initializeLoadingAnimation();
  consoleSignature();
}

// ═════════ UPDATE YEAR ═════════
function updateYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ═════════ SCROLL ANIMATIONS ═════════
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Trigger skill animations when mastery section is visible
        if (entry.target.classList.contains("section-mastery")) {
          setTimeout(() => animateSkills(), 300);
        }

        // Unobserve to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    ".fade-in-up, .fade-in-left, .fade-in-right, section",
  );

  animatedElements.forEach((el) => observer.observe(el));
}

// ═════════ SMOOTH SCROLL ═════════
function initializeSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip empty or just # links
      if (!href || href === "#") return;

      e.preventDefault();

      const target = document.querySelector(href);

      if (target) {
        const headerOffset = 120;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ═════════ SKILL ANIMATIONS ═════════
function initializeSkillAnimations() {
  const skillFills = document.querySelectorAll(".skill-fill");

  skillFills.forEach((fill) => {
    const originalWidth = fill.style.getPropertyValue("--skill-width");
    fill.style.width = "0%";
    fill.dataset.targetWidth = originalWidth;
  });
}

function animateSkills() {
  const skillFills = document.querySelectorAll(".skill-fill");

  skillFills.forEach((fill, index) => {
    setTimeout(() => {
      const targetWidth = fill.dataset.targetWidth;
      fill.style.width = targetWidth;
    }, index * 150);
  });
}

// ═════════ HEADER EFFECTS ═════════
function initializeHeaderEffects() {
  const header = document.querySelector(".header-luxe");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.background = "rgba(13, 13, 13, 0.98)";
      header.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.5)";
    } else {
      header.style.background = "rgba(13, 13, 13, 0.95)";
      header.style.boxShadow = "none";
    }

    // Active navigation highlighting
    highlightActiveSection();

    lastScroll = currentScroll;
  });
}

function highlightActiveSection() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-item");
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    const href = item.getAttribute("href");
    if (href === `#${currentSection}`) {
      item.classList.add("active");
    }
  });
}

// ═════════ PARALLAX EFFECTS ═════════
function initializeParallax() {
  const orbs = document.querySelectorAll(".luxury-orb");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    orbs.forEach((orb, index) => {
      const speed = 0.2 + index * 0.15;
      const yPos = -(scrolled * speed);
      orb.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// ═════════ CARD TILT EFFECT ═════════
function initializeCardTilt() {
  const cards = document.querySelectorAll(
    ".work-card, .credential-frame, .mastery-category, .connect-card",
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateY(-8px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
}

// ═════════ CURSOR TRAIL ═════════
function initializeCursorTrail() {
  if (window.innerWidth < 768) return; // Skip on mobile

  let cursorTrails = [];
  const maxTrails = 8;

  document.addEventListener("mousemove", (e) => {
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";

    document.body.appendChild(trail);
    cursorTrails.push(trail);

    if (cursorTrails.length > maxTrails) {
      const oldTrail = cursorTrails.shift();
      oldTrail.remove();
    }

    setTimeout(() => {
      trail.style.opacity = "0";
      trail.style.transform = "translate(-50%, -50%) scale(0)";
    }, 10);

    setTimeout(() => {
      trail.remove();
    }, 600);
  });

  // Add cursor trail styles
  const style = document.createElement("style");
  style.textContent = `
    .cursor-trail {
      position: fixed;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(201, 169, 97, 0.6), transparent);
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 9999;
    }
  `;
  document.head.appendChild(style);
}

// ═════════ LOADING ANIMATION ═════════
function initializeLoadingAnimation() {
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");

    // Animate hero section
    setTimeout(() => {
      const heroElements = document.querySelectorAll(
        ".hero-content, .hero-visual",
      );
      heroElements.forEach((el) => {
        el.classList.add("visible");
      });
    }, 200);
  });
}

// ═════════ SEQUENTIAL ANIMATIONS ═════════
function animateSequentially(elements, delay = 100) {
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * delay);
  });
}

// Initialize sequential animations for credential cards
document.addEventListener("DOMContentLoaded", () => {
  const credentialCards = document.querySelectorAll(".credential-block");

  const credentialObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 200);
          credentialObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  credentialCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    credentialObserver.observe(card);
  });
});

// ═════════ SCROLL TO TOP ═════════
document.addEventListener("keydown", (e) => {
  // Press 'T' to scroll to top
  if (e.key.toLowerCase() === "t" && !e.ctrlKey && !e.metaKey) {
    const activeElement = document.activeElement;

    if (
      activeElement.tagName !== "INPUT" &&
      activeElement.tagName !== "TEXTAREA"
    ) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
});

// ═════════ PERFORMANCE OPTIMIZATION ═════════
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
  highlightActiveSection();
}, 100);

window.addEventListener("scroll", debouncedScroll);

// ═════════ EMBLEM GLOW ON HOVER ═════════
const brandIdentity = document.querySelector(".brand-identity");
if (brandIdentity) {
  brandIdentity.addEventListener("mouseenter", () => {
    const emblemGlow = document.querySelector(".emblem-glow");
    if (emblemGlow) emblemGlow.style.opacity = "1";
  });

  brandIdentity.addEventListener("mouseleave", () => {
    const emblemGlow = document.querySelector(".emblem-glow");
    if (emblemGlow) emblemGlow.style.opacity = "0";
  });
}

// ═════════ METRIC COUNTER ANIMATION ═════════
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target === Infinity ? "∞" : Math.ceil(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.ceil(current);
    }
  }, 16);
}

// Observe and animate metric values
const metricsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const metricValue = entry.target.querySelector(".metric-value");
        const value = metricValue.textContent;

        if (value === "∞") {
          metricValue.style.opacity = "0";
          setTimeout(() => {
            metricValue.style.transition = "opacity 0.6s ease";
            metricValue.style.opacity = "1";
          }, 300);
        } else if (value.includes("+")) {
          const numValue = parseInt(value);
          metricValue.textContent = "0";
          animateCounter(metricValue, numValue, 2000);
          metricValue.textContent += "+";
        } else {
          const numValue = parseInt(value);
          metricValue.textContent = "0";
          animateCounter(metricValue, numValue, 2000);
        }

        metricsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".metric-item").forEach((item) => {
  metricsObserver.observe(item);
});

// ═════════ ORNAMENT ANIMATIONS ═════════
function animateOrnaments() {
  const ornaments = document.querySelectorAll(".caption-ornament, .badge-icon");

  ornaments.forEach((ornament, index) => {
    setTimeout(() => {
      ornament.style.animation = "badgeShine 3s ease-in-out infinite";
      ornament.style.animationDelay = `${index * 0.2}s`;
    }, index * 100);
  });
}

setTimeout(animateOrnaments, 1000);

// ═════════ WORK CARD HOVER EFFECTS ═════════
const workCards = document.querySelectorAll(".work-card");

workCards.forEach((card) => {
  const workNumber = card.querySelector(".work-number");

  if (workNumber) {
    card.addEventListener("mouseenter", () => {
      workNumber.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    });
  }
});

// ═════════ TECH BADGE HOVER EFFECTS ═════════
const techBadges = document.querySelectorAll(".tech-badge");

techBadges.forEach((badge) => {
  badge.addEventListener("mouseenter", () => {
    badge.style.transition = "all 0.3s ease";
  });
});

// ═════════ SMOOTH REVEAL FOR SECTIONS ═════════
const revealSections = () => {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.85) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }
  });
};

window.addEventListener("scroll", debounce(revealSections, 50));

// ═════════ CONSOLE SIGNATURE ═════════
function consoleSignature() {
  const styles = [
    "color: #c9a961",
    "font-size: 24px",
    "font-weight: bold",
    "text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)",
  ].join(";");

  const subtitleStyles = ["color: #8a8a8a", "font-size: 16px"].join(";");

  const messageStyles = ["color: #2d6a6a", "font-size: 14px"].join(";");

  console.log("%c✦ Saqib Din Portfolio ✦", styles);
  console.log("%cFull Stack Developer & Laravel Artisan", subtitleStyles);
  console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #c9a961");
  console.log(
    "%cCrafted with passion, precision, and modern technologies",
    messageStyles,
  );
  console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #c9a961");
  console.log("%cInterested in collaboration? Let's connect!", messageStyles);
  console.log(
    "%cEmail: din.97legend@gmail.com",
    "color: #c9a961; font-size: 12px",
  );
}

// ═════════ INTERSECTION OBSERVER POLYFILL CHECK ═════════
if (!("IntersectionObserver" in window)) {
  console.warn("IntersectionObserver not supported. Loading polyfill...");
  // Add all animations immediately as fallback
  document
    .querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right")
    .forEach((el) => {
      el.classList.add("visible");
    });
}

// ═════════ MOBILE OPTIMIZATIONS ═════════
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  // Disable complex animations on mobile for better performance
  document.body.classList.add("mobile-device");

  // Reduce cursor trail elements
  maxTrails = 3;
}

// ═════════ LAZY LOAD IMAGES ═════════
const lazyImages = document.querySelectorAll("img[data-src]");

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach((img) => imageObserver.observe(img));

// ═════════ PREVENT LAYOUT SHIFT ═════════
document.fonts.ready.then(() => {
  document.body.classList.add("fonts-loaded");
});

// ═════════ ACCESSIBILITY ENHANCEMENTS ═════════
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation");
});

// ═════════ ERROR HANDLING ═════════
window.addEventListener("error", (e) => {
  console.error("An error occurred:", e.error);
});

// ═════════ PAGE VISIBILITY ═════════
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animations when page is hidden
    document.body.classList.add("page-hidden");
  } else {
    // Resume animations when page is visible
    document.body.classList.remove("page-hidden");
  }
});

// ═════════ EXPORT FOR TESTING ═════════
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializeAll,
    animateSkills,
    highlightActiveSection,
    animateCounter,
  };
}

/* ═══════════════════════════════════════════════════════════
   END OF JAVASCRIPT
   ═══════════════════════════════════════════════════════════ */
