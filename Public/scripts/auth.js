// Reference Firebase Auth
const auth = firebase.auth();

// Handle Login Form Submission
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Login successful:', userCredential.user);
            window.location.href = '../../src/views/dashboard.html';
        })
        .catch((error) => {
            console.error('Error during login:', error.message);
        });
});

// Handle Register Form Submission
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Registration successful:', userCredential.user);
            window.location.href = '../../src/views/dashboard.html';
        })
        .catch((error) => {
            console.error('Error during registration:', error.message);
        });
});
