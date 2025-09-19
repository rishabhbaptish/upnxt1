// header.js

async function addHeader(index = 0) {
  const header = document.querySelector(".site-header");
  const logo = document.createElement("div");
  const add = index == 1 ? "../" : "./";

  // Logo click -> go to home
  logo.addEventListener("click", () => {
    window.location.href = add;
  });
  logo.className = "logo";
  logo.innerHTML = `<span class="text-black">upn<span class="text-blue">X</span>t</span>`;

  // Navigation links
  const nav = document.createElement("nav");
  nav.className = "nav";
  const currentPage = window.location.pathname;
  nav.innerHTML = `
    <a href="${add}" class="${currentPage === '/' ? 'active' : ''}">Home</a>
    <a href="${add}courses" class="${currentPage === '/courses/' ? 'active' : ''}">Courses</a>
  `;

  // ✅ Get user from Firebase wrapper
  const user = firebaseAuth.getCurrentUser();

  // Auth section (avatar + menu)
  const authSection = document.createElement("div");
  authSection.className = "auth-section";

  if (!user || !user.email) {
    // Not logged in → show Login/Signup button
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

    // Toggle dropdown
    authSection.querySelector(".avatar").addEventListener("click", () => {
      const menu = authSection.querySelector(".dropdown-menu");
      menu.classList.toggle("hidden");
    });

  } else {
    // Logged in → show first letter of username/email
    const initials = user.username
      ? user.username[0].toUpperCase()
      : user.email[0].toUpperCase();

    authSection.innerHTML = `
      <div class="avatar-wrapper">
        <div class="avatar">${initials}</div>
        <div class="dropdown-menu hidden">
          <span class="menu-text">Welcome, ${user.username || user.email}</span>
          <button class="dropdown-btn logout-btn">Logout</button>
        </div>
      </div>
    `;

    // Toggle dropdown
    authSection.querySelector(".avatar").addEventListener("click", () => {
      const menu = authSection.querySelector(".dropdown-menu");
      menu.classList.toggle("hidden");
    });

    // Logout button
    authSection.querySelector(".logout-btn").addEventListener("click", async () => {
      await firebaseAuth.signOutUser();
      window.location.reload();
    });
  }

  // Append all parts to header
  header.append(logo);
  header.append(nav);
  header.append(authSection);
}
