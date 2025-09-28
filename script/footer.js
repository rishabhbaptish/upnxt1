function addFooter() {
    const footer = document.querySelector(".site-footer");
    footer.innerHTML = "";

    const container = document.createElement("div");
    container.className = "footer-container";
    footer.append(container);
    let tagLine = addTagLine();
    let details = addDetails();
    let aboutUs = addAboutUs();
    container.append(tagLine);
    container.append(details);
    container.append(aboutUs);

}

function addTagLine(){
    const mainContainer = document.createElement("div");
    mainContainer.className = "com-details";

    mainContainer.innerHTML = `
    <div class="tagLine">the future belongs to the</div>
    <div class="tagLine">skilled.</div>
    `;

    return mainContainer;
}

function addDetails(){
    const mainContainer = document.createElement("div");
    mainContainer.className = "com-details";

    mainContainer.innerHTML = `
    <div class="logo"><span>upn<span class="text-blue">X</span>t</span></div>
    <div class="detail">mail.id@jfkf.com</div>
    <div class="detail">mail.id@jfkf.com</div>
    `;

    return mainContainer;
}

function addAboutUs(){
    const mainContainer = document.createElement("div");
    mainContainer.className = "com-details";

    mainContainer.innerHTML = `
    <div class="detail">About Us</div>
    <div class="detail">Terms & Conditions</div>
    <div class="detail">Cancellation & Refund Policy</div>
    <div class="detail">Shipping & Delivery Policy</div>
    `;

    return mainContainer;
}