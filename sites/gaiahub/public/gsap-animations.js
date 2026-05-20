/**
 * GSAP Animations for Gaia Hub
 * Adapted from webflow-effects skill
 */

function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    setTimeout(initGSAP, 100);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Fade Up Animation
  gsap.utils.toArray('.gsap-fade-up').forEach((elem) => {
    gsap.fromTo(elem,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Stagger Children
  gsap.utils.toArray('.gsap-stagger').forEach((container) => {
    const children = container.children;
    gsap.fromTo(children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%'
        }
      }
    );
  });

  // Scale In
  gsap.utils.toArray('.gsap-scale-in').forEach((elem) => {
    gsap.fromTo(elem,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%'
        }
      }
    );
  });

  // Hero Animation (on page load)
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCta = document.querySelector('.hero-cta');

  if (heroTitle) {
    const tl = gsap.timeline();
    tl.fromTo(heroTitle, 
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }
    );
    
    if (heroSubtitle) {
      tl.fromTo(heroSubtitle,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      );
    }
    
    if (heroCta) {
      tl.fromTo(heroCta,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      );
    }
  }

  console.log('✅ GSAP animations initialized for Gaia Hub');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGSAP);
} else {
  initGSAP();
}
