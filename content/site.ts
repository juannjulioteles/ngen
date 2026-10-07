/**
 * All site copy and event details live here.
 *
 * Anything marked `TBD` is a placeholder on purpose: fill it in here and the
 * whole site updates. Components never hardcode copy.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type NavLink = { label: string; href: string };

export type Photo = {
  /** TBD: set to a real photo. Photos only render once at least one is set. */
  image: ImageAsset | null;
  caption: string;
};

/** Another organization named on the site. `logo` shows its mark in place of the name. */
export type BrandMention = {
  name: string;
  logo?: ImageAsset;
  /** Set beside a logo that is only a mark, as the brand itself does (Y Combinator's square). */
  logoText?: string;
};

export type Speaker = {
  name: string;
  roles: string[];
  /** Ivy League (or other) school ties, shown as a tag. */
  affiliation: string | null;
  bio: string;
  /** `null` renders a monogram until a photo is added. */
  headshot: ImageAsset | null;
};

export type Startup = {
  name: string;
  /** "$3.5M raised", or the accelerator that backed it. */
  badge: string;
  description: string;
  photo: ImageAsset;
  logo: ImageAsset;
  press: { title: string; href: string };
};

export type Partner = { name: string; href?: string; logo: ImageAsset };

export type Audience = { title: string; who: string; points: string[] };

export type JourneyStep = {
  label: string;
  /** Set large in the pinned panel while the step is on screen. */
  figure: string;
  title: string;
  body: string;
};

export type SiteContent = {
  name: string;
  description: string;
  /** Production URL, used for canonical links and social cards. */
  url: string | null;
  org: {
    name: string;
    fullName: string;
    /** Shown in the hover card on every "NGEN". */
    tagline: string;
    status: string;
    url: string;
    urlLabel: string;
    logo: ImageAsset;
  };
  event: {
    /** ISO 8601 with offset, e.g. "2027-04-16T09:00:00-04:00". `null` = TBD. */
    startsAt: string | null;
    /** Used to format the date label consistently on server and client. */
    timeZone: string;
    venue: string | null;
    city: string | null;
  };
  links: { apply: string; email: string };
  labels: {
    dateTbd: string;
    venueTbd: string;
    daysAway: (days: number) => string;
    skipToContent: string;
    menuOpen: string;
    menuClose: string;
  };
  nav: { links: NavLink[]; cta: NavLink };
  hero: {
    kicker: string;
    /** Set as a title page: each line is sized to fill the same width. */
    titleLines: string[];
    tagline: string;
    dateLabel: string;
    venueLabel: string;
    inviteOnly: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    /** The opening title sequence on the home page. Facts only. */
    launch: {
      studio: string;
      frames: { figure: string; caption: string }[];
      montageLabel: string;
      turn: string;
      turnCaption: string;
      skip: string;
      soundOn: string;
      soundOff: string;
      soundPending: string;
      replay: string;
    };
  };
  /** Real photography, from NGEN's site. */
  photos: { trailblazers: ImageAsset & { caption: string } };
  strip: {
    label: string;
    /** Firms behind past speakers and alumni. Add `logo` to show a mark instead of the name. */
    firms: BrandMention[];
    news: NavLink;
  };
  mission: {
    title: string;
    /** TBD for review: draft descriptions of who is in the room. */
    /** Draft for review: the three audiences the conference brings together. */
    audiences: [Audience, Audience, Audience];
    center: string;
  };
  journey: {
    title: string;
    steps: JourneyStep[];
    more: NavLink;
  };
  startups: { title: string; intro: string; more: NavLink; items: Startup[] };
  speakers: { title: string; subtitle: string; more: NavLink; bioLabel: string; close: string; items: Speaker[] };
  attend: { title: string; body: string; dateLabel: string; venueLabel: string; cta: string };
  partner: {
    title: string;
    body: string;
    more: NavLink;
    /** TBD: sponsor and partner logos. Nothing renders while empty. */
    logos: Partner[];
    logosLabel: string;
  };
  footer: {
    presentedBy: string;
    copyrightHolder: string;
    status: string;
    columns: { pages: string; social: string; contact: string };
    social: { label: string; href: string; external?: boolean }[];
  };
};

