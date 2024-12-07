document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  const signUpForm = document.getElementById('signup-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;

      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('Login successful');
      } catch (error) {
        console.error('Error logging in:', error.message);
      }
    });
  }

  if (signUpForm) {
    signUpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = signUpForm.email.value;
      const password = signUpForm.password.value;

      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log('Sign-up successful');
      } catch (error) {
        console.error('Error signing up:', error.message);
      }
    });
  }
});
