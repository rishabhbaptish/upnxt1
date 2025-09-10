/*
    <div class="actions">
      <div class="search-wrap">
        <input id="search" placeholder="Search courses..." autocomplete="off" />
        <ul id="searchResults" class="search-results" hidden></ul>
      </div>
      <div class="avatar">RB</div>
    </div>
*/

function addHeader() {
    const header = document.querySelector(".site-header");
    const logo = document.createElement("div");
    logo.className = "logo";
    logo.innerHTML = `<span class="text-black">upn<span class="text-blue">X</span>t</span>`;
    const nav = document.createElement("nav");
    nav.className = "nav";
    nav.innerHTML = `<a href="index.html" class="active">Home</a>
      <a href="#trending">Trending</a>
      <a href="#courses">Community</a>`;
    header.append(logo);
    header.append(nav);
}