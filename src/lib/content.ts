/**
 * Single source of truth for every word on the site.
 * Copy was rewritten in 2026 from the original 2019 CV.
 * Anything marked CONFIRM should be verified with Joumana before launch.
 */

export const site = {
  name: "Joumana Saad",
  legalName: "Joumana Saad Media",
  role: "Freelance Journalist, Editor and Content Specialist",
  shortRole: "Journalist, Presenter and Content Specialist",
  city: "Dubai",
  region: "Dubai",
  country: "United Arab Emirates",
  email: "joumanasaad@gmail.com",
  // The real home. A preview build on a temporary Hostinger subdomain sets
  // NEXT_PUBLIC_SITE_URL so canonicals, the sitemap and the social images do
  // not all point at a domain that is not serving the site yet.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.joumanasaad.com",
  // CONFIRM: start of career taken as 2007 (Forbes, New York)
  careerStart: 2007,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/joumana-saad-876b5144/" },
    { label: "Instagram", href: "https://www.instagram.com/joumanasaad_media/" },
    { label: "X", href: "https://twitter.com/joumanasaad" },
    { label: "Facebook", href: "http://fb.me/joumanasaadmedia" },
  ],
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------ hero */

export const heroSlides = [
  {
    id: "newsroom",
    index: "01",
    label: "Newsroom",
    caption:
      "Business, markets and technology reporting for Forbes, The Epoch Times and Dubai Eye 103.8.",
    image: "/images/hero-1.jpg",
    alt: "Joumana Saad, freelance business journalist based in Dubai",
  },
  {
    id: "stage",
    index: "02",
    label: "Stage",
    caption:
      "Bilingual hosting and panel moderation in English and Arabic for summits, launches and awards nights.",
    image: "/images/hero-2.jpg",
    alt: "Joumana Saad, bilingual master of ceremonies and panel moderator in Dubai",
  },
  {
    id: "studio",
    index: "03",
    label: "Studio",
    caption:
      "Content strategy, corporate reports and press material for organisations across the Gulf.",
    image: "/images/hero-3.jpg",
    alt: "Joumana Saad, editor and content specialist in Dubai",
  },
] as const;

export const heroCopy = {
  eyebrow: "Dubai, United Arab Emirates",
  name: "Joumana Saad",
  headline: "Freelance journalist, editor and content specialist in Dubai.",
  // the headline broken for display: the first block is set enormous, the
  // second keeps the rest of the phrase in the same h1 for search
  displayLines: ["Freelance", "Journalist"],
  displayTail: "Editor and content specialist in Dubai",
  lede:
    "An American journalist who has spent close to two decades in newsrooms in New York and Dubai, reporting on finance, business and technology. Today she writes, edits and hosts for brands and publications across the Gulf, in English and in Arabic.",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "See the work", href: "/work" },
} as const;

export const outlets = [
  "Forbes",
  "Forbes Middle East",
  "The Epoch Times",
  "Dubai Eye 103.8",
  "Dubai 92",
  "Virgin Radio 104.4",
  "Argaam",
  "Souqalmal.com",
  "CPI Media Group",
  "Dubai Chamber of Commerce",
  "UAE Ministry of Economy",
  "Dubai Future Foundation",
] as const;

/* ------------------------------------------------------------- positioning */

/** The strongest names, for the band on the home page. */
export const featuredOutlets = [
  "Forbes",
  "The Epoch Times",
  "Dubai Eye 103.8",
  "Argaam",
  "Forbes Middle East",
  "Souqalmal",
  "Dubai Chamber",
  "Dubai Future Foundation",
] as const;

export const stats = [
  { value: "19", label: "Years in newsrooms and communications" },
  { value: "03", label: "Working languages: English, Arabic, Spanish" },
  { value: "02", label: "Media markets: New York and Dubai" },
] as const;

/** One line on the home page. The bio itself sits in Meet Joumana. */
export const homeStatement = {
  kicker: "Who she is",
  line: "Nineteen years in newsrooms. Now she writes, edits and hosts for the Gulf.",
  cta: { label: "See the work", href: "/work" },
} as const;

export const introCopy = {
  kicker: "Who she is",
  heading: "A reporter's instinct, applied to your brand.",
  body: [
    "Joumana Saad is an American freelance journalist, editor and content specialist based in Dubai. She began at Forbes in New York, producing and reporting for the magazine's video network, and moved to the Gulf where she has covered finance, business and technology ever since.",
    "That newsroom background is what clients hire. She knows what makes an editor pick up a story, what a reader will actually finish, and how to say something precise in the fewest possible words. Whether the brief is a corporate annual report, a press release, a keynote script or a live awards ceremony, the work is researched first and written second.",
    "She reports and presents in English and Arabic, and reads and writes Spanish, which makes her a practical choice for organisations speaking to the region and to the world at the same time.",
  ],
  cta: { label: "See the work", href: "/work" },
} as const;

/* ---------------------------------------------------------------- services */

