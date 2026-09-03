# The Beef-Stew Co.

> **We do stew. Beef-Stew.**

[The Beef-Stew Co.](https://beef-stew.com/) is a polished corporate website for a global company with a narrow mandate: the responsible advancement of beef-stew.

The project presents beef-stew with the institutional seriousness normally reserved for annual reports, infrastructure projects, and matters requiring executive oversight. The humor is intentionally dry. The site does not wink at the audience, explain the joke, or use more broth-related governance language than necessary.

## Live Site

Visit [beef-stew.com](https://beef-stew.com/).

## What This Repository Contains

- A responsive public-facing corporate homepage
- A storefront for official Beef-Stew merchandise
- A minimalist Client Services portal
- Privacy Policy and Terms of Service pages
- Search-engine support through `robots.txt` and `sitemap.xml`
- A navy-and-gold favicon suite
- Static assets and replaceable image files
- A lightweight Nginx deployment suitable for Docker Compose

## Storefront

The storefront is being prepared to offer a limited selection of company-approved articles:

- **Certified Beef-Stew**  
  A shelf-stable expression of the company’s core mandate.

- **Advanced Beef-Stew Spoon**  
  A high-technology eating instrument consisting of one normal spoon.

- **Business Attire Apron**  
  For wearing over business attire whenever beef-stew is on the menu.

Checkout will use externally hosted payment links. Product pricing, availability, shipping terms, and fulfillment details should be completed before payment links are activated.

## Client Services

The public site includes a small **Client Login** button leading to a novelty password screen and a directory of separately hosted services.

The portal is intentionally theatrical and is **not a security boundary**. Its access phrase is checked in browser-side JavaScript and can be discovered by inspecting the source. Each linked service is responsible for its own authentication and security.

Do not place private information, credentials, administrative tools, or sensitive resources behind the novelty login alone.

## Technology

The site is intentionally simple:

- Static HTML
- Static CSS
- Minimal JavaScript for the novelty Client Services prompt
- Nginx
- Docker Compose

There is no frontend framework, build pipeline, database, server-side application, or package installation requirement.

## Repository Structure

```text
.
├── docker-compose.yml
├── nginx.conf
└── site/
    ├── index.html
    ├── store.html
    ├── login.html
    ├── portal.html
    ├── privacy.html
    ├── terms.html
    ├── robots.txt
    ├── sitemap.xml
    ├── favicon.ico
    ├── apple-touch-icon.png
    └── assets/
        ├── site.css
        ├── portal.js
        └── images/
```

The exact repository contents may vary as the storefront and photography are refined.

## Local Deployment

The site can be served with any static web server. The included Compose configuration uses Nginx:

```bash
docker compose up -d
```

By default, the container serves the site through the port specified in `docker-compose.yml`. In production, place the site behind an HTTPS-enabled reverse proxy.

## Synology Deployment

This project is designed to run cleanly from:

```text
/volume1/docker/beef-stew-site/
```

A typical deployment uses read-only bind mounts for the public site and Nginx configuration:

```yaml
services:
  beef-stew-web:
    image: nginx:alpine
    container_name: beef-stew-web
    restart: unless-stopped
    ports:
      - "8088:80"
    volumes:
      - ./site:/usr/share/nginx/html:ro
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
```

After updating files:

```bash
cd /volume1/docker/beef-stew-site
docker compose up -d --force-recreate
```

Because the site directory is bind-mounted, most static-file changes do not require rebuilding an image.

## Updating Images

Images are stored in:

```text
site/assets/images/
```

For predictable layout and caching behavior:

1. Export images as WebP.
2. Use sRGB color.
3. Keep the long edge around 1,600 to 2,000 pixels.
4. Use quality settings around 75 to 85.
5. Prefer a new filename when replacing an image that may have been cached.
6. Update the matching path in the relevant HTML or CSS file.

The visual direction is restrained corporate editorial photography: glass, steel, dark suits, controlled lighting, agricultural infrastructure, spotless production environments, and individuals taking stew more seriously than circumstances require.

## Cache Busting

When a browser retains an older CSS, JavaScript, or image file, change the asset URL by adding or incrementing a version query:

```html
<link rel="stylesheet" href="assets/site.css?v=5">
<script defer src="assets/portal.js?v=5"></script>
```

For images, a versioned filename is even clearer:

```text
product-can-v2.webp
```

Long-lived `immutable` cache headers should be used only when asset URLs change whenever the underlying content changes.

## Search and Sharing

The project includes:

- Canonical metadata
- Page descriptions
- Open Graph metadata
- Favicons and an Apple touch icon
- `robots.txt`
- `sitemap.xml`

After deployment, the domain can be verified through Google Search Console and the sitemap can be submitted for discovery.

## Legal and Commerce Notes

The repository includes draft public-facing legal pages for the website and planned merchandise storefront. Before accepting orders, those documents should be reviewed against the company’s actual practices, including:

- Business and trade-name status
- Product pricing and availability
- Shipping destinations and delivery estimates
- Returns and refunds
- Food-product restrictions
- Customer-service contact information
- Payment processing
- Analytics, advertising, and cookies
- Data retention

The site’s humorous corporate presentation should not replace accurate product descriptions, checkout disclosures, or fulfillment policies.

## Development Principles

Changes to the site should preserve four rules:

1. **Keep it visually credible.** The design should resemble a conservative public company, not a parody template.
2. **Keep the joke dry.** The company treats beef-stew as serious institutional work.
3. **Cut aggressively.** One strong line is better than three variations of the same joke.
4. **Keep the deployment boring.** Static files and a small Nginx container are sufficient.

## Contributing

Issues and pull requests are welcome, particularly for:

- Accessibility improvements
- Mobile layout corrections
- Performance improvements
- Metadata and search improvements
- Small, unusually disciplined additions to the company’s public position on stew

Large rewrites, excessive animation, startup language, and jokes that explain themselves are unlikely to survive executive review.

## License

No open-source license is currently stated in this repository. Unless a license is added, the repository’s code, written content, branding, and visual assets should not be assumed to be licensed for reuse.

## Contact

For corporate inquiries, visit [beef-stew.com](https://beef-stew.com/) or email [enquiries@beef-stew.com](mailto:enquiries@beef-stew.com).

---

**The Beef-Stew Co.**  
A global company. A specific responsibility.
