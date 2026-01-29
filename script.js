const issues = document.querySelectorAll(".issue");
const navItems = document.querySelectorAll("nav li");
const links = document.querySelectorAll(".change-fg");

const observer = new IntersectionObserver(
  (entries) => {
    let best = null;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!best || entry.intersectionRatio > best.intersectionRatio) {
          best = entry;
        }
      }
    });

    if (best) {
      const bgcolor = best.target.dataset.bg;
      const fgcolor = best.target.dataset.fg;
      document.body.style.backgroundColor = bgcolor;

      links.forEach((a) => {
        a.style.color = fgcolor;
      });

      const id = best.target.id;

      navItems.forEach((item) => {
        item.classList.remove("active");
        const link = item.querySelector("a");
        if (link.getAttribute("href") === `#${id}`) {
          item.classList.add("active");
        }
      });
    }
  },
  {
    threshold: [0.25, 0.5, 0.75],
  },
);

issues.forEach((issue) => observer.observe(issue));