export const services = [
  {
    slug: "content-strategy",
    short: "Words that carry a business",
    image: "/images/portrait-studio.jpg",
    index: "01",
    title: "Content Strategy and Writing",
    summary:
      "Long form and short form copy built on research, written to a brief and delivered ready to publish.",
    detail:
      "From the first content audit through to the final proof, this covers the words a business puts in front of the public. Most engagements start with a single project and grow into a retained relationship once the voice is settled.",
    items: [
      "Website copy and landing pages",
      "Newsletters and email campaigns",
      "Press releases and media statements",
      "Blog articles, guides and tutorials",
      "Thought leadership and bylined opinion",
      "Corporate and annual reports",
      "Speeches, scripts and foreword messages",
      "Ghost writing and executive CVs",
      "Advertising and marketing campaign copy",
    ],
    keywords: "content writer Dubai, copywriting services UAE, corporate report writer",
  },
  {
    slug: "mc-and-moderating",
    short: "A bilingual voice for the room",
    image: "/images/event-uae-national-day.jpg",
    index: "02",
    title: "MC, Presenting and Moderating",
    summary:
      "A bilingual host for the room, the stage and the camera, in English and Arabic.",
    detail:
      "Close to a decade of live work, from radio bulletins read on air to awards ceremonies in front of a thousand guests. Preparation is the difference. Every panel, every script and every guest list is researched before the microphone goes on.",
    items: [
      "Corporate conferences and summits",
      "Awards ceremonies and gala dinners",
      "Panel discussion moderation",
      "Product launches and brand activations",
      "Celebrity appearances and red carpet",
      "Television and on air presenting",
      "Live radio reporting and bulletins",
      "Media training for spokespeople",
    ],
    keywords: "bilingual MC Dubai, Arabic English event host, panel moderator UAE",
  },
  {
    slug: "editorial",
    short: "Reporting and the craft behind it",
    image: "/images/hero-1.jpg",
    index: "03",
    title: "Editorial Services",
    summary:
      "Reporting, editing and the unglamorous craft that makes publications read well.",
    detail:
      "Commissioned journalism for magazines, newspapers and in house publications, plus the editing work that sits behind it. Comfortable on deadline and comfortable with numbers, which is rarer than it should be.",
    items: [
      "News stories and feature articles",
      "Special reports and supplements",
      "Opinion pieces and columns",
      "Sub editing and rewriting",
      "Proofreading and fact checking",
      "Research and analysis based writing",
      "Benchmarking and competitive reviews",
      "Page layout and production",
    ],
    keywords: "freelance editor Dubai, feature writer Middle East, sub editing services",
  },
  {
    slug: "pr-and-communications",
    short: "Media relations from the inside",
    image: "/images/event-panel.jpg",
    index: "04",
    title: "PR and Communications",
    summary:
      "Media relations run by someone who has spent a career on the receiving end of pitches.",
    detail:
      "Knowing how a newsroom actually works changes how a campaign is built. Messaging is written to be quotable, press material is written to be used, and spokespeople are prepared for the questions they would rather not be asked.",
    items: [
      "PR strategy and annual plans",
      "Key messaging and positioning",
      "Media relations and press outreach",
      "Press conferences and media events",
      "Media training and interview prep",
      "Case studies and success stories",
      "Event PR and management",
      "Media monitoring and reporting",
      "Brand strategy and account management",
    ],
    keywords: "PR consultant Dubai, media relations UAE, media training Dubai",
  },
] as const;

export const workflow = [
  {
    step: "01",
    title: "Brief",
    body: "A short call to establish the audience, the outcome and the deadline. You get a written scope and a fixed fee before anything begins.",
  },
  {
    step: "02",
    title: "Research",
    body: "Interviews, source material, data and desk research. This is the part most freelancers skip and the reason the finished copy holds up.",
  },
  {
    step: "03",
    title: "Draft",
    body: "A first draft delivered on the agreed date, in your voice, formatted the way your team will actually use it.",
  },
  {
    step: "04",
    title: "Deliver",
    body: "Two rounds of revision included as standard, then a clean final file. For live work, a full run sheet and rehearsal before the day.",
  },
] as const;

/* ----------------------------------------------------------- notable names */

export const interviews = [
  "Bill Clinton",
  "Sir Richard Branson",
  "Christiane Amanpour",
  "George Soros",
  "Nouriel Roubini",
  "Jack Bogle",
  "Barbara Corcoran",
  "Ralph Nader",
] as const;

/* ------------------------------------------------------------- experience */

export const experience = [
  {
    role: "Reporter and News Presenter",
    org: "Arabian Radio Network, Arab Media Group",
    place: "Dubai, UAE",
    period: "2013 to present",
    body: "Research, write and present news bulletins across Dubai Eye 103.8, Dubai 92 and Virgin Radio 104.4. On the presenting shift she sets the running order, then records and packages every bulletin for air. On the reporting side she covers the day's lead stories, files live from events and produces special reports for flagship programmes including Business Breakfast and Drive Live.",
  },
  {
    role: "Communications Contributor",
    org: "Dubai Chamber of Commerce and Industry",
    place: "Dubai, UAE",
    period: "Current",
    body: "Feature writing and editorial support for the Chamber's flagship publications, including annual highlights and international trade reporting.",
  },
  {
    role: "Freelance Contributor",
    org: "Souqalmal.com, The Epoch Times, Forbes Middle East",
    place: "Dubai, UAE",
    period: "Current, project basis",
    body: "Feature articles and original interviews with executives from some of the most established brands in the UAE, covering personal finance, business and policy.",
  },
  {
    role: "Associate Editor",
    org: "SME Advisor Middle East, CPI Media Group",
    place: "Dubai, UAE",
    period: "2012 to 2013",
    body: "Commissioned and wrote original features for this monthly business title, maintained the website and social channels, and helped plan the brand's workshops, seminars, conferences and annual awards ceremony from concept through to logistics and speaker recruitment.",
  },
  {
    role: "Senior Producer and Reporter",
    org: "Forbes",
    place: "New York, NY, USA",
    period: "2009 to 2010",
    body: "Ran the Forbes video network day to day, assigning stories to multimedia reporters and producers and editing copy for Forbes.com stories, market updates and blog posts. Reported on air, edited video on Final Cut, acted as liaison with the advertising team and helped shape traffic strategy for the network.",
  },
  {
    role: "Associate Producer",
    org: "Forbes",
    place: "New York, NY, USA",
    period: "2007 to 2009",
    body: "Booked high profile guests, analysts, economists and chief executives. Produced video for Forbes magazine special reports, wrote anchor copy for market updates and studio interviews, and field produced at the Detroit Auto Show, New York Fashion Week and Toy Fair. Stood in as Senior Editor of the Forbes Video Network.",
  },
] as const;

