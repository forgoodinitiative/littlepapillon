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

## Deploy for free (Netlify, recommended because the contact form works out of the box)
1. Sign up at netlify.com, then choose "Add new site" > "Deploy manually" and drag this folder in.
2. Go to Site configuration > Forms and turn on form detection, then redeploy.
   Under Forms > Notifications, add an email notification so submissions reach littlepapillonca@gmail.com.
3. Domain: Domain management > Add a domain > littlepapillon.ca. Follow the DNS steps.
   Move the domain off Wix first, or point its DNS at Netlify, *before* you cancel the Wix plan.

Cloudflare Pages and GitHub Pages also work, but the contact form needs a
service such as Formspree there: set the form's `action` to your Formspree URL.

## Editing
- Text: open the .html file and edit the words between the tags.
- Add slideshow photos: drop a .jpg into images/programs/ and copy one
  `<img class="slide" ...>` line inside the matching slideshow in programs.html.
- Colours live at the top of assets/style.css.
