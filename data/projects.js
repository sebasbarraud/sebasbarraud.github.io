/* =====================================================================
   PROJECTS  —  the only file you need to edit to add or change work.
   =====================================================================

   HOW TO ADD A PROJECT
   1. Drop your image(s) in /images (e.g. images/acme-cover.jpg)
      — or use a full https:// URL, like the Behance links below.
   2. Copy the TEMPLATE below, paste it at the TOP of the list (newest first
      is the order the site shows), and fill in what you have.
   3. Save. That's it — the grid, list, filters, project page and prev/next
      links all update by themselves.

   Only `title`, `category` and `img` are required. Everything else is
   optional: a field you leave out simply doesn't show up.

   ---------------------------- TEMPLATE -------------------------------
   {
     slug:     "acme-redesign",          // used in the URL: #/work/acme-redesign
     title:    "Acme — Redesign",
     category: "product",                // product | branding | motion | print | photography
                                         // (edit categories in data/site.js)
     img:      "images/acme-cover.jpg",  // cover image (grid + list preview)
     hero:     "images/acme-hero.jpg",   // optional: larger image for the project page
     alt:      "Acme app on a phone",    // optional: describes the image for screen readers
     // Optional imgPosition: the grid tile and list hover preview crop `img` to a 4:3 box
     // (object-fit:cover), which by default centers the crop. If that cuts into something
     // important, set imgPosition to an object-position value ("top" keeps the top of the
     // image in frame and crops extra off the bottom; "bottom" the reverse; "20% 80%" etc.
     // also works). The project page header is unaffected — it always shows the full image.
     imgPosition: "top",
     year:     "2026",
     client:   "Acme Inc.",
     role:     "Lead UX/UI Designer",
     tools:    ["Figma", "After Effects"],
     summary:  "One or two sentences that sum the project up.",
     link:     "https://www.behance.net/gallery/…",   // optional external link
     linkLabel:"View on Behance",                     // optional button text
     views: 0, appr: 0,                  // optional Behance numbers

     // Optional case study. Mix and match these blocks in any order:
     blocks: [
       { type: "text",    heading: "The problem", body: "Paragraph one.\n\nParagraph two." },
       { type: "image",   src: "images/acme-1.jpg", caption: "Optional caption", alt: "…" },
       // Optional width on an image block (e.g. "70%"): constrains and centers it instead of
       // running full-bleed — good for a mockup shot that looks lost or oversized at full width.
       { type: "image",   src: "images/acme-2.jpg", width: "70%", alt: "…" },
       { type: "gallery", images: [ { src: "images/a.jpg" }, { src: "images/b.jpg", alt: "…" },
         // A portrait photo among landscape ones makes its grid row way taller than the rest.
         // Add crop: "top"/"center"/"bottom" to crop just the GRID PREVIEW to a landscape frame
         // anchored to that edge — the full uncropped photo still opens in the lightbox.
         { src: "images/tall-one.jpg", alt: "…", crop: "top" } ] },
       // Optional cols: N on a gallery block forces that many even columns instead of the
       // default auto-fit wrap — handy for a set of same-shaped images (e.g. screenshots)
       // that should line up in neat rows. Combine with crop on each image if they're tall.
       { type: "gallery", cols: 3, images: [ { src: "images/s1.jpg", crop: "top" }, { src: "images/s2.jpg", crop: "top" }, { src: "images/s3.jpg", crop: "top" } ] },
       { type: "stats",   items: [ { value: "+32%", label: "Conversion" }, { value: "4.8", label: "App rating" } ] },
       { type: "quote",   text: "A line from the client or the team.", by: "Name, Role" },

       // Video — a file you dropped in /images (mp4/webm/mov). Add width/height (the
       // video's actual pixel size) so a portrait phone recording doesn't stretch full-width —
       // it'll be shown as large as it can while fitting the page and its own aspect ratio:
       { type: "video", src: "images/acme-demo.mp4", poster: "images/acme-demo-poster.jpg",
         width: 1920, height: 1080, caption: "Optional caption", muted: true, loop: true, autoplay: true },
       // …or an embedded YouTube/Vimeo video — use the *embed* link, not the watch link
       // (YouTube: youtube.com/embed/VIDEO_ID · Vimeo: player.vimeo.com/video/VIDEO_ID):
       { type: "video", embed: "https://www.youtube.com/embed/VIDEO_ID", caption: "Optional caption" }
     ]
   },
   --------------------------------------------------------------------- */

