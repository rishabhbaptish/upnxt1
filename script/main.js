const COURSES_URL = './courses.json';
const CAROUSEL_url = './carousel.json';
const USER_URL = './user.json'; // Add this line

// fetch courses data
async function fetchCourses(){
  const res = await fetch(COURSES_URL);
  if (!res.ok) throw new Error('Failed to load courses.json');
  return res.json();
}

async function fetchCarousel(){
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
function imgPath(name){ return 'images/' + name; }

document.addEventListener("DOMContentLoaded", function () {
    addHeader();
    addCarousel();
    addSections();
});