import '@fontsource-variable/inter';
import './style.css';

/* ---------- Mobile navigation ---------- */

function initMobileMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-menu-panel]');
  if (!toggle || !panel) return;

  const links = panel.querySelectorAll('a');

  const closeMenu = () => {
    panel.classList.add('hidden');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');
  };

  const openMenu = () => {
    panel.classList.remove('hidden');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overflow-hidden');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  links.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
}

/* ---------- Sticky / shrinking header ---------- */

function initStickyHeader() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Contact form validation ---------- */

function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const successBox = form.querySelector('[data-form-success]');

  const showError = (field, message) => {
    const input = form.querySelector(`[name="${field}"]`);
    const error = form.querySelector(`[data-error-for="${field}"]`);
    if (!input || !error) return;
    input.setAttribute('aria-invalid', 'true');
    error.querySelector('[data-error-message]').textContent = message;
    error.classList.add('is-visible');
  };

  const clearError = (field) => {
    const input = form.querySelector(`[name="${field}"]`);
    const error = form.querySelector(`[data-error-for="${field}"]`);
    if (!input || !error) return;
    input.removeAttribute('aria-invalid');
    error.classList.remove('is-visible');
  };

  const fields = ['name', 'email', 'phone', 'service', 'message'];

  const validateForm = () => {
    let isValid = true;
    fields.forEach(clearError);
    successBox?.classList.add('hidden');

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const phone = form.elements.phone.value.trim();
    const service = form.elements.service.value;
    const message = form.elements.message.value.trim();

    if (!name) {
      showError('name', 'Please enter your name.');
      isValid = false;
    }

    if (!email) {
      showError('email', 'Please enter your email address.');
      isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
      showError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    if (!phone) {
      showError('phone', 'Please enter a phone number.');
      isValid = false;
    }

    if (!service) {
      showError('service', 'Please select a service.');
      isValid = false;
    }

    if (!message) {
      showError('message', 'Tell us a bit about your car and the work needed.');
      isValid = false;
    }

    return isValid;
  };

  fields.forEach((field) => {
    const input = form.elements[field];
    input?.addEventListener('input', () => clearError(field));
    input?.addEventListener('change', () => clearError(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    successBox?.classList.remove('hidden');
    form.reset();
    successBox?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

initMobileMenu();
initStickyHeader();
initContactForm();
