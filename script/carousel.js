async function addCarousel() {
  const wrapper = document.createElement("div");
  wrapper.className = "carousel";
  wrapper.id = "carousel";
  document.querySelector(".main").append(wrapper);
  const carousel = await fetchCarousel();
  renderCarousel(carousel);
}

let carouselIndex = 0;
let autoTimer;

function renderCarousel(carouselItems) {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;

  carousel.innerHTML = '';

  carouselItems.forEach((c, idx) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    if (idx === carouselIndex) slide.classList.add('active'); // show first slide
    slide.innerHTML = `
  <div class="thumb">
    <img src="${imgPath(c.image)}" alt="img-${idx}"> 
  </div>
`;
// slide.innerHTML = `
//   <div class="thumb">
//     <img src="${imgPath(c.image)}" alt="${c.title}">
//     <div class="overlay-text">${c.title}</div>
//   </div>
// `;
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
