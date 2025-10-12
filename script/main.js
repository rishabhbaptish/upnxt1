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
  recognition();
  addImg("p2.png");
  addContact();
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

async function recognition() {
  const trending = document.createElement("section");
  trending.id = "recognition";
  trending.innerHTML = `<p>We are recognized under the Startup India initiative (DPIIT Registered Startup), part of the NASSCOM 10,000 Startups Program, and a member of the Microsoft for Startups Founders Hub.</p>`
  const imgContainer = document.createElement("div");
  imgContainer.className = "img-container";
  const img = document.createElement("img");
    img.src = imgPath("p3.png");
    img.alt = "p3.png";
    imgContainer.append(img);
  // ["r1.jpg", "r2.jpg", "r3.jpg"].forEach(image => {
  //   const img = document.createElement("img");
  //   img.src = imgPath(image);
  //   img.alt = image;
  //   imgContainer.append(img);
  // });


  trending.append(imgContainer);
  document.querySelector(".main").append(trending);
}