/* --------------------------------------------------------- published work */

export const clips = [
  {
    title: "Submarines For The Super Rich",
    outlet: "Forbes",
    kind: "Feature",
    year: "2010",
    href: "https://www.forbes.com/sites/face-to-face/2010/05/11/submarines-for-the-super-rich/",
  },
  {
    title: "Excitement Returns To The Art Market",
    outlet: "Forbes",
    kind: "Feature",
    year: "2010",
    href: "https://www.forbes.com/sites/face-to-face/2010/05/14/excitement-returns-to-art-market/",
  },
  {
    title: "Jeff Koons, The King Of Kitsch",
    outlet: "Forbes",
    kind: "Profile",
    year: "2010",
    href: "https://www.forbes.com/sites/face-to-face/2010/04/07/jeff-koons-the-king-of-kitsch/",
  },
  {
    title: "New Retirement Visas Could Be A Game Changer For Expats In The UAE",
    outlet: "The Epoch Times",
    kind: "News feature",
    year: "2018",
    href: "https://www.theepochtimes.com/new-retirement-visas-could-be-game-changer-for-expats-in-uae_2682211.html",
  },
  {
    title: "A New Playing Field",
    outlet: "Forbes Middle East",
    kind: "Feature",
    year: "2018",
    href: "https://www.forbesmiddleeast.com/a-new-playing-field",
  },
  {
    title: "Latin America, Dubai's Final Frontier",
    outlet: "Arabian Business",
    kind: "Analysis",
    year: "2017",
    href: "https://www.arabianbusiness.com/politics-economics/420155-dubais-final-frontier",
  },
  {
    title: "Package Forwarding And Shopping In The UAE",
    outlet: "Souqalmal.com",
    kind: "Guide",
    year: "2018",
    href: "https://www.souqalmal.com/financial-education/ae-en/package-forwarding-shopping-uae/",
  },
  {
    title: "Dubai Chamber 2017 Highlights",
    outlet: "Dubai Chamber of Commerce",
    kind: "Annual report",
    year: "2017",
    href: "http://www.dubaichamber.com/uploads/annualreports/2017/index.php",
  },
  {
    title: "Say Yes To The Future, Expo Bid Book",
    outlet: "Dubai Expo",
    kind: "Publication",
    year: "2013",
    href: "http://www.sayyestodubai.com/bid-book/",
  },
] as const;

export const broadcast = [
  {
    title: "Fashion District",
    outlet: "Business Breakfast, Dubai Eye 103.8",
    kind: "Radio feature",
    year: "2014",
    href: "https://omny.fm/shows/businessbreakfast/fashion-district-19-02-2014",
  },
  {
    title: "Dubai Tram Background",
    outlet: "Business Breakfast, Dubai Eye 103.8",
    kind: "Radio feature",
    year: "2014",
    href: "https://omny.fm/shows/businessbreakfast/dubai-tram-background-11-11-2014",
  },
] as const;


/* ------------------------------------------------------------ case study
   Split out of the Arabian Radio Network entry already in `experience`. Every
   line is drawn from that description. Nothing about results or outcomes has
   been added, because the CV does not contain any. */

export const caseStudy = {
  kicker: "Selected engagement",
  title: "Arabian Radio Network",
  meta: "Reporter and News Presenter  /  Dubai  /  2013 to present",
  columns: [
    {
      head: "The remit",
      body: "Research, write and present the news across Dubai Eye 103.8, Dubai 92 and Virgin Radio 104.4. Three stations, one desk, daily.",
    },
    {
      head: "The work",
      body: "On the presenting shift she sets the running order, then records and packages every bulletin for air. On the reporting shift she covers the day's lead stories and files live from events.",
    },
    {
      head: "On air",
      body: "Special reports produced for the network's flagship programmes, including Business Breakfast and Drive Live.",
    },
  ],
  image: "/images/hero-3.jpg",
} as const;

/* ------------------------------------------------------------------ reels
   Her own presenting clips, shot vertical. Titles are taken from the file
   names she supplied, so CONFIRM the wording and the language tags with her
   before launch. */

export const reels = [
  {
    slug: "reel-reality-check",
    title: "Reality Check",
    note: "Presenting to camera",
    lang: "English",
  },
  {
    slug: "reel-asset-or-burden",
    title: "Asset or Burden",
    note: "Presenting to camera",
    lang: "English",
  },
  {
    slug: "reel-summer-nightmare",
    title: "The Summer Nightmare",
    note: "Presenting to camera",
    lang: "English",
  },
  {
    slug: "reel-arabic",
    title: "Arabic segment",
    note: "Presenting to camera",
    lang: "Arabic",
  },
  {
    slug: "reel-studio",
    title: "On set",
    note: "Studio and crew",
    lang: "English",
  },
  {
    slug: "reel-office",
    title: "On location",
    note: "Presenting on location",
    lang: "English",
  },
] as const;

