# Little Papillon Childcare website

Plain HTML/CSS/JS. No build step, no framework, nothing to update.

```
index.html       Home
about.html       About Us
offerings.html   Our Offerings
programs.html    Programs (photo slideshows)
contact.html     Contact + form
assets/          style.css, main.js
images/          logo, photos (home/, programs/)
_redirects       keeps the old Wix URLs (/about-us etc.) working
serve.py         local preview only
```

## Preview locally
    python3 serve.py        # then open http://localhost:5173

## Contact form (EmailJS)
The form sends through EmailJS, so it works on any host.
1. At emailjs.com: add an Email Service (Gmail, littlepapillonca@gmail.com) and an Email Template.
2. In the template use `{{name}}`, `{{child_age}}`, `{{email}}`, `{{phone}}`, `{{message}}`.
   Set "Reply To" to `{{email}}` so replies go straight to the parent.
3. Paste the public key, service ID and template ID into `EMAILJS` at the bottom of assets/main.js.
4. Under Account > Security, restrict requests to littlepapillon.ca.

## Deploy for free (Netlify, Cloudflare Pages or GitHub Pages)
1. Sign up at netlify.com, then choose "Add new site" > "Deploy manually" and drag this folder in.
2. Domain: Domain management > Add a domain > littlepapillon.ca. Follow the DNS steps.
   Move the domain off Wix first, or point its DNS at Netlify, *before* you cancel the Wix plan.

## Editing
- Text: open the .html file and edit the words between the tags.
- Add slideshow photos: drop a .jpg into images/programs/ and copy one
  `<img class="slide" ...>` line inside the matching slideshow in programs.html.
- Colours live at the top of assets/style.css.
