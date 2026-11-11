const CONFIG = { rsvpEndpoint: "https://script.google.com/macros/s/AKfycbx3CQt2qPn1SzsmpY_FbTZp4Gksn5JGZs9v5sx02iLBLcp3Da4aDxC1vhcrpa9edK2LKg/exec" };

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const openButton = document.querySelector('#open-button');
openButton?.addEventListener('click', () => {
  const opened = openButton.getAttribute('aria-expanded') !== 'true';
  openButton.setAttribute('aria-expanded', String(opened));
  document.querySelector('#pizza-reveal')?.classList.toggle('is-open', opened);
  openButton.textContent = opened ? 'Cerrar la caja' : 'Abrir la caja';
  if (opened) document.querySelector('.open-pizza')?.setAttribute('aria-hidden', 'false');
});

const countdown = document.querySelector('#countdown');
if (countdown) {
  const weddingDate = new Date('2027-09-17T19:00:00+02:00');
  const updateCountdown = () => {
    const remaining = weddingDate - new Date();
    if (remaining <= 0) { countdown.textContent = '¡Hoy celebramos juntos!'; return; }
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    countdown.textContent = `${days} días · ${hours} horas · ${minutes} minutos`;
  };
  updateCountdown();
  setInterval(updateCountdown, 60000);
}

document.querySelector('#rsvp-form').addEventListener('submit', async event => {
  event.preventDefault();
  const message = document.querySelector('#form-message');
  const button = event.target.querySelector('button[type="submit"]');
  button.disabled = true;
  message.textContent = 'Enviando tu pedido…';
  try {
    await fetch(CONFIG.rsvpEndpoint, { method: 'POST', mode: 'no-cors', body: new FormData(event.target) });
    event.target.reset();
    message.textContent = '¡Pedido recibido! Gracias por confirmar. ♡';
  } catch {
    message.textContent = 'No se ha podido enviar. Inténtalo de nuevo.';
  } finally {
    button.disabled = false;
  }
});
