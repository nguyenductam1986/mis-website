# How to add a news post

1. Upload the photo to `images/` (JPG, about 1600 px wide, short name without spaces, e.g. `n05-bess-site.jpg`).
2. In GitHub, open the `_posts` folder → **Add file → Create new file**.
3. Name the file `YYYY-MM-DD-short-name.md`, e.g. `2026-12-05-bess-grid-code-note.md`. The date sets the order; the short name becomes the link: `https://mi-energies.com/news/bess-grid-code-note/`. Do not change the short name after publishing (it breaks shared links).
4. Paste and edit this template:

```
---
title: "Title of the post"
date: 2026-12-05
category: Market            # Company or Market
date_label: "5 December 2026" # text shown to readers (optional)
summary: "One or two sentences. Shown on cards, in search results and to AI assistants."
image: /images/n05-bess-site.jpg
image_alt: "What the photo shows"
source_label: "Decision 768/QD-TTg"      # optional, for market notes
source_url: https://example.gov.vn/...    # optional
---

First paragraph.

Second paragraph. Use **bold** for emphasis, and [link text](https://...) for links.
```

5. **Commit changes**. The site rebuilds in 1–2 minutes. Check the post, then share the link.

Tips for AI and search: put the key facts (who, what, where, when, MW/kV, scope) in the title, summary and first paragraph, in plain text. Do not put important text only inside images.
