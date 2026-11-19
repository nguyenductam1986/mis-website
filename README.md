# MiS website (v1.5, aligned with Company Introduction 2026 brochure)

Static website: upload the whole folder to any web host (public_html / www). The home page is `index.html`.

## Pages
- index.html – Home
- services/index.html – Services (five advisory packages, control solutions, market partner)
- projects/index.html – MiS references (MSSP Lopburi, Birla Carbon Thailand)
- about/index.html – About, team, team experience, contact
- news/index.html – News list · post/index.html – single news post

## Add or edit news
News is built by GitHub Pages (Jekyll) into plain HTML pages, so visitors, search engines and AI assistants can all read it. See HOW_TO_ADD_NEWS.md. In short: add one file to `_posts/` named `YYYY-MM-DD-short-name.md`; it appears at `/news/short-name/`, on the News page, the home page (three newest), `/sitemap.xml`, `/feed.xml` and `/llms.txt` within a minute or two.

## Change text or photos
Edit the .html files directly. The header and footer are repeated in every .html file, so change them in all six. Photos are in `images/`; keep the same file name to replace a photo everywhere. Colours and layout are in `css/style.css`.

## Contact form
The form on /about/#contact sends the message directly to info@mi-energies.com through a Google Apps Script web app (code kept outside this repo: MiS_contact_form_AppsScript.gs). The web app URL is set in `js/main.js` (FORM_ENDPOINT). Every message is also logged in the Google Sheet "MiS Website Enquiries".

## GitHub Pages URLs
Pages use directory URLs: `/`, `/services/`, `/projects/`, `/about/`, `/news/`, and news posts at `/news/<short-name>/`. Old links `/post/?id=...` redirect to the new post URLs. Edit each directory’s `index.html`. The legacy root `.html` pages redirect old bookmarks, preserving query strings and anchors when JavaScript is enabled. Assets and internal links use site-root paths. Preview with a local HTTP server at the domain root.