export const site: SiteContent = {
  name: "Ivy League Entrepreneurship Conference",
  description:
    "Connecting world-class student entrepreneurs with today’s most influential leaders. The inaugural Ivy League Entrepreneurship Conference, presented by NGEN.",
  // Production address. Swap for the custom domain once it is connected.
  url: "https://ngen-five.vercel.app",

  org: {
    name: "NGEN",
    fullName: "NextGen Entrepreneurship Network",
    tagline: "the Ivy League entrepreneurship network",
    status: "501(c)(3) nonprofit",
    url: "https://ngennetwork.org",
    urlLabel: "ngennetwork.org",
    logo: { src: "https://www.ngennetwork.org/logos/brand/ngen-mountain-white.png", alt: "NGEN", width: 2250, height: 1154 },
  },

  event: {
    // The date is set; the start time is TBD (noon keeps the date right in any time zone).
    startsAt: "2027-04-17T12:00:00-04:00",
    timeZone: "America/New_York",
    // TBD: venue. The city is set.
    venue: null,
    city: "New York City",
  },

  links: {
    // TBD: application form URL.
    apply: "#",
    email: "info@ngennetwork.org",
  },

  labels: {
    dateTbd: "TBA",
    venueTbd: "To be announced",
    daysAway: (days) => (days === 1 ? "Tomorrow" : days === 0 ? "Today" : `In ${days} days`),
    skipToContent: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },

  nav: {
    links: [
      { label: "About", href: "/about" },
      { label: "Speakers", href: "/speakers" },
      { label: "Sponsors", href: "/sponsors" },
      { label: "Team", href: "/team" },
      { label: "Contact", href: "/contact" },
    ],
    cta: { label: "Request an invite", href: "/invite" },
  },

  hero: {
    kicker: "NGEN presents the inaugural",
    titleLines: ["Ivy League", "Entrepreneurship", "Conference"],
    tagline:
      "Connecting world-class student entrepreneurs with today’s most influential leaders.",
    dateLabel: "Date",
    venueLabel: "Location",
    inviteOnly: "Invite-only",
    primaryCta: { label: "Request an invite", href: "/invite" },
    secondaryCta: { label: "Partner with us", href: "/sponsors" },
    launch: {
      studio: "NGEN presents",
      frames: [
        { figure: "3", caption: "years building the network" },
        { figure: "18", caption: "conferences, treks and pitch competitions" },
        { figure: "$30M", caption: "raised by founders who came through" },
      ],
      montageLabel: "Past speakers and alumni backers from",
      turn: "Now, a bigger stage.",
      turnCaption: "New York City",
      skip: "Skip intro",
      soundOn: "Sound on",
      soundOff: "Sound off",
      soundPending: "Click for sound",
      replay: "Watch the launch, with sound",
    },
  },

  photos: {
    trailblazers: {
      src: "https://www.ngennetwork.org/home/hero-ngen-new-group-3200.webp",
      alt: "NGEN student founders at the Trailblazers Conference in New York",
      width: 1679,
      height: 1119,
      caption: "Student founders at the Trailblazers Conference, New York.",
    },
  },

  strip: {
    label: "Past speakers and alumni backers from",
    // Logos: from each firm's own site (Wikimedia for a16z), shown in one ink.
    firms: [
      { name: "Y Combinator", logo: { src: "/logos/y-combinator.svg", alt: "Y Combinator", width: 48, height: 48 }, logoText: "Combinator" },
      { name: "a16z", logo: { src: "/logos/a16z.svg", alt: "Andreessen Horowitz", width: 210, height: 48 } },
      { name: "Techstars", logo: { src: "/logos/techstars.svg", alt: "Techstars", width: 160, height: 37 } },
      { name: "B Capital", logo: { src: "/logos/b-capital.svg", alt: "B Capital", width: 211, height: 43 } },
      { name: "Renaissance Technologies", logo: { src: "/logos/renaissance-technologies.svg", alt: "Renaissance Technologies", width: 864, height: 112 } },
      { name: "The Motley Fool", logo: { src: "/logos/the-motley-fool.svg", alt: "The Motley Fool", width: 2646, height: 725 } },
      { name: "Girls Who Invest", logo: { src: "/logos/girls-who-invest.png", alt: "Girls Who Invest", width: 498, height: 186 } },
    ],
    news: { label: "Trailblazers is now the Ivy League Entrepreneurship Conference", href: "/about" },
  },

  mission: {
    title: "Talk to the next great founder before they’re too big to reach.",
    audiences: [
      {
        title: "Student founders",
        who: "World-class student entrepreneurs from across the Ivy League, by invitation only.",
        points: [
          "Face time with the investors and operators they want to learn from",
          "Join alumni backed by Y Combinator, a16z and Techstars",
        ],
      },
      {
        title: "Influential leaders",
        who: "Investors, founders and operators, from the President Emeritus of Y Combinator down.",
        points: [
          "Meet the next generation of founders before they’re too big to reach",
          "A small, curated room instead of a crowded expo",
        ],
      },
      {
        title: "Sponsors",
        who: "Firms that want to back the next generation early.",
        points: [
          "Your brand in the room with Ivy League founders",
          "Founders who came through have raised more than $30M",
        ],
      },
    ],
    center: "Face to face",
  },

  journey: {
    title: "From Trailblazers to the Ivy League Entrepreneurship Conference",
    steps: [
      {
        label: "Origin",
        figure: "Trailblazers",
        title: "An intimate room in New York",
        body: "It began as the Trailblazers Conference: student founders and the operators and investors they wanted to learn from.",
      },
      {
        label: "Three years",
        figure: "18",
        title: "Conferences, treks and pitch competitions",
        body: "NGEN built the Ivy League founder network event by event. Founders who came through raised more than $30M, earned backing from Y Combinator, a16z and Techstars, and sold their companies.",
      },
      {
        label: "Now",
        figure: "The Ivy League\nEntrepreneurship\nConference",
        title: "Now, a bigger stage",
        body: "The inaugural Ivy League Entrepreneurship Conference comes to New York City on April\u00a017,\u00a02027.",
      },
    ],
    more: { label: "Read the full story", href: "/about" },
  },

  startups: {
    title: "Founders who came through",
    intro: "Startups from the NGEN network, and what they have raised since.",
    more: { label: "More on ngennetwork.org", href: "https://www.ngennetwork.org" },
    // From NGEN's featured startups. Images are served from ngennetwork.org.
    items: [
      {
        name: "Freya",
        badge: "$3.5M raised",
        description: "Voice AI agents for financial services.",
        photo: { src: "https://www.ngennetwork.org/team-photos/freya-photo.webp", alt: "The Freya team", width: 1280, height: 720 },
        logo: { src: "https://www.ngennetwork.org/logos/startups/freya-logo.jpeg", alt: "Freya", width: 200, height: 200 },
        press: { title: "Freya: $3.5 Million Raised To Expand Human-Like Voice Automation Technology", href: "https://pulse2.com/freya-3-5-million/" },
      },
      {
        name: "Series",
        badge: "$8.2M raised",
        description: "AI-powered social network matching founders and mentors.",
        photo: { src: "https://www.ngennetwork.org/team-photos/series-photo.png", alt: "The Series founders", width: 870, height: 840 },
        logo: { src: "https://www.ngennetwork.org/logos/startups/series-logo.png", alt: "Series", width: 453, height: 315 },
        press: { title: "Two College Kids Raise a $5.1 Million Pre-Seed to Build an AI Social Network in iMessage", href: "https://techcrunch.com/2026/04/24/two-college-kids-raise-a-5-1-million-pre-seed-to-build-an-ai-social-network-in-imessage/" },
      },
      {
        name: "Nerd Apply",
        badge: "$3.2M raised",
        description: "Privacy-first data platform for college admissions counseling.",
        photo: { src: "https://www.ngennetwork.org/team-photos/nerdapply-photo.jpeg", alt: "The Nerd Apply team", width: 1280, height: 1916 },
        logo: { src: "https://www.ngennetwork.org/logos/startups/nerdapply-logo.jpeg", alt: "Nerd Apply", width: 175, height: 150 },
        press: { title: "Nerd Apply raises $3.2 million in seed funding for its college admissions counseling platform", href: "https://www.edtechinnovationhub.com/news/nerd-apply-raises-32-million-in-seed-funding-for-its-college-admissions-counseling-platform" },
      },
      {
        name: "Cloak",
        badge: "$75K raised",
        description: "Protects online publisher content against AI scraping.",
        photo: { src: "https://www.ngennetwork.org/team-photos/cloak-photo.jpg", alt: "The Cloak team", width: 900, height: 600 },
        logo: { src: "https://www.ngennetwork.org/logos/startups/cloak-logo.png", alt: "Cloak", width: 1159, height: 455 },
        press: { title: "Cloak Wins $75,000 Perlman Grand Prize in Venture Lab Startup Challenge", href: "https://news.wharton.upenn.edu/press-releases/2026/05/cloak-wins-75000-perlman-grand-prize-in-venture-lab-startup-challenge/" },
      },
      {
        name: "Doe",
        badge: "Y Combinator",
        description: "AI platform building company-native agents to automate work.",
        photo: { src: "https://www.ngennetwork.org/team-photos/doe-photo.jpeg", alt: "The Doe team", width: 800, height: 1333 },
        logo: { src: "https://www.ngennetwork.org/logos/startups/doe-lockup-dark.svg", alt: "Doe", width: 200, height: 78 },
        press: { title: "Doe: A new productivity platform", href: "https://www.ycombinator.com/launches/OyO-doe-a-new-productivity-platform" },
      },
      {
        name: "Cai Creative",
        badge: "Techstars",
        description: "AI co-composer helping musicians create chords and melodies.",
        photo: { src: "https://www.ngennetwork.org/team-photos/cai-creative-photo.avif", alt: "Cai Creative", width: 1840, height: 1120 },
        logo: { src: "https://www.ngennetwork.org/logos/startups/cai-creative-logo.png", alt: "Cai Creative", width: 658, height: 450 },
        press: { title: "How Mathematician Reuel Williams Is Uniting Art & Technology", href: "https://www.inverse.com/tech/how-mathematician-reuel-williams-is-uniting-art-technology" },
      },
    ],
  },

  speakers: {
    title: "Past speakers",
    subtitle: "At the Trailblazers Conference, New York",
    more: { label: "All speakers", href: "/speakers" },
    bioLabel: "Read bio",
    close: "Close",
    // Bios: NGEN's speaker bios, public bios for Howard Morgan, and the team's notes for the last five.
    items: [
      {
        name: "Geoff Ralston",
        roles: ["President Emeritus, Y Combinator"],
        affiliation: "Dartmouth ’82",
        bio: "Geoff Ralston served as president of Y Combinator. He created Rocketmail, which became Yahoo! Mail, and at Yahoo! held senior roles including VP of Engineering and Chief Product Officer. He later served as CEO of Lala Media, which was acquired by Apple.",
        headshot: { src: "https://www.ngennetwork.org/speakers/geoff-ralston.jpg", alt: "Geoff Ralston", width: 500, height: 500 },
      },
      {
        name: "Howard Morgan",
        roles: ["Co-Founder, B Capital", "Founding President, Renaissance Technologies"],
        affiliation: "Cornell PhD",
        bio: "Howard Morgan was the first president of Renaissance Technologies, co-founded First Round Capital, and chairs B Capital. Before investing, he taught decision sciences at the Wharton School and computer science at the University of Pennsylvania.",
        headshot: { src: "/speakers/howard-morgan.webp", alt: "Howard Morgan", width: 1080, height: 1350 },
      },
      {
        name: "Tom Gardner",
        roles: ["Co-Founder & CEO, The Motley Fool"],
        affiliation: "Brown ’90",
        bio: "Tom Gardner co-founded The Motley Fool, a multimedia financial services company that reaches millions of people each month through its website, books, newspaper column, radio show, television appearances and subscription newsletters.",
        headshot: { src: "https://www.ngennetwork.org/speakers/tom-gardner.jpg", alt: "Tom Gardner", width: 998, height: 1497 },
      },
      {
        name: "Seema Hingorani",
        roles: ["Founder, Girls Who Invest"],
        affiliation: "Yale, Wharton MBA",
        bio: "Seema Hingorani is the Founder and Chair of Girls Who Invest, a nonprofit founded in 2015 to increase the number of women in the investment industry. She is also a Managing Director at Morgan Stanley Investment Management.",
        headshot: { src: "https://www.ngennetwork.org/speakers/Copy-of-Seema-Image.jpg", alt: "Seema Hingorani", width: 2048, height: 2048 },
      },
      // Headshots below: from each speaker's firm or alumni page (a16z, General Catalyst,
      // Columbia AAA, 125 Ventures, Techstars), cropped to 4:5.
      {
        name: "Kenan Saleh",
        roles: ["Investment Partner, Andreessen Horowitz"],
        affiliation: "Penn, Wharton",
        bio: "Kenan Saleh is an Investment Partner at Andreessen Horowitz. He co-founded Halo, which was acquired by Lyft, and then served as GM of Lyft Media.",
        headshot: { src: "/speakers/kenan-saleh.webp", alt: "Kenan Saleh", width: 819, height: 1024 },
      },
      {
        name: "Max Rimpel",
        roles: ["Partner, General Catalyst"],
        affiliation: "Cornell",
        bio: "Max Rimpel is a Partner at General Catalyst, where he sits on the board of Mercor.",
        headshot: { src: "/speakers/max-rimpel.webp", alt: "Max Rimpel", width: 1042, height: 1302 },
      },
      {
        name: "Issam Freiha",
        roles: ["Co-Founder & CEO, Blank Street"],
        affiliation: "Columbia",
        bio: "Issam Freiha co-founded Blank Street in 2020 and, as CEO, has built it into a global coffee brand.",
        headshot: { src: "/speakers/issam-freiha.webp", alt: "Issam Freiha", width: 957, height: 1196 },
      },
      {
        name: "Lorine Pendleton",
        roles: ["Founder & Managing Partner, 125 Ventures"],
        affiliation: "Brown",
        bio: "Lorine Pendleton is the Founder and Managing Partner of 125 Ventures. She was an early investor in Oura, which grew 50x to an $11B valuation.",
        headshot: { src: "/speakers/lorine-pendleton.webp", alt: "Lorine Pendleton", width: 1080, height: 1350 },
      },
      {
        name: "Gary Stewart",
        roles: ["Founding Head, Adobe Private Capital Americas"],
        affiliation: "Yale",
        bio: "Gary Stewart is the Founding Head of Adobe Private Capital Americas. He was previously a Managing Director at Techstars NYC, where he led the $80M JPMorgan Techstars fund.",
        headshot: { src: "/speakers/gary-stewart.webp", alt: "Gary Stewart", width: 592, height: 740 },
      },
    ],
  },

  attend: {
    title: "Attend",
    body: "The conference is invite-only: student entrepreneurs request an invite to attend. It takes place on April\u00a017,\u00a02027, in New\u00a0York\u00a0City, and invitations arrive by email.",
    dateLabel: "Date",
    venueLabel: "Location",
    cta: "Request an invite",
  },

  partner: {
    title: "Partner",
    body: "Put your brand in front of the next generation of Ivy League founders. For sponsorship and partnership, write to the NGEN team.",
    more: { label: "Why partner with us", href: "/sponsors" },
    // TBD: partner and sponsor logos.
    logos: [],
    logosLabel: "Partners of the conference",
  },

  footer: {
    presentedBy:
      "Presented by NGEN, the NextGen Entrepreneurship Network, a 501(c)(3) nonprofit.",
    copyrightHolder: "NGEN",
    status: "Connecting world-class student entrepreneurs with today’s most influential leaders.",
    columns: { pages: "Pages", social: "Social", contact: "Contact" },
    social: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/ngen-network/", external: true },
      { label: "Press release", href: "/press" },
    ],
  },
};

