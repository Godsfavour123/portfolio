const sectionLinks = document.querySelectorAll('.sidebar a, [data-section-link]');
const sidebarLinks = document.querySelectorAll('.sidebar a');
const panels = document.querySelectorAll('.panel');
const grids = document.querySelectorAll('.grid');
const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');

function updateGridVisibility() {
 grids.forEach(grid => {
  const hasVisiblePanel = grid.querySelector('.panel:not([hidden])');
  grid.classList.toggle('is-empty', !hasVisiblePanel);
 });
}

function showSection(sectionId) {
 const target = document.querySelector(sectionId) || document.querySelector('#home');

 if (!target) return;
 const activeId = `#${target.id}`;

 panels.forEach(panel => {
  const isTarget = panel === target;
  panel.hidden = !isTarget;
  panel.classList.toggle('active-section', isTarget);
 });

 sidebarLinks.forEach(link => {
  const isActive = link.getAttribute('href') === activeId;
  link.classList.toggle('active', isActive);
  link.setAttribute('aria-current', isActive ? 'page' : 'false');
 });

 updateGridVisibility();
 window.history.replaceState(null, '', activeId);
 window.scrollTo({ top: 0, behavior: 'smooth' });
}

sectionLinks.forEach(link => {
 link.addEventListener('click', event => {
  const sectionId = link.getAttribute('href');

  if (!sectionId || !sectionId.startsWith('#')) return;

  event.preventDefault();
  showSection(sectionId);
 });
});

showSection(window.location.hash || '#home');

if (contactForm) {
 contactForm.addEventListener('submit', event => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
   contactForm.reportValidity();
   return;
  }

  formStatus.textContent = 'Your message has been sent';
  formStatus.className = 'form-status success';
  contactForm.reset();
 });
}
