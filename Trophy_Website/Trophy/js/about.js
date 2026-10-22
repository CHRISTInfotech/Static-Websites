// Optional proof points. Populate only with details Crown & Craft has verified.
const ABOUT_FACTS = {
  story: "",            // Verified business history or founding story
  certifications: [],   // Verified certifications
  awards: [],           // Verified awards and recognition
  customerCount: ""    // Verified customer count, if you choose to publish it
};
const factEntries = [
  ["Our story", ABOUT_FACTS.story],
  ["Certifications", ABOUT_FACTS.certifications.join(" · ")],
  ["Awards", ABOUT_FACTS.awards.join(" · ")],
  ["Customers", ABOUT_FACTS.customerCount]
].filter(([, value]) => value);
if (factEntries.length) {
  const section = document.getElementById("aboutProof");
  section.hidden = false;
  document.getElementById("aboutProofContent").innerHTML = `<div class="about-proof-list">${factEntries.map(([label, value]) => `<div class="about-proof-item"><span>${label}</span><b>${value}</b></div>`).join("")}</div>`;
}
document.getElementById("year").textContent = new Date().getFullYear();

const ABOUT_WHATSAPP_NUMBER="91XXXXXXXXXX"; // Replace with country code + shop number, digits only.
const aboutNumber=ABOUT_WHATSAPP_NUMBER.replace(/\D/g,"");
document.getElementById("navChat").href=`https://wa.me/${aboutNumber&&!aboutNumber.includes("X")?aboutNumber:""}?text=${encodeURIComponent("Hello Crown & Craft, I have an enquiry about trophies, awards or a personalised gift.")}`;
