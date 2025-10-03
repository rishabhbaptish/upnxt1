document.addEventListener("DOMContentLoaded", function () {
    addHeader(1);
    addTerms();
    addFooter();
});

function addTerms() {
    const main = document.querySelector(".main");
    const terms = document.createElement("div");
    terms.id = "terms-container";
    terms.innerHTML = `<h1>Refund Policy</h1>
    <p>At UpNext, we value your commitment to learning and take pride in providing high-quality training.</p>
    <p>Please note that we do not offer refunds once you started the class.</p>
    <p>The enrollment fee is non-refundable under any circumstances after the commencement of the course.</p>
    <p>We encourage students to review all course details carefully before enrolling.</p>
    <p>If you have any questions prior to joining, our team is always available to assist you.</p>`;
    main.append(terms);
}