export const reelCopy = {
  kicker: "On camera",
  title: "Watch her present",
  lede: "Six pieces to camera, in English and in Arabic. Sound is off until you press play.",
} as const;

/* ---------------------------------------------------------------- hosting */

export const hosting = [
  {
    title: "UAE National Day",
    detail: "Bilingual master of ceremonies for the national day celebration.",
    image: "/images/event-uae-national-day.jpg",
  },
  {
    title: "Escada Dubai Launch",
    detail: "Host for the boutique launch alongside celebrity brand ambassador Yara.",
    image: "/images/event-escada-launch.jpg",
  },
  {
    title: "Dubai One Television",
    detail: "Studio appearance and on air presenting.",
    image: "/images/event-dubai-one-tv.jpg",
  },
  {
    title: "SME Advisor Summit and Awards",
    detail: "Master of ceremonies for the annual summit and awards ceremony.",
    image: "/images/event-panel.jpg",
  },
] as const;

/* --------------------------------------------------------------- about me */

export const aboutCopy = {
  intro: [
    "Joumana Saad is an American freelance journalist, editor and content specialist based in Dubai, with close to two decades of editorial and public relations experience behind her.",
    "She specialises in financial news, business and technology writing, and has worked and written for Forbes, The Epoch Times, Dubai Eye Radio, Souqalmal.com, Argaam, CPI Media Group, Dubai Chamber of Commerce and Industry, the UAE Ministry of Economy and Dubai Future Foundation.",
    "Over the past decade she has built a parallel career as a bilingual MC, presenter and moderator. She has hosted corporate events, seminars, awards ceremonies and celebrity appearances, and produced and presented live on air for the Forbes video network, The Business Breakfast and The Agenda.",
    "Along the way she has interviewed Bill Clinton, Sir Richard Branson, George Soros, the economist Nouriel Roubini, the late investor Jack Bogle, the real estate figure Barbara Corcoran, the activist Ralph Nader and the broadcaster Christiane Amanpour, among many others.",
    "A native English speaker, she is fluent in Arabic and in Spanish, and holds a Bachelor of Arts in Mass Communications from the University of South Florida.",
  ],
  capabilities: [
    {
      title: "Languages",
      items: [
        "English, native",
        "Arabic, fluent in reading, writing and speaking",
        "Spanish, fluent in reading, writing and speaking",
      ],
    },
    {
      title: "Broadcast",
      items: [
        "On air reporting and anchoring",
        "Live and packaged producing",
        "Video editing on Final Cut and non linear systems",
        "Camera operation and lighting",
        "Conducting and logging interviews",
        "Voicing track and booking guests",
        "Broadcast and print copywriting",
      ],
    },
    {
      title: "Tools and standards",
      items: [
        "AP Style",
        "WordPress",
        "Adobe Photoshop",
        "Microsoft Word, Excel, PowerPoint and Publisher",
        "Lexis Nexis and Factiva research",
        "Structured web research",
      ],
    },
  ],
  education: {
    degree: "Bachelor of Arts, Mass Communications",
    school: "University of South Florida",
    place: "Tampa, Florida, USA",
  },
} as const;

/* ---------------------------------------------------------------- contact */

export const contactCopy = {
  heading: "Tell me what you are trying to say.",
  lede:
    "For editorial assignments, marketing projects, hosting enquiries or a rate card, send a note with the brief, the audience and the date you need it by. Most enquiries get a reply within one working day.",
  availability: [
    "Editorial assignments and commissioned features",
    "Corporate reports, press material and speeches",
    "Event hosting, moderating and media training",
    "Retained content and communications support",
  ],
} as const;

export const faqs = [
  {
    q: "Do you work with clients outside the UAE?",
    a: "Yes. Writing and editing work is handled remotely for clients across the Gulf, Europe and the United States. Hosting and moderating is Dubai based by default, and travel can be arranged for the right brief.",
  },
  {
    q: "Do you host events in Arabic as well as English?",
    a: "Yes. She presents and moderates in both languages, and regularly runs bilingual events where the room switches between the two.",
  },
  {
    q: "How do you price a project?",
    a: "Most work is quoted as a fixed project fee once the scope is clear. Day rates apply to hosting and on site work. A rate card is available on request.",
  },
  {
    q: "Can you write under our own byline?",
    a: "Yes. Ghost writing for executives is a regular part of the work, covering opinion pieces, keynote scripts, forewords and LinkedIn commentary.",
  },
  {
    q: "What do you need from us to start?",
    a: "The audience, the outcome you want, any existing brand or style guidance, and the deadline. If those are not settled yet, the first call is usually spent working them out.",
  },
] as const;

/* ------------------------------------------------------------ page intros
   One block per page, so the opening of every page is edited in one place. */

export const pageCopy = {
  services: {
    eyebrow: "Services",
    title: ["Research first.", "Then a point of view.", "Then the words."],
    lede: "Four disciplines, one standard. Everything here is built on newsroom habits, which is the reason the finished work stands up when somebody reads it closely.",
  },
  work: {
    eyebrow: "The Work",
    title: ["Nineteen years", "of asking better", "questions."],
    lede: "Bulletins read on air, features filed on deadline, stages hosted in two languages and reports written for organisations that get read closely. A selection is below.",
  },
  journal: {
    eyebrow: "Journal",
    title: ["Notes from", "the newsroom", "and the stage."],
    lede: "Short pieces on how stories get made, what makes an audience stay, and what nineteen years either side of the microphone teaches you about saying something clearly.",
  },
  contact: {
    eyebrow: "Contact",
    title: ["Tell me what", "you are trying", "to say."],
    lede: "For editorial assignments, corporate content, hosting enquiries or a rate card, send the brief, the audience and the date you need it by. Most enquiries get a reply within one working day.",
  },
} as const;

