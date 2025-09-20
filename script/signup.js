// signup.js

// Fetch user from Firebase or fallback to user.json
async function fetchUser() {
  try {
    const userData = firebaseAuth.getCurrentUser();
    if (userData) return userData;

    const res = await fetch("../user.json");
    if (!res.ok) throw new Error("No user data found");
    return res.json();
  } catch (e) {
    console.warn("Could not fetch user data:", e.message);
    return null;
  }
}

// Firebase logout
async function logout() {
  const result = await firebaseAuth.signOutUser();
  if (result.success) {
    alert("Logged out successfully!");
    window.location.href = "../index.html";
  } else {
    alert("Error logging out: " + result.error);
  }
}

// Create signup form
function createSignupForm() {
  const authContainer = document.createElement("div");
  authContainer.className = "auth-container";

  authContainer.innerHTML = `
    <div class="auth-card">
      <div class="auth-header">
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-subtitle">Join upnXt to start your learning journey</p>
      </div>

      <form class="auth-form" id="signupForm">
      
      <div class="form-group">
      <label for="email" class="form-label">Email</label>
      <input type="email" id="email" class="form-input" placeholder="Enter your email" required>
      <div class="error-message" id="emailError">Please enter a valid email address</div>
      </div>
      <div class="form-group">
        <label for="username" class="form-label">Name</label>
        <input type="text" id="username" class="form-input" placeholder="Your Name" required>
        <div class="error-message" id="usernameError">Username must be at least 3 characters</div>
      </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" class="form-input" placeholder="Create a password" required autocomplete="new-password">
          <div class="error-message" id="passwordError">Password must be at least 8 characters</div>
        </div>

        <div class="form-group">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input type="password" id="confirmPassword" class="form-input" placeholder="Confirm your password" required autocomplete="new-password">
          <div class="error-message" id="confirmPasswordError">Passwords do not match</div>
        </div>

        <div class="form-options">
          <label class="terms-agree">
            <input type="checkbox" id="termsAgree" required>
            <span>I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a></span>
          </label>
        </div>

        <button type="submit" class="auth-button primary">Create Account</button>
      </form>

      <div class="divider">
        <span class="divider-text">Or sign up with</span>
      </div>

      <button class="auth-button secondary" id="googleSignup">
        <i class="fa-brands fa-google"></i>
        Sign up with Google
      </button>

      <div class="auth-footer">
        <p>Already have an account? <a href="../auth/login.html" class="auth-link">Log in</a></p>
      </div>
    </div>
  `;

  return authContainer;
}

// Form validation
function setupFormValidation() {
  const form = document.getElementById("signupForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const usernameError = document.getElementById("usernameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    if (usernameInput.value.length < 3) {
      showError(usernameInput, usernameError);
      isValid = false;
    } else hideError(usernameInput, usernameError);

    if (!emailInput.validity.valid) {
      showError(emailInput, emailError);
      isValid = false;
    } else hideError(emailInput, emailError);

    if (passwordInput.value.length < 8) {
      showError(passwordInput, passwordError);
      isValid = false;
    } else hideError(passwordInput, passwordError);

    if (passwordInput.value !== confirmPasswordInput.value) {
      showError(confirmPasswordInput, confirmPasswordError);
      isValid = false;
    } else hideError(confirmPasswordInput, confirmPasswordError);

    if (!document.getElementById("termsAgree").checked) {
      alert("Please agree to the Terms");
      isValid = false;
    }

    if (isValid) {
      await signupWithFirebase(usernameInput.value, emailInput.value, passwordInput.value);
    }
  });

  const googleButton = document.getElementById("googleSignup");
  if (googleButton) {
    googleButton.addEventListener("click", signUpWithGoogle);
  }
}

function showError(input, errorElement) {
  input.classList.add("error");
  errorElement.classList.add("show");
}
function hideError(input, errorElement) {
  input.classList.remove("error");
  errorElement.classList.remove("show");
}

// Firebase signup
async function signupWithFirebase(username, email, password) {
  const btn = document.querySelector(".auth-button.primary");
  if (!btn) return;

  const original = btn.textContent;
  btn.textContent = "Creating Account...";
  btn.disabled = true;

  try {
    const result = await firebaseAuth.signUp(email, password, username);

    if (result.success) {
      alert(`Welcome, ${result.user.username}! Account created successfully.`);
      window.location.href = "../index.html";
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Signup failed: " + error.message);
  } finally {
    btn.textContent = original;
    btn.disabled = false;
  }
}

// Firebase Google signup
async function signUpWithGoogle() {
  const googleButton = document.getElementById("googleSignup");
  if (!googleButton) return;

  const originalHTML = googleButton.innerHTML;
  googleButton.textContent = "Signing up with Google...";
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
    console.error("Google signup error:", error);
    alert("Google signup failed: " + error.message);
  } finally {
    googleButton.innerHTML = originalHTML;
    googleButton.disabled = false;
  }
}

// Init
document.addEventListener("DOMContentLoaded", function () {
  try {
    const currentUser = firebaseAuth.getCurrentUser();
    if (currentUser) {
      window.location.href = "../index.html";
      return;
    }

    // Use the header.js addHeader function
    addHeader(1);

    const main = document.querySelector(".main");
    if (!main) return;
    main.appendChild(createSignupForm());

    setTimeout(() => setupFormValidation(), 100);
  } catch (error) {
    console.error("Error initializing signup page:", error);
  }
});