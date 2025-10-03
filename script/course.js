

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
    addHeader(1);
    (async () => {
        const bannerEl = await addBanner();
        const learnEl = await content();

        main.append(bannerEl, learnEl);
    })();
    addFooter();
});

async function addBanner() {
    const courses = await fetchCourses();
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");
    const course = courses.find(c => c.id === courseId);
    const section = document.createElement("section");
    section.id = "course-banner";
    const about = document.createElement("div");
    about.id = 'about-part';
    const form = document.createElement("form");
    form.id = "details-container";
    form.setAttribute("action", "https://formsubmit.co/gorcidsemhtech@gmail.com");
    form.setAttribute("method", "POST");
    section.append(about);
    section.append(form);
    about.innerHTML = `<h1>${course.title}</h1><h1>${course.subTitle || ""}</h1>
                        <p>${course.description}</p>`;
    const tagWrapper = document.createElement("div");
    tagWrapper.id = "tag-wrapper";
    about.append(tagWrapper);
    // let tags = course.tags;
    // let tags = [];
    // tags.push(course.level);
    // tags.forEach(tag => {
    //     const badge = document.createElement("span");
    //     badge.className = "badge";
    //     badge.id = "tag";
    //     badge.innerHTML = tag;
    //     tagWrapper.append(badge);
    // });
    // const downloadButton = document.createElement("a");
    // downloadButton.innerHTML = `Download Brochure`;
    // tagWrapper.append(downloadButton);

    const heading = document.createElement("h2");
    heading.textContent = "Apply Now";

    // Name field
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.placeholder = "Name";
    nameInput.required = true;

    // Email field
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.placeholder = "Email";
    emailInput.required = true;

    // Number field
    const numberInput = document.createElement("input");
    numberInput.type = "tel";
    numberInput.name = "number";
    numberInput.placeholder = "Number";
    numberInput.required = true;

    const courseInput = document.createElement("input");
    courseInput.type = "hidden";
    courseInput.name = "course";
    courseInput.value = course.id;

    const captchaInput = document.createElement("input");
    captchaInput.type = "hidden";
    captchaInput.name = "_captcha";
    captchaInput.value = "false";
    // Submit button
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Enquire Now";

    // Success message (hidden by default)
    const successMsg = document.createElement("p");
    successMsg.textContent = "We will connect with you soon.";
    successMsg.style.display = "none";
    successMsg.style.textAlign = "center";

    // Append all elements to form
    form.append(heading, nameInput, emailInput, numberInput, courseInput, captchaInput, submitBtn, successMsg);

    // Handle form submission with fetch (no redirect)
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // stop normal form submit

        const formData = new FormData(form);

        fetch("https://formsubmit.co/gorcidsemhtech@gmail.com", {
            method: "POST",
            body: formData
        })
            .then(() => {
                successMsg.style.display = "block"; // show success
                form.reset(); // clear inputs
            })
            .catch(() => {
                successMsg.textContent = "Something went wrong. Please try again.";
                successMsg.style.display = "block";
            });
    });

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

    const outcome = createTickSection(course.outcomes, "What you'll learn");
    // const outcome1 = createDotSection(course.curriculum, "Curriculum");
    const curriculum = createAccordion(course.curriculum, "Curriculum");
    const requirements = createDotSection(course.requirements, "Requirements");

    textSection.append(outcome);
    textSection.append(curriculum);
    textSection.append(requirements);

    mainPart.append(textSection);
    mainPart.append(promoCard);
    return mainPart;
}

function createTickSection(items, string) {
    // Main card container
    const card = document.createElement("div");
    card.id = "box";

    // Header
    const header = document.createElement("div");
    header.id = "box-header";
    header.innerHTML = `<h2>${string}</h2>`;

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
    card.id = "course-promo";
    // Banner
    const banner = document.createElement("div");
    banner.id = "banner";

    // const iframe = document.createElement("iframe");
    // iframe.src = toYouTubeEmbed(c.preview);
    // iframe.title = c.title;
    // iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    // iframe.allowFullscreen = false;
    const img = document.createElement("img");
    img.src = imgPath(c.image);
    img.alt = c.image;
    banner.append(img);


    // Content
    const cardContentWrapper = document.createElement("div");
    cardContentWrapper.id = "card-content-wrapper";
    const cardContent = document.createElement("div");
    cardContent.id = "card-content";

    // Main wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "course-includes";

    // Heading
    const heading = document.createElement("h4");
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

    // Inject into DOM
    cardContent.append(wrapper);


    const priceTag = document.createElement("h3");
    priceTag.className = "price";
    // Discounted price
    priceTag.textContent = c.price[1];
    // Original price
    const originalPrice = document.createElement("span");
    originalPrice.className = "original";
    originalPrice.textContent = c.price[0];
    // Append span into h3
    priceTag.prepend(originalPrice);


    // Enroll button (separate action)
    const enroll = document.createElement("button");
    enroll.id = "enroll-main";
    enroll.className = "button1";
    enroll.textContent = "Enroll Now";
    enroll.addEventListener("click", (e) => {
        e.stopPropagation();
        openCourseModal(c);
    });

    // Assemble
    cardContentWrapper.append(priceTag);
    cardContentWrapper.append(enroll);
    cardContentWrapper.append(cardContent);


    card.append(banner);
    card.append(cardContentWrapper);
    // card.append(enroll);

    return card;
}

function createDotSection(items, string) {
    // Main card container
    const card = document.createElement("div");
    card.id = "box";

    // Header
    const header = document.createElement("div");
    header.id = "box-header";
    header.innerHTML = `<h2>${string}</h2>`;

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
        icon.classList.add("h-5", "w-5", "flex-shrink-0", "text-primary");

        // Create a dot (circle)
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "12");   // center x
        circle.setAttribute("cy", "12");   // center y
        circle.setAttribute("r", "4");     // radius of the dot
        icon.appendChild(circle);


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
//         head.innerHTML = `<input class="course-field" type="checkbox" id="faq-${index + 1}">
//   <h3 class="head"><label for="faq-${index + 1}"> <div class="icon-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down h-5 w-5 text-primary dark:text-primary flex-shrink-0"><path d="m6 9 6 6 6-6"></path></svg>
//   <div>${a.title}</div></div><div>${a.duration}</div></label></h3>
//   <div class="p">
//     <p>${a.content}</p>
//   </div>`;
        head.innerHTML = `<input class="course-field" type="checkbox" id="faq-${index + 1}">
  <h3 class="head"><label for="faq-${index + 1}"> <div class="icon-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down h-5 w-5 text-primary dark:text-primary flex-shrink-0"><path d="m6 9 6 6 6-6"></path></svg>
  <div style="font-weight:500">${a.title}</div></div></label></h3>
  <div class="p">
    <p>${a.content}</p>
  </div>`;
        content.append(head);
    });
    card.append(header, content);
    return card;
}

function toYouTubeEmbed(url) {
    const regExp = /^.*(?:youtu.be\/|watch\?v=|embed\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[1].length === 11) {
        return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
    }
    return url;
}

// modal.js

// Function to create and show modal
function openCourseModal(course) {
    // Remove existing modal if present
    const existingModal = document.getElementById("course-modal");
    if (existingModal) existingModal.remove();

    // Create modal container
    const modal = document.createElement("div");
    modal.id = "course-modal";
    modal.className = "modal-overlay";

    modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" id="modal-close">&times;</button>
      <h2>Checkout</h2>
      <h3>${course.title}</h3>
      <div id="card-content-wrapper"></div>
      <div class="modal-footer"><h3 class="price"></h3><form id="payment-form"></form></div>
      </div>
  `;

    // Content
    const cardContentWrapper = modal.querySelector("#card-content-wrapper");
    const cardContent = document.createElement("div");
    cardContent.id = "card-content";
    cardContent.style.padding = "0";

    // Main wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "course-includes";
    wrapper.style.fontSize = "0.75rem";

    // Heading
    const heading = document.createElement("h4");
    heading.textContent = "This course includes:";
    wrapper.appendChild(heading);

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
    course.inclusions.forEach(feature => {
        const li = document.createElement("li");
        const icon = createCheckIcon();
        li.appendChild(icon);
        li.appendChild(document.createTextNode(feature));
        li.style.marginBottom = '0';
        ul.appendChild(li);
    });

    wrapper.appendChild(ul);

    // Inject into DOM
    cardContent.append(wrapper);

    const priceTag = modal.querySelector(".price");
    priceTag.style.padding = '0';
    priceTag.style.fontSize = '1.25rem';
    priceTag.style.width = "fit-content";
    priceTag.textContent = "Price: ";
    // Original price
    const originalPrice = document.createElement("span");
    originalPrice.className = "original";
    originalPrice.style.marginLeft = '0';
    originalPrice.textContent = course.price[0];

    const discounted = document.createTextNode(" " + course.price[1]);

    priceTag.append(originalPrice, " ", discounted);
    cardContentWrapper.append(cardContent);
    // cardContentWrapper.append(priceTag);

    document.body.appendChild(modal);

    // Close button functionality
    document.getElementById("modal-close").onclick = () => modal.remove();

    // Outside click closes modal
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    (async () => {
        const user = firebase.auth().currentUser;

        if (!user) {
            window.location.href = "../auth/login.html"; // replace with your sign-in page URL
            return;
        }
        const idToken = await user.getIdToken();

        const paymentForm = document.getElementById("payment-form");

        // Create a dynamic form for Razorpay button with success URL
        const form = document.createElement("form");
        form.method = "GET";
        form.action = `https://<REGION>-<PROJECT>.cloudfunctions.net/verifyPayment?courseId=${course.id}&idToken=${idToken}`;

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.setAttribute("data-payment_button_id", course.paymentButton);
        script.async = true;

        form.appendChild(script);
        paymentForm.appendChild(form);
    })();




    // // Proceed to payment button
    // const script = document.createElement("script");
    // script.src = "https://checkout.razorpay.com/v1/payment-button.js";

    // script.setAttribute("data-payment_button_id", course.paymentButton); // replace with your ID
    // script.async = true;
    // document.getElementById("payment-form").appendChild(script);

}