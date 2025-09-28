// fetch courses data
async function fetchCourses() {
  const res = await fetch(COURSES_URL);
  if (!res.ok) throw new Error('Failed to load courses.json');
  return res.json();
}

async function fetchCarousel() {
  const res = await fetch(CAROUSEL_url);
  if (!res.ok) throw new Error('Failed to load carousel.json');
  return res.json();
}

// fetch user data
async function fetchUser() {
  const res = await fetch(USER_URL);
  if (!res.ok) throw new Error('Failed to load user.json');
  return res.json();
}

// helper to create img path (local images folder)
function imgPath(name) { return 'images/' + name; }

document.addEventListener("DOMContentLoaded", function () {
  addHeader();
  addCarousel();
  addImg("p1.png");
  addSections();
  addImg("p2.png");
  addFooter();
});

async function addImg(image) {
  const trending = document.createElement("section");
  trending.className = "img-container";
  const img = document.createElement("img");
  img.src = imgPath(image);
  img.alt = image;
  trending.append(img);
  document.querySelector(".main").append(trending);
}