/* ---------------------------------------------------------------------------
   Inner pages
   ------------------------------------------------------------------------ */

export type TeamMember = {
  name: string;
  /** Title at NGEN, where the person lists one. */
  role?: string;
  /** Field of study, shown when there is no title. */
  study?: string;
  /** School and class year, shown as a tag on the photo. */
  school: string;
  bio: string;
  linkedin: string;
  headshot: ImageAsset | null;
};

export type Item = { title: string; body: string };
export type ContactTopic = { title: string; body: string; subject: string };

export type PagesContent = {
  press: {
    kicker: string;
    /** TBD: publication date of the release. */
    date: string;
    title: string;
    body: string[];
    signature: string;
    coverageTitle: string;
    contact: string;
    back: string;
  };
  invite: {
    title: string;
    intro: string;
    stepsTitle: string;
    steps: { title: string; body: string }[];
    formTitle: string;
    fields: { name: string; email: string; school: string; year: string; startup: string; link: string; building: string };
    optional: string;
    submit: string;
    submitNote: string;
    subject: string;
    others: { title: string; body: string; href: string }[];
  };
  about: {
    title: string;
    intro: string;
    /** Facts set beside the intro in the page header. */
    facts: { label: string; value: string }[];
    conferenceTitle: string;
    /** The conference's own bio. */
    conference: string[];
    /** TBD: event photos. The block is hidden until one has an image. */
    photos: Photo[];
    ngenTitle: string;
    /** NGEN's own bio. */
    ngenBody: string;
    ngenMission: string;
    ngenStats: { value: string; label: string }[];
  };
  speakers: {
    title: string;
    intro: string;
    upcomingTitle: string;
    upcomingBody: string;
    upcomingCta: string;
  };
  team: {
    title: string;
    intro: string;
    leadershipTitle: string;
    leadership: TeamMember[];
    membersTitle: string;
    members: TeamMember[];
    linkedinLabel: string;
    membersEmpty: string;
    joinTitle: string;
    joinBody: string;
    joinCta: string;
  };
  sponsors: {
    title: string;
    intro: string;
    /** Figures set in the page header. */
    figures: { value: string; label: string }[];
    reasonsTitle: string;
    reasons: Item[];
    /** Companies that have supported NGEN events before. */
    supportersTitle: string;
    supportersNote: string;
    supporters: BrandMention[];
    /** Small label over the firms behind past speakers and alumni, on the same page. */
    firmsLabel: string;
    /** TBD for review: partnership formats, no pricing until NGEN confirms. */
    formatsTitle: string;
    formats: Item[];
    logosEmpty: string;
    ctaTitle: string;
  };
  contact: {
    title: string;
    intro: string;
    topics: ContactTopic[];
    emailCta: string;
    /** The email drawn on the right, as it opens in your mail app. */
    draft: { label: string; to: string; subject: string; body: string };
    topicsTitle: string;
  };
};

export const pages: PagesContent = {
  press: {
    kicker: "Press release",
    // TBD: set the real publication date.
    date: "October 5, 2026",
    title: "The next great founders are still taking meetings.",
    body: [
      "Somewhere in a dorm room tonight, someone is building the company everyone will be talking about in ten years.",
      "Right now, they still answer their own email.",
      "In a few years, they won’t. Their calendars will fill. Their rounds will close before most people hear about them. The window to meet them, help them and back them early will have passed.",
      "Most people only notice founders once they’re already too big to reach.",
      "Three years ago, NGEN started the Trailblazers Conference: an intimate gathering in New York where student founders could sit across the table from the operators and investors they wanted to learn from.",
      "Since then, NGEN has run 18 conferences, founder treks and pitch competitions. Founders who came through have earned backing from Y Combinator, a16z and Techstars, raised more than $30M, and led their startups to acquisition. Past speakers include Geoff Ralston, Howard Morgan, Tom Gardner and Seema Hingorani.",
      "Today, we’re announcing what comes next.",
      "The Ivy League Entrepreneurship Conference is Trailblazers, reborn on a larger stage. Invite-only and held in New York City, it connects world-class student entrepreneurs with today’s most influential leaders, face to face.",
      "It is deliberately small: a room built for real conversations, not a hall where business cards change hands.",
      "For student founders, it’s a seat across from the people who can change the course of a company. For investors, operators and partners, it’s the chance to meet the next generation while they still take every meeting.",
      "The conference takes place on April\u00a017,\u00a02027. Invitations can be requested today.",
      "The next great founder is already building. Come meet them.",
    ],
    signature: "The NGEN team",
    coverageTitle: "NGEN founders in the press",
    contact: "Press inquiries",
    back: "Back to home",
  },

  invite: {
    title: "Request an invite.",
    intro:
      "The Ivy League Entrepreneurship Conference is invite-only. Tell us about you and what you’re building, and the NGEN team will be in touch.",
    stepsTitle: "How it works",
    steps: [
      { title: "Send your request", body: "A few lines on you, your school and what you’re building." },
      { title: "The team reviews it", body: "Every request is read by the NGEN team." },
      { title: "Invitations arrive by email", body: "Along with the venue, once it’s announced." },
    ],
    formTitle: "Your request",
    fields: {
      name: "Full name",
      email: "Email",
      school: "School",
      year: "Graduation year",
      startup: "Startup (if you have one)",
      link: "Website or LinkedIn",
      building: "What are you building, or what would you like to build?",
    },
    optional: "Optional",
    submit: "Write the email",
    submitNote: "Opens your email app with your request filled in. Nothing is sent until you press send.",
    subject: "Invite request",
    others: [
      { title: "Partners and sponsors", body: "Talk to us about partnering.", href: "/sponsors" },
      { title: "Speakers", body: "Propose yourself or someone else.", href: "/contact" },
    ],
  },

  about: {
    title: "Connecting world-class student entrepreneurs with today’s most influential leaders.",
    intro: "NGEN, the Ivy League entrepreneurship network, presents the inaugural Ivy League Entrepreneurship Conference in New York City.",
    facts: [
      { label: "Location", value: "New York City" },
      { label: "Format", value: "Invite-only" },
    ],
    conferenceTitle: "About the conference",
    conference: [
      "The mission is clear: an invite-only conference where world-class student entrepreneurs meet today’s most influential leaders face to face.",
      "Formerly the Trailblazers Conference, an intimate New York gathering, the event has been reborn on a larger stage to expand its impact. Its alumni have gone on to earn backing from Y Combinator, a16z and Techstars, raise over $30M, and lead their startups to acquisition.",
      "Past speakers include Geoff Ralston (President Emeritus, Y Combinator), Tom Gardner (Co-Founder & CEO, The Motley Fool) and Seema Hingorani (Founder, Girls Who Invest).",
    ],
    photos: [
      { image: null, caption: "A speaker on stage at Trailblazers, New York" },
      { image: null, caption: "Student founders between sessions" },
      { image: null, caption: "The audience at Trailblazers" },
    ],
    ngenTitle: "Presented by NGEN",
    ngenBody:
      "NGEN is the Ivy League entrepreneurship network: the center of gravity for student-led innovation, where students meet, build and raise capital.",
    ngenMission: "Our mission: connecting the next generation of founders across the Ivy League.",
    ngenStats: [
      { value: "$30M+", label: "raised by NGEN founders" },
      { value: "$500K+", label: "put directly into students and our programs by NGEN’s VC partners" },
    ],
  },
  speakers: {
    title: "The people founders want in the room.",
    intro:
      "Past speakers include the President Emeritus of Y Combinator and the founders of some of the most respected firms in finance and investing.",
    upcomingTitle: "This year’s lineup",
    // TBD: announce speakers here.
    upcomingBody: "To be announced. If there is someone student founders should hear from, tell us.",
    upcomingCta: "Propose a speaker",
  },
  team: {
    title: "Built by students, for student founders.",
    intro: "The Ivy League Entrepreneurship Conference is organized by the NGEN team, student founders and operators from across the Ivy League.",
    // From each person's LinkedIn (photos, schools, highlights), October 2026.
    leadershipTitle: "Leadership",
    leadership: [
      {
        name: "Jackson Lehner",
        role: "Co-Founder, NGEN",
        school: "Princeton ’24",
        bio: "Co-founded NGEN in 2023. At Princeton, co-president of the Entrepreneurship Club, the university’s largest student organization, with 500 members and 15 subteams, and on the founding team of Berry, a grocery-recommendation startup.",
        linkedin: "https://www.linkedin.com/in/jacksonlehner/",
        headshot: { src: "/team/jackson-lehner.webp", alt: "Jackson Lehner", width: 800, height: 1000 },
      },
      {
        name: "Harsha Ravindran",
        role: "Co-Founder & Executive Director, NGEN",
        school: "Penn ’26",
        bio: "Co-founded NGEN in 2023 and Expop, an incubator where more than 200 high school students build their first startups. A Diana Award recipient, member of OpenAI’s inaugural ChatGPT Lab and former president of Wharton’s Undergraduate Entrepreneurship Club.",
        linkedin: "https://www.linkedin.com/in/actuallyharsha/",
        headshot: { src: "/team/harsha-ravindran.webp", alt: "Harsha Ravindran", width: 800, height: 1000 },
      },
      {
        name: "Juan Teles",
        study: "Economics + Art History",
        school: "Dartmouth ’28",
        bio: "CEO of bcs, after fintech at Stone in São Paulo, private equity at Tigbourne Capital in London and research at Harvard. A Fundação Estudar Fellow, Wells Fargo Fellow, one of Brazil’s top 26 most promising young leaders and former executive vice president of the Brazil Conference at Harvard\u00a0&\u00a0MIT.",
        linkedin: "https://www.linkedin.com/in/juanteles/",
        headshot: { src: "/team/juan-teles.webp", alt: "Juan Teles", width: 800, height: 1000 },
      },
    ],
    membersTitle: "Team",
    members: [
      {
        name: "Angie Hu",
        study: "Philosophy + Computer Science",
        school: "Columbia",
        bio: "Product intern at LimX Dynamics, on its embodied-AI toolchain. Previously an AI research fellow in Columbia’s computer science department and an Anson L. Clark Scholar at Texas Tech.",
        linkedin: "https://www.linkedin.com/in/angiehu76/",
        headshot: { src: "/team/angie-hu.webp", alt: "Angie Hu", width: 800, height: 1000 },
      },
      {
        name: "Shiven Dawda",
        study: "Mathematical Economics & Politics",
        school: "Penn ’29",
        bio: "Ben Franklin Scholar at Penn and vice president of the Class of 2029 in student government. An eight-time award-winning public speaker, consulting fellow at Umbrex and undergraduate associate at Perry\u00a0World\u00a0House.",
        linkedin: "https://www.linkedin.com/in/sdawda/",
        headshot: { src: "/team/shiven-dawda.webp", alt: "Shiven Dawda", width: 800, height: 1000 },
      },
    ],
    linkedinLabel: "LinkedIn",
    membersEmpty: "The organizing team will be introduced here soon.",
    joinTitle: "Help build the conference",
    joinBody: "We are looking for organizers, designers and operators who care about student founders.",
    joinCta: "Write to the team",
  },
  sponsors: {
    title: "Meet the next generation of founders before anyone else does.",
    intro:
      "Put your brand in front of Ivy League student founders and the investors and operators who show up for them.",
    figures: [
      { value: "$30M+", label: "raised by founders who came through" },
      { value: "18", label: "conferences, treks and pitch competitions" },
    ],
    supportersTitle: "Past supporters",
    supportersNote: "Companies that have supported NGEN events.",
    // Logos from each company's own site. TBD: official logo files for M31 Capital,
    // Honors Fund and Blue & Gold Ventures (their names show until then).
    supporters: [
      { name: "Mercury", logo: { src: "/logos/mercury.svg", alt: "Mercury", width: 139, height: 32 } },
      { name: "M31 Capital" },
      { name: "OVO Fund", logo: { src: "/logos/ovo-fund.png", alt: "OVO Fund", width: 268, height: 160 } },
      { name: "Honors Fund" },
      { name: "BullMont Capital", logo: { src: "/logos/bullmont-capital.png", alt: "BullMont Capital", width: 706, height: 124 } },
      { name: "Blue & Gold Ventures" },
      { name: "ProtoPie", logo: { src: "/logos/protopie.svg", alt: "ProtoPie", width: 70, height: 14 } },
    ],
    firmsLabel: "Past speakers and alumni backers from",
    reasonsTitle: "Why partner",
    reasons: [
      {
        title: "The founders",
        body: "World-class student entrepreneurs from across the Ivy League.",
      },
      {
        title: "The company you keep",
        body: "Speakers and alumni backers from the firms below.",
      },
      {
        title: "The track record",
        body: "Conference alumni have raised over $30M and led their startups to acquisition.",
      },
    ],
    formatsTitle: "Ways to partner",
    // TBD for review: confirm formats with NGEN.
    formats: [
      { title: "Conference partner", body: "Presence across the flagship event." },
      { title: "Pitch competition", body: "Back the prize and meet the finalists." },
    ],
    logosEmpty: "Partners will be announced here.",
    ctaTitle: "Talk to us about partnering",
  },
  contact: {
    title: "Talk to us.",
    intro: "Questions about invitations, partnerships, speaking or press all reach the NGEN team.",
    topics: [
      { title: "Attending", body: "Invitations and the event itself.", subject: "Ivy League Entrepreneurship Conference: attending" },
      { title: "Partnerships", body: "Sponsorship and partnership.", subject: "Ivy League Entrepreneurship Conference: partnership" },
      { title: "Speaking", body: "Propose yourself or someone else.", subject: "Ivy League Entrepreneurship Conference: speaking" },
      { title: "Press", body: "Media and interview requests.", subject: "Ivy League Entrepreneurship Conference: press" },
    ],
    emailCta: "Write an email",
    draft: { label: "New message", to: "To", subject: "Subject", body: "Hello, I’m writing about" },
    topicsTitle: "Or pick a topic, and it reaches the right person",
  },
};
