// ---------------------------------------------------------------
// Edit this file to add projects and team members.
// No build step needed — save and refresh the page.
// (After editing, bump the ?v= number in index.html and project.html.)
// ---------------------------------------------------------------

// Each project:
//   slug        - short unique id used in the page URL: project.html?p=<slug>
//   title       - project name
//   description - one or two sentences, shown on the card
//   category    - used for the filter buttons (e.g. "Games", "Apps")
//   status      - "Live", "In development", "Prototype", etc.
//   tags        - list of short labels (tech, platform, genre...)
//   by          - who built it
//   link        - optional external URL (store page, download, site); "" to hide
//   image       - optional cover image, e.g. "assets/projects/my-project.jpg"
//
//   Project page only (all optional):
//   about       - list of paragraphs for the "About" section
//   features    - list of short bullet points
//   screenshots - list of image paths for the gallery
const PROJECTS = [
  {
    slug: "sigma-squad",
    title: "Sigma Squad",
    description: "A top-down sci-fi action game. Lead a heavily armored soldier through a dark industrial station, holding the line against relentless waves of alien swarmers with a kit of explosive abilities.",
    category: "Games",
    status: "In development",
    tags: ["Unity", "C#", "Top-down shooter", "Wave survival"],
    by: "Valdur Studios",
    link: "",
    image: "assets/projects/sigma-squad.jpg",
    about: [
      "Sigma Squad drops you into a dimly lit industrial station overrun by alien swarmers. Hostiles pour in wave after wave, and it's up to you to hold your ground.",
      "Fight from a top-down view with a heavily armored soldier, a set of explosive abilities, and whatever the station's corridors give you to work with.",
    ],
    features: [
      "Wave-based survival against swarms of alien enemies",
      "Ability loadout on Q, W, E and R, with more to unlock",
      "Enemy AI that navigates the station to hunt you down",
      "Earn currency as you fight",
    ],
    screenshots: ["assets/projects/sigma-squad.jpg"],
  },
  {
    slug: "memmo",
    title: "MemMo",
    description: "Capture short video clips throughout the month, then turn them into a recap video with an intro and music. Share your MemMo with friends during each month's posting window, and follow, comment on, and rewatch everyone's recaps.",
    category: "Apps",
    status: "In development",
    tags: ["Flutter", "Dart", "Firebase", "iOS & Android"],
    by: "Valdur Studios",
    link: "",
    image: "",
    about: [
      "Small moments, one recap a month. MemMo is a video diary that doesn't ask much of you: whenever something happens, grab a quick clip. By the end of the month you've got a stack of little moments you'd otherwise have forgotten.",
      "In the first half of the next month, MemMo turns those clips into a recap video. Pick your favorite clips, add an intro and music, then preview it, save it, and post it for your friends before the window closes on the 15th.",
    ],
    features: [
      "Record quick 4-second clips from your day",
      "Build a monthly recap with your choice of clips, intro, and music",
      "Posting window runs from the 1st to the 15th of each month",
      "Follow friends and see their recaps in your feed",
      "Comment on and rewatch recaps",
      "Reminders when your recap is ready and before the window closes",
      "Save clips and recaps to your phone's gallery",
    ],
    screenshots: [],
  },
  {
    slug: "chess-revolution",
    title: "Chess: Revolution",
    description: "A tactical roguelike strategy game built around chess. Battle through runs of increasingly tough encounters, collecting upgrades and bending the rules of chess to build a winning army.",
    category: "Games",
    status: "In development",
    tags: ["Roguelike", "Strategy", "Chess"],
    by: "Valdur Studios",
    link: "",
    image: "",
    about: [
      "Chess: Revolution takes the game everyone knows and turns it into a roguelike. Every run is a series of tactical battles on the board, each one tougher than the last.",
      "Between fights you'll collect upgrades that bend the rules of chess, building an army that plays like nothing you've seen across a normal board.",
    ],
    features: [
      "Tactical battles built on chess rules",
      "Roguelike runs with escalating encounters",
      "Upgrades that change how your pieces play",
    ],
    screenshots: [],
  },
  {
    slug: "tower-defense",
    title: "Untitled Tower Defense",
    description: "A first-person tower defense game. Build your defenses, then jump into the fight yourself to hold the line against incoming waves.",
    category: "Games",
    status: "In development",
    tags: ["First-person", "Tower defense"],
    by: "Valdur Studios",
    link: "",
    image: "",
    about: [
      "A tower defense game you play from the ground. Plan and build your defenses, then grab a weapon and get into the fight yourself as the waves roll in.",
      "This one is still early in development. More to share soon.",
    ],
    features: [
      "First-person perspective",
      "Build and upgrade defenses",
      "Fight alongside your towers against incoming waves",
    ],
    screenshots: [],
  },
];

// Each team member:
//   name, role, link (optional: portfolio, GitHub, LinkedIn...)
const TEAM = [
  { name: "Andrew", role: "Founder", link: "" },
  { name: "Peter", role: "Game Philosopher in Chief", link: "" },
];
