const ACCESS_PHRASE = 'beefstewinyourface';

const loginForm = document.querySelector('#login-form');

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const password = document.querySelector('#password');

    if (password.value.trim().toLowerCase() === ACCESS_PHRASE) {
      sessionStorage.setItem('beefStewClientAccess', 'granted');
      location.replace('portal.html');
    } else {
      document.querySelector('#error').textContent = 'The access phrase was not recognized.';
      password.select();
    }
  });
}

if (
  document.body.classList.contains('portal-gated') &&
  sessionStorage.getItem('beefStewClientAccess') !== 'granted'
) {
  location.replace('login.html');
}

document.querySelector('#logout')?.addEventListener('click', () => {
  sessionStorage.removeItem('beefStewClientAccess');
  location.replace('login.html');
});
