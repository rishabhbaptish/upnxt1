function addContact() {
  const contactBar = document.createElement("div");
  contactBar.className = "contact-bar";
  contactBar.innerHTML = `
    <div class="desktop-view">
    <a class="contact-link" id="caller">Call Now at +91 9547914894</a> |
    <a href="https://wa.me/919547914894" target="_blank" class="contact-link">Connect on WhatsApp</a>
  </div>

  <div class="mobile-view">
    <a href="https://wa.me/919547914894" target="_blank" class="mobile-btn whatsapp-btn">
      <i class="fa-brands fa-whatsapp"></i> WhatsApp </a>
    <a href="tel:+919547914894" class="mobile-btn call-btn">
    <i class="fa-solid fa-phone"></i>  Call Now</a>
  </div>
    `;
  document.body.append(contactBar)
}