/* ------------------------------------------------------------------ journal
   CONFIRM: these six pieces were drafted for the site so the section is not
   empty at launch. Every one is written from Joumana's own experience as it
   appears in this file, but she should read and sign off each before it goes
   live, and swap in her own where she would rather. */

export const journal = [
  {
    slug: "newsroom-habits-brand-writing",
    title: "What a newsroom teaches you about writing for a brand",
    standfirst:
      "Most corporate copy fails for the same reason a weak story gets spiked. Nobody established why anyone should care by the second sentence.",
    category: "Craft",
    date: "2026-08-28",
    minutes: 6,
    image: "/images/portrait-studio.jpg",
    body: [
      {
        type: "p",
        text: "A news desk is a brutal editor of attention. You have a bulletin to fill, a clock that does not negotiate, and a listener who is halfway through making breakfast. If the first line does not tell them why this matters to their morning, they are gone, and no amount of careful writing further down the page brings them back.",
      },
      {
        type: "p",
        text: "Brand writing rarely gets edited that hard. The deadline is softer, the audience is assumed rather than fought for, and there is usually a committee somewhere adding a sentence about values. So the piece opens with a paragraph explaining what the company does, and the thing worth reading arrives on page two, where nobody is waiting for it.",
      },
      { type: "h2", text: "Lead with the finding, not the framing" },
      {
        type: "p",
        text: "The single most useful habit to carry across is the discipline of the intro. Before writing anything, work out the one sentence a reader would repeat to a colleague. That sentence goes first. Everything else in the piece is there to support it, qualify it or prove it.",
      },
      {
        type: "quote",
        text: "If you cannot say what the piece is about in one sentence, the piece is not ready to be written.",
      },
      {
        type: "p",
        text: "This is uncomfortable for organisations, because the interesting sentence is usually the specific one, and specifics can be checked. That is precisely why it works. A claim with a number attached, or a name, or a date, reads as true because it can be tested. A claim about being a leading provider of integrated solutions cannot be tested, so nobody bothers.",
      },
      { type: "h2", text: "Report your own company" },
      {
        type: "p",
        text: "The second habit is research. When a reporter takes on a story, the writing is maybe a fifth of the work. The rest is reading the filings, calling the people who actually did the thing, and finding the detail nobody has published. Applied inside a business, this means interviewing your own engineers and your own sales team before writing a word about what you built.",
      },
      {
        type: "p",
        text: "It slows the first draft down and it makes every draft after it faster, because you are no longer inventing language to cover a gap in what you know. The copy stops sounding like marketing and starts sounding like somebody who was there.",
      },
      { type: "h2", text: "Write for the reader who is about to leave" },
      {
        type: "p",
        text: "Assume attention is being withdrawn at every paragraph break. That assumption produces shorter sentences, fewer clauses and a much more ruthless attitude to anything that is in the piece because someone senior wanted it there. It is also, in my experience, the only reliable way to end up with something people finish.",
      },
    ],
  },
  {
    slug: "hosting-in-two-languages",
    title: "Hosting in two languages is not translation",
    standfirst:
      "A bilingual room does not want the same script twice. It wants one event that happens to run in two registers.",
    category: "Stage",
    date: "2026-07-30",
    minutes: 5,
    image: "/images/event-uae-national-day.jpg",
    body: [
      {
        type: "p",
        text: "The most common brief I get for a bilingual event is to run the English, then repeat it in Arabic. It is an understandable instruction and it produces an event that is twice as long and half as good. Half the room is always waiting.",
      },
      {
        type: "p",
        text: "What actually works is deciding, section by section, which language carries the moment and which language supports it. The welcome is warmer in Arabic. A data heavy sponsor segment is usually cleaner in English. A tribute or a thank you belongs in whichever language the person being thanked answers the phone in.",
      },
      { type: "h2", text: "Jokes and figures do not travel the same way" },
      {
        type: "p",
        text: "Numbers survive translation almost perfectly. Warmth does not. A line that lands beautifully in Arabic can arrive in English as merely polite, and the reverse is worse, because an English aside delivered literally in Arabic often reads as blunt. So the host is not translating, the host is finding the equivalent effect.",
      },
      {
        type: "quote",
        text: "You are not moving words between languages. You are moving a feeling, and the words are whatever gets it there.",
      },
      { type: "h2", text: "Preparation is the whole job" },
      {
        type: "p",
        text: "Every name is checked with the person who owns it, before the day. Titles are confirmed against the organisation and not against the invitation, because invitations go out weeks early and people get promoted. Any figure that will be read aloud gets traced back to its source, because a host reading a wrong number is a host who has just made it official.",
      },
      {
        type: "p",
        text: "The run sheet then carries the language switch as a marked cue, the way a broadcast script carries a hand back to the studio. Done properly, nobody in the room notices the mechanics at all. They simply feel that the event was speaking to them the whole way through.",
      },
    ],
  },
  {
    slug: "questions-executives-are-never-asked",
    title: "The questions executives are never asked, and should be",
    standfirst:
      "After a few hundred interviews, the pattern is clear. The useful answer almost never follows the obvious question.",
    category: "Interviewing",
    date: "2026-06-18",
    minutes: 7,
    image: "/images/event-panel.jpg",
    body: [
      {
        type: "p",
        text: "Interviewing well is largely a matter of refusing to ask the question everybody else asked. Senior people have answered the obvious ones so many times that the answer has worn smooth. You get the polished version, which is accurate, complete and entirely useless, because it tells you nothing that was not already on the website.",
      },
      { type: "h2", text: "Ask about the decision, not the outcome" },
      {
        type: "p",
        text: "Nobody learns anything from being asked why a launch succeeded. Ask instead what the alternative plan was, and who argued for it. Ask what the deadline was before it moved. Ask which part of the business was against this and what changed their mind. These questions have real answers because they have specific memories attached to them.",
      },
      {
        type: "quote",
        text: "The interesting answer is usually attached to a moment, not to a position.",
      },
      { type: "h2", text: "Let the silence sit" },
      {
        type: "p",
        text: "The most productive three seconds in any interview are the ones after an answer appears to be finished. Most people, given a pause, will keep going, and the second half of the answer is nearly always better than the first. The instinct to fill the gap is the single most expensive habit an inexperienced interviewer has.",
      },
      { type: "h2", text: "Do the reading, then put it away" },
      {
        type: "p",
        text: "Preparation is not so that you can display it. It is so that you know immediately when something surprising has been said. If you have read the last three years of results, you notice the moment a margin is described in a way the filings do not support, and you can ask about it in the room rather than discovering it a week later.",
      },
      {
        type: "p",
        text: "A prepared interviewer asks fewer questions, not more. You are listening for the one thread worth pulling, and then you have the confidence to abandon the list and pull it.",
      },
    ],
  },
  {
    slug: "dubai-story-has-changed",
    title: "Dubai's story has changed. The way we tell it has not",
    standfirst:
      "The city stopped being a construction story a decade ago. Much of the coverage did not get the message.",
    category: "Region",
    date: "2026-05-21",
    minutes: 6,
    image: "/images/hero-2.jpg",
    body: [
      {
        type: "p",
        text: "For years the shorthand for this city was height and speed. Tallest, fastest, largest, newest. It was an easy frame and for a while it was broadly true, so it stuck to the reporting like a label that nobody bothered to peel off.",
      },
      {
        type: "p",
        text: "What I have spent the last several years actually covering looks nothing like that. It is visa policy and how it changes who stays. It is a regulatory regime learning to host capital rather than merely attract it. It is trade routes between the Gulf and Latin America that did not exist on anyone's map when I arrived, and family businesses in their third generation working out how to become something a market can price.",
      },
      { type: "h2", text: "The dull stories are the real ones" },
      {
        type: "p",
        text: "Retirement visas are not a glamorous subject. They are also one of the most consequential things to happen to who lives here and for how long, which is the sort of question that reshapes a property market and a school system and a labour force over twenty years. The story is structural, and structural stories are hard to photograph, which is a large part of why they get under reported.",
      },
      {
        type: "quote",
        text: "A city stops being a project and becomes a place. That transition is the story, and it does not announce itself.",
      },
      { type: "h2", text: "Write for people who live here" },
      {
        type: "p",
        text: "The correction is not to be negative, which is simply the same laziness in a different coat. It is to write for the reader who lives here and already knows what the skyline looks like. That reader wants to know what a rule change means for their business, which sector is quietly hiring and where the money is actually going. Serve that reader properly and the international audience gets a far better story too.",
      },
    ],
  },
  {
    slug: "before-the-microphone-goes-on",
    title: "Before the microphone goes on",
    standfirst:
      "Everything that makes live work look effortless happens in the two days nobody sees.",
    category: "Stage",
    date: "2026-04-09",
    minutes: 5,
    image: "/images/event-escada-launch.jpg",
    body: [
      {
        type: "p",
        text: "Live work is judged entirely on the part that is visible, which is roughly the last five per cent of it. The rest is a spreadsheet, a series of phone calls and a set of decisions made early enough that nothing has to be decided in front of an audience.",
      },
      { type: "h2", text: "The run sheet is the event" },
      {
        type: "p",
        text: "A proper run sheet carries more than timings. It carries who is standing where when the lights come up, which door a speaker enters through, what happens if the video does not roll, and the exact words that hand over to the next person. If a run sheet is vague about a transition, that transition is where the event will go wrong.",
      },
      { type: "h2", text: "Meet the speakers before the day" },
      {
        type: "p",
        text: "Five minutes on the phone with each panellist is worth an hour of preparation on your own. You learn what they actually want to talk about, what they have been asked too many times, and whether the person who looks most senior on the running order is in fact the one with something to say. A panel is shaped in those calls, not on stage.",
      },
      {
        type: "quote",
        text: "Rehearse the handovers and the ending. The middle usually looks after itself.",
      },
      { type: "h2", text: "Plan the failure" },
      {
        type: "p",
        text: "Something will go wrong. A microphone will die, a guest will be late, a slide deck will open on the wrong version. The only question is whether the room finds out. Having a prepared thirty seconds for each of those moments is the difference between a delay and an incident, and it costs nothing but the discipline to think about it while everything is still calm.",
      },
    ],
  },
  {
    slug: "reading-a-company-by-its-annual-report",
    title: "How to read a company by its annual report",
    standfirst:
      "The numbers are audited. The language is not, and the language is where the year is actually described.",
    category: "Business",
    date: "2026-03-05",
    minutes: 7,
    image: "/images/hero-3.jpg",
    body: [
      {
        type: "p",
        text: "Having written annual reports and having reported on them, I can tell you the two jobs use the same document very differently. The writer is trying to give a year a shape. The reporter is trying to find the year underneath the shape. Both start in the same place, and it is not the financial statements.",
      },
      { type: "h2", text: "Read last year's first" },
      {
        type: "p",
        text: "A single report tells you what a company wants to say. Two consecutive reports tell you what changed, and change is the story. Put the chairman's letters side by side and look at what quietly disappeared. A priority that was named twice last year and is absent this year was not achieved, and the absence is the disclosure.",
      },
      { type: "h2", text: "Watch the verbs" },
      {
        type: "p",
        text: "Strong verbs attach to things that happened. Launched, opened, acquired, delivered. Weak constructions attach to things that did not. Continued to focus on, remained committed to, laid the groundwork for. A section built entirely out of the second kind is a section about a year where very little occurred.",
      },
      {
        type: "quote",
        text: "Anything genuinely good gets a number next to it. Anything without a number is asking for the benefit of the doubt.",
      },
      { type: "h2", text: "Find where the definitions moved" },
      {
        type: "p",
        text: "The most useful pages are the least designed ones. In the notes, look for a metric that has been redefined, a segment that has been recombined with another, or a comparative figure that has been restated. None of that is improper and all of it is deliberate, and it usually points at exactly the part of the business somebody would prefer you read quickly.",
      },
      {
        type: "p",
        text: "Do this for twenty minutes before an interview and you will ask a question nobody in the room was expecting. That is generally where the actual conversation starts.",
      },
    ],
  },
] as const;

