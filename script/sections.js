function addSections() {
    const main = document.createElement("div");
    main.id = "section-wrapper";
    document.querySelector("#main").append(main);
    addTrending();
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

function makeCard(c) {
    const card = document.createElement('div');
    card.className = 'card';
    // a.href = `course.html?id=${c.slug}`;
    const banner = document.createElement("div");
    banner.id = "banner";
    const img = document.createElement("img");
    img.src = imgPath(c.image);
    img.alt = c.title;
    banner.append(img);

    const cardContent = document.createElement("div");
    cardContent.id = "card-content";
    cardContent.innerHTML = `<h3>${c.title}</h3><p">${c.instructor}</p>`;

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

    card.append(banner);
    card.append(cardContent);
    card.append(tagPrice);
    return card;
}