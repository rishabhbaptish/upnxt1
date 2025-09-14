const COURSES_URL = '../courses.json';
console.log(window.location.pathname)
// fetch courses data
async function fetchCourses(){
  const res = await fetch(COURSES_URL);
  if (!res.ok) throw new Error('Failed to load courses.json');
  return res.json();
}

// helper to create img path (local images folder)
function imgPath(name){ return '../images/' + name; }


document.addEventListener("DOMContentLoaded", function () {
    addHeader(1);
    addSection();
});

function addSection() {
    const main = document.createElement("div");
    main.id = "section-wrapper";
    document.querySelector("#main").append(main);
    addAllCourses();
}