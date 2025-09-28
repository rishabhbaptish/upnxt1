
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
    addFooter();
});

function addSection() {
    const main = document.createElement("div");
    main.id = "section-wrapper";
    main.style.paddingBlock = '2rem';
    main.style.marginBottom = '2rem';
    document.querySelector("#main").append(main);
    addAllCourses();
    addFIP();
}

async function addAllCourses() {
    const trending = document.createElement("section");
    const headingSection = document.createElement("div");
    headingSection.id = "section-heading";
    const heading = document.createElement("div");
    heading.innerHTML = `<h2>All Courses</h2><p>Most popular courses this week</p>`;
    headingSection.append(heading);
    trending.append(headingSection);
    const courses = await fetchCourses();
    const row = document.createElement("div");
    row.className = "courses-row";

    courses.forEach(c => {
        let card = makeCard(c,1);
        row.append(card);
    });
    trending.append(row)
    document.querySelector("#section-wrapper").append(trending);
}

async function addFIP() {
    const trending = document.createElement("section");
    const headingSection = document.createElement("div");
    headingSection.id = "section-heading";
    const heading = document.createElement("div");
    heading.innerHTML = `<h2>Future Innovators Program</h2>`;
    headingSection.append(heading);
    trending.append(headingSection);
    const courses = await fetchCourses();
    const row = document.createElement("div");
    row.className = "courses-row";

    courses.forEach(c => {
        let card = makeCard(c);
        row.append(card);
    });
    trending.append(row)
    document.querySelector("#section-wrapper").append(trending);
}