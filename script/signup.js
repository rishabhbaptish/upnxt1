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

async function addHeader(index = 0) {
  const header = document.querySelector(".site-header");
  if (!header) return;

  // Avoid re-initializing
  if (header.hasAttribute("data-header-initialized")) return;

  const add = index === 1 ? "../" : "./";

  let user = null;
  try {
    user = await fetchUser();
  } catch (e) {
    user = null;
  }

  // Logo
  const logo = document.createElement("div");
  logo.addEventListener("click", () => (window.location.href = add));
  logo.className = "logo";
  logo.innerHTML = `<span class="text-black">upn<span class="text-blue">X</span>t</span>`;

  // Nav
  const nav = document.createElement("nav");
  nav.className = "nav";
  const currentPage = window.location.pathname;
  nav.innerHTML = `
    <a href="${add}" class="${currentPage.endsWith("/") || currentPage.endsWith("/index.html") ? "active" : ""}">Home</a>
    <a href="${add}courses" class="${currentPage.includes("/courses") ? "active" : ""}">Courses</a>
  `;

  // Auth Section
  const authSection = document.createElement("div");
  authSection.className = "auth-section";

  if (!user || !user.email) {
    authSection.innerHTML = `
      <div class="avatar-wrapper">
        <div class="avatar">
          <i class="fa fa-user"></i>
        </div>
        <div class="dropdown-menu hidden">
          <button class="dropdown-btn" onclick="window.location.href='${add}auth/login.html'">
            Login / Signup
          </button>
        </div>
      </div>
    `;
    authSection.querySelector(".avatar").addEventListener("click", () => {
      authSection.querySelector(".dropdown-menu").classList.toggle("hidden");
    });
  } else {
    const initials = user.username
      ? user.username[0].toUpperCase()
      : user.email[0].toUpperCase();

    authSection.innerHTML = `
      <div class="avatar-wrapper">
        <div class="avatar">${initials}</div>
        <div class="dropdown-menu hidden">
          <span class="menu-text">Welcome, ${user.username || user.email}</span>
          <button class="dropdown-btn logout-btn" onclick="logout()">Logout</button>
        </div>
      </div>
    `;
    authSection.querySelector(".avatar").addEventListener("click", () => {
      authSection.querySelector(".dropdown-menu").classList.toggle("hidden");
    });
  }

  header.append(logo);
  header.append(nav);
  header.append(authSection);
  header.setAttribute("data-header-initialized", "true");

  // Close dropdowns if clicked outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".avatar-wrapper")) {
      document
        .querySelectorAll(".dropdown-menu")
        .forEach((menu) => menu.classList.add("hidden"));
    }
  });
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
        <div class="auth-logo">
          <span class="text-black">upn<span class="text-blue">X</span>t</span>
        </div>
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-subtitle">Join upnXt to start your learning journey</p>
      </div>

      <form class="auth-form" id="signupForm">
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input type="text" id="username" class="form-input" placeholder="Choose a username" required>
          <div class="error-message" id="usernameError">Username must be at least 3 characters</div>
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" class="form-input" placeholder="Enter your email" required>
          <div class="error-message" id="emailError">Please enter a valid email address</div>
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

    addHeader(1);

    const main = document.querySelector(".main");
    if (!main) return;
    main.appendChild(createSignupForm());

    setTimeout(() => setupFormValidation(), 100);
  } catch (error) {
    console.error("Error initializing signup page:", error);
  }
});
