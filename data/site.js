/* =====================================================================
   SITE SETTINGS  —  your name, bio, contact details, categories.
   You'll rarely touch this file; new projects go in data/projects.js
   ===================================================================== */

window.SITE = {
  name: "Sebastian Barraud",
  firstName: "Sebastian",
  lastName: "Barraud",
  role: "UX/UI Designer & Photographer",
  city: "Buenos Aires, Argentina",
  timezone: "America/Argentina/Buenos_Aires",   // powers the live clock in the header
  tagline: "Senior UX/UI designer and photographer working across product, branding, motion and print, making things people actually use and remember.",

  // Optional full-bleed background video behind the homepage hero (name + tagline),
  // like fabrica.framer.media. Leave commented out to keep the plain hero.
  // - src/poster: files in /images. Keep the clip short and looping (10-20s is plenty —
  //   it's on a loop, and it's the first thing every visitor downloads).
  // - poster is required even with a video: it's what phones and reduced-motion show
  //   instead of the video, and what paints instantly before the video is ready.
  heroVideo: { src: "images/hero-reel.mp4", poster: "images/hero-reel-poster.jpg" },

  // Years are calculated automatically from these.
  careerStart: 2009,     // "17 years creating"
  uxStart: 2014,         // "12 years in UX/UI"

  email: "barraud@gmail.com",

  // Add as many as you like: { label, url }
  links: [
    { label: "Behance", url: "https://www.behance.net/cotton" }
  ],

  // Words in the scrolling band under the hero. Delete this line to use your project categories instead.
  marquee: ["Product design", "Branding", "Motion", "Print", "Photography"],

  // Optional portrait for the About section, e.g. "images/portrait.jpg". Leave "" to hide.
  portrait: "",

  about: {
    // {years} and {uxYears} are filled in automatically, so this never goes stale.
    statement: "{years} years moving between screens and printing plates.",
    paragraphs: [
      "{uxYears} of them have been focused on UX/UI, shaping interfaces for platforms in retail, healthcare, government and B2B. The rest is illustration, motion, branding and screenprint work that keeps the instincts sharp.",
      "My process leans on research, prototyping and usability testing as much as it leans on typography and composition. I care about interfaces being both well-reasoned and well-made: accessible, on-brand, and genuinely easy to use."
    ],
    // Behance totals. Edit whenever you like.
    stats: [
      { value: "11.6K", label: "Project views" },
      { value: "374",   label: "Appreciations" }
    ],
    skills: [
      "Interaction design", "UX research", "Prototyping", "Visual design",
      "Accessibility (WCAG)", "Product design", "Branding", "HTML / CSS"
    ],
    tools: [
      "Figma", "Cursor", "Adobe XD", "Photoshop",
      "Illustrator", "After Effects", "Visual Studio"
    ]
  },

  // Filter chips appear automatically for any category that has at least one project.
  // `color` is used for the small dot next to each project.
  categories: {
    product:     { label: "UX & Product", color: "#FF4A1C" },
    branding:    { label: "Branding",     color: "#E5A800" },
    motion:      { label: "Motion",       color: "#1FA8C4" },
    print:       { label: "Print",        color: "#9B5CF6" },
    photography: { label: "Photography",  color: "#3FA36B" }
  }
};