/* --------------------------------------------------- the services page
   Node 125:1680, transcribed from the design. Every line below is the
   designer's own wording. Two things in the file are left as they were
   found and flagged rather than quietly fixed:

     - Editorial lists "Special Reports" twice
     - the fifth call to action reads "Enquire MORE About IT"

   Both are almost certainly slips. They are kept verbatim so the page
   matches the design, and they are the first thing to correct once
   Joumana has read it. */

export const servicesPage = {
  hero: {
    lines: ["Expertise", "With", "Purpose"],
    lede: "From strategic communications and branded content to editorial storytelling, podcasts and media, Joumana brings together journalism, communications and content expertise to help organisations communicate with clarity and impact.",
    cta: { label: "Start a Conversation", href: "/contact" },
  },

  bring: {
    script: "What I Bring",
    heading: ["Strategy, storytelling, and a", "voice that"],
    headingAccent: "connects",
    // CONFIRM: the design says fifteen years. The home page says 13+ and
    // the Work page says nineteen. One number has to win.
    body: [
      "With more than 15 years across journalism, media and strategic communications, Joumana works at the intersection of content, communications and public engagement.",
      "Her experience spans international media, government and business organisations, from editorial and broadcast journalism to corporate communications, international media relations and high-profile content projects.",
    ],
  },

  approach: {
    // the design breaks these lines itself
    heading: ["Built around", "what needs to be said", "and how it should", "be heard."],
    body: "Whether the goal is to shape a brand story, create meaningful content, prepare a spokesperson, or bring a conversation to life, each engagement starts with the audience, the message and the purpose behind it.",
  },

  disciplines: [
    {
      label: "Branded Content",
      index: "01",
      head: "Make the message matter",
      body: [
        "The strongest branded content doesn't feel like advertising. It tells a story, offers a point of view and gives an audience a reason to pay attention.",
        "Joumana brings a journalist's perspective to branded storytelling  combining research, editorial judgement and strategic thinking to turn complex ideas into clear, engaging content.",
        "From thought leadership and corporate storytelling to digital campaigns and executive communications, the focus is always on finding the story behind the message and shaping it for the right audience.",
      ],
      includes: ["Thought Leadership", "Executive Communications", "Corporate Content", "Digital Content"],
      cta: "Discuss a Content Project",
    },
    {
      label: "Presenting & Moderation",
      index: "02",
      head: "The right voice for the room",
      body: [
        "Great moderation is more than keeping a conversation moving. It is about asking the right questions, understanding the subject and creating space for meaningful discussion.",
        "With extensive experience across corporate events, conferences, panels, interviews and broadcast, Joumana brings an informed and engaging presence to every stage.",
        "Her background in journalism allows her to research quickly, understand complex subjects and connect speakers, audiences and ideas naturally.",
      ],
      includes: ["Event Hosting", "Panel Moderation", "Interviews", "On-Air Presenting"],
      cta: "Enquire About Presenting",
    },
    {
      label: "Editorial",
      index: "03",
      head: "Stories grounded in substance",
      body: [
        "Good editorial work starts with curiosity, research and the ability to find the story within the subject.",
        "Joumana's journalism background spans business, finance, technology, current affairs, interviews, features and special reports.",
        "Her experience across Forbes, Arabian Radio Network, Argaam and other business publications has shaped an approach that is rigorous without losing the human story.",
      ],
      includes: ["Feature Writing", "Business & Finance", "Special Reports", "Special Reports"],
      cta: "Explore Editorial Work",
    },
    {
      label: "Podcasts",
      index: "04",
      head: "Conversations worth staying for",
      body: [
        "Podcasts create space for deeper conversations — the kind that move beyond headlines and give ideas, people and perspectives room to breathe.",
        "Joumana brings her journalism and interviewing background to podcast conversations, helping shape thoughtful discussions around people, businesses, ideas and the stories behind them.",
      ],
      includes: ["Hosting", "Interviewing", "Editorial Development", "Content Support"],
      cta: "Discuss a Podcast",
    },
    {
      label: "Media Training",
      index: "05",
      head: "Be ready for the question",
      body: [
        "Media moments can shape how an organisation, leader or brand is understood. Preparation makes the difference.",
        "Media training helps executives and spokespeople communicate with clarity, confidence and control — whether preparing for an interview, press conference, broadcast appearance or high-profile media engagement.",
      ],
      includes: ["Interview Preparation", "Key Messaging", "Question Handling", "On-Camera Confidence"],
      cta: "Enquire MORE About IT",
    },
    {
      label: "PR & Corporate Communications",
      index: "06",
      head: "Communication with purpose",
      body: [
        "Reputation is built through every story, statement, conversation and connection.",
        "Joumana's communications experience spans PR strategy, corporate communications, media relations, editorial content and stakeholder engagement across major organisations in Dubai.",
        "Her current work at Dubai Department of Economy and Tourism includes communications strategy across international markets, media relations, editorial content and high-profile projects and partnerships.",
      ],
      includes: ["Communications Strategy", "Media Relations", "PR & Editorial", "Corporate Communications", "Executive Messaging"],
      cta: "START A Project",
    },
  ],
} as const;

