/* =========================================================
   EDIT THIS FILE to update your portfolio.
   You never need to touch index.html or main.js.
   Leave a link as "" to hide that button or icon.
   ========================================================= */

const PROFILE = {
  name: "Precious Mashawa",
  email: "preciousmashawa53@gmail.com",
  phone: "+263 78 590 5284",
  servicesSite: "https://hub.preciousmashawa.co.zw",
  cvFile: "assets/Precious_Mashawa_CV.pdf",   // set to "" to hide the Download CV button
  // Words that type out after "I am into ..."
  typedWords: ["UI.", "web development.", "AI and deep learning.", "building useful software."]
};

/* Social icons under your photo. Paste your real profile links.
   Any link left "" is hidden automatically. */
const SOCIALS = [
  { name: "GitHub",    icon: "github",    url: "" },  // e.g. https://github.com/yourusername
  { name: "LinkedIn",  icon: "linkedin",  url: "" },  // e.g. https://www.linkedin.com/in/yourname
  { name: "X",         icon: "x",         url: "" },
  { name: "Instagram", icon: "instagram", url: "" },
  { name: "Dribbble",  icon: "dribbble",  url: "" },
  { name: "Email",     icon: "gmail",     url: "mailto:preciousmashawa53@gmail.com" }
];

/* PROJECTS
   live  = the page people can open and use (leave "" if not online yet)
   code  = the GitHub repository (leave "" to hide)
   image = optional screenshot in assets/projects/ (leave "" for a plain card) */
const PROJECTS = [
  {
    title: "Fingerprint Blood Group Detection",
    tag: "AI · Web app",
    description: "Deep learning (PyTorch CNN) predicts a person's blood group from a fingerprint image across 8 classes, served through a Flask web app for hospital staff. Final-year project.",
    tech: ["Python", "PyTorch", "Flask", "HTML", "CSS"],
    live: "",
    code: "",
    image: ""
  },
  {
    title: "Precious' Hub (services site)",
    tag: "Website",
    description: "My services website for websites, automation and marketing, hosted on its own subdomain.",
    tech: ["HTML", "CSS", "JavaScript", "cPanel"],
    live: "https://hub.preciousmashawa.co.zw",
    code: "",
    image: ""
  },
  {
    title: "Thesis & Slides Automation",
    tag: "Automation",
    description: "Scripts that generate a fully formatted academic thesis (figures, table of contents, Harvard citations) in Node.js and edit presentation slides with Python.",
    tech: ["Node.js", "docx", "Python", "python-pptx"],
    live: "",
    code: "",
    image: ""
  },
  {
    title: "This Portfolio",
    tag: "Website",
    description: "The site you're on: responsive, light and dark themes, an animated network background and data-driven sections.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://preciousmashawa.co.zw",
    code: "",
    image: ""
  }
];

/* CERTIFICATES
   Download each certificate from LinkedIn Learning (as image or PDF),
   put it in assets/certificates/ and type its file name below.
   Local files fix the "403" error: LinkedIn blocks its images on other sites. */
const CERTIFICATES = [
  { title: "What Is Generative AI?",                                  date: "26 Apr 2026", file: "generative-ai.jpg" },
  { title: "Python Essential Training",                               date: "1 May 2026",  file: "python.jpg" },
  { title: "Complete Guide to Power BI for Data Analysts",            date: "5 May 2026",  file: "power-bi.jpg" },
  { title: "Practical GitHub Actions",                                date: "23 May 2026", file: "github-actions.jpg" },
  { title: "API Test Automation with SoapUI",                         date: "24 May 2026", file: "soapui.jpg" },
  { title: "ISO 27001:2022-Compliant Cybersecurity: Getting Started", date: "23 May 2026", file: "iso-27001.jpg" },
  { title: "CSS Essential Training",                                  date: "28 Apr 2026", file: "css.jpg" },
  { title: "Project Management Foundations",                          date: "26 Apr 2026", file: "project-management.jpg" },
  { title: "Practice Exam for CAPM® (Project Management)",            date: "1 May 2026",  file: "capm-practice-exam.jpg" },
  { title: "Problem-Solving Techniques",                              date: "26 Apr 2026", file: "problem-solving.jpg" }
];

const SKILLS = [
  { group: "Front-end",  items: ["HTML", "CSS", "JavaScript", "UI design"] },
  { group: "Back-end",   items: ["Python", "Flask", "PHP", "Node.js", "SQL"] },
  { group: "AI & Data",  items: ["PyTorch", "Deep learning", "Power BI", "ETL"] },
  { group: "Practice",   items: ["Git & GitHub Actions", "Agile", "UAT", "API testing"] }
];

/* TIMELINE
   points = optional bullet list shown under the entry (leave [] for none) */
const TIMELINE = [
  { when: "Freelance · 2026 – Present", title: "Web Developer, Precious' Hub",
    text: "My own web and technology service for businesses in Zimbabwe, from design and development to domains, hosting and launch.",
    points: [
      "Designed and built this portfolio and the Precious' Hub services website",
      "Wrote responsive, mobile-first pages in HTML, CSS and JavaScript",
      "Added light and dark themes, contact forms and a WhatsApp quote builder",
      "Registered the preciousmashawa.co.zw domain and configured DNS nameservers",
      "Set up and managed cPanel web hosting, including a separate subdomain"
    ] },
  { when: "Industrial attachment · 1 year", title: "NetOne Cellular Limited, Harare",
    text: "Billing systems, USSD and SMS services, Service Delivery Platform, UAT and upgrade project coordination.",
    points: [
      "Monitored and supported prepaid and postpaid billing systems",
      "Reconciled subscriber accounts and resolved billing discrepancies",
      "Produced analytical reports for transaction validation and revenue tracking",
      "Configured and tested USSD and SMS-based services before go-live",
      "Monitored and validated services on the Service Delivery Platform (SDP)",
      "Took part in deploying and testing new telecom digital services",
      "Carried out User Acceptance Testing (UAT) on new and upgraded systems",
      "Logged defects and retested fixes until they passed",
      "Troubleshot system faults and followed each issue through to resolution",
      "Gathered user requirements and documented system workflows",
      "Coordinated the USSD Gateway and SDP upgrade projects",
      "Tracked deliverables and timelines across cross-functional teams",
      "Organised meetings between technical and management teams",
      "Prepared meeting minutes, progress reports and technical documentation"
    ] },
  { when: "Graduated July 2026", title: "BSc (Hons) Software Engineering, 2:1",
    text: "Bindura University of Science Education. Final-year project in deep learning and biometrics.",
    points: [] }
];

/* Adds each entry's bullet points under its timeline text once the page has loaded. */
window.addEventListener("load", function () {
  var box = document.getElementById("timeline");
  if (!box) return;
  var nodes = box.querySelectorAll("*");
  TIMELINE.forEach(function (t) {
    if (!t.points || !t.points.length) return;
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.children.length === 0 && el.textContent.trim() === t.text) {
        if (el.nextElementSibling && el.nextElementSibling.classList.contains("tl-points")) return;
        var ul = document.createElement("ul");
        ul.className = "tl-points";
        ul.style.cssText = "margin:10px 0 0;padding-left:1.2em;display:grid;gap:4px;line-height:1.5;";
        t.points.forEach(function (p) {
          var li = document.createElement("li");
          li.textContent = p;
          ul.appendChild(li);
        });
        el.parentNode.insertBefore(ul, el.nextSibling);
        return;
      }
    }
  });
});
