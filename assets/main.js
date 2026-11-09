// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

// Slideshows: <div class="slideshow" data-autoplay="5000"><img class="slide">...</div>
document.querySelectorAll(".slideshow").forEach((show) => {
  const slides = [...show.querySelectorAll(".slide")];
  if (slides.length < 2) { slides[0]?.classList.add("active"); return; }

  let i = 0, timer;
  const dots = document.createElement("div");
  dots.className = "slide-dots";
  const count = document.createElement("div");
  count.className = "slide-count";

  const go = (n) => {
    slides[i].classList.remove("active");
    dots.children[i].classList.remove("active");
    i = (n + slides.length) % slides.length;
    slides[i].classList.add("active");
    dots.children[i].classList.add("active");
    count.textContent = `${i + 1}/${slides.length}`;
    // Warm up the next image so it's ready before it fades in
    const next = slides[(i + 1) % slides.length];
    if (next.loading === "lazy") next.loading = "eager";
  };

  slides.forEach((_, n) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Go to photo ${n + 1}`);
    b.addEventListener("click", () => { go(n); restart(); });
    dots.appendChild(b);
  });

  const mk = (cls, label, sym, d) => {
    const b = document.createElement("button");
    b.className = `slide-btn ${cls}`;
    b.setAttribute("aria-label", label);
    b.innerHTML = sym;
    b.addEventListener("click", () => { go(i + d); restart(); });
    return b;
  };

  show.append(mk("prev", "Previous photo", "&#8249;", -1), mk("next", "Next photo", "&#8250;", 1), dots, count);

  const delay = +show.dataset.autoplay || 0;
  const restart = () => {
    clearInterval(timer);
    if (delay) timer = setInterval(() => go(i + 1), delay);
  };

  // Swipe support
  let x0 = null;
  show.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
  show.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); restart(); }
    x0 = null;
  });

  slides[0].classList.add("active");
  dots.children[0].classList.add("active");
  count.textContent = `1/${slides.length}`;
  restart();
});

// Fade-in on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Contact form (Netlify Forms). Submits via fetch so parents stay on the page.
const form = document.querySelector("form[name='contact']");
if (form) {
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    status.className = "form-status";
    status.textContent = "Sending…";
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.classList.add("ok");
      status.textContent = "Thank you! We'll get back to you as soon as possible.";
    } catch {
      status.classList.add("err");
      status.innerHTML = 'Sorry, something went wrong. Please email us at <a href="mailto:littlepapillonca@gmail.com">littlepapillonca@gmail.com</a>.';
    } finally {
      btn.disabled = false;
    }
  });
}

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
