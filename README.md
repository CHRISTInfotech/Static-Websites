# Website Collection

This repository contains three standalone, static storefront websites. Each site has its own HTML entry point, styles, and JavaScript; no build step or package installation is required.

## Websites

| Website | Description | Entry point |
| --- | --- | --- |
| **AuraMist** | Body spray and fragrance mist catalog with category links, product search, and WhatsApp inquiry links. | [`Spray_Website/index.html`](Spray_Website/index.html) |
| **AquaWorld** | Aquarium and aquatic life storefront for fish, plants, and aquarium supplies, with catalog browsing and shop information. | [`Fish_Website/Fish_Aquarium/index.html`](Fish_Website/Fish_Aquarium/index.html) |
| **Crown & Craft** | Trophies, awards, and gifts catalog with product details and separate about and contact pages. | [`Trophy_Website/Trophy/index.html`](Trophy_Website/Trophy/index.html) |

## Run locally

Open any entry point above in a browser, or serve the repository directory with a local static server. For example, with Python installed:

```bash
python -m http.server 8000
```

Then visit the matching path:

- `http://localhost:8000/Spray_Website/`
- `http://localhost:8000/Fish_Website/Fish_Aquarium/`
- `http://localhost:8000/Trophy_Website/Trophy/`

## Project layout

```text
Spray_Website/
  index.html
  css/style.css
  js/script.js

Fish_Website/Fish_Aquarium/
  index.html
  css/style.css
  js/script.js
  images/

Trophy_Website/Trophy/
  index.html
  about.html
  contact.html
  css/
  js/
  images/
```

## Notes

- Bootstrap 5.3.3, Bootstrap Icons 1.11.3, and web fonts are loaded from CDNs. An internet connection is needed for those external assets.
- Product catalogs and prices are demonstration content. Confirm current products, prices, availability, and contact details with the relevant shop before using a site as a live storefront.
- The websites are independent; edit the files within each website directory to customize that site.
