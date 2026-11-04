

/* =====================================

   ROHID VIP PORTFOLIO — script.js

   ===================================== */



"use strict";



/* 1. Portfolio settings */

const PORTFOLIO_CONFIG = {

  name: "Rohidullah Shgyiwal",

  email: "rohidzakhil3@gmail.com",

  whatsapp: "93764677135",

  socials: {

    tiktok: "",

    github: "",

    linkedin: "",

    telegram: ""

  }

};



/* 2. Helper functions */

const $ = (selector, root = document) =>

  root.querySelector(selector);



const $$ = (selector, root = document) =>

  [...root.querySelectorAll(selector)];



function showToast(message) {

  const toast = $("#toast");

  if (!toast) return;



  toast.textContent = message;

  toast.classList.add("show");



  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {

    toast.classList.remove("show");

  }, 3200);

}



/* Update footer year */

$$(".year").forEach(element => {

  element.textContent = new Date().getFullYear();

});



/* 3. Render Lucide icons safely */

function renderIcons() {

  if (window.lucide && typeof window.lucide.createIcons === "function") {

    window.lucide.createIcons();

  }

}



renderIcons();



/* 4. Dark / Light theme */

const themeToggle = $("#themeToggle");



if (themeToggle) {

  const updateThemeIcon = () => {

    const isLight = document.body.classList.contains("light-theme");



    themeToggle.innerHTML = isLight

      ? '<i data-lucide="moon"></i>'

      : '<i data-lucide="sun-moon"></i>';



    themeToggle.setAttribute(

      "aria-label",

      isLight ? "Switch to dark theme" : "Switch to light theme"

    );



    renderIcons();

  };



  updateThemeIcon();



  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");



    const isLight = document.body.classList.contains("light-theme");

    updateThemeIcon();



    showToast(isLight ? "Light theme enabled" : "Dark theme enabled");

  });

}



/* 5. Mobile sidebar */

const sidebar = $("#sidebar");

const menuToggle = $("#menuToggle");



function setMobileMenu(isOpen) {

  if (!sidebar || !menuToggle) return;



  sidebar.classList.toggle("open", isOpen);

  menuToggle.setAttribute("aria-expanded", String(isOpen));



  menuToggle.innerHTML = isOpen

    ? '<i data-lucide="x"></i>'

    : '<i data-lucide="menu"></i>';



  renderIcons();

}



if (menuToggle && sidebar) {

  menuToggle.addEventListener("click", () => {

    setMobileMenu(!sidebar.classList.contains("open"));

  });



  $$(".nav-link").forEach(link => {

    link.addEventListener("click", () => setMobileMenu(false));

  });



  document.addEventListener("click", event => {

    if (

      window.innerWidth <= 800 &&

      sidebar.classList.contains("open") &&

      !sidebar.contains(event.target) &&

      !menuToggle.contains(event.target)

    ) {

      setMobileMenu(false);

    }

  });



  window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {

      setMobileMenu(false);

    }

  });

}



/* 6. Highlight the current navigation section */

const sections = $$("main section[id]");

const navLinks = $$(".nav-link");



if ("IntersectionObserver" in window && sections.length) {

  const navObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;



      navLinks.forEach(link => {

        const isActive =

          link.getAttribute("href") === `#${entry.target.id}`;



        link.classList.toggle("active", isActive);

      });

    });

  }, {

    rootMargin: "-30% 0px -55% 0px"

  });



  sections.forEach(section => navObserver.observe(section));

}



/* 7. Typing animation */

const roleElement = $("#typedRole");



const roles = [

  "Software Engineer",

  "Web Developer",

  "Problem Solver",

  "Lifelong Learner"

];



if (roleElement) {

  const reduceMotion = window.matchMedia(

    "(prefers-reduced-motion: reduce)"

  ).matches;



  if (reduceMotion) {

    roleElement.textContent = roles[0];

  } else {

    let roleIndex = 0;

    let charIndex = 0;

    let deleting = false;



    function typeRole() {

      if (!roleElement.isConnected) return;



      const currentRole = roles[roleIndex];

      roleElement.textContent = currentRole.slice(0, charIndex);



      if (!deleting && charIndex < currentRole.length) {

        charIndex++;

        setTimeout(typeRole, 85);

      } else if (!deleting) {

        deleting = true;

        setTimeout(typeRole, 1400);

      } else if (charIndex > 0) {

        charIndex--;

        setTimeout(typeRole, 42);

      } else {

        deleting = false;

        roleIndex = (roleIndex + 1) % roles.length;

        setTimeout(typeRole, 350);

      }

    }



    setTimeout(typeRole, 450);

  }

}



/* 8. Reveal animations */

const revealItems = $$(".reveal");

const reduceMotion = window.matchMedia(

  "(prefers-reduced-motion: reduce)"

).matches;



if (

  "IntersectionObserver" in window &&

  !reduceMotion

) {

  const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;



      entry.target.classList.add("visible");

      revealObserver.unobserve(entry.target);

    });

  }, {

    threshold: 0.08

  });



  revealItems.forEach(item => revealObserver.observe(item));

} else {

  revealItems.forEach(item => item.classList.add("visible"));

}



/* 9. Project category filters */