/* ------------------------------------------------------- the work page
   Node 125:2921, transcribed from the design. As with the services page
   the wording is the designer's own, including "Submarines For The super
   rich", where the casing is the file's. */

export const workPage = {
  hero: {
    title: "Selected Work",
    lede: "A selection of Joumana's work across strategic communications, editorial, media, branded content and broadcasting, from international media engagements to published journalism and on-camera work.",
  },

  seenWith: { heading: "As seen with" },

  highlights: {
    heading: "Top Highlights",
    cta: "See more",
    cards: [
      {
        title: "International Media & Communications",
        body: "Leading communications across international markets, with a focus on media relations, editorial content, journalist engagement and high-profile business and tourism initiatives.",
        org: "Dubai Department of Economy & Tourism",
      },
      {
        title: "Building Connections Through Media",
        body: "Representing Dubai in Mexico, connecting with industry leaders and influential media, and helping lay the groundwork for future collaboration between Dubai and Mexico.",
        org: "Mexico",
      },
      {
        title: "PR & Corporate Communications",
        body: "Developing communications and media initiatives across UAE and international markets, supporting major events, business initiatives, press activity and stakeholder communications.",
        org: "Dubai Chamber",
      },
      {
        title: "Reporting Beyond the Headlines",
        body: "A foundation in business journalism, multimedia storytelling and video production, covering markets, entrepreneurs, finance and global business stories.",
        org: "Forbes",
      },
    ],
  },

  articles: {
    heading: "Featured Articles",
    // hrefs are matched to the live links already held in `clips`
    items: [
      { outlet: "Forbes", title: "Submarines For The super rich", meta: "Featured, 2010", href: "https://www.forbes.com/sites/face-to-face/2010/05/11/submarines-for-the-super-rich/" },
      { outlet: "The Epoch Times", title: "New Retirement Visas Could Be A Game Changer For Expats In The UAE", meta: "News feature, 2018", href: "https://www.theepochtimes.com/new-retirement-visas-could-be-game-changer-for-expats-in-uae_2682211.html" },
      { outlet: "Dubai Chamber of Commerce", title: "Dubai Chamber 2017 Highlights", meta: "Annual report, 2017", href: "http://www.dubaichamber.com/uploads/annualreports/2017/index.php" },
      { outlet: "Arabian Business", title: "Latin America, Dubai's Final Frontier", meta: "Analysis, 2017", href: "https://www.arabianbusiness.com/politics-economics/420155-dubais-final-frontier" },
      { outlet: "Forbes", title: "Excitement Returns To The Art Market", meta: "Featured, 2010", href: "https://www.forbes.com/sites/face-to-face/2010/05/14/excitement-returns-to-art-market/" },
      { outlet: "Dubai Expo", title: "Say Yes To The Future, Expo Bid Book", meta: "Publication, 2013", href: "http://www.sayyestodubai.com/bid-book/" },
    ],
  },

  people: {
    heading: ["People Behind the", "Headlines"],
    lede: "Over the years, Joumana has interviewed and spoken with influential voices across business, politics, finance, media and culture.",
    cta: { label: "Start a Conversation", href: "/contact" },
    // a six by four grid. Only eight tiles carry a face; the rest are the
    // empty outlined tiles the design leaves between them, and the copy sits
    // over the bottom left corner where four of them are.
    grid: [
      [null, null, "richard-branson", null, "george-soros", null],
      [null, "nouriel-roubini", null, "jack-bogle", null, "barbara-corcoran"],
      [null, null, null, null, "ralph-nader", null],
      [null, null, null, "christiane-amanpour", null, "bill-clinton"],
    ],
    names: {
      "richard-branson": "Sir Richard Branson",
      "george-soros": "George Soros",
      "nouriel-roubini": "Nouriel Roubini",
      "jack-bogle": "Jack Bogle",
      "barbara-corcoran": "Barbara Corcoran",
      "ralph-nader": "Ralph Nader",
      "christiane-amanpour": "Christiane Amanpour",
      "bill-clinton": "Bill Clinton",
    },
  },

  published: {
    heading: "Published Work",
    // CONFIRM: the design shows five plates with no captions. Publication
    // covers would replace the placeholder.
    count: 5,
  },
} as const;
