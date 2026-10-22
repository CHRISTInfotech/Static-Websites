// Edit these fields with verified Crown & Craft business information.
const CONTACT_DETAILS = {
  address: "",             // Full shop/showroom address
  phone: "",               // Public phone number
  email: "",               // Public contact email
  openingHours: "",        // Confirmed opening hours
  whatsappNumber: "91XXXXXXXXXX", // Replace with country code + number; digits only
  mapsEmbedUrl: "",        // Google Maps embed URL for the confirmed location
  mapsDirectionsUrl: "",   // Google Maps directions/place URL
  socialProfiles: {         // Add verified profile URLs; blank links stay hidden
    Instagram: "",
    Facebook: "",
    YouTube: ""
  }
};
function buildWhatsAppLink(message) {
  const number = CONTACT_DETAILS.whatsappNumber.replace(/\D/g, "");
  const base = number && !number.includes("X") ? `https://wa.me/${number}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}
function setContactDetail(id, value, fallback, hrefPrefix) {
  const node = document.getElementById(id);
  if (!value) { node.textContent = fallback; node.removeAttribute("href"); return; }
  node.textContent = value;
  if (hrefPrefix) node.href = `${hrefPrefix}${value.replace(/\s/g, "")}`;
}
setContactDetail("shopAddress", CONTACT_DETAILS.address, "Address to be added");
setContactDetail("shopPhone", CONTACT_DETAILS.phone, "Phone number to be added", "tel:");
setContactDetail("shopEmail", CONTACT_DETAILS.email, "Email address to be added", "mailto:");
document.getElementById("shopHours").textContent = CONTACT_DETAILS.openingHours || "Opening hours to be confirmed";
const directMessage = "Hello Crown & Craft, I'd like to get in touch about trophies, awards or a personalised gift.";
["navChat", "contactWhatsapp", "footerWhatsapp"].forEach(id => { document.getElementById(id).href = buildWhatsAppLink(directMessage); });
if (CONTACT_DETAILS.mapsEmbedUrl) {
  const frame = document.getElementById("mapFrame");
  frame.src = CONTACT_DETAILS.mapsEmbedUrl;
  frame.classList.remove("d-none");
  document.getElementById("mapPlaceholder").classList.add("d-none");
}
if (CONTACT_DETAILS.mapsDirectionsUrl) {
  const link = document.getElementById("mapLink");
  link.href = CONTACT_DETAILS.mapsDirectionsUrl;
  link.classList.remove("d-none");
}
const socialRoot = document.getElementById("socialLinks");
const socialIcons = { Instagram: "bi-instagram", Facebook: "bi-facebook", YouTube: "bi-youtube" };
const socialEntries = Object.entries(CONTACT_DETAILS.socialProfiles).filter(([, url]) => url.trim());
if (socialEntries.length) socialRoot.innerHTML = socialEntries.map(([name, url]) => `<a href="${url}" target="_blank" rel="noopener" aria-label="Crown & Craft on ${name}"><i class="bi ${socialIcons[name]}"></i><span>${name}</span></a>`).join("");

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const phone = document.getElementById("contactPhone");
  const email = document.getElementById("contactEmail");
  const status = document.getElementById("formStatus");
  phone.setCustomValidity(phone.value.trim() || email.value.trim() ? "" : "Enter a phone number or email address so the shop can reply.");
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const message = [
    "Hello Crown & Craft, I have a contact enquiry.",
    `Name: ${document.getElementById("contactName").value.trim()}`,
    `Phone: ${phone.value.trim() || "Not provided"}`,
    `Email: ${email.value.trim() || "Not provided"}`,
    `Inquiry type: ${document.getElementById("inquiryType").value}`,
    `Message: ${document.getElementById("contactMessage").value.trim()}`
  ].join("\n");
  status.hidden = false;
  status.className = "form-status form-status-warning";
  status.textContent = "Your form is valid, but it was not sent or stored. A backend or email service must be connected to deliver form submissions. You can choose WhatsApp below to send this enquiry directly.";
  const fallback = document.getElementById("formWhatsappFallback");
  fallback.href = buildWhatsAppLink(message);
  fallback.classList.remove("d-none");
});
document.getElementById("contactPhone").addEventListener("input", () => document.getElementById("contactPhone").setCustomValidity(""));
document.getElementById("contactEmail").addEventListener("input", () => document.getElementById("contactPhone").setCustomValidity(""));
document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById('contactForm').addEventListener('input', () => { document.getElementById('formStatus').hidden = true; document.getElementById('formWhatsappFallback').classList.add('d-none'); });


