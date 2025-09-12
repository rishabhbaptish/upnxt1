const COURSES_URL = '../courses.json';

// fetch courses data
async function fetchCourses() {
    const res = await fetch(COURSES_URL);
    if (!res.ok) throw new Error('Failed to load courses.json');
    return res.json();
}

// helper to create img path (local images folder)
function imgPath(name) { return '../images/' + name; }
// Append to body (or any container)

document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector(".main");
    addHeader();
    (async () => {
        const bannerEl = await addBanner();
        const learnEl = await content();

        main.append(bannerEl, learnEl);
    })();
});

async function addBanner() {
    const courses = await fetchCourses();
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");
    const course = courses.find(c => c.id === courseId);
    const section = document.createElement("section");
    section.id = "course-banner";
    section.innerHTML = `<h1>${course.title}</h1>
                        <p>${course.description}</p>`;
    const tagWrapper = document.createElement("div");
    tagWrapper.id = "tag-wrapper";
    course.tags.forEach(tag => {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.id = "tag";
        badge.innerHTML = tag;
        tagWrapper.append(badge);
    });

    const footNote = document.createElement("div");
    footNote.id = "foot-note";
    footNote.innerHTML = `<p>${course.instructor}</p>•<p>${course.language}</p>•<p>${course.level}</p>`;

    section.append(tagWrapper);
    section.append(footNote);
    // main.append(section);
    return section;
}

async function content() {
    const courses = await fetchCourses();
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");
    const course = courses.find(c => c.id === courseId);

    const mainPart = document.createElement("div");
    mainPart.id = "course-main";

    const textSection = document.createElement("div");
    textSection.id = "text-section";

    const promoCard = makePromoCard(course);
    // const promoCard = document.createElement("div");
    // promoCard.id = "text-section";

    const outcome = createLearnSection(course.outcomes);
    const outcome1 = createLearnSection(course.outcomes);
    textSection.append(outcome);
    textSection.append(outcome1);

    mainPart.append(textSection);
    mainPart.append(promoCard);
    return mainPart;
}

function createLearnSection(items) {
    // Main card container
    const card = document.createElement("div");
    card.id = "box";

    // Header
    const header = document.createElement("div");
    header.id = "box-header";
    header.innerHTML = `<h2>What you'll learn</h2>`;

    // Content wrapper
    const content = document.createElement("div");
    content.id = "box-content";

    // Grid
    const grid = document.createElement("div");
    grid.id = "box-grid";

    // Add each item
    items.forEach(text => {
        const item = document.createElement("div");
        item.id = "grid-item";

        // Check icon (inline SVG)
        const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        icon.setAttribute("width", "24");
        icon.setAttribute("height", "24");
        icon.setAttribute("viewBox", "0 0 24 24");
        icon.setAttribute("fill", "none");
        icon.setAttribute("stroke", "currentColor");
        icon.setAttribute("stroke-width", "2");
        icon.setAttribute("stroke-linecap", "round");
        icon.setAttribute("stroke-linejoin", "round");
        icon.classList.add("h-5", "w-5", "flex-shrink-0", "text-primary");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M20 6 9 17l-5-5");
        icon.appendChild(path);

        // Text
        const span = document.createElement("span");
        span.textContent = text;

        item.append(icon, span);
        grid.append(item);
    });

    content.append(grid);
    card.append(header, content);

    return card;

}

function makePromoCard(c) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = "100%";
    // Create link wrapper for clickable parts
    const link = document.createElement('a');
    link.href = `./course/?id=${c.id}`;
    link.className = 'card-link';

    // Banner
    const banner = document.createElement("div");
    banner.id = "banner";
    const img = document.createElement("img");
    img.src = imgPath(c.image);
    img.alt = c.title;
    banner.append(img);

    // Content
    const cardContentWrapper = document.createElement("div");
    cardContentWrapper.id = "card-content-wrapper";
    const cardContent = document.createElement("div");
    cardContent.id = "card-content";
    cardContent.innerHTML = `<h3>${c.title}</h3><p>${c.instructor}</p>`;

    const tagPrice = document.createElement("div");
    tagPrice.id = "tag-price";
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.id = "badge";
    badge.innerHTML = c.level;
    tagPrice.append(badge);

    const price = document.createElement("span");
    price.id = "price";
    price.innerHTML = c.price;
    tagPrice.append(price);

    // Enroll button (separate action)
    const enroll = document.createElement("button");
    enroll.id = "enroll";
    enroll.className = "button1";
    enroll.textContent = "Enroll Now";
    enroll.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = `./course/?id=${c.id}`;
    });

    // Assemble
    cardContentWrapper.append(cardContent);
    cardContentWrapper.append(tagPrice);

    link.append(banner);
    link.append(cardContentWrapper);

    card.append(link);     // clickable area
    card.append(enroll);   // independent button

    return card;
}