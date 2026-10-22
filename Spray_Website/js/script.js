/* ===== EDIT THESE TWO THINGS ===== */
// 1. Your WhatsApp number: country code + number, digits only (no + or spaces)
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

// 2. Your products. Add, remove or change items here.
//    color = the bottle colour shown on the card (any hex code)
const PRODUCTS = [
  { name: "Black Onyx",      category: "For Him",  color: "#1a1a1a", image: "photo-1594035910387-fea47794261f", price: 249, desc: "Deep woody musk with a hint of amber. Bold and long-lasting." },
  { name: "Crimson Night",   category: "For Him",  color: "#d62828", image: "photo-1674318881563-84ba1a53d9c4", price: 249, desc: "Warm spice and leather for evening confidence." },
  { name: "Citrus Blaze",    category: "For Him",  color: "#f7b500", image: "photo-1595425970377-c9703cf48b6d", price: 229, desc: "Zesty lemon and bergamot for an all-day fresh feel." },
  { name: "Scarlet Rose",    category: "For Her",  color: "#c0203a", image: "photo-1458538977777-0549b2370168", price: 269, desc: "Soft rose and vanilla with a sweet, elegant trail." },
  { name: "Golden Bloom",    category: "For Her",  color: "#f2b705", image: "photo-1700665053090-e64274eeba84", price: 269, desc: "Sunny jasmine and peach, light and cheerful." },
  { name: "Velvet Noir",     category: "For Her",  color: "#2b2b2b", image: "photo-1636730499103-eb2397ed29e4", price: 289, desc: "Dark plum and sandalwood with a mysterious finish." },
  { name: "Amber Spark",     category: "Unisex",   color: "#e0a100", image: "photo-1723391962110-299d412ca046", price: 259, desc: "Warm amber and citrus that suits everyone." },
  { name: "Midnight Fresh",  category: "Unisex",   color: "#222222", image: "photo-1643139010926-1dbb28e335c9", price: 239, desc: "Cool, clean aquatic notes for daily wear." },
  { name: "Rouge Spice",     category: "Unisex",   color: "#b01e1e", image: "photo-1695049999693-bf4f95cfae6e", price: 259, desc: "Cinnamon and pepper with a smooth, cosy finish." },
  { name: "Coastal Drift",   category: "For Him",  color: "#547b83", image: "photo-1676349006826-ef0df629c4ea", price: 279, desc: "Cool sea breeze and crisp citrus with a clean, airy finish." },
  { name: "Petal Reverie",   category: "For Her",  color: "#c98791", image: "photo-1587304946998-46c19a031b44", price: 289, desc: "Delicate peony and soft musk with a graceful floral trail." },
  { name: "Saffron Dusk",    category: "Unisex",   color: "#b27642", image: "photo-1643696206555-4f725bc50c30", price: 299, desc: "Golden saffron, amber and woods for a warm, enveloping scent." }
];
/* ================================== */

const grid = document.getElementById("grid");
const searchBox = document.getElementById("search");
const emptyMsg = document.getElementById("empty");
let activeCategory = "All";

function waLink(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

function canSvg(color) {
  return `<svg viewBox="0 0 70 160" aria-hidden="true">
    <rect x="21" y="2" width="28" height="30" rx="6" fill="#222"/>
    <rect x="25" y="30" width="20" height="8" fill="#bdbdbd"/>
    <rect x="15" y="36" width="40" height="118" rx="9" fill="${color}"/>
    <rect x="21" y="46" width="7" height="98" rx="3.5" fill="rgba(255,255,255,.28)"/>
    <rect x="15" y="78" width="40" height="38" fill="rgba(255,255,255,.9)"/>
    <rect x="22" y="87" width="26" height="5" rx="2" fill="#222"/>
    <rect x="22" y="96" width="16" height="4" rx="2" fill="#999"/>
  </svg>`;
}

function renderProducts() {
  const q = searchBox.value.trim().toLowerCase();
  const list = PRODUCTS.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    (p.name + " " + p.category + " " + p.desc).toLowerCase().includes(q)
  );
  grid.innerHTML = list.map(p => {
    const msg = `Hello, I'm interested in ${p.name} body spray (₹${p.price}). Is it available?`;
    return `<div class="col-6 col-md-4 col-lg-3">
      <div class="product">
        <div class="visual"><img src="https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=720&q=82" alt="Perfume bottle for ${p.name}" loading="lazy"></div>
        <div class="body">
          <span class="tag">${p.category}</span>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="price">₹${p.price}</div>
          <a class="btn btn-red" href="${waLink(msg)}" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i> Order on WhatsApp</a>
        </div>
      </div>
    </div>`;
  }).join("");
  emptyMsg.classList.toggle("d-none", list.length > 0);
}

document.getElementById("categories").addEventListener("click", e => {
  const categoryLink = e.target.closest("[data-category]");
  if (!categoryLink) return;
  activeCategory = categoryLink.dataset.category;
  renderProducts();
});
document.getElementById("catalogNav").addEventListener("click", () => {
  activeCategory = "All";
  renderProducts();
});
searchBox.addEventListener("input", renderProducts);

// General chat links (navbar, hero, floating button)
const generalMsg = "Hello, I'd like to know more about your body sprays.";
["navChat", "heroChat", "floatChat"].forEach(id => {
  document.getElementById(id).href = waLink(generalMsg);
});

document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
