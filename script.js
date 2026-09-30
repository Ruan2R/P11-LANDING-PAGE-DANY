const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealItems.forEach((item) => observer.observe(item));


const resultTabs = document.querySelectorAll('.results-tab');
const resultPanels = document.querySelectorAll('.results-panel');

resultTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.resultsTab;

    resultTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });

    resultPanels.forEach((panel) => {
      const active = panel.dataset.resultsPanel === key;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
      if (active) {
        panel.querySelector('.results-carousel')?.scrollTo({ left: 0, behavior: 'smooth' });
      }
    });
  });
});

const feedbackTrack = document.querySelector('.feedback-track');
const feedbackSlides = Array.from(document.querySelectorAll('.feedback-track .quote-card'));
const feedbackDots = Array.from(document.querySelectorAll('.feedback-dot'));
const feedbackPrev = document.querySelector('[data-feedback-prev]');
const feedbackNext = document.querySelector('[data-feedback-next]');
let feedbackIndex = 0;

function setFeedbackSlide(index, behavior = 'smooth') {
  if (!feedbackTrack || feedbackSlides.length === 0) return;
  feedbackIndex = (index + feedbackSlides.length) % feedbackSlides.length;
  const target = feedbackSlides[feedbackIndex];
  feedbackTrack.scrollTo({ left: target.offsetLeft, behavior });
  feedbackDots.forEach((dot, i) => {
    const active = i === feedbackIndex;
    dot.classList.toggle('is-active', active);
    dot.setAttribute('aria-selected', String(active));
  });
}

feedbackPrev?.addEventListener('click', () => setFeedbackSlide(feedbackIndex - 1));
feedbackNext?.addEventListener('click', () => setFeedbackSlide(feedbackIndex + 1));
feedbackDots.forEach((dot) => {
  dot.addEventListener('click', () => setFeedbackSlide(Number(dot.dataset.feedbackSlide)));
});

feedbackTrack?.addEventListener('scroll', () => {
  if (!feedbackTrack || feedbackSlides.length === 0) return;
  const viewportCenter = feedbackTrack.scrollLeft + feedbackTrack.clientWidth / 2;
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;
  feedbackSlides.forEach((slide, index) => {
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const distance = Math.abs(slideCenter - viewportCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });
  feedbackIndex = closestIndex;
  feedbackDots.forEach((dot, i) => {
    const active = i === feedbackIndex;
    dot.classList.toggle('is-active', active);
    dot.setAttribute('aria-selected', String(active));
  });
});
