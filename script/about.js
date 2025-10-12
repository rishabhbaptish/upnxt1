document.addEventListener("DOMContentLoaded", function () {
    addHeader(1);
    addTerms();
    addFooter();
});

function addTerms() {
    const main = document.querySelector(".main");
    const terms = document.createElement("div");
    terms.id = "terms-container";
    terms.innerHTML = `<h1>About Us</h1>
    <p>At Upnxt, founded by Tarun Sharma, we are committed to making learning practical, affordable, and future-ready.</p> 
    <p>Our programs combine hands-on projects, expert mentorship, and career-focused training to equip learners with the skills that today's employers demand.</p> 
    <p>From mastering emerging technologies to building real-world applications, we help students and professionals gain the confidence and expertise to succeed in their careers.</p> 
    <p>With UpnXt, learning isn't just about theory it's about doing, growing, and achieving your goals in a rapidly evolving world.</p>`;
    main.append(terms);
}