const filterButtons = $$(".filter-button");

const projectCards = $$(".project-card");



filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(item => {

      item.classList.toggle("active", item === button);

    });



    const filter = button.dataset.filter || "all";



    projectCards.forEach(card => {

      const categories = (card.dataset.category || "")

        .split(/\s+/)

        .filter(Boolean);



      const shouldShow =

        filter === "all" || categories.includes(filter);



      card.classList.toggle("hidden", !shouldShow);

    });

  });

});



/* 10. Project details */

const projectInfo = {

  fuel: {

    title: "FuelPro Management",

    description:

      "A fuel-pump management project concept focused on tracking sales, fuel stock, customers, and reports. A future version can connect to a secure database and support multiple users.",

    tags: ["HTML", "CSS", "JavaScript", "Dashboard"]

  },



  room: {

    title: "VIP Room Manager",

    description:

      "A shared-expense tracking concept for a room or group. It can record member contributions, shared expenses, and a clear balance summary.",

    tags: ["Expense Tracking", "Responsive UI", "JavaScript"]

  },



  school: {

    title: "VIP School Management",

    description:

      "A school administration concept for student profiles, subjects, attendance, and results. A production version should use a secure server and database.",

    tags: ["Education", "Records", "Web App"]

  },



  profile: {

    title: "Rohid VIP Profile",

    description:

      "A personal profile concept with editable information and backup ideas. Sensitive credentials should never be stored in front-end code.",

    tags: ["Personal Profile", "UI Design", "JavaScript"]

  }

};



const projectDialog = $("#projectDialog");

const dialogTitle = $("#dialogTitle");

const dialogDescription = $("#dialogDescription");

const dialogTags = $("#dialogTags");

const dialogClose = $("#dialogClose");



$$("[data-project]").forEach(button => {

  button.addEventListener("click", () => {

    const project = projectInfo[button.dataset.project];



    if (!project) return;



    if (dialogTitle) dialogTitle.textContent = project.title;



    if (dialogDescription) {

      dialogDescription.textContent = project.description;

    }



    if (dialogTags) {

      dialogTags.replaceChildren();



      project.tags.forEach(tag => {

        const span = document.createElement("span");

        span.textContent = tag;

        dialogTags.appendChild(span);

      });

    }



    if (projectDialog && typeof projectDialog.showModal === "function") {

      projectDialog.showModal();

    } else {

      showToast(project.description);

    }

  });

});



if (dialogClose && projectDialog) {

  dialogClose.addEventListener("click", () => {

    projectDialog.close();

  });



  projectDialog.addEventListener("click", event => {

    if (event.target === projectDialog) {

      projectDialog.close();

    }

  });

}



/* 11. Contact links */

const emailButton = $("#emailButton");

const whatsappButton = $("#whatsappButton");



if (emailButton) {

  emailButton.href = `mailto:${PORTFOLIO_CONFIG.email}`;

}



if (whatsappButton) {

  const phone = PORTFOLIO_CONFIG.whatsapp.replace(/\D/g, "");

  whatsappButton.href = `https://wa.me/${phone}`;

  whatsappButton.target = "_blank";

  whatsappButton.rel = "noopener noreferrer";

}



/* 12. Social media links */

const socialKeys = ["tiktok", "github", "linkedin", "telegram"];

const socialLinks = $$(".social-links a");



socialLinks.forEach((link, index) => {

  const key = socialKeys[index];



  if (!key) return;



  const url = PORTFOLIO_CONFIG.socials[key];



  if (url && /^https?:\/\//i.test(url)) {

    link.href = url;

    link.target = "_blank";

    link.rel = "noopener noreferrer";

    link.classList.remove("social-placeholder");

  } else {

    link.href = "#contact";

    link.classList.add("social-placeholder");



    link.addEventListener("click", event => {

      event.preventDefault();

      showToast(`Add your ${key} profile link in script.js`);

    });

  }

});



/* 13. Download starter CV */

const downloadCv = $("#downloadCv");



if (downloadCv) {

  downloadCv.addEventListener("click", () => {

    const cv = `${PORTFOLIO_CONFIG.name}

Computer Science Student | Aspiring Software Engineer

Location: Afghanistan



PROFILE

Computer Science student interested in programming, web development,

networking, and information systems.



SKILLS

HTML, CSS, JavaScript, Java, Networking, Database Fundamentals



PROJECT CONCEPTS

\- FuelPro Management

\- VIP Room Manager

\- VIP School Management

\- Rohid VIP Profile



EDUCATION

Computer Science — University studies, Afghanistan



CONTACT

Email: ${PORTFOLIO_CONFIG.email}

WhatsApp: +${PORTFOLIO_CONFIG.whatsapp}



Note: Update this starter CV with accurate details before sending it to employers.

`;



    const blob = new Blob([cv], {

      type: "text/plain;charset=utf-8"

    });



    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");



    link.href = url;

    link.download = "Rohidullah_Shgyiwal_CV.txt";



    document.body.appendChild(link);

    link.click();

    link.remove();



    setTimeout(() => URL.revokeObjectURL(url), 1000);



    showToast("Starter CV downloaded. Edit it with your real details.");

  });

}



/* 14. Initial setup */

renderIcons();
