const COURSES_URL = 'courses.json';

// fetch courses data
async function fetchCourses(){
  const res = await fetch(COURSES_URL);
  if (!res.ok) throw new Error('Failed to load courses.json');
  return res.json();
}

// helper to create img path (local images folder)
function imgPath(name){ return 'images/' + name; }


document.addEventListener("DOMContentLoaded", function () {
    addHeader();
    addCarousel();
    addSections();
});