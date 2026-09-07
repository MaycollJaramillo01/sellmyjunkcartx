const dataLayer = window.dataLayer = window.dataLayer || [];
const track = (event, details = {}) => dataLayer.push({ event, ...details });

const menuButton = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
menuButton?.addEventListener('click', () => {
  const open = nav?.classList.toggle('is-open') ?? false;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-track]').forEach((element) => element.addEventListener('click', () => {
  track(element.dataset.track, { location: element.closest('header, footer, nav')?.tagName.toLowerCase() ?? 'page' });
}));

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));

document.querySelectorAll('.faq-list details').forEach((detail) => detail.addEventListener('toggle', () => {
  if (detail.open) track('faq_opened', { question: detail.querySelector('summary')?.textContent.trim() });
}));

const quoteForm = document.querySelector('[data-quote-form]');
if (quoteForm) {
  let currentStep = 1;
  const steps = [...quoteForm.querySelectorAll('[data-step]')];
  const progress = [...quoteForm.querySelectorAll('[data-progress-step]')];
  const showStep = (number) => {
    currentStep = number;
    steps.forEach((step) => { step.hidden = Number(step.dataset.step) !== number; });
    progress.forEach((item) => {
      const itemStep = Number(item.dataset.progressStep);
      item.classList.toggle('is-active', itemStep === number);
      item.classList.toggle('is-complete', itemStep < number);
      item.setAttribute('aria-current', itemStep === number ? 'step' : 'false');
    });
    steps.find((step) => Number(step.dataset.step) === number)?.querySelector('h3')?.focus({ preventScroll: true });
  };
  const fieldError = (field, message) => {
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    const error = quoteForm.querySelector(`#${field.id}-error`);
    if (error) error.textContent = message;
  };
  const validate = (number) => {
    let valid = true;
    const required = [...quoteForm.querySelectorAll(`[data-step="${number}"] [required]`)];
    const handledRadioGroups = new Set();
    required.forEach((field) => {
      if (field.type === 'radio') {
        if (handledRadioGroups.has(field.name)) return;
        handledRadioGroups.add(field.name);
        const radios = [...quoteForm.querySelectorAll(`input[name="${field.name}"]`)];
        const message = radios.some((radio) => radio.checked) ? '' : 'Choose the option that best describes the vehicle.';
        radios.forEach((radio) => radio.setAttribute('aria-invalid', message ? 'true' : 'false'));
        quoteForm.querySelector(`#${field.name}-error`).textContent = message;
        if (message) valid = false;
        return;
      }
      let message = field.value.trim() ? '' : 'This field is required.';
      if (!message && field.type === 'tel' && field.value.replace(/\D/g, '').length < 10) message = 'Enter a valid phone number.';
      if (!message && field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) message = 'Enter a valid email address.';
      if (!message && field.name === 'year' && (+field.value < 1900 || +field.value > new Date().getFullYear() + 1)) message = 'Enter a valid vehicle year.';
      fieldError(field, message);
      if (message) valid = false;
    });
    return valid;
  };
  quoteForm.addEventListener('focusin', () => track('quote_started'), { once: true });
  quoteForm.addEventListener('input', (event) => { if (event.target.id) fieldError(event.target, ''); });
  quoteForm.querySelectorAll('[data-next]').forEach((button) => button.addEventListener('click', () => {
    if (!validate(currentStep)) return;
    track('quote_step_completed', { step: currentStep });
    showStep(currentStep + 1);
  }));
  quoteForm.querySelectorAll('[data-back]').forEach((button) => button.addEventListener('click', () => showStep(currentStep - 1)));
  progress.forEach((button) => button.addEventListener('click', () => { if (+button.dataset.progressStep < currentStep) showStep(+button.dataset.progressStep); }));
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validate(3)) return;
    const data = new FormData(quoteForm);
    const message = ['Hello, I would like a vehicle offer.', `Vehicle: ${data.get('makeModel')}`, `Year: ${data.get('year')}`, `Mileage: ${data.get('mileage') || 'Not provided'}`, `Condition: ${data.get('condition')}`, `Name: ${data.get('name')}`, `Phone: ${data.get('phone')}`, `Email: ${data.get('email') || 'Not provided'}`].join('\n');
    quoteForm.querySelector('[data-whatsapp-result]').href = `https://wa.me/18326222792?text=${encodeURIComponent(message)}`;
    track('quote_step_completed', { step: 3 });
    track('quote_submitted', { vehicle_condition: data.get('condition') });
    quoteForm.querySelector('[data-form-panel]').hidden = true;
    const success = quoteForm.querySelector('[data-form-success]');
    success.hidden = false;
    success.querySelector('h3').focus();
  });
  showStep(1);
}

document.querySelectorAll('[data-contact-form]').forEach((form) => form.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;
  form.querySelectorAll('[required]').forEach((field) => {
    let message = field.value.trim() ? '' : 'This field is required.';
    if (!message && field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) message = 'Enter a valid email address.';
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    form.querySelector(`#${field.id}-error`).textContent = message;
    if (message) valid = false;
  });
  if (!valid) return;
  const data = new FormData(form);
  const subject = encodeURIComponent('Vehicle purchase inquiry');
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not provided'}\nVehicle: ${data.get('vehicle') || 'Not provided'}\n\n${data.get('message') || ''}`);
  track('contact_submitted');
  const status = form.querySelector('[data-contact-status]');
  status.hidden = false;
  status.innerHTML = `Your message is ready. <a href="mailto:Cashforcartx@gmail.com?subject=${subject}&body=${body}">Open your email app to send it</a>, or call <a href="tel:+18326222792">(832) 622-2792</a>.`;
}));