window.PROJECTS = [
  {
    slug: "adidas-try-on",
    title: "Adidas — Try On",
    category: "product",
    img: "images/adidas-try-on/02-product-hero.jpg",
    alt: "NMD_R1 product page tilted in-frame, with the Try On entry point",
    views: 208, appr: 13,
    summary: "A concept mobile app that lets shoppers browse Adidas' latest releases and try sneakers on through the camera before buying.",
    blocks: [
      { type: "text", heading: "The flow", body: "Onboarding introduces the idea. Point your phone at your feet, no fitting room needed. From there it's three steps: pick a sneaker from today's releases, open Try On to see it rendered on your own feet in real time, then save or share the photo.\n\nEach product page carries its own Try On entry point, so trying a pair on is never more than a tap away from browsing." },
      { type: "gallery", images: [
        { src: "images/adidas-try-on/01-flow-overview.jpg", alt: "Onboarding, catalog browsing, the four-step Try On flow, and the try-on camera view" }
      ] },
      { type: "video", src: "images/adidas-try-on/navigation-demo.mp4", poster: "images/adidas-try-on/navigation-demo-poster.jpg",
        width: 750, height: 1080, caption: "Full navigation walkthrough" },
      { type: "gallery", images: [
        { src: "images/adidas-try-on/03-app-screens-poster.jpg", alt: "Full poster of the app's screens: splash, onboarding, login, catalog, product pages, and the Try On camera view" }
      ] }
    ]
  },
  {
    slug: "madison-reed",
    title: "Madison Reed",
    category: "product",
    img: "images/madison-reed/cover.jpg",
    alt: "Madison Reed weekly replenishment order screen entering from the right on a deep plum background",
    imgPosition: "top",
    summary: "An inventory tool for Madison Reed's Hair Color Bars. Each location gets a weekly replenishment order, and the team reviews, approves and ships it from one place, with every product's status visible at a glance.",
    blocks: [
      { type: "text", heading: "Every order, one status", body: "Store teams see their open order as a simple progress tracker: created, confirmed, approved and processing, then shipped. The product list underneath shows exactly what's coming and how it compares with the inventory goal." },
      { type: "image", src: "images/madison-reed/01-store-order-status.jpg", alt: "Open HCB Orders: a weekly replenishment order for the Flatiron Hair Color Bar with a four-step status tracker and its product list" },
      { type: "text", heading: "Review only what needs it", body: "On the admin side, requests that stray from the proposed quantity are flagged as Needs Review, with the store's comment and a quick approve or reject on each line. Everything else is already approved, so a reviewer only acts on the exceptions.\n\nOnce approved, the order moves to pending and then shipped, and shipments can be split across more than one tracking ID." },
      { type: "gallery", cols: 3, images: [
        { src: "images/madison-reed/02-needs-review.jpg", alt: "Order for Allen Hair Color Bar in Needs Review, with flagged quantities, comments, and approve or reject actions per line", crop: "top" },
        { src: "images/madison-reed/03-approved-pending.jpg", alt: "Order for 3rd Ave + 67th Hair Color Bar, pending with every product approved", crop: "top" },
        { src: "images/madison-reed/04-shipped.jpg", alt: "Order for Redondo Beach Hair Color Bar shipped, split across a tracking ID and a second shipment still awaiting one", crop: "top" }
      ] }
    ]
  },
  {
    slug: "mean-green",
    title: "Mean Green",
    category: "product",
    img: "images/mean-green/cover.jpg",
    alt: "Mean Green overview screen entering from the right on a green background",
    imgPosition: "top",
    summary: "A sales intelligence tool for Indeed account teams. It surfaces revenue opportunities across accounts, suggests the next best action for each one, and maps sponsored versus non-sponsored job volume across the US.",
    blocks: [
      { type: "text", heading: "Where to look next", body: "The overview puts the opportunity pipeline up front: counts for each product line, the next best action per account, the revenue pulse for the year, and a table of recommended key opportunities.\n\nA second iteration added the new-opps trend over time, a filterable revenue chart, and a scorecard that opens on hover from the opportunities table." },
      { type: "gallery", cols: 2, images: [
        { src: "images/mean-green/01-overview.jpg", alt: "Overview: product opportunity counts, Next Best Action cards, Revenue Pulse chart and Recommended Key Opportunities table", crop: "top" },
        { src: "images/mean-green/02-overview-trends.jpg", alt: "Overview iteration with a New Opps Trend chart, a filterable Revenue Pulse, and a scorecard tooltip over the opportunities table", crop: "top" }
      ] },
      { type: "text", heading: "Accounts and markets", body: "Each company page opens with a scorecard and company stats, followed by opportunity cards that go straight to creating a Salesforce opportunity or a pitch.\n\nThe Job Visualization Dashboard maps sponsored and non-sponsored jobs and spend by city or ZIP code, with saved and shareable filters." },
      { type: "image", src: "images/mean-green/03-company-scorecard.jpg", width: "80%", alt: "Company page for Blackhawk Network Holdings: scorecard, company stats tiles and four opportunity cards with Create SFDC Opps and Pitch it! actions" },
      { type: "image", src: "images/mean-green/04-job-viz-dashboard.jpg", alt: "Job Visualization Dashboard with active filters, sponsored-jobs summaries for 90, 60, 30 and 7 days, and a US map of jobs and spend by city" }
    ]
  },
  {
    slug: "admotive-corp",
    title: "AdMotive Corp.",
    category: "product",
    img: "images/admotive-corp/cover.jpg",
    alt: "AdMotive Edit Query screen entering from the right on a light grey background",
    imgPosition: "top",
    summary: "An ad-operations platform for managing private marketplace deals, inventory and reporting. Every tool sits in one app, from setting up a deal's buyers, inventory and targeting to building and scheduling performance reports.",
    blocks: [
      { type: "text", heading: "Deals, end to end", body: "A home of applications, with favorites pinned to the top, leads into each tool. Creating a deal keeps a long form manageable: buyers and inventory as removable chips with CSV upload, device and OS targeting, and repeatable key-value rules. Once saved, the deal reads back as a clean summary." },
      { type: "gallery", cols: 3, images: [
        { src: "images/admotive-corp/01-applications.jpg", alt: "Applications home with favorite applications pinned above additional ones", crop: "top" },
        { src: "images/admotive-corp/02-create-deal.jpg", alt: "Create new deal form with buyers, inventory, device type, device vendor and OS targeting as removable chips", crop: "top" },
        { src: "images/admotive-corp/03-deal-detail.jpg", alt: "Deal detail for Fantastic Deal Q4 2021, showing priority, dates, pricing, buyers, inventory and creative rules", crop: "top" }
      ] },
      { type: "text", heading: "Reports you can read", body: "The query builder groups dimensions, standard and video metrics, filters and options into scannable checkbox sets, while a Query Summary panel keeps a plain-language recap of the selection. The same summary follows the report preview, which can be downloaded, emailed or saved on a schedule." },
      { type: "image", src: "images/admotive-corp/05-report-preview.jpg", alt: "Report Preview with a table of deals and the Query Summary, plus Download, Email and Save and schedule actions" }
    ]
  },
  {
    slug: "sonai",
    title: "SonAI",
    category: "product",
    img: "images/sonai/cover.jpg",
    alt: "SonAI trip itinerary screen entering from the right on a slate background",
    imgPosition: "top",
    summary: "An AI trip-planning tool. Describe the member, dates and destinations in one sentence, and SonAI drafts a full itinerary (flights, hotel, events and restaurants) that you can re-roll, pick manually, or adjust by chat.",
    blocks: [
      { type: "text", heading: "One sentence in", body: "Trip creation starts from a single prompt: who's travelling, where to, and when. SonAI gathers what it knows about the member and their past trips, then builds the trip.\n\nThere's always a way out of the AI path: \"Create trip manually\" sits right under the prompt." },
      { type: "gallery", cols: 3, images: [
        { src: "images/sonai/01-prompt-empty.jpg", alt: "SonAI start screen with an empty prompt: Let's create a trip! Tell me about the member, dates and destinations" },
        { src: "images/sonai/02-prompt-filled.jpg", alt: "The prompt filled in: trip for member John Doe from New York to Tokyo, October 17th to November 15th" },
        { src: "images/sonai/03-creating-trip.jpg", alt: "Loading state: Creating trip, gathering information about the member and their past trips" }
      ] },
      { type: "text", heading: "A trip you can steer", body: "The result is a day-by-day timeline: departure flight, hotel stay, and events and restaurants suggested from the member's history and preferences. Every card can be re-rolled or picked manually.\n\nFor anything more specific, the chat stays docked at the bottom. Asking for a vegan option on October 20th returns alternatives that update the itinerary in place." },
      { type: "gallery", cols: 3, images: [
        { src: "images/sonai/04-trip-itinerary.jpg", alt: "Generated itinerary: JFK to HND flight, Conrad Tokyo hotel, a J-League match and a restaurant reservation", crop: "bottom" },
        { src: "images/sonai/05-chat-adjustment.jpg", alt: "Chat panel: asking to change the October 20 restaurant for a vegan option, with two suggestions to update with", crop: "bottom" },
        { src: "images/sonai/06-updated-itinerary.jpg", alt: "Updated itinerary with Quintessence, a vegan restaurant, on October 20", crop: "bottom" }
      ] }
    ]
  },
  {
    slug: "zurich-one",
    title: "Zurich One",
    category: "product",
    img: "images/zurich-one/cover.jpg",
    alt: "Zurich One policy detail screen, Inversión tab, entering from the right on a blue background",
    blocks: [
      { type: "gallery", cols: 3, images: [
        { src: "images/zurich-one/01-poliza-inversion.jpg", alt: "Policy detail, Inversión tab, showing account balance, fund composition and a balance-over-time chart", crop: "top" },
        { src: "images/zurich-one/02-cliente-detalle.jpg", alt: "Client detail page, listing active and historical policies grouped by role and product", crop: "top" },
        { src: "images/zurich-one/03-siniestro-detalle.jpg", alt: "Claim detail page, with status stepper, documentation and contact information", crop: "top" },
        { src: "images/zurich-one/04-poliza-pagos.jpg", alt: "Policy detail, Pagos tab, showing a filterable table of payment movements and collection notices", crop: "top" },
        { src: "images/zurich-one/05-buscador-polizas.jpg", alt: "Policy search page, with a search bar for policy number, plate, surname or ID, and an empty results state", crop: "top" }
      ] }
    ]
  },
  {
    slug: "dba-website",
    title: "DBA — Website",
    category: "product",
    img: "images/dba-website/cover.jpg",
    alt: "Diageo Bar Academy homepage entering from the right on a crimson background",
    views: 45, appr: 5,
    summary: "A website design concept for Diageo Bar Academy, the free learning platform for bar professionals. Desktop and mobile layouts for the homepage, brand pages, recipes and tools, built on a bold type system and a content-pillar canvas set.",
    blocks: [
      { type: "image", src: "images/dba-website/01-website-design-concept.jpg", alt: "Diageo Bar Academy website design concept, showing the homepage hero with a bartender shaking a cocktail" },
      { type: "image", src: "images/dba-website/02-typography-assets.jpg", alt: "Type system (Kapra Neue Bold and Mark Pro) and the seven content-pillar canvases with their icon set" },
      { type: "gallery", cols: 3, images: [
        { src: "images/dba-website/03-desktop-homepage.jpg", alt: "Homepage design, with a full-bleed hero, trending topics and the weekly editor's list", crop: "top" },
        { src: "images/dba-website/04-desktop-brands-variants.jpg", alt: "Brands & Variants directory page, listing partner spirit brands in a grid", crop: "top" },
        { src: "images/dba-website/05-desktop-johnnie-walker.jpg", alt: "Johnnie Walker brand page, with tasting notes, recipes and label variants", crop: "top" },
        { src: "images/dba-website/06-desktop-beachside-peach.jpg", alt: "Beachside Peach recipe page, with ingredients, method and a how-it's-done video", crop: "top" },
        { src: "images/dba-website/07-desktop-wastage-calculator.jpg", alt: "Wastage Calculator tool, estimating a bar's annual cost from overpouring", crop: "top" }
      ] },
      { type: "image", src: "images/dba-website/08-mobile-screens.webp", width: "70%", alt: "Mobile screens: homepage, mini courses, profile settings, navigation menu, brand pages, recipes and events" }
    ]
  },
  {
    slug: "my-briefcase-sales-cycle",
    title: "My Briefcase — Sales Cycle",
    category: "product",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/4db768113325853.Y3JvcCw4MDgsNjMyLDAsMA.png",
    views: 85, appr: 7
  },
  {
    slug: "andino-website",
    title: "Andino — Website",
    category: "product",
    img: "images/andino-website/cover.jpg",
    alt: "Andino website hero entering from the right on a light blue background",
    views: 156, appr: 5,
    summary: "The website for Andino, the redistributable open data portal built by the Datos Argentina team to help government bodies publish their data. A scroll-driven page with animated illustrations that walks through what Andino is, what it's for, and why to use it.",
    link: "https://andino.datos.gob.ar/",
    linkLabel: "Visit the website",
    blocks: [
      { type: "text", heading: "One page, one story", body: "The site is a single scroll. A fixed side navigation tracks each chapter: what Andino is, what it's for, why to use it, the toolkit around it, and how to get started.\n\nEach chapter gets its own illustration: a stack of customizable portal screens, a quick install, data turning into charts and maps, and Argentina dotted with organizations already using it." },
      { type: "gallery", cols: 2, images: [
        { src: "images/andino-website/02-que-es-andino.jpg", alt: "¿Qué es Andino? section, with a fanned-out stack of portal screen wireframes" },
        { src: "images/andino-website/03-facil-de-instalar.jpg", alt: "Fácil y rápido de instalar section, with a browser window and progress bar over the Andino logo shapes" },
        { src: "images/andino-website/04-para-que-sirve.jpg", alt: "¿Para qué sirve Andino? section: a DAT file icon equals charts, maps and search illustrations" },
        { src: "images/andino-website/05-por-que-andino.jpg", alt: "¿Por qué Andino? section, with a map of Argentina marked with checkboxes" }
      ] },
      { type: "image", src: "images/andino-website/06-empeza-ahora.jpg", alt: "Empezá ahora closing section, with a link to the documentation and social links over the mountain photo" }
    ]
  },
  {
    slug: "iodc18-open-data-conference",
    title: "IODC18 — Open Data Conference",
    category: "branding",
    img: "images/iodc18-open-data-conference/05-title-slide.jpg",
    alt: "Dark blue closing slide reading The Future is Open, with the IODC18 and Presidencia de la Nación logos",
    views: 7348, appr: 239,
    summary: "Full visual identity for IODC18, the International Open Data Conference, held in Buenos Aires. A color and type system carried across the bilingual conference website, custom exhibition stands, and speaker presentation templates.",
    blocks: [
      { type: "text", heading: "The system", body: "A bold Gotham wordmark, a cyan-to-navy gradient, and a dotted grid motif carried consistently across every touchpoint, from the site down to a single slide.\n\nScope covered a bilingual (EN/ES) conference website built in React, custom exhibition stands for partner organizations at the venue, and a full presentation template for speakers." },
      { type: "gallery", images: [
        { src: "images/iodc18-open-data-conference/01-website-homepage.jpg", alt: "Browser window showing the bilingual IODC18 conference website homepage, with The Future is Open hero banner and event info icons" },
        { src: "images/iodc18-open-data-conference/02-exhibition-stands.jpg", alt: "Two photos of the conference's custom exhibition stands: attendees talking with a presenter at a wooden info stand, and the stage during a panel talk" },
        { src: "images/iodc18-open-data-conference/03-brand-board.jpg", alt: "Brand board with the IODC18 color palette, Gotham and Roboto Mono type specimens, and event photos at Usina del Arte" },
        { src: "images/iodc18-open-data-conference/04-slide-template.jpg", alt: "A presentation slide template, Open Data and the Private Sector: Breaking Down the Walls, shown over a photo of a panel talk" }
      ] }
    ]
  },
  {
    slug: "cliengo-case-study",
    title: "Cliengo — Case Study",
    category: "product",
    img: "https://mir-s3-cdn-cf.behance.net/projects/404/c88a6e72166369.Y3JvcCw5NTgsNzUwLDIxLDA.jpg",
    views: 258, appr: 5
  },
  {
    slug: "beyond-space-screenprint",
    title: "Beyond Space — Screenprint",
    category: "print",
    img: "images/beyond-space-screenprint/cover.jpg",
    alt: "The finished Beyond Space screenprint poster: an astronaut in profile above the katakana title, on a dark background",
    views: 214, appr: 9,
    blocks: [
      { type: "image", src: "images/beyond-space-screenprint/01-presentation.jpg", width: "60%", alt: "Beyond Space screenprint presentation: the title over Earth from orbit, the screen and frame, stacks of the astronaut poster, pulling a print, a close-up of the katakana title, and the finished poster" }
    ]
  },
  {
    slug: "light-years",
    title: "Light Years",
    category: "photography",
    img: "images/light-years/10-flat-cap-facade.jpg",
    alt: "An older man in a flat cap seen from behind, seated before an ornate stone facade",
    views: 80, appr: 5,
    summary: "A personal series shot between assignments — street, stage and documentary frames from Buenos Aires and beyond.",
    blocks: [
      { type: "gallery", images: [
        { src: "images/light-years/01-library-hallway.jpg", alt: "A figure walks in silhouette down a grand tiled library hallway lit by a hanging lamp" },
        { src: "images/light-years/02-smoke-portrait.jpg", alt: "Black and white portrait of a young man exhaling a cloud of vape smoke over his face" },
        { src: "images/light-years/03-chef-phone.jpg", alt: "A chef in a toque leans against a wall checking his phone" },
        { src: "images/light-years/04-playa-bonita.jpg", alt: "A man crouches to take a photo below a mural reading Playa Bonita" },
        { src: "images/light-years/05-burrowing-owls.jpg", alt: "Three burrowing owls stand in grass, all looking toward the camera" },
        { src: "images/light-years/06-night-fishing.jpg", alt: "Two silhouetted figures fishing from a dock at night" },
        { src: "images/light-years/07-stage-musician.jpg", alt: "A musician in a fedora plays on stage behind a laptop and synth, lit in blue haze", crop: "top" },
        { src: "images/light-years/08-smoking-profile.jpg", alt: "Close-up profile of a bearded man lighting a cigarette in low light" },
        { src: "images/light-years/09-sunset-skyline.jpg", alt: "Storm clouds lit pink and teal at dusk over a city skyline" },
        { src: "images/light-years/10-flat-cap-facade.jpg", alt: "An older man in a flat cap seen from behind, seated before an ornate stone facade" },
        { src: "images/light-years/11-hammock-portrait.jpg", alt: "A woman's face peers out from a woven hammock, backlit by soft daylight" },
        { src: "images/light-years/12-masked-boy-goal.jpg", alt: "A shirtless boy in an eerie mask stands at a soccer goal amid a crowd" },
        { src: "images/light-years/13-singer-crowd.jpg", alt: "A singer leans into the crowd, reaching out mid-performance" },
        { src: "images/light-years/14-tattooed-singer.jpg", alt: "A shirtless, tattooed singer gripping the microphone stand under a single spotlight" },
        { src: "images/light-years/15-stone-archway.jpg", alt: "A group walks in silhouette through a stone archway toward a bright plaza" }
      ] }
    ]
  }
];
