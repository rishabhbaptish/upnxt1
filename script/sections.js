function addSections() {
    const main = document.createElement("div");
    main.id = "section-wrapper";
    document.querySelector("#main").append(main);
    // addTrending();


    (async () => {
        // await addIntro();
        await addAllCourses();
        await addFIP();
        await addFAQ();
    })();
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

async function addImg(image) {
    const trending = document.createElement("section");
    trending.className = "img-container";
    const img = document.createElement("img");
    img.src = imgPath(image);
    img.alt = image;
    trending.append(img);
    document.querySelector("#section-wrapper").append(trending);
}

async function addAllCourses() {
    const trending = document.createElement("section");
    const headingSection = document.createElement("div");
    headingSection.id = "section-heading";
    const heading = document.createElement("div");
    heading.innerHTML = `<h2>Career-Ready Programs</h2>`;
    headingSection.append(heading);
    trending.append(headingSection);
    const courses = await fetchCourses();
    const row = document.createElement("div");
    row.className = "courses-row";
    courses.pop()
    courses.forEach(c => {
        let card = makeCard(c);
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
        if (c.id == 'C0003') {
            let card = makeCard(c);
            row.append(card);
        }
    });
    trending.append(row)
    document.querySelector("#section-wrapper").append(trending);
}

function makeCard(c, route = 0) {
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

async function addFAQ() {
    const trending = document.createElement("section");
    const faq = [
        {
            "title": "What is Upnxt?",
            "content": "Upnxt is a career-focused learning platform that makes high-quality, job-ready education affordable and practical. We provide live interactive classes at self-paced prices, with hands-on projects, mentorship, and career support."
        },
        {
            "title": "How is Upnxt different from other edtech platforms?",
            "content": "Most edtech platforms are either too expensive or just video-based with no guidance. At Upnxt, you get:<br>Live classes with mentors<br>Affordable pricing (self-paced price for live learning)<br>Regional language support<br>Career services & community access"
        },
        {
            "title": "Who can join Upnxt courses?",
            "content": "Our courses are designed for college students, recent graduates, and working professionals who want to upskill in trending fields like Data Science, AI, and Full-Stack Development  even if you're starting with zero coding background."
        },
        {
            "title": "Do you provide career support?",
            "content": "Yes. Apart from technical training, we provide resume building, LinkedIn profile optimization, mock interviews, and job search guidance. This ensures you're not just learning, but also getting ready for real opportunities."
        },
        {
            "title": "Why are Upnxt courses priced so low?",
            "content": "We believe career-ready education should not be a luxury. By keeping costs low and focusing on scale, Upnxt makes live, mentor-led learning affordable so every student can access the skills needed to succeed in today's job market."
        },
    ];
    const faqSection = createAccordion(faq, "Frequently Asked Questions");
    trending.append(faqSection);
    document.querySelector("#section-wrapper").append(trending);
}

function createAccordion(items, string) {
    // Main card container
    const card = document.createElement("div");
    card.id = "box";
    card.style.border = "none";
    card.style.boxShadow = "none";
    // Header
    const header = document.createElement("div");
    header.id = "box-header";
    header.innerHTML = `<h2>${string}</h2>`;

    // Content wrapper
    const content = document.createElement("div");
    content.id = "box-content1";

    items.forEach((a, index) => {
        let head = document.createElement('div');
        head.className = 'c';
        head.innerHTML = `<input class="course-field" type="radio" name="faq" id="faq-${index + 1}">
  <h3 class="head"><label for="faq-${index + 1}"> <div class="icon-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down h-5 w-5 text-primary dark:text-primary flex-shrink-0"><path d="m6 9 6 6 6-6"></path></svg>
  <div>${a.title}</div></div></label></h3>
  <div class="p">
    <p>${a.content}</p>
  </div>`;
        content.append(head);
    });
    card.append(header, content);
    return card;
}

// async function addIntro() {
//     const trending = document.createElement("section");
//     const headingSection = document.createElement("div");
//     headingSection.id = "section-heading";
//     const heading = document.createElement("div");
//     heading.innerHTML = `<h2>From Learning to Earning: Get Job-Ready Today</h2>`;
//     headingSection.append(heading);
//     trending.append(headingSection);
//     const intro = document.createElement("div");
//     intro.innerHTML = `At Upnxt, we make learning practical, affordable, and future-ready. Through hands-on projects, expert mentorship, and career-focused training, we equip you with the skills employers demand so you can learn, build, and succeed with confidence`;
//     trending.append(intro);
//     document.querySelector("#section-wrapper").append(trending);
// }