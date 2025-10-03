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

function addTagLine() {
    const mainContainer = document.createElement("div");
    mainContainer.className = "com-details";

    mainContainer.innerHTML = `
    <div class="tagLine">the future belongs to the <span class="last-word">skilled.</span></div>
    `;

    return mainContainer;
}

function addDetails() {
    const mainContainer = document.createElement("div");
    mainContainer.className = "com-details";

    mainContainer.innerHTML = `
    <div class="logo" style="cursor:default"><span>about upn<span class="text-blue">X</span>t</span></div>
    `;

    return mainContainer;
}

function addAboutUs() {
    const mainContainer = document.createElement("div");
    mainContainer.className = "com-details";

    mainContainer.innerHTML = `
    <div>Contact Us</div>
    <a class="mail" href="mailto:business@upnxt.in">business@upnxt.in</a>
    <a class="mail" href="mailto:support@upnxt.in">support@upnxt.in</a>
    <div class="detail" id="terms">Cancellation & Refund Policy</div>
    `;
    mainContainer.querySelector("#terms").addEventListener("click", () => {
        window.location.href = `${BASE_URL}/terms`;
    });
    return mainContainer;
}