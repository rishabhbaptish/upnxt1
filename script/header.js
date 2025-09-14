/*
    <div class="actions">
      <div class="search-wrap">
        <input id="search" placeholder="Search courses..." autocomplete="off" />
        <ul id="searchResults" class="search-results" hidden></ul>
      </div>
      <div class="avatar">RB</div>
    </div>
*/

function addHeader(index = 0) {
  const header = document.querySelector(".site-header");
  const logo = document.createElement("div");
  const add = index == 1 ? '../' : './';
  logo.addEventListener("click", () => {
    window.location.href = add;
  })
  logo.className = "logo";
  logo.innerHTML = `<span class="text-black">upn<span class="text-blue">X</span>t</span>`;
  const nav = document.createElement("nav");
  nav.className = "nav";
  const currentPage = window.location.pathname; // e.g., "/courses" or "/"
  nav.innerHTML = `
  <a href="${add}" class="${currentPage === '/' ? 'active' : ''}">Home</a>
  <a href="${add}courses" class="${currentPage === '/courses/' ? 'active' : ''}">Courses</a>
`;
  header.append(logo);
  header.append(nav);
}