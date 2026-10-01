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

// V47 — seletor das três propostas de maquiagem
const makeupOptions = document.querySelectorAll('.makeup-option');
const makeupImage = document.querySelector('[data-makeup-image]');
const makeupLead = document.querySelector('[data-makeup-lead]');
const makeupIdeal = document.querySelector('[data-makeup-ideal]');
const makeupTime = document.querySelector('[data-makeup-time]');
const makeupPrice = document.querySelector('[data-makeup-price]');
const makeupExtra = document.querySelector('[data-makeup-extra]');

const makeupData = {
  express: {
    image: 'assets/maquiagem/make_express2.webp',
    alt: 'Inspirações de maquiagem express',
    lead: 'Uma maquiagem leve e prática para acompanhar sua rotina sem perder o cuidado em cada detalhe.',
    ideal: 'Compromissos durante o dia, reuniões, fotos simples e ocasiões em que você quer praticidade.',
    time: '30 a 40 min.',
    price: 'R$80,00',
    extra: 'Sem cílios postiços e sem técnicas elaboradas nos olhos.'
  },
  classica: {
    image: 'assets/maquiagem/make_classica2.jpg',
    alt: 'Inspirações de maquiagem clássica',
    lead: 'Uma produção mais completa e elegante, equilibrando definição, acabamento e naturalidade.',
    ideal: 'Fotos, jantares, aniversários, eventos, confraternizações e convidados de casamento.',
    time: '40 min. a 1h.',
    price: 'R$120,00',
    extra: 'Com ou sem cílios postiços pelo mesmo valor.'
  },
  glam: {
    image: 'assets/maquiagem/make_glam1.jpeg',
    alt: 'Inspirações de maquiagem glam',
    lead: 'Uma produção mais elaborada, marcada e detalhada para quem quer um visual de impacto.',
    ideal: 'Festas, shows, formaturas, ensaios fotográficos, aniversários, baladas e eventos noturnos.',
    time: '1h a 1h10.',
    price: 'R$140,00',
    extra: 'Com ou sem cílios postiços pelo mesmo valor.'
  }
};

makeupOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const key = option.dataset.makeupOption;
    const data = makeupData[key];
    if (!data) return;

    makeupOptions.forEach((item) => {
      const active = item === option;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });

    if (makeupImage) {
      makeupImage.style.opacity = '0.35';
      window.setTimeout(() => {
        makeupImage.src = data.image;
        makeupImage.alt = data.alt;
        makeupImage.style.opacity = '1';
      }, 120);
    }
    if (makeupLead) makeupLead.textContent = data.lead;
    if (makeupIdeal) makeupIdeal.textContent = data.ideal;
    if (makeupTime) makeupTime.textContent = data.time;
    if (makeupPrice) makeupPrice.textContent = data.price;
    if (makeupExtra) makeupExtra.textContent = data.extra;
  });
});

// V48 — seletor das quatro técnicas de extensão de cílios
const lashTechniqueOptions = document.querySelectorAll('[data-lash-technique]');
const lashProposal = document.querySelector('[data-lash-proposal]');
const lashIdeal = document.querySelector('[data-lash-ideal]');
const lashPrice = document.querySelector('[data-lash-price]');
const lashTime = document.querySelector('[data-lash-time]');
const lashFeatureImage = document.querySelector('.feature-lash .feature-image img');

const lashTechniqueData = {
  brasileiro: {
    image: 'assets/cilios/volume_brasileiro.jpg',
    imageAlt: 'Volume Brasileiro - extensão de cílios',
    proposal: 'Clássico e natural, com leve volume e possibilidade de fios pretos ou marrons.',
    ideal: 'Quem prefere um olhar marcante, mas delicado e harmonioso.',
    price: 'Aplicação R$120 · manutenção R$80.',
    time: '1h15 a 1h30 · manutenção a cada 15 a 20 dias.'
  },
  egipcio: {
    image: 'assets/cilios/volume_egipcio.jpg',
    imageAlt: 'Volume Egípcio - extensão de cílios',
    proposal: 'Fios mais cheios, densos e glamourosos para criar um olhar poderoso e sofisticado.',
    ideal: 'Quem gosta de intensidade, presença e impacto no olhar.',
    price: 'Aplicação R$140 · manutenção R$90.',
    time: '1h15 a 1h30 · manutenção a cada 15 a 20 dias.'
  },
  foxy: {
    image: 'assets/cilios/foxy_eyes3.jpg',
    imageAlt: 'Foxy Eyes - extensão de cílios',
    proposal: 'Aplicação estratégica para alongar o olhar e direcionar o efeito para as extremidades.',
    ideal: 'Quem gosta de olhos alongados, definidos e marcantes.',
    price: 'Aplicação R$130 · manutenção R$80.',
    time: '1h15 a 1h30 · manutenção a cada 15 a 20 dias.'
  },
  'fio-a-fio': {
    image: 'assets/cilios/lash-03.jpg',
    imageAlt: 'Fio a Fio Clássico - extensão de cílios',
    proposal: 'Resultado leve e definido, sem o volume intenso das técnicas volumosas.',
    ideal: 'Quem prefere naturalidade, definição e um acabamento delicado.',
    price: 'Aplicação R$130 · manutenção R$90.',
    time: '1h15 a 1h30 · manutenção a cada 15 a 20 dias.'
  },
  'mega-brasileiro': {
    image: 'assets/cilios/volume_brasileiro6.jpg',
    imageAlt: 'Mega Brasileiro - extensão de cílios',
    proposal: 'Efeito volumoso e destacado, pensado para quem gosta de cílios bem cheios.',
    ideal: 'Quem busca mais densidade e um olhar intenso, sem abrir mão do acabamento brasileiro.',
    price: 'Aplicação R$190 · manutenção R$100.',
    time: '1h40 a 2h · manutenção a cada 15 a 20 dias.'
  },
  'mega-egipcio': {
    image: 'assets/cilios/volume_egipcio5.jpg',
    imageAlt: 'Mega Egípcio - extensão de cílios',
    proposal: 'Super volumoso e impactante, com bastante destaque e presença no olhar.',
    ideal: 'Quem quer o efeito mais intenso e glamouroso entre as opções volumosas.',
    price: 'Aplicação R$230 · manutenção R$150.',
    time: '1h40 a 2h · manutenção a cada 15 a 20 dias.'
  }
};

lashTechniqueOptions.forEach((option) => {
  option.addEventListener('click', () => {
    const key = option.dataset.lashTechnique;
    const data = lashTechniqueData[key];
    if (!data) return;

    lashTechniqueOptions.forEach((item) => {
      const active = item === option;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });

    if (lashProposal) lashProposal.textContent = data.proposal;
    if (lashIdeal) lashIdeal.textContent = data.ideal;
    if (lashPrice) lashPrice.textContent = data.price;
    if (lashTime) lashTime.textContent = data.time;
    if (lashFeatureImage && data.image) {
      lashFeatureImage.style.opacity = '0.35';
      window.setTimeout(() => {
        lashFeatureImage.src = data.image;
        lashFeatureImage.alt = data.imageAlt;
        lashFeatureImage.style.opacity = '1';
      }, 120);
    }
  });
});

