// login.js

// Fetch user from localStorage (Firebase) or fallback to user.json
async function fetchUser() {
  try {
    // First try to get from localStorage (Firebase)
    const userData = firebaseAuth.getCurrentUser();
    if (userData) {
      return userData;
    }
    
    // Fallback to user.json if no localStorage data
    const res = await fetch("../user.json");
    if (!res.ok) throw new Error("No user data found");
    return res.json();
  } catch (e) {
    console.warn("Could not fetch user data:", e.message);
    return null;
  }
}

// Logout function using Firebase
async function logout() {
  const result = await firebaseAuth.signOutUser();
  if (result.success) {
    alert('Logged out successfully!');
    window.location.href = '../index.html'; // Redirect to home
  } else {
    alert('Error logging out: ' + result.error);
  }
}

// Create login form
function createLoginForm() {
    const authContainer = document.createElement("div");
    authContainer.className = "auth-container";
    
    authContainer.innerHTML = `
        <div class="auth-card">
            <div class="auth-header">
                <h1 class="auth-title">Welcome back</h1>
                <p class="auth-subtitle">Sign in to continue your learning journey</p>
            </div>
            
            <form class="auth-form" id="loginForm">
                <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" class="form-input" placeholder="Enter your email" required>
                    <div class="error-message" id="emailError">Please enter a valid email address</div>
                </div>
                
                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" class="form-input" placeholder="Enter your password" required autocomplete="current-password">
                    <div class="error-message" id="passwordError">Password must be at least 6 characters</div>
                </div>
                
                <div class="form-options">
                    <a href="#" class="forgot-password">Forgot password?</a>
                </div>
                
                <button type="submit" class="auth-button primary">Sign In</button>
            </form>
            
            <div class="divider">
                <span class="divider-text">Or continue with</span>
            </div>
            
            <button class="auth-button secondary" id="googleLogin">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
            </button>
            
            <div class="auth-footer">
                <p>Don't have an account? <a href="../auth/signup.html" class="auth-link">Sign up</a></p>
            </div>
        </div>
    `;
    
    return authContainer;
}

// Form validation
function setupFormValidation() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    if (!form || !emailInput || !passwordInput || !emailError || !passwordError) {
        console.error('Form validation setup failed: Required elements not found');
        return;
    }
    
    // Email validation
    emailInput.addEventListener('input', () => {
        if (!emailInput.validity.valid || emailInput.value.trim() === '') {
            showError(emailInput, emailError);
        } else {
            hideError(emailInput, emailError);
        }
    });
    
    emailInput.addEventListener('blur', () => {
        if (!emailInput.validity.valid || emailInput.value.trim() === '') {
            showError(emailInput, emailError);
        }
    });
    
    // Password validation
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length < 6) {
            showError(passwordInput, passwordError);
        } else {
            hideError(passwordInput, passwordError);
        }
    });
    
    passwordInput.addEventListener('blur', () => {
        if (passwordInput.value.length < 6) {
            showError(passwordInput, passwordError);
        }
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        if (!emailInput.validity.valid || emailInput.value.trim() === '') {
            showError(emailInput, emailError);
            isValid = false;
        } else {
            hideError(emailInput, emailError);
        }
        
        if (passwordInput.value.length < 6) {
            showError(passwordInput, passwordError);
            isValid = false;
        } else {
            hideError(passwordInput, passwordError);
        }
        
        if (isValid) {
            loginWithFirebase();
        }
    });
    
    // Google login button
    const googleButton = document.getElementById('googleLogin');
    if (googleButton) {
        googleButton.addEventListener('click', signInWithGoogle);
    }
}

function showError(input, errorElement) {
    if (input && errorElement) {
        input.classList.add('error');
        errorElement.classList.add('show');
    }
}

function hideError(input, errorElement) {
    if (input && errorElement) {
        input.classList.remove('error');
        errorElement.classList.remove('show');
    }
}

// Login function with Firebase
async function loginWithFirebase() {
    const submitButton = document.querySelector('.auth-button.primary');
    if (!submitButton) return;

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.textContent = 'Signing in...';
    submitButton.disabled = true;

    try {
        const result = await firebaseAuth.signIn(email, password);
        
        if (result.success) {
            alert(`Welcome back, ${result.user.username}!`);
            // Redirect to dashboard or home page
            window.location.href = "../index.html";
        } else {
            throw new Error(result.error);
        }

    } catch (error) {
        console.error("Login error:", error);
        alert("Login failed: " + error.message);
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Google sign in function
async function signInWithGoogle() {
    const googleButton = document.getElementById('googleLogin');
    if (!googleButton) return;
    
    const originalHTML = googleButton.innerHTML;
    
    // Show loading state
    googleButton.textContent = 'Signing in with Google...';
    googleButton.disabled = true;
    
    try {
        const result = await firebaseAuth.signInWithGoogle();
        
        if (result.success) {
            alert(`Welcome, ${result.user.username}!`);
            window.location.href = "../index.html";
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Google sign in error:', error);
        alert('Google sign in failed: ' + error.message);
    } finally {
        googleButton.innerHTML = originalHTML;
        googleButton.disabled = false;
    }
}

// Initialize login page
document.addEventListener("DOMContentLoaded", function () {
    try {
        // Check if user is already logged in
        const currentUser = firebaseAuth.getCurrentUser();
        if (currentUser) {
            // User already logged in, redirect to home
            window.location.href = "../index.html";
            return;
        }
        
        // Use the header.js addHeader function
        addHeader(1);
        
        const main = document.querySelector(".main");
        if (!main) {
            console.error('Main element not found');
            return;
        }
        
        const loginForm = createLoginForm();
        main.appendChild(loginForm);
        
        setTimeout(() => {
            setupFormValidation();
        }, 100);
        
    } catch (error) {
        console.error('Error initializing login page:', error);
    }
}); 