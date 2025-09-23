function addSections() {
    const main = document.createElement("div");
    main.id = "section-wrapper";
    document.querySelector("#main").append(main);
    // addTrending();
    addAllCourses();
}

async function addTrending() {
    const trending = document.createElement("section");
    const headingSection = document.createElement("div");
    headingSection.id = "section-heading";
    const heading = document.createElement("div");
    heading.innerHTML = `<h2>Trending Now</h2><p>Most popular courses this week</p>`;
    headingSection.append(heading);
    trending.append(headingSection);
    const courses = await fetchCourses();
    const row = document.createElement("div");
    row.className = "courses-row";

    courses.slice(0, 4).forEach(c => {
        let card = makeCard(c);
        row.append(card);
    });
    trending.append(row)
    document.querySelector("#section-wrapper").append(trending);
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
        let card = makeCard(c);
        row.append(card);
    });
    trending.append(row)
    document.querySelector("#section-wrapper").append(trending);
}

function makeCard(c,route = 0) {
    const card = document.createElement('div');
    card.className = 'card';
    const add = route == 1 ? '../' : './';
    // Create link wrapper for clickable parts
    const link = document.createElement('a');
    link.href = `${add}course/?id=${c.id}`;
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
    cardContent.innerHTML = `<h3>${c.title}</h3>`;

    // Main wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "course-includes";

    // Heading
    const heading = document.createElement("h4");
    heading.id = "card-inclusions";
    heading.textContent = "This course includes:";
    wrapper.appendChild(heading);

    // UL
    const ul = document.createElement("ul");

    // Function to create a checkmark SVG
    function createCheckIcon() {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("xmlns", svgNS);
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M20 6 9 17l-5-5");
        svg.appendChild(path);

        return svg;
    }

    // Add features
    c.inclusions.forEach(feature => {
        const li = document.createElement("li");
        const icon = createCheckIcon();
        li.appendChild(icon);
        li.appendChild(document.createTextNode(feature));
        ul.appendChild(li);
    });

    wrapper.appendChild(ul);

    const tagPrice = document.createElement("div");
    tagPrice.id = "tag-price";
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.id = "badge";
    badge.innerHTML = c.level;
    tagPrice.append(badge);

    const price = document.createElement("div");
    price.id = "price";
    price.innerHTML = `<h3 class="price"><span class="original">${c.price[0]}</span>${c.price[1]}</h3>`;
    tagPrice.append(price);

    // Enroll button (separate action)
    const enroll = document.createElement("button");
    enroll.id = "enroll";
    enroll.className = "button1";
    enroll.textContent = "Enroll Now";
    enroll.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = `/course/?id=${c.id}`;
    });

    // Assemble
    cardContentWrapper.append(cardContent);
    cardContent.append(wrapper);
    cardContentWrapper.append(tagPrice);

    link.append(banner);
    link.append(cardContentWrapper);

    card.append(link);     // clickable area
    card.append(enroll);   // independent button

    return card;
}
