// EDIT BEFORE LAUNCH: replace with the correct guest enquiries inbox if different.
const CONTACT_EMAIL = 'convoswithbhavee@gmail.com';
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !expanded);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));
document.querySelector('#year').textContent = String(new Date().getFullYear());
document.querySelector('#guest-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#guest-name').value.trim();
  const email = document.querySelector('#guest-email').value.trim();
  const story = document.querySelector('#guest-story').value.trim();
  if (!name || !email || !story) return;
  const subject = encodeURIComponent('Guest enquiry | Convos with Bhavee | ' + name);
  const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMy story / suggested conversation:\n' + story);
  document.querySelector('#form-note').textContent = 'Your email application will open with a prepared message. Please press Send there to submit your enquiry.';
  window.location.href = 'mailto:' + (window.CWB_CONTACT_EMAIL || CONTACT_EMAIL) + '?subject=' + subject + '&body=' + body;
});
