async function addCarousel(){
    const wrapper = document.createElement("div");
    wrapper.className = "carousel";
    wrapper.id = "carousel";
    document.querySelector(".main").append(wrapper);
    const courses = await fetchCourses();
    renderCarousel(courses);
}

let carouselIndex = 0;
let autoTimer;
let carouselItems = [];

function renderCarousel(courses) {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;

  carouselItems = courses.slice(0, 4);  // first 4 courses
  carousel.innerHTML = '';

  carouselItems.forEach((c, idx) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    if (idx === carouselIndex) slide.classList.add('active'); // show first slide
    slide.innerHTML = `
      <div class="meta">
        <h1>${c.title}</h1>
        <p>${c.short}</p>
        <a class="cta" href="course.html?id=${c.slug}">View Course</a>
      </div>
      <div class="thumb"><img src="${imgPath(c.image)}" alt="${c.title}"></div>
    `;
    carousel.appendChild(slide);
  });

  // start autoplay
  clearInterval(autoTimer);
  if (carouselItems.length > 1) {
    autoTimer = setInterval(() => {
      carouselIndex = (carouselIndex + 1) % carouselItems.length;
      updateCarouselPosition();
    }, 4500);
  }
}

function updateCarouselPosition() {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((s, i) => {
    if (i === carouselIndex) {
      s.classList.add('active');
    } else {
      s.classList.remove('active');
    }
  });
}
