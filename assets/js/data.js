/* ==========================================================================
   Sidestream — dataset
   --------------------------------------------------------------------------
   Every entry is a legal, non-employment way to earn money. Figures are
   researched monthly ranges in USD for someone doing the thing seriously but
   not exceptionally: [floor, typical, strong]. They are illustrative, not
   promises. Nothing here requires recruiting other people, buying a "system",
   or paying to work.

   pay    : [low, typical, high] monthly USD
   cost   : none | low | mid | high        (money needed to start)
   speed  : days | weeks | months | long   (time until the first payment)
   effort : active | semi | passive        (ongoing work once running)
   skill  : beginner | intermediate | advanced
   where  : online | hybrid | local
   scale  : 1-5 how far it can grow beyond your own hours
   risk   : 1-5 chance of losing money or wasted time
   ========================================================================== */

const CATEGORIES = [
  { id: 'creator',   name: 'Creator & content',   short: 'Creator',   icon: 'video',    blurb: 'Build an audience or a library of work, then let ads, sponsors and affiliates pay for it.' },
  { id: 'freelance', name: 'Freelance & services', short: 'Freelance', icon: 'briefcase', blurb: 'Sell a skill directly to clients. The fastest reliable route from zero to real money.' },
  { id: 'ecommerce', name: 'Products & selling',  short: 'Selling',   icon: 'bag',      blurb: 'Make, source or flip physical and digital products for a margin.' },
  { id: 'micro',     name: 'Micro-work & gigs',   short: 'Micro-work', icon: 'grid',     blurb: 'Small paid tasks with no application process. Modest money, near-instant start.' },
  { id: 'rental',    name: 'Rent what you own',   short: 'Renting',   icon: 'key',      blurb: 'Your spare room, driveway, garage, car or gear is a dormant asset.' },
  { id: 'invest',    name: 'Yield & investing',   short: 'Investing', icon: 'chart',    blurb: 'Capital doing the work instead of hours. Slow, and it can lose money.' },
  { id: 'local',     name: 'Local & hands-on',    short: 'Local',     icon: 'home',     blurb: 'Offline work in your own neighbourhood. Low competition, cash quickly.' },
  { id: 'grow',      name: 'Growing & smallholding', short: 'Growing', icon: 'sprout',  blurb: 'Small-plot food and plants, sold direct at a premium. Land helps; several of these need none.' },
  { id: 'teaching',  name: 'Teaching & expertise', short: 'Teaching',  icon: 'cap',      blurb: 'Charge for what you already know, live or packaged.' },
  { id: 'royalty',   name: 'Royalties & licensing', short: 'Royalties', icon: 'music',   blurb: 'Create once, get paid whenever someone uses it. Long build, long tail.' },
  { id: 'rewards',   name: 'Rewards & bonuses',   short: 'Rewards',   icon: 'gift',     blurb: 'Money already on the table from banks, retailers and researchers.' }
];

const FACETS = {
  cost: {
    label: 'Startup cost',
    options: [
      { v: 'none', label: 'Nothing',      hint: '$0' },
      { v: 'low',  label: 'Under $200',   hint: '$1–200' },
      { v: 'mid',  label: '$200–$2,000',  hint: '$200–2k' },
      { v: 'high', label: 'Over $2,000',  hint: '$2k+' }
    ]
  },
  speed: {
    label: 'Time to first payment',
    options: [
      { v: 'days',   label: 'Days' },
      { v: 'weeks',  label: 'Weeks' },
      { v: 'months', label: '2–6 months' },
      { v: 'long',   label: '6 months+' }
    ]
  },
  effort: {
    label: 'Ongoing effort',
    options: [
      { v: 'active',  label: 'Hands-on',   hint: 'you trade hours' },
      { v: 'semi',    label: 'Semi-passive', hint: 'upkeep only' },
      { v: 'passive', label: 'Passive',    hint: 'runs itself' }
    ]
  },
  skill: {
    label: 'Skill needed',
    options: [
      { v: 'beginner',     label: 'None to start' },
      { v: 'intermediate', label: 'Some experience' },
      { v: 'advanced',     label: 'Real expertise' }
    ]
  },
  where: {
    label: 'Where you work',
    options: [
      { v: 'online', label: 'Fully online' },
      { v: 'hybrid', label: 'Either' },
      { v: 'local',  label: 'In person' }
    ]
  }
};

const LABELS = {
  cost:  { none: 'Free to start', low: 'Under $200', mid: '$200–$2k', high: '$2k+' },
  speed: { days: 'Days', weeks: 'Weeks', months: '2–6 months', long: '6 months+' },
  effort:{ active: 'Hands-on', semi: 'Semi-passive', passive: 'Passive' },
  skill: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
  where: { online: 'Online', hybrid: 'Online or local', local: 'In person' }
};

const ORDER = {
  cost:  { none: 0, low: 1, mid: 2, high: 3 },
  speed: { days: 0, weeks: 1, months: 2, long: 3 }
};

/* ========================================================================== */

const STREAMS = [

  /* ------------------------------------------------------ CREATOR & CONTENT */
  {
    id: 'youtube', name: 'YouTube channel', cat: 'creator',
    tagline: 'Build a small audience around one narrow subject and let ads, sponsors and affiliates stack on top.',
    summary: 'The Partner Programme pays roughly $2–$18 per thousand views depending on your topic and audience country — finance, software and insurance pay many times what gaming or entertainment pays. Ads are rarely the main money: a channel with 20,000 engaged subscribers in a commercial niche typically earns more from one sponsor slot than from a month of ad revenue. The hard part is the first year, when almost nobody is watching and nothing is paid.',
    pay: [0, 500, 15000], cost: 'low', costLabel: '$0–$400 (a phone works)', speed: 'long', speedLabel: '6–18 months',
    effort: 'semi', skill: 'intermediate', where: 'online', scale: 5, risk: 2,
    likes: ['video', 'writing', 'research'],
    platforms: [['YouTube Partner Programme', 'https://www.youtube.com/creators/'], ['Patreon', 'https://www.patreon.com'], ['Passionfroot (sponsors)', 'https://www.passionfroot.me']],
    steps: [
      'Pick a subject narrow enough that someone could describe your channel in one sentence, and commercial enough that businesses want to reach that viewer.',
      'Publish 20–30 videos before judging anything. Study which of your own thumbnails and titles got clicked, and make more of those.',
      'Reach 1,000 subscribers and 4,000 watch hours (or 10M Shorts views in 90 days) to switch on ad revenue.',
      'Add the layers that actually pay: an affiliate link in the description, a sponsor slot, then your own product or membership.'
    ],
    pros: ['Every video keeps earning for years, so income compounds while you sleep', 'Sponsorship rates are set by you, not by a platform algorithm', 'The audience transfers — a channel becomes a launchpad for anything else you sell'],
    cons: ['Most channels earn near zero for the first 6–12 months and many quit there', 'Editing time is brutal until you can afford to hire it out', 'One algorithm change can halve your views overnight'],
    flags: ['Any course promising a "faceless automated YouTube empire" is selling you the course, not the outcome', 'Never buy subscribers or views — it kills your reach and can get the channel demonetised'],
    tags: ['ads', 'sponsorship', 'audience', 'evergreen']
  },
  {
    id: 'niche-blog', name: 'Niche content site', cat: 'creator',
    tagline: 'Answer the specific questions people type into search engines, and monetise the traffic.',
    summary: 'A site covering one tight subject — cast iron cookware, sim racing gear, visa paperwork for one country — earns from display ads, affiliate commissions and eventually direct sponsorship. Ad networks like Mediavine and Raptive pay roughly $15–$40 per thousand sessions, so 30,000 monthly visitors is a meaningful side income. Search traffic has become far harder to win since AI answers arrived, so the sites that work now are the ones with genuine first-hand testing, photos and opinions that a model cannot synthesise.',
    pay: [0, 400, 8000], cost: 'low', costLabel: '$60–$250/yr hosting + domain', speed: 'long', speedLabel: '8–24 months',
    effort: 'semi', skill: 'intermediate', where: 'online', scale: 5, risk: 2,
    likes: ['writing', 'research', 'photo'],
    platforms: [['WordPress', 'https://wordpress.org'], ['Ghost', 'https://ghost.org'], ['Mediavine', 'https://www.mediavine.com'], ['Raptive', 'https://raptive.com']],
    steps: [
      'Choose a subject you can write 100 articles about without resenting it, where products are bought online.',
      'Buy a domain and hosting, install WordPress or Ghost, and publish under your own name with a real about page.',
      'Write the specific, low-competition questions first — comparisons, "is X worth it", troubleshooting — with your own photos.',
      'Join an affiliate programme early, then apply to an ad network once you clear their traffic minimum.'
    ],
    pros: ['Genuinely semi-passive once articles rank — old posts earn for years', 'You own the asset outright and content sites sell for 30–45x monthly profit', 'No camera, no voice, no schedule'],
    cons: ['Search algorithm updates can erase most of your traffic in a single day', 'AI overviews now answer many of the simple questions that used to send you clicks', 'Very long feedback loop — you may write 40 articles before knowing if it works'],
    flags: ['Avoid anyone selling "done for you" AI content sites — mass-generated sites get filtered out', 'Private blog networks and bought backlinks are a fast route to a penalty'],
    tags: ['seo', 'affiliate', 'ads', 'writing']
  },
  {
    id: 'newsletter', name: 'Paid newsletter', cat: 'creator',
    tagline: 'Write something worth paying for to a small list, weekly, in your inbox and theirs.',
    summary: 'Newsletters convert far better than most media because the relationship is direct — no algorithm sits between you and the reader. The maths is unforgiving but clear: 500 paying subscribers at $8/month is $4,000 a month, and 500 is a realistic ceiling for a genuinely useful trade or professional newsletter. Free newsletters monetise instead through sponsor slots, typically $20–$60 per thousand subscribers per send.',
    pay: [0, 350, 9000], cost: 'none', costLabel: '$0 until you have subscribers', speed: 'long', speedLabel: '6–18 months',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 4, risk: 1,
    likes: ['writing', 'research'],
    platforms: [['beehiiv', 'https://www.beehiiv.com'], ['Substack', 'https://substack.com'], ['Ghost', 'https://ghost.org'], ['Kit', 'https://kit.com']],
    steps: [
      'Define the reader in one line — "procurement managers at mid-size manufacturers" beats "people interested in business".',
      'Publish free and consistently for at least three months so people can judge you before paying.',
      'Grow deliberately: guest posts, recommendations from adjacent newsletters, a genuinely useful free resource.',
      'Turn on paid tiers once you have around 1,000 engaged free readers, or take sponsors instead.'
    ],
    pros: ['You own the email list — nothing can take your audience away from you', 'Extremely high margin: no inventory, negligible costs', 'Subscription income is predictable in a way ad income never is'],
    cons: ['Weekly deadline forever — miss a few and churn spikes', 'Growth is slow and mostly unglamorous', 'Writing well under a recurring deadline is harder than people expect'],
    flags: ['Buying an email list is illegal in most places and will get you blacklisted', 'Ignore "grow to 10k subscribers in 30 days" services — they sell bots that destroy your open rates'],
    tags: ['writing', 'subscription', 'email']
  },
  {
    id: 'podcast', name: 'Podcast', cat: 'creator',
    tagline: 'Long-form audio in a niche, monetised by sponsors, memberships and the doors it opens.',
    summary: 'Podcast advertising pays roughly $18–$50 per thousand downloads for a host-read mid-roll, meaning a show with 5,000 downloads per episode can earn a few hundred dollars an episode. Realistically, the bigger money for most podcasters is indirect: the show becomes a credibility machine that generates consulting clients, speaking work and book deals. Audio is also the cheapest medium to produce well.',
    pay: [0, 300, 6000], cost: 'low', costLabel: '$80–$300 for a decent mic', speed: 'long', speedLabel: '9–24 months',
    effort: 'active', skill: 'intermediate', where: 'hybrid', scale: 4, risk: 2,
    likes: ['audio', 'people', 'research'],
    platforms: [['Buzzsprout', 'https://www.buzzsprout.com'], ['Transistor', 'https://transistor.fm'], ['Riverside', 'https://riverside.fm'], ['Podcorn', 'https://podcorn.com']],
    steps: [
      'Choose a format you can sustain weekly — interview shows are easiest to fill, solo shows are hardest to keep interesting.',
      'Buy one good dynamic microphone and record in a soft-furnished room. Audio quality matters more than video ever will.',
      'Publish through a host that distributes to Apple, Spotify and YouTube automatically.',
      'Approach sponsors directly once you pass roughly 1,000 downloads per episode — direct deals beat networks at small scale.'
    ],
    pros: ['Listeners are unusually loyal and trust hosts more than any other medium', 'Interviewing gives you a legitimate reason to talk to people in your industry', 'Cheap to produce and can be recorded around a full-time job'],
    cons: ['Discovery is genuinely poor — podcasts do not go viral', 'Editing eats hours unless you pay someone', 'Download numbers grow slowly and plateau easily'],
    flags: ['Podcast "networks" that charge you a fee to join are backwards — networks should pay you', 'Be wary of guest-booking agencies charging thousands for placement on tiny shows'],
    tags: ['audio', 'sponsorship', 'interviews']
  },
  {
    id: 'stock-media', name: 'Stock photos, video & audio', cat: 'creator',
    tagline: 'License the same photo, clip or loop hundreds of times without ever meeting a client.',
    summary: 'You upload once and earn a small royalty every time somebody licenses the file — typically $0.25–$3 per photo download, $15–$80 per video clip, and more for exclusive libraries. Individual files earn very little; a portfolio of 2,000 well-keyworded files is what produces steady money. The winning strategy is unglamorous: shoot the boring commercial subjects buyers actually need — real workplaces, diverse people doing ordinary tasks, local landmarks — rather than beautiful sunsets that everyone already has.',
    pay: [10, 200, 3000], cost: 'low', costLabel: 'Camera you already own', speed: 'months', speedLabel: '3–6 months',
    effort: 'passive', skill: 'intermediate', where: 'hybrid', scale: 4, risk: 1,
    likes: ['photo', 'video', 'design'],
    platforms: [['Adobe Stock', 'https://contributor.stock.adobe.com'], ['Shutterstock', 'https://submit.shutterstock.com'], ['Pond5', 'https://www.pond5.com'], ['Artlist', 'https://artlist.io']],
    steps: [
      'Research what sells by searching stock sites for your subject and noting the gaps, not the winners.',
      'Shoot in batches — one afternoon should produce 100+ usable variations of the same concept.',
      'Keyword ruthlessly and accurately. Discovery is entirely search-driven and bad keywords mean invisible files.',
      'Upload to three or four libraries at once unless you take an exclusivity deal for higher rates.'
    ],
    pros: ['Genuinely passive after upload — files earn for a decade', 'No clients, deadlines, revisions or negotiation', 'Stacks perfectly with photography you were doing anyway'],
    cons: ['Per-download rates have fallen for years and AI-generated imagery has flooded the market', 'Needs real volume before the income is noticeable', 'Model and property releases are required for anything commercial'],
    flags: ['Sites that charge an upload or review fee are not legitimate stock agencies', 'Never upload images containing recognisable brands, logos or people without a signed release'],
    tags: ['photography', 'passive', 'licensing']
  },
  {
    id: 'print-on-demand', name: 'Print on demand', cat: 'creator',
    tagline: 'Put designs on shirts, mugs and posters that only get printed after someone buys.',
    summary: 'A supplier prints and ships each item as it sells, so you carry no stock and no risk beyond your time. Margins are thin — typically $4–$10 per shirt — which means design volume and a clear niche decide everything. The sellers who do well target specific identities and in-jokes (a particular profession, hobby, dog breed, town) rather than competing on generic slogans against a million other listings.',
    pay: [0, 250, 4000], cost: 'none', costLabel: '$0 on marketplaces', speed: 'weeks', speedLabel: '3–10 weeks',
    effort: 'semi', skill: 'beginner', where: 'online', scale: 4, risk: 1,
    likes: ['design', 'selling', 'crafts'],
    platforms: [['Printful', 'https://www.printful.com'], ['Printify', 'https://printify.com'], ['Amazon Merch on Demand', 'https://merch.amazon.com'], ['Redbubble', 'https://www.redbubble.com']],
    steps: [
      'Pick an audience with a strong identity and existing spending habits — nurses, bouldering, a specific breed of dog.',
      'Create designs in Canva or Affinity. Text-based designs consistently outsell complex artwork.',
      'List on a marketplace first for free traffic, then open your own Shopify or Etsy store once something sells.',
      'Double down on whatever sells and delete the rest. Expect 5% of designs to make 90% of sales.'
    ],
    pros: ['Zero inventory risk — you never buy stock', 'Designs stay listed and keep selling with no further work', 'Easy to test 50 ideas cheaply and let the market pick'],
    cons: ['Extremely crowded — most designs never sell a single unit', 'Marketplace fees plus print costs leave slim margins', 'You do not control print quality or shipping times, but you own the complaints'],
    flags: ['Never use copyrighted characters, band names, sports teams or trademarked phrases — accounts get terminated and lawsuits are real', 'Ignore "trending design" scraper tools that just copy other sellers'],
    tags: ['design', 'merch', 'no-inventory']
  },
  {
    id: 'ugc', name: 'UGC creator for brands', cat: 'creator',
    tagline: 'Get paid to make casual-looking product videos brands run as their own ads.',
    summary: 'Brands need an endless supply of authentic-feeling vertical video for paid social, and they will pay a non-famous person to produce it — you do not need followers, because the brand posts it, not you. Rates run roughly $100–$350 for a single video and $400–$1,200 for a package of three to five, with usage rights priced separately. It rewards being naturally watchable on camera and fast at turnaround, not being an influencer.',
    pay: [0, 800, 6000], cost: 'low', costLabel: 'Phone, ring light, tripod (~$80)', speed: 'weeks', speedLabel: '3–8 weeks',
    effort: 'active', skill: 'beginner', where: 'online', scale: 3, risk: 1,
    likes: ['video', 'selling', 'people'],
    platforms: [['Billo', 'https://billo.app'], ['Insense', 'https://insense.pro'], ['JoinBrands', 'https://www.joinbrands.com'], ['Upwork', 'https://www.upwork.com']],
    steps: [
      'Make three spec videos for products you already own — an unboxing, a problem-solution demo and a testimonial.',
      'Build a one-page portfolio with those clips and a clear rate card.',
      'Apply through UGC marketplaces to get your first paid credits, then pitch brands directly via email for better rates.',
      'Price usage rights separately from production, and cap the licence term — that is where the real money is.'
    ],
    pros: ['No audience required, which removes the hardest part of creator work', 'Fast to start and paid per deliverable rather than per hour', 'Skills transfer directly into higher-paid video and marketing work'],
    cons: ['Marketplace rates are low and race to the bottom', 'Constant pitching — it is a sales job with a camera', 'AI-generated ad creative is beginning to compete on the cheapest end'],
    flags: ['"Gifted collaboration" means unpaid. Free product is not payment for commercial usage rights', 'Never sign an unlimited perpetual usage clause at a one-video rate'],
    tags: ['video', 'brands', 'no-followers']
  },
  {
    id: 'affiliate', name: 'Affiliate marketing', cat: 'creator',
    tagline: 'Recommend products you actually use and take a cut when someone buys through your link.',
    summary: 'Affiliate income is a monetisation layer rather than a business on its own — it needs traffic or trust from somewhere. Commissions range from 1–4% on physical goods up to 20–40% on software and courses, and recurring software commissions are where the durable money sits. The people who earn well do genuine comparison and testing work; the people who spam links earn nothing and lose their audience.',
    pay: [0, 300, 10000], cost: 'none', costLabel: '$0 to join programmes', speed: 'months', speedLabel: '3–9 months',
    effort: 'semi', skill: 'intermediate', where: 'online', scale: 5, risk: 1,
    likes: ['writing', 'video', 'selling', 'research'],
    platforms: [['Amazon Associates', 'https://affiliate-program.amazon.com'], ['Impact', 'https://impact.com'], ['ShareASale', 'https://www.shareasale.com'], ['PartnerStack', 'https://www.partnerstack.com']],
    steps: [
      'Build the audience first — a blog, newsletter, channel or forum reputation. Links without trust convert at zero.',
      'Pick products you have genuinely used and would recommend to a friend who asked.',
      'Write the comparison and alternative content buyers search for right before purchasing.',
      'Disclose the relationship clearly every time. It is legally required and it barely affects conversion.'
    ],
    pros: ['No product, support, inventory or refunds to handle', 'Recurring software commissions can pay for years from one recommendation', 'Layers on top of any content you were already making'],
    cons: ['Useless without traffic, which is the actual hard part', 'Programmes can cut rates or close without notice', 'Cookie windows and tracking blockers quietly eat your attribution'],
    flags: ['Any programme paying you to recruit other affiliates rather than to sell products is a pyramid structure', 'Undisclosed affiliate links break advertising rules in the US, UK and EU'],
    tags: ['commission', 'content', 'recurring']
  },
  {
    id: 'web-novel', name: 'Web novel & serial fiction', cat: 'creator',
    tagline: 'Publish a story chapter by chapter and let the readers who cannot wait fund the next instalment.',
    summary: 'Serial fiction platforms host your chapters free, and the money comes from readers paying for early access. The working model is consistent across the field: free chapters build the audience, advance chapters behind a membership earn the income. A well-rated ongoing serial converts roughly 1–3% of regular readers into supporters at around $5 a month, which is why audience size matters more than any single book would. Progression fantasy, LitRPG, romance and cultivation dominate because those readers binge and pay to skip ahead. Finished serials also convert well into ebooks and audiobooks, so the backlist keeps earning after the story ends.',
    pay: [0, 300, 9000], cost: 'none', costLabel: '$0 (cover art optional)', speed: 'long', speedLabel: '6–18 months',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 4, risk: 1,
    likes: ['writing', 'research'],
    platforms: [['Royal Road', 'https://www.royalroad.com'], ['Wattpad', 'https://www.wattpad.com'], ['Tapas', 'https://tapas.io'], ['Ream', 'https://reamstories.com'], ['Patreon', 'https://www.patreon.com']],
    steps: [
      'Read inside the genre you want to write until you know its conventions — serial readers have very specific expectations and punish books that ignore them.',
      'Bank 15–20 chapters before you publish anything, so an early stumble never breaks your schedule.',
      'Commit to a fixed update rhythm and hold it. Missing updates loses readers permanently, and it is the most common reason serials die.',
      'Open advance chapters on a membership platform once you have a steady readership, then collect the finished arc into an ebook and audiobook.'
    ],
    pros: ['Costs nothing to start and needs no permission from any publisher', 'Reader feedback arrives chapter by chapter instead of after a year of silence', 'A finished serial becomes a backlist asset you can republish as ebook and audio'],
    cons: ['The update treadmill is relentless and burnout is the usual ending', 'Income is near zero until the audience compounds, often a year in', 'Serial readers are demanding and will tell you so publicly'],
    flags: ['Some platform contracts claim broad or perpetual rights to your story and its adaptations — have any contract read properly before signing', 'Never pay a "publisher" to publish your serial; legitimate platforms are free to post on'],
    tags: ['fiction', 'serial', 'audience']
  },
  {
    id: 'audio-drama', name: 'Audio drama & fiction podcast', cat: 'creator',
    tagline: 'Scripted audio series — the radio play, rebuilt for headphones and funded by listeners.',
    summary: 'Fiction podcasts monetise very differently from talk podcasts. Episodes are shorter and less frequent, so advertising pays badly; the income is memberships, merchandise, live shows and rights. An established independent audio drama commonly earns $500–$4,000 a month from a few hundred to a couple of thousand members, and the genuine upside is adaptation, since several indie audio dramas have been optioned for screen. Be realistic about production: writing, casting, directing, editing and sound designing one thirty-minute episode is routinely forty hours or more of work.',
    pay: [0, 250, 5000], cost: 'low', costLabel: '$200–$900 mics & software', speed: 'long', speedLabel: '9–24 months',
    effort: 'active', skill: 'advanced', where: 'online', scale: 4, risk: 2,
    likes: ['audio', 'writing', 'people'],
    platforms: [['Patreon', 'https://www.patreon.com'], ['Buzzsprout', 'https://www.buzzsprout.com'], ['Apple Podcasts for Creators', 'https://podcasters.apple.com'], ['Fable & Folly', 'https://www.fableandfolly.com']],
    steps: [
      'Write and produce a complete first season before releasing episode one — releasing as you write is how half-finished series happen.',
      'Cast from the enormous pool of voice actors who work for a share, a credit or a modest per-episode fee, and pay them properly once you earn.',
      'Invest in sound design over microphone count. Atmosphere is what separates audio drama from two people reading.',
      'Launch a membership from day one with bonus episodes and behind-the-scenes material, since that is where nearly all the income comes from.'
    ],
    pros: ['Devoted, tightly-knit listener bases that support creators directly', 'A finished season is a permanent portfolio piece and can be optioned', 'Enormous creative range at a fraction of the cost of filmed drama'],
    cons: ['Production effort per episode is far higher than any other podcast format', 'Ad revenue is poor, so memberships must carry the whole thing', 'Coordinating a cast of volunteers around their day jobs is genuinely difficult'],
    flags: ['Agree credit, pay and usage rights with every performer in writing before recording, even for unpaid collaborations', 'Never use commercial music or sound libraries outside their licence — audio rights claims are aggressively enforced'],
    tags: ['audio', 'fiction', 'production']
  },
  {
    id: 'webcomic', name: 'Webcomic & serial illustration', cat: 'creator',
    tagline: 'Publish a strip or serial online and earn from readers, print collections and merch.',
    summary: 'Webcomics stack several small income lines: platform reward programmes that scale with views, memberships for early pages, merchandise, and crowdfunded print collections. The print collection is usually the largest single event — a comic with 20,000 regular readers can raise $15,000–$60,000 for a bound volume, because readers who follow a story for years want it on a shelf. The pace is punishing and non-negotiable: most comics that break through updated at least weekly for two or three years first.',
    pay: [0, 350, 7000], cost: 'low', costLabel: '$0–$500 tablet & hosting', speed: 'long', speedLabel: '12–24 months',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 4, risk: 1,
    likes: ['design', 'writing', 'crafts'],
    platforms: [['WEBTOON Canvas', 'https://www.webtoons.com/en/creators101'], ['Tapas', 'https://tapas.io'], ['Patreon', 'https://www.patreon.com'], ['Kickstarter', 'https://www.kickstarter.com']],
    steps: [
      'Design for the format your readers use — vertical scroll for mobile platforms behaves nothing like a traditional page.',
      'Simplify your art style until you can sustain it weekly for years. Ambitious rendering is what kills most webcomics.',
      'Build a buffer of finished pages, then publish on a schedule you could keep during a bad month.',
      'Once you have a following, run a print campaign for the first collected volume — that is usually the first meaningful money.'
    ],
    pros: ['Complete creative ownership, including merchandise and adaptation rights', 'Print crowdfunding can deliver a year of income in a single month', 'Readers stay for years and follow you to whatever you make next'],
    cons: ['Extremely slow to build and unpaid for a long time', 'Weekly art output is physically and creatively demanding', 'Platform reward programmes pay very little per view'],
    flags: ['Read platform contracts before entering any "originals" or featured programme — some take broad rights to your characters', 'Cost your print run properly including shipping, or a successful campaign can still lose money'],
    tags: ['comics', 'illustration', 'serial']
  },
  {
    id: 'live-streaming', name: 'Live streaming', cat: 'creator',
    tagline: 'Broadcast live and earn from subscriptions, tips, ads and sponsors simultaneously.',
    summary: 'Streaming stacks several income lines at once: channel subscriptions (the streamer typically keeps around half of a $4.99 sub), viewer tips, advertising and brand deals. The number that decides everything is average concurrent viewers — around 50–100 concurrents is roughly where it starts resembling a part-time wage. Streaming rewards schedule reliability and personality far more than production quality, and the format demands hours spent live rather than hours edited, which is why burnout ends more channels than failure does.',
    pay: [0, 400, 12000], cost: 'low', costLabel: '$150–$700 mic, camera, capable PC', speed: 'long', speedLabel: '6–18 months',
    effort: 'active', skill: 'beginner', where: 'online', scale: 4, risk: 2,
    likes: ['video', 'people', 'audio'],
    platforms: [['Twitch', 'https://www.twitch.tv'], ['YouTube Live', 'https://www.youtube.com'], ['Kick', 'https://kick.com'], ['StreamElements', 'https://streamelements.com']],
    steps: [
      'Pick a category small enough that a new streamer is visible in it, rather than the largest game on the platform.',
      'Publish a fixed schedule and keep it — regulars build around your slot, and inconsistency is what stops channels growing.',
      'Talk continuously even to an empty chat. Silent streams do not convert passers-by into viewers.',
      'Cut every stream into short clips for other platforms; that is where most new viewers actually find you.'
    ],
    pros: ['Multiple income streams from the same hours — subs, tips, ads and sponsors together', 'Direct real-time relationship with an audience that becomes genuinely loyal', 'No editing workload, unlike every other video format'],
    cons: ['Requires long unbroken blocks of live time at fixed hours', 'Growth is brutally slow at the start, often months talking to nobody', 'High burnout rate and real exposure to harassment'],
    flags: ['Never buy viewers or followers — view-botting triggers permanent bans and forfeited payouts', 'Read sponsorship contracts for exclusivity clauses that quietly bar you from competitors for months'],
    tags: ['live', 'subscriptions', 'audience']
  },
  {
    id: 'short-form', name: 'Short-form video creator', cat: 'creator',
    tagline: 'Vertical video for TikTok, Reels and Shorts — where the platform is rarely where the money is.',
    summary: 'Platform creator funds pay poorly and unpredictably, commonly a few cents per thousand views, and treating them as the income is the standard beginner mistake. Working short-form creators earn from brand partnerships — roughly $200–$2,000 per video in the 50k–500k follower range — plus affiliate storefronts and funnelling viewers toward something they own. The real advantage over long-form is iteration speed: you can test twenty ideas in a week and learn what lands in a month rather than a year.',
    pay: [0, 400, 10000], cost: 'none', costLabel: '$0 — a phone is genuinely enough', speed: 'months', speedLabel: '3–9 months',
    effort: 'active', skill: 'beginner', where: 'online', scale: 4, risk: 1,
    likes: ['video', 'design', 'selling'],
    platforms: [['TikTok for Creators', 'https://www.tiktok.com/creators/'], ['Instagram Creators', 'https://creators.instagram.com'], ['YouTube Shorts', 'https://www.youtube.com/shorts'], ['Passionfroot', 'https://www.passionfroot.me']],
    steps: [
      'Choose a niche a brand would pay to reach — skincare, tools, finance and travel monetise far better than general comedy.',
      'Post daily for sixty days and study retention graphs rather than likes. The first two seconds decide almost everything.',
      'Build a rate card and pitch brands directly once you pass roughly 10,000 engaged followers; do not wait to be found.',
      'Move the audience somewhere you control — an email list, a shop, a channel — because rented followers can vanish overnight.'
    ],
    pros: ['Zero cost and the fastest feedback loop in all of content', 'Reach is not gated by follower count, so new accounts can still break out', 'Brand deal rates are strong relative to the production time involved'],
    cons: ['Creator fund payouts are negligible and cannot be relied on', 'Ferocious posting pace with a very short shelf life per video', 'Algorithm and policy changes can erase your reach with no warning'],
    flags: ['Disclose paid partnerships — undisclosed ads breach advertising rules and platform terms', 'Ignore any service selling followers or views; it destroys reach and disqualifies you from monetisation'],
    tags: ['video', 'brands', 'fast-feedback']
  },
  {
    id: 'art-commissions', name: 'Art commissions', cat: 'creator',
    tagline: 'Take paid illustration commissions from an audience that already follows your work.',
    summary: 'Illustrators sell character art, portraits, pet portraits, emotes and reference sheets directly to individuals, typically $40–$400 a piece depending on complexity and how the client may use it. Unlike commercial design work, the portfolio and the marketing are the same act — you post the work publicly and commissions follow. Emotes, badges and overlays for streamers are the most reliable repeat niche, because streamers refresh them constantly and recommend artists to each other.',
    pay: [50, 700, 5000], cost: 'none', costLabel: '$0 if you already draw', speed: 'weeks', speedLabel: '2–8 weeks',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 2, risk: 1,
    likes: ['design', 'crafts', 'people'],
    platforms: [['VGen', 'https://vgen.co'], ['Ko-fi', 'https://ko-fi.com'], ['Patreon', 'https://www.patreon.com'], ['ArtStation', 'https://www.artstation.com']],
    steps: [
      'Publish a clear commission sheet: what you draw, what you refuse, prices per tier, turnaround and how many revisions are included.',
      'Post finished work consistently where your buyers already gather rather than only on a portfolio site.',
      'Take at least half the fee up front and never send the full-resolution file before final payment clears.',
      'Specialise into a repeatable niche — emotes, pet portraits, character sheets — so each commission takes less time than the last.'
    ],
    pros: ['Paid directly by individuals with no agency or platform gatekeeping', 'Every finished commission doubles as marketing for the next one', 'Repeat clients and referrals build quickly inside hobby communities'],
    cons: ['Income is entirely capped by the hours you can draw', 'Scope creep and endless revision requests are constant without written limits', 'Emotionally draining when clients are attached to a specific vision'],
    flags: ['Use a platform that holds funds in escrow — chargeback fraud after delivery is common in direct commission work', 'State usage rights explicitly; commercial use should cost more than personal use, and silence defaults badly for you'],
    tags: ['illustration', 'clients', 'audience']
  },
  {
    id: 'paid-community', name: 'Paid membership community', cat: 'creator',
    tagline: 'Run a private space that people pay monthly to be part of.',
    summary: 'Two hundred members at $25 a month is $5,000 in recurring revenue, and communities churn far less than courses because the value people are paying for is the other members rather than your content. It works where there is a specific professional or hobby identity — freelance illustrators, restaurant owners, ultrarunners, people relocating to one country — and a genuine reason to show up weekly. The job is hosting, not teaching: seeding discussions, running calls, making introductions, and removing the people who make it worse.',
    pay: [0, 800, 15000], cost: 'low', costLabel: '$0–$100/mo platform', speed: 'months', speedLabel: '2–6 months',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 4, risk: 1,
    likes: ['people', 'teaching', 'admin', 'writing'],
    platforms: [['Circle', 'https://circle.so'], ['Skool', 'https://www.skool.com'], ['Patreon', 'https://www.patreon.com'], ['Discord', 'https://discord.com']],
    steps: [
      'Define the membership by who belongs in it, not by what you will post. "For X people, so they can Y" is the whole pitch.',
      'Start free and small, and only charge once members are talking to each other without you starting every thread.',
      'Give the week a shape — a recurring call, a Monday thread, a monthly guest — so membership has a rhythm.',
      'Price high enough to filter for commitment. Cheap communities attract lurkers and churn hardest.'
    ],
    pros: ['Recurring revenue that is unusually stable once the culture holds', 'Members create most of the value, so it scales better than teaching', 'Feeds naturally into events, sponsorship, courses and consulting'],
    cons: ['A quiet community dies fast, and reviving one is very hard', 'You are permanently on duty as host and moderator', 'Slow start — the first fifty members are by far the hardest'],
    flags: ['Never sell access on promised income or business outcomes; that is where "mastermind" pitches cross into misrepresentation', 'Have clear written moderation and refund policies before you take a single payment'],
    tags: ['community', 'recurring', 'membership']
  },
  {
    id: 'adult-content', name: 'Adult subscription content', cat: 'creator',
    tagline: 'Subscription platforms where adult creators are paid directly by subscribers.',
    summary: 'Legal work for adults, and included here with its real numbers rather than its marketing. Earnings are extremely top-heavy: the median creator makes under $200 a month, the average sits around $130, and the top 10% take roughly three-quarters of all revenue on the largest platform. Platforms typically keep 20%. Almost nobody is discovered inside the platform — subscribers come from an audience built somewhere else, which is the actual work. Two things deserve deciding before you publish anything: what you are willing to have permanently public, and how completely you separate this from your legal identity.',
    pay: [0, 150, 4000], cost: 'low', costLabel: '$0–$300 phone & lighting', speed: 'weeks', speedLabel: '1–3 months',
    effort: 'active', skill: 'beginner', where: 'online', scale: 3, risk: 2,
    likes: ['video', 'photo', 'selling', 'people'],
    platforms: [['OnlyFans', 'https://onlyfans.com'], ['Fansly', 'https://fansly.com'], ['Patreon', 'https://www.patreon.com'], ['StopNCII (image takedown)', 'https://stopncii.org']],
    steps: [
      'Decide your boundaries before publishing anything — what you show, whether your face appears, what name you use, and which regions you geo-block. Treat these as permanent decisions, because in practice they are.',
      'Separate your identity properly: a distinct working name, email, phone number and payment account, and strip location metadata from every file before it leaves your device.',
      'Build an audience on a platform that actually has discovery, since subscription sites have almost none — essentially all sign-ups arrive from outside traffic.',
      'Register the income and keep records like any other self-employment; platforms report earnings and tax authorities treat this as ordinary business income.'
    ],
    pros: ['Paid directly by subscribers, with no advertiser or brand approval involved', 'Very low startup cost and complete control over pricing and schedule', 'Recurring subscription revenue rather than payment per piece of work'],
    cons: ['Earnings are extremely top-heavy — most creators earn under $200 a month', 'Published content is effectively permanent and gets copied and redistributed beyond your control', 'Genuine privacy and personal-safety exposure, including doxxing and harassment', 'Payment processors and banks deplatform this category with little notice or recourse'],
    flags: ['Management agencies take 30–50% and sometimes far more. The scam pattern is consistent: demands for full account access, commission terms that shift or stay vague, and upfront fees. Nobody legitimate charges you for the privilege of being managed', 'Age-verification and content laws differ sharply by country and are tightening — check what applies where you live, and never publish another person\'s image without documented, verifiable consent'],
    tags: ['subscription', 'onlyfans', 'adult']
  },

  /* --------------------------------------------------- FREELANCE & SERVICES */
  {
    id: 'freelance-writing', name: 'Freelance writing', cat: 'freelance',
    tagline: 'Write the articles, case studies and emails that companies need and cannot staff for.',
    summary: 'Content writing splits sharply into two markets. The low end — general blog posts at 5–10 cents a word — is being erased by AI and is not worth entering. The high end is healthy and growing: technical writing, case studies built on customer interviews, and conversion copy command $0.50–$2.00 per word or $800–$3,000 per piece, because they require judgement, interviews and subject expertise that a model cannot fake.',
    pay: [200, 1800, 9000], cost: 'none', costLabel: '$0 — you need a laptop', speed: 'weeks', speedLabel: '2–6 weeks',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 2, risk: 1,
    likes: ['writing', 'research'],
    platforms: [['Contra', 'https://contra.com'], ['Upwork', 'https://www.upwork.com'], ['Superpath (jobs)', 'https://www.superpath.co'], ['Peak Freelance', 'https://www.peakfreelance.com']],
    steps: [
      'Choose an industry you already understand — your old job counts double here.',
      'Write three spec pieces in the exact format you want to be hired for and put them on a simple portfolio page.',
      'Pitch marketing managers directly by email with a specific idea for their site, not a generic availability note.',
      'Raise rates every few clients and move from per-word to per-project pricing as soon as you can.'
    ],
    pros: ['Fastest freelance skill to start with genuinely zero equipment', 'Retainer clients turn it into predictable monthly income', 'Every industry needs it, so you are never dependent on one sector'],
    cons: ['Commodity writing rates have collapsed and will not recover', 'Income stops the moment you stop', 'Chasing late invoices is part of the job'],
    flags: ['Content mills paying under $0.05/word are not a stepping stone, they are a trap', 'Never do a large unpaid "test article" — a 300-word paid sample is the professional norm'],
    tags: ['writing', 'clients', 'remote']
  },
  {
    id: 'graphic-design', name: 'Freelance design', cat: 'freelance',
    tagline: 'Brand identities, packaging, pitch decks and social templates for businesses too small for an agency.',
    summary: 'Design freelancing pays well when you specialise. A generalist competing on Fiverr fights thousands of others at $25 a logo; a designer who only does packaging for craft food brands, or only pitch decks for startups, charges $1,500–$6,000 per project and gets referred. The specialisation is what makes the price defensible, and it usually comes from picking an industry rather than a design discipline.',
    pay: [300, 2500, 12000], cost: 'low', costLabel: '$0–$60/mo software', speed: 'weeks', speedLabel: '2–8 weeks',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 2, risk: 1,
    likes: ['design', 'crafts'],
    platforms: [['Dribbble', 'https://dribbble.com'], ['Behance', 'https://www.behance.net'], ['Contra', 'https://contra.com'], ['Toptal', 'https://www.toptal.com']],
    steps: [
      'Pick one deliverable and one industry, then build a portfolio of six pieces in exactly that lane — spec work is fine.',
      'Publish case studies that explain the business problem and result, not just pretty images.',
      'Price per project with a fixed number of revision rounds written into the agreement.',
      'Ask every satisfied client for one referral. Design work travels almost entirely by word of mouth.'
    ],
    pros: ['Clear portfolio-to-price relationship — better work visibly earns more', 'Repeat clients need design forever, not once', 'Can be done from anywhere on your own hours'],
    cons: ['Scope creep and endless revisions destroy your effective hourly rate', 'AI tools have flattened the bottom of the market', 'Feast and famine cycles until you have retainers'],
    flags: ['Contests and "spec work" platforms where dozens design for free and one gets paid are exploitative', 'Never hand over final files before final payment clears'],
    tags: ['design', 'branding', 'clients']
  },
  {
    id: 'web-dev', name: 'Freelance web development', cat: 'freelance',
    tagline: 'Build and maintain the websites and small apps that small businesses cannot build themselves.',
    summary: 'The highest-paying accessible freelance skill. Even at the simple end — a well-built Webflow or WordPress site for a local firm — projects run $2,000–$8,000, and ongoing maintenance retainers of $100–$500 a month per client turn it into recurring income. Deep specialisms like Shopify apps, integrations and performance work bill $80–$200 an hour. The bottleneck is trust and communication, not code.',
    pay: [500, 4000, 20000], cost: 'none', costLabel: '$0 beyond a computer', speed: 'weeks', speedLabel: '3–8 weeks',
    effort: 'active', skill: 'advanced', where: 'online', scale: 3, risk: 1,
    likes: ['code', 'design'],
    platforms: [['Upwork', 'https://www.upwork.com'], ['Toptal', 'https://www.toptal.com'], ['Codeable (WordPress)', 'https://codeable.io'], ['Webflow', 'https://webflow.com']],
    steps: [
      'Choose a stack that small businesses actually pay for — Webflow, Shopify or WordPress beat exotic frameworks for freelance demand.',
      'Build three real sites, even unpaid for a charity or friend, and write up what improved for them.',
      'Approach businesses with visibly broken or slow sites, leading with the specific problem you noticed.',
      'Attach a maintenance and hosting retainer to every project — that is what smooths the income out.'
    ],
    pros: ['Highest hourly rates of any common freelance skill', 'Maintenance retainers create genuinely predictable monthly income', 'Demand is everywhere and not tied to your city'],
    cons: ['Requires real technical skill that takes months to build', 'Clients change their minds constantly — contracts matter', 'Support requests arrive at inconvenient hours'],
    flags: ['Avoid equity-only or "we will pay you when we raise" arrangements', 'Take 40–50% up front on any project over a couple of thousand dollars'],
    tags: ['code', 'retainer', 'high-rate']
  },
  {
    id: 'virtual-assistant', name: 'Virtual assistant', cat: 'freelance',
    tagline: 'Run the inbox, calendar, scheduling and admin that busy owners are drowning in.',
    summary: 'General VA work starts around $18–$30 an hour, but the rate roughly doubles when you specialise — a VA who handles podcast production workflows, Shopify order support or real-estate transaction coordination charges $40–$70. Most VAs work with two to four retained clients at 10–20 hours a month each, which makes the income unusually stable compared to project freelancing.',
    pay: [400, 1800, 5000], cost: 'none', costLabel: '$0', speed: 'weeks', speedLabel: '2–5 weeks',
    effort: 'active', skill: 'beginner', where: 'online', scale: 2, risk: 1,
    likes: ['admin', 'people'],
    platforms: [['Belay', 'https://belaysolutions.com'], ['Time etc', 'https://web.timeetc.com'], ['Upwork', 'https://www.upwork.com'], ['Boldly', 'https://boldly.com']],
    steps: [
      'List the admin systems you already know — a specific CRM, booking tool, accounting package — and lead with those.',
      'Write a one-page service menu with clear monthly packages rather than a vague hourly offer.',
      'Find clients where small business owners gather: local business groups, niche communities, agency subcontracting.',
      'Document every recurring task as a written process so you can eventually hand it to someone else.'
    ],
    pros: ['No qualifications needed to start and hiring demand is constant', 'Retainers make income predictable month to month', 'Natural path into higher-paid operations or project management work'],
    cons: ['General VA rates are pushed down by global competition', 'You absorb your client\'s chaos and urgency', 'Time zone mismatches can wreck your schedule'],
    flags: ['Never pay an agency a fee to be "placed" as a VA', 'Refuse any client asking you to receive and forward packages or money — that is a reshipping or money-mule scam'],
    tags: ['admin', 'retainer', 'remote']
  },
  {
    id: 'bookkeeping', name: 'Bookkeeping', cat: 'freelance',
    tagline: 'Keep the books straight for small businesses that hate doing it and cannot justify an accountant.',
    summary: 'One of the most reliable service businesses available, because every registered business legally needs it and the work recurs monthly forever. Clients typically pay $300–$900 a month depending on transaction volume, and an experienced bookkeeper handles 10–20 clients. No degree is required in most places — certification in the software (QuickBooks, Xero) plus accuracy and discretion is what clients actually buy.',
    pay: [500, 3000, 9000], cost: 'low', costLabel: '$100–$500 certification', speed: 'months', speedLabel: '1–4 months',
    effort: 'active', skill: 'intermediate', where: 'hybrid', scale: 3, risk: 1,
    likes: ['admin', 'finance'],
    platforms: [['QuickBooks ProAdvisor', 'https://quickbooks.intuit.com/accountants/proadvisor/'], ['Xero Advisor', 'https://www.xero.com/partner-programs/'], ['Bookkeeper Launch', 'https://bookkeepers.com']],
    steps: [
      'Get certified in QuickBooks Online or Xero — both offer free or cheap training and a public directory listing.',
      'Practise on a real set of books, even a friend\'s side business, until reconciliation is second nature.',
      'Target one industry — trades, restaurants, e-commerce — so you learn its specific quirks and referrals compound.',
      'Charge a flat monthly fee per client rather than hourly, and cap the transaction volume it covers.'
    ],
    pros: ['Recurring revenue with very low client churn — books do not stop', 'Recession-resistant: businesses need compliance in every economy', 'Fully remote and schedulable around other commitments'],
    cons: ['Detail-heavy work with real consequences for mistakes', 'Month-end and tax season are genuinely demanding', 'Requires professional indemnity insurance in most markets'],
    flags: ['Do not present yourself as an accountant or give tax advice unless licensed to do so where you live', 'Walk away from any client asking you to categorise transactions dishonestly'],
    tags: ['finance', 'recurring', 'certification']
  },
  {
    id: 'video-editing', name: 'Video editing', cat: 'freelance',
    tagline: 'Edit for the creators and companies producing more video than they can possibly cut themselves.',
    summary: 'Demand outstrips supply because every business and creator now publishes video weekly and almost none of them enjoy editing. Rates run $25–$80 an hour, or $150–$600 per long-form video, and short-form vertical editing pays $40–$150 per clip in volume. Retained creator clients — four videos a month, every month — are the difference between scrambling and a stable income.',
    pay: [300, 2200, 8000], cost: 'low', costLabel: '$0–$300 software + a capable computer', speed: 'weeks', speedLabel: '2–6 weeks',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 3, risk: 1,
    likes: ['video', 'design'],
    platforms: [['Upwork', 'https://www.upwork.com'], ['Contra', 'https://contra.com'], ['Fiverr Pro', 'https://pro.fiverr.com'], ['DaVinci Resolve (free)', 'https://www.blackmagicdesign.com/products/davinciresolve']],
    steps: [
      'Learn one editor properly — DaVinci Resolve is free and professional-grade.',
      'Re-edit three existing videos from creators you admire and show the before and after as your portfolio.',
      'Pitch mid-sized creators directly: they are big enough to pay and small enough to still edit their own work.',
      'Move clients onto a monthly retainer covering a set number of videos with defined turnaround.'
    ],
    pros: ['Enormous and growing demand across creators, agencies and ordinary businesses', 'Retainers stabilise the income quickly', 'Skill compounds — faster editing directly raises your effective rate'],
    cons: ['Needs a reasonably powerful computer', 'Revision rounds can be endless without a written limit', 'Rush deadlines are the norm in creator work'],
    flags: ['Do not take "free edit to prove yourself" tests longer than about 60 seconds of finished footage', 'Watermark drafts until you have been paid'],
    tags: ['video', 'retainer', 'creators']
  },
  {
    id: 'social-media-mgmt', name: 'Social media management', cat: 'freelance',
    tagline: 'Run the accounts small businesses know they need but never find time for.',
    summary: 'Local businesses and small brands pay $500–$2,500 a month for someone to plan, produce and schedule their content and handle comments. It is one of the few services a beginner can sell credibly, because the bar set by most small businesses is very low. The work stays valuable if you can tie it to something measurable — bookings, enquiries, footfall — rather than follower counts.',
    pay: [400, 2000, 7000], cost: 'low', costLabel: '$0–$50/mo scheduling tools', speed: 'weeks', speedLabel: '2–6 weeks',
    effort: 'active', skill: 'beginner', where: 'hybrid', scale: 3, risk: 1,
    likes: ['design', 'writing', 'selling', 'people'],
    platforms: [['Buffer', 'https://buffer.com'], ['Later', 'https://later.com'], ['Metricool', 'https://metricool.com'], ['Canva', 'https://www.canva.com']],
    steps: [
      'Choose a local vertical — restaurants, gyms, dental practices — and learn what actually drives enquiries for them.',
      'Audit three local businesses for free and send each a short document of specific fixes.',
      'Sell a monthly package: a fixed number of posts, one shoot day, and community management.',
      'Report on outcomes monthly so renewal is an easy decision for the owner.'
    ],
    pros: ['Low barrier to entry with plenty of unserved local demand', 'Monthly retainers from day one', 'Easy to add photography, ads or email as paid upsells'],
    cons: ['Clients often expect viral results from a modest budget', 'Always-on comment moderation bleeds into evenings', 'Results are hard to attribute, which makes renewal conversations tense'],
    flags: ['Never guarantee follower growth or viral reach', 'Avoid buying followers or engagement for clients — it destroys their reach and your reputation'],
    tags: ['marketing', 'local', 'retainer']
  },
  {
    id: 'ghostwriting', name: 'Ghostwriting', cat: 'freelance',
    tagline: 'Write the books, articles and posts that go out under somebody else\'s name.',
    summary: 'Ghostwriting pays far more than bylined content work because the client is buying discretion and reliability alongside the writing. Business and memoir books run $15,000–$80,000 per project, executive thought-leadership retainers $2,000–$8,000 a month, and ghostwriting one founder\'s newsletter or social posts $1,500–$5,000 a month. You surrender credit entirely, and that is precisely what makes the rate possible. The skill that clients actually pay for is interviewing — extracting a coherent argument from someone who has never written theirs down.',
    pay: [500, 3500, 15000], cost: 'none', costLabel: '$0', speed: 'weeks', speedLabel: '3–10 weeks',
    effort: 'active', skill: 'advanced', where: 'online', scale: 2, risk: 1,
    likes: ['writing', 'research', 'people'],
    platforms: [['Reedsy', 'https://reedsy.com'], ['Gotham Ghostwriters', 'https://gothamghostwriters.com'], ['Upwork', 'https://www.upwork.com'], ['LinkedIn', 'https://www.linkedin.com']],
    steps: [
      'Build a portfolio you are permitted to show — anonymised excerpts, or bylined pieces that prove you can hold someone else\'s voice.',
      'Choose a lane where clients have money and no time: founders, consultants, surgeons, fund managers.',
      'Learn to run a good interview and transcribe it well. Most of the book exists in the client\'s head, not on a page.',
      'Price per project in staged payments, and put credit, rights and a kill fee in the contract before you begin.'
    ],
    pros: ['Rates several times higher than equivalent bylined writing', 'Long projects and retainers mean stable, predictable income', 'You learn an industry deeply from the inside while being paid'],
    cons: ['No public credit, so building your own reputation is slow', 'Clients change direction late and expect you to absorb it', 'Emotionally odd work — you write in a voice that is never yours'],
    flags: ['Never ghostwrite academic work submitted for a qualification; that is fraud in essentially every institution', 'Get credit, rights and kill-fee terms in writing before you start — verbal agreements are where ghostwriters lose money'],
    tags: ['writing', 'high-rate', 'confidential']
  },
  {
    id: 'voice-acting', name: 'Voice acting & voiceover', cat: 'freelance',
    tagline: 'Commercials, e-learning, games and animation — the paid end of "you have a good voice".',
    summary: 'Commercial voiceover pays $150–$1,500 per spot with usage fees charged on top, e-learning narration $200–$500 per finished hour, and character work for games is usually a session or day rate. It is a genuine craft rather than a lucky voice: casting directors are buying acting and the ability to take direction quickly, and most working voice actors spend a year in coaching and auditions before booking consistently. Synthetic voice has absorbed the cheapest tier, which is pushing human work toward performance-driven roles where it cannot compete.',
    pay: [0, 900, 8000], cost: 'low', costLabel: '$300–$1,200 mic & treated space', speed: 'months', speedLabel: '2–6 months',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 2, risk: 2,
    likes: ['audio', 'people'],
    platforms: [['Voice123', 'https://voice123.com'], ['Voices.com', 'https://www.voices.com'], ['Bodalgo', 'https://www.bodalgo.com'], ['Backstage', 'https://www.backstage.com']],
    steps: [
      'Take proper coaching before buying expensive equipment. Direction-taking is the skill being bought, not vocal tone.',
      'Build a treated recording space — a wardrobe genuinely works — and record a short professional demo per genre you can perform.',
      'Audition daily and expect a low booking rate for months; volume is how the craft and the reel both improve.',
      'Learn to quote usage separately from the session fee, because for commercial work that is where most of the money sits.'
    ],
    pros: ['Strong per-hour rates once you are booking regularly', 'Fully remote, and a home booth serves clients worldwide', 'Repeat clients rebook the same voice for years for brand consistency'],
    cons: ['Long unpaid runway of coaching and unsuccessful auditions', 'Pay-to-play platform subscriptions cost money before you earn any', 'Synthetic voice is compressing rates at the budget end of the market'],
    flags: ['Never sign a contract granting perpetual rights to synthesise, clone or train on your voice — read AI clauses carefully', 'Be sceptical of expensive "voiceover academies" promising work; coaching is worth paying for, guaranteed bookings are not real'],
    tags: ['audio', 'voice', 'auditions']
  },
  {
    id: 'translation', name: 'Translation & localisation', cat: 'freelance',
    tagline: 'Convert documents, software and media between languages you genuinely know.',
    summary: 'This market has split in two. General translation rates collapsed as machine translation absorbed the easy work, and post-editing machine output now pays roughly $0.05–$0.15 a word. Specialist human translation held up: legal, medical, patent, financial and game localisation still command $0.15–$0.30 a word and more, because an error there carries liability nobody wants to own. The two levers that most change what you earn are the rarity of your language pair and whether you work for agencies or direct clients — agency intermediation commonly halves your per-word income.',
    pay: [200, 1500, 7000], cost: 'low', costLabel: '$0–$400 CAT tool licence', speed: 'weeks', speedLabel: '2–8 weeks',
    effort: 'active', skill: 'advanced', where: 'online', scale: 2, risk: 1,
    likes: ['writing', 'research'],
    platforms: [['ProZ', 'https://www.proz.com'], ['American Translators Association', 'https://www.atanet.org'], ['Smartcat', 'https://www.smartcat.com'], ['Gengo', 'https://gengo.com']],
    steps: [
      'Specialise into a regulated or creative domain — legal, medical, patent, marketing transcreation, game localisation — where raw machine output is not acceptable.',
      'Learn a CAT tool properly. Translation memory is what makes you fast enough and consistent enough for agency work.',
      'Get certified where your market recognises it; accreditation is often what unlocks the higher-paying legal and medical work.',
      'Move from agencies to direct clients as soon as you credibly can, because that single change can double your rate.'
    ],
    pros: ['Specialist and regulated work still pays well and demand is stable', 'Rare language pairs command a genuine premium', 'Fully remote and portable to anywhere you can work legally'],
    cons: ['General translation rates have fallen hard and will not recover', 'Post-editing machine output is tedious and paid accordingly', 'Agencies squeeze margins and often pay on long terms'],
    flags: ['Never accept unpaid "test translations" longer than a few hundred words', 'Check an agency\'s payment record before working; late and non-payment is a well-documented problem in this industry'],
    tags: ['language', 'specialist', 'remote']
  },
  {
    id: 'grant-writing', name: 'Grant writing', cat: 'freelance',
    tagline: 'Write the funding applications charities depend on and cannot staff for.',
    summary: 'Freelance grant writers charge roughly $50–$150 an hour, or price per proposal: $400–$1,200 for a foundation letter of intent, $1,500–$5,000 for a full foundation proposal, and $5,000–$15,000 for a federal application. Monthly retainers of $2,000–$6,000 covering one to three proposals are common and are what turns this from project work into stable income. There is a firm ethics line in this profession that beginners routinely trip over: charging a percentage of the money you win is prohibited by the sector\'s codes of conduct.',
    pay: [300, 2500, 9000], cost: 'none', costLabel: '$0', speed: 'weeks', speedLabel: '3–10 weeks',
    effort: 'active', skill: 'advanced', where: 'online', scale: 2, risk: 1,
    likes: ['writing', 'research'],
    platforms: [['Grant Professionals Association', 'https://grantprofessionals.org'], ['Instrumentl', 'https://www.instrumentl.com'], ['Candid', 'https://candid.org'], ['Idealist', 'https://www.idealist.org']],
    steps: [
      'Write one or two proposals free for a small charity you actually care about, which gives you both writing samples and outcomes to cite.',
      'Pick a funding area — health, arts, education, environment — and learn its specific funders, cycles and language.',
      'Quote per proposal against a defined scope, and charge separately for the research phase that identifies suitable funders.',
      'Track your success rate honestly. It is the number every client asks about, and inflating it ends relationships quickly.'
    ],
    pros: ['Meaningful work with organisations whose mission you can believe in', 'Retainers make the income genuinely predictable month to month', 'Leads naturally into higher-paid fundraising strategy consulting'],
    cons: ['Deadlines are immovable and cluster around funder cycles', 'Success depends heavily on the organisation\'s own credibility, not only your writing', 'Rejection is the normal outcome and clients take it personally'],
    flags: ['Never charge a percentage of funds awarded — sector ethics codes prohibit contingent fees and funders may disallow the cost entirely', 'Check whether a funder permits grant funds to pay for grant writing before invoicing against them'],
    tags: ['writing', 'nonprofit', 'retainer']
  },
  {
    id: 'ai-automation', name: 'AI automation consulting', cat: 'freelance',
    tagline: 'Build the workflow automations small firms want and have nobody to wire up.',
    summary: 'Small businesses know they should be automating quoting, intake, scheduling and reporting, and have no one who can do it. Independent practitioners charge roughly $150–$350 an hour, or $1,000–$6,000 for a single workflow build, with retainers of $2,000–$8,000 a month for phased work. The technical barrier is lower than it looks — competence with a tool like Zapier or Make, an API or two, and a real understanding of how a business actually operates. The barrier that matters is being able to explain the value in the owner\'s own language.',
    pay: [300, 3000, 15000], cost: 'low', costLabel: '$50–$200/mo tool subscriptions', speed: 'weeks', speedLabel: '3–10 weeks',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 3, risk: 1,
    likes: ['code', 'admin', 'research'],
    platforms: [['Zapier Experts', 'https://zapier.com/experts'], ['Make Partners', 'https://www.make.com/en/partners'], ['n8n', 'https://n8n.io'], ['Upwork', 'https://www.upwork.com']],
    steps: [
      'Automate something end to end inside a business you already know, and document the hours or errors it removed.',
      'Pick one vertical — clinics, agencies, trades, e-commerce — so the same builds resell across similar clients.',
      'Price by the value of the process removed rather than the hours it takes you, and quote fixed-fee under a few thousand.',
      'Attach a maintenance retainer to every build, because automations break whenever the tools they connect change.'
    ],
    pros: ['High rates for work that is often only a few days of building', 'Every build is reusable across similar clients in the same vertical', 'Retainers follow naturally because automations genuinely need upkeep'],
    cons: ['A crowded, noisy field full of people overclaiming what they can deliver', 'Client processes are always messier than described, which makes scoping hard', 'Vendor and API changes break work you already delivered and were paid for'],
    flags: ['Never promise specific headcount savings or revenue increases in writing', 'Be careful where client data flows — routing customer records through third-party AI services can breach their privacy obligations and yours'],
    tags: ['automation', 'consulting', 'high-rate']
  },
  {
    id: 'recruiting', name: 'Freelance recruiting', cat: 'freelance',
    tagline: 'Find the person a company cannot, and take a share of their first-year salary.',
    summary: 'Independent contingency recruiters are paid only on a successful hire, typically 15–25% of first-year salary — $18,000–$30,000 on a $120,000 engineering role. The income is entirely results-based and genuinely lumpy: you can work a search for two months and earn nothing at all. What makes it viable is specialising narrowly enough that you already know the candidate pool personally, and building two or three repeat clients rather than chasing one-off briefs from strangers.',
    pay: [0, 2500, 20000], cost: 'low', costLabel: '$50–$300/mo sourcing tools', speed: 'months', speedLabel: '2–5 months to first placement',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 3, risk: 2,
    likes: ['people', 'selling', 'admin'],
    platforms: [['Paraform', 'https://www.paraform.com'], ['LinkedIn Talent Solutions', 'https://business.linkedin.com/talent-solutions'], ['Recruiter.com', 'https://www.recruiter.com'], ['Upwork', 'https://www.upwork.com']],
    steps: [
      'Recruit into the field you came from. Your network and your ability to judge a candidate are the entire product.',
      'Start on a marketplace that supplies the briefs, so you learn the process without also having to sell.',
      'Get a written fee agreement including the replacement guarantee period before presenting a single candidate.',
      'Build two or three repeat clients rather than many one-offs, since repeat business is what smooths the income.'
    ],
    pros: ['Very large single payments for a successful placement', 'No qualification required — judgement and a network are what sell', 'Fully remote and scalable by running more searches at once'],
    cons: ['Contingency means months of work can earn absolutely nothing', 'Candidates withdraw and clients change requirements late in the process', 'Income is extremely lumpy, especially through the first year'],
    flags: ['Get the fee and the replacement guarantee in writing up front; disputes over who "owned" a candidate are common and expensive', 'Never misrepresent a role or a candidate — this industry runs on reputation and word travels fast'],
    tags: ['hiring', 'commission', 'network']
  },
  {
    id: 'proofreading', name: 'Proofreading & copy editing', cat: 'freelance',
    tagline: 'Catch what the writer and the software both missed, before it is published.',
    summary: 'Editing splits into levels that pay very differently: proofreading a near-final text runs roughly $25–$45 an hour, copy editing $35–$60, and developmental editing of a manuscript\'s structure $50–$90. Independent authors, academics writing in a second language, and content teams are the steady markets. Automated grammar tools have absorbed the easiest errors, which pushes paid work toward consistency, style-guide compliance and judgement about meaning — the parts software still reliably gets wrong.',
    pay: [200, 1400, 5000], cost: 'low', costLabel: '$0–$400 training & style guides', speed: 'weeks', speedLabel: '2–8 weeks',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 2, risk: 1,
    likes: ['writing', 'admin', 'research'],
    platforms: [['Editorial Freelancers Association', 'https://www.the-efa.org'], ['CIEP (UK)', 'https://www.ciep.uk'], ['Reedsy', 'https://reedsy.com'], ['Scribendi', 'https://www.scribendi.com']],
    steps: [
      'Learn one style guide properly — Chicago, AP, APA or your market\'s equivalent — because clients hire for exactly that specificity.',
      'Take a recognised editing course. This is one of the few writing-adjacent fields where a credential genuinely opens doors.',
      'Specialise by material: fiction, academic papers, medical writing and second-language manuscripts pay differently and need different skills.',
      'Charge per word or per project rather than hourly, so that getting faster raises your income instead of cutting it.'
    ],
    pros: ['Quiet, flexible work you can fit into any hours', 'Authors and academics return for every subsequent piece', 'Clear progression into better-paid developmental editing'],
    cons: ['Grammar tools have removed the simplest paid work', 'Needs real training — enthusiasm for spotting typos is not a qualification', 'Hourly pricing quietly punishes you for being good at it'],
    flags: ['Do not accept lengthy unpaid sample edits; around 1,000 words is the professional maximum', 'Editing academic work is legitimate, but rewriting a student\'s submitted assignment is academic misconduct'],
    tags: ['editing', 'writing', 'remote']
  },
  {
    id: 'vibe-coding', name: 'AI-assisted app building', cat: 'freelance',
    tagline: 'Ship working software in days using AI tooling, for clients who need something real this month.',
    summary: 'Often called vibe coding. Tools like Cursor, Claude Code and Replit let one person turn a specification into working software in days rather than months, and there is real demand for exactly that — internal tools, prototypes, MVPs that would never have justified an agency. Marketplace rates run $60–$100 an hour and materially more for people who deliver production-quality work, with project fees from a few hundred dollars for a small tool up to around $14,000 for a full SaaS MVP. The catch is the part the client never sees: code that demos well commonly needs 20–30% more work before it is genuinely production-ready, and that gap is yours to absorb.',
    pay: [200, 2500, 15000], cost: 'low', costLabel: '$20–$200/mo tool subscriptions', speed: 'weeks', speedLabel: '2–8 weeks',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 3, risk: 2,
    likes: ['code', 'design', 'selling'],
    platforms: [['Cursor', 'https://cursor.com'], ['Claude Code', 'https://claude.com/product/claude-code'], ['Replit', 'https://replit.com'], ['Upwork', 'https://www.upwork.com']],
    steps: [
      'Build and properly deploy three real things for yourself first, so you learn exactly where AI-generated code breaks under real use.',
      'Learn enough of the underlying stack to review and debug what the tool produces. Selling software you cannot fix is how this goes badly wrong.',
      'Sell a specific outcome — a booking system, an internal dashboard, a working prototype for a funding pitch — rather than "AI development" as a category.',
      'Quote fixed-fee against a written scope, and price hardening, testing and deployment separately from the build itself.'
    ],
    pros: ['Delivery speed is a real advantage while clients still expect projects to take months', 'Very low tooling cost and no team required', 'Small projects that could never justify an agency are now economic to take on'],
    cons: ['Crowded and commoditising quickly, with a great deal of overclaiming', 'Code that demos well is frequently not production-ready, and closing that gap is unpaid unless you scoped it', 'You inherit maintenance of software you did not write line by line'],
    flags: ['Never ship client software you cannot read, debug and explain — you carry the liability, not the tool that generated it', 'Check licensing and data handling: AI tools can reproduce licensed code, and routing client data through third-party services may breach their obligations and yours'],
    tags: ['ai', 'software', 'fast-delivery']
  },
  {
    id: 'tax-prep', name: 'Seasonal tax preparation', cat: 'freelance',
    tagline: 'A short course and a preparer number, then four intense months a year.',
    summary: 'In the US anyone preparing federal returns for payment needs a PTIN, which is a registration rather than an exam, and the practical training is a short seasonal course that several large firms run free for people who then work the season with them. Employed seasonal preparers earn $14–$28 an hour; the alternative-income version is building your own small client base, where individual returns bill $150–$500 depending on complexity. Two hundred returns in a season is substantial money for four months of very concentrated work, and those clients return every year.',
    pay: [0, 1500, 8000], cost: 'low', costLabel: '$100–$600 PTIN, software, course', speed: 'months', speedLabel: '2–5 months (seasonal)',
    effort: 'active', skill: 'intermediate', where: 'hybrid', scale: 2, risk: 1,
    likes: ['finance', 'admin', 'research'],
    platforms: [['IRS PTIN', 'https://www.irs.gov/tax-professionals/ptin-requirements-for-tax-return-preparers'], ['IRS Annual Filing Season Program', 'https://www.irs.gov/tax-professionals/annual-filing-season-program'], ['Intuit Academy', 'https://academy.intuit.com']],
    steps: [
      'Register for a PTIN, or your country\'s equivalent, before preparing a single paid return. It is a legal requirement rather than a formality.',
      'Take a seasonal preparer course — several large firms train candidates free in exchange for working the season, which is a genuinely good way in.',
      'Work one season employed first, to learn volume, software and the awkward cases before taking your own clients.',
      'Build your own book from a niche you understand — rideshare drivers, landlords, small trades — where the same schedules repeat every year.'
    ],
    pros: ['Very high income density — a year\'s side income earned in four months', 'Free or cheap training routes with firms that then employ you', 'Clients return every single year with almost no marketing'],
    cons: ['Brutally compressed season with long hours from January to April', 'You carry responsibility for accuracy and for penalties', 'Software and continuing education cost money every year'],
    flags: ['Preparing paid returns without the required registration is an enforceable offence in most countries — register before you start', 'Never sign a return you have not verified, and never accept a fee contingent on the size of a refund'],
    tags: ['short-training', 'seasonal', 'finance']
  },
  {
    id: 'paid-ads', name: 'Paid ads management', cat: 'freelance',
    tagline: 'Free platform certifications, then a monthly retainer running a business\'s ad spend.',
    summary: 'Distinct from organic social media work: this is running Google, Meta or TikTok campaigns against a budget and being judged on cost per lead. The platform certifications are free and take days, so the formal barrier is almost zero — the real skill is reading data and knowing when to stop spending. Small business retainers commonly run $500–$3,000 a month, or 10–20% of ad spend, and three or four retained clients is a substantial second income. Results here are measurable, which cuts both ways.',
    pay: [300, 2500, 12000], cost: 'low', costLabel: '$0–$200 tools; the client funds ad spend', speed: 'weeks', speedLabel: '3–10 weeks',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 3, risk: 2,
    likes: ['selling', 'research', 'finance', 'design'],
    platforms: [['Google Skillshop', 'https://skillshop.withgoogle.com'], ['Meta Blueprint', 'https://www.facebook.com/business/learn'], ['Upwork', 'https://www.upwork.com']],
    steps: [
      'Complete the free Google and Meta certifications, then run a small campaign with your own money so you have felt the cost of a bad decision.',
      'Offer free account audits to local businesses already spending — misconfigured accounts are extremely common and easy to demonstrate.',
      'Charge a monthly management retainer, and never pay for media out of your own pocket; the client funds the platform directly.',
      'Report on cost per lead and revenue rather than impressions, because that is what decides whether you are renewed.'
    ],
    pros: ['Certifications are free and take days rather than months', 'Monthly retainers make the income predictable', 'Results are measurable, so good work is easy to justify and to price'],
    cons: ['You are judged on numbers you only partly control', 'Clients blame the manager when the offer or the market is the real problem', 'Platform changes can undo your setup overnight'],
    flags: ['Never take ad spend into your own account — have the client pay the platform directly, or you carry their cash flow and their disputes', 'Never guarantee a cost per lead or a return on ad spend in writing'],
    tags: ['short-training', 'marketing', 'retainer']
  },
  {
    id: 'it-support', name: 'IT support for small businesses', cat: 'freelance',
    tagline: 'A two-to-three month certification and the patience to explain things twice.',
    summary: 'Firms with five to fifty staff have no IT department and need someone reliable for setup, backups, email, security basics and the day the server stops. Entry certifications like CompTIA A+ take roughly two to three months of study. Break-fix work bills $60–$150 an hour, but the durable version is a managed agreement at a monthly per-user rate, which converts occasional call-outs into recurring revenue. Being calm and explaining clearly matters more to these clients than deep technical depth does.',
    pay: [300, 2500, 10000], cost: 'low', costLabel: '$300–$900 certification & tools', speed: 'months', speedLabel: '2–5 months',
    effort: 'active', skill: 'intermediate', where: 'hybrid', scale: 3, risk: 1,
    likes: ['code', 'admin', 'people'],
    platforms: [['CompTIA', 'https://www.comptia.org'], ['Microsoft Learn', 'https://learn.microsoft.com'], ['Upwork', 'https://www.upwork.com'], ['Thumbtack', 'https://www.thumbtack.com/pro']],
    steps: [
      'Certify at entry level — CompTIA A+ or the Microsoft fundamentals track — and build a home lab you can break and rebuild repeatedly.',
      'Start with break-fix work for very small businesses and sole traders, who are badly underserved and decide quickly.',
      'Convert every satisfied client onto a monthly agreement covering backups, updates and a set number of support hours.',
      'Specialise in one vertical\'s software — dental, legal or accounting practices — so the same problems recur and you solve them faster each time.'
    ],
    pros: ['Recurring monthly agreements make this genuinely predictable income', 'Constant demand from firms too small to employ IT staff', 'Clear certification path measured in months, not years'],
    cons: ['Emergency calls arrive at inconvenient times', 'You carry the responsibility when data is lost', 'Requires patience with non-technical users, every single day'],
    flags: ['Carry professional indemnity insurance and agree in writing who is responsible for backups before touching any client system', 'Do not take on systems holding regulated health, legal or financial data without understanding the compliance obligations that come with them'],
    tags: ['short-training', 'recurring', 'technical']
  },

  /* -------------------------------------------------- PRODUCTS & E-COMMERCE */
  {
    id: 'etsy-handmade', name: 'Handmade & craft selling', cat: 'ecommerce',
    tagline: 'Sell things you make to a marketplace already full of people looking for them.',
    summary: 'Etsy, craft fairs and Instagram give makers direct access to buyers without wholesale. Realistic economics matter: after materials, marketplace fees of around 10% including payment processing, and shipping, a healthy handmade product needs a 3–4x markup on materials. Sellers who succeed treat it as a small manufacturing business — batch production, repeatable designs, decent photography — rather than as an outlet for one-off creativity.',
    pay: [50, 600, 6000], cost: 'low', costLabel: '$100–$600 materials & fees', speed: 'weeks', speedLabel: '2–8 weeks',
    effort: 'active', skill: 'intermediate', where: 'hybrid', scale: 3, risk: 2,
    likes: ['crafts', 'design', 'selling'],
    platforms: [['Etsy', 'https://www.etsy.com/sell'], ['Shopify', 'https://www.shopify.com'], ['Folksy (UK)', 'https://folksy.com'], ['Faire (wholesale)', 'https://www.faire.com']],
    steps: [
      'Cost one product honestly — materials, packaging, shipping, fees and your own hourly rate — before listing anything.',
      'Photograph on a plain background in daylight. Photography is the single biggest lever on handmade sales.',
      'List 20+ variations so the marketplace has something to show for many different searches.',
      'Once something sells repeatedly, batch-produce it and consider wholesale to local shops.'
    ],
    pros: ['Turns an existing craft skill into income with no new learning', 'Marketplace brings its own buyer traffic from day one', 'Repeat customers and wholesale orders scale it beyond one-offs'],
    cons: ['Fees, ad costs and shipping quietly eat the margin', 'Deeply time-intensive — it is income per hour worked', 'Very crowded categories require real differentiation'],
    flags: ['Beware "print on demand dropshipper posing as handmade" competitors undercutting you — compete on quality, not price', 'Check that your product complies with safety labelling rules, especially for candles, cosmetics and children\'s items'],
    tags: ['handmade', 'marketplace', 'crafts']
  },
  {
    id: 'amazon-fba', name: 'Private label on Amazon', cat: 'ecommerce',
    tagline: 'Source an improved version of a proven product, brand it, and let Amazon handle logistics.',
    summary: 'You find a product already selling well, work with a manufacturer to produce a better version under your own brand, ship it into Amazon\'s warehouses, and they pick, pack and ship every order. It is a genuine business with genuine capital risk: a realistic first launch needs $3,000–$10,000 for inventory, samples, photography and advertising, and roughly half of first products fail to find traction. Successful sellers reinvest for two years before taking money out.',
    pay: [0, 1500, 25000], cost: 'high', costLabel: '$3,000–$10,000 first launch', speed: 'months', speedLabel: '4–8 months',
    effort: 'semi', skill: 'advanced', where: 'online', scale: 5, risk: 5,
    likes: ['selling', 'finance', 'research'],
    platforms: [['Amazon Seller Central', 'https://sell.amazon.com'], ['Alibaba', 'https://www.alibaba.com'], ['Jungle Scout', 'https://www.junglescout.com'], ['Helium 10', 'https://www.helium10.com']],
    steps: [
      'Research demand with real sales data, not intuition — look for steady volume, weak listings and few brand-dominated competitors.',
      'Order samples from at least three manufacturers and physically compare them before committing.',
      'Register a trademark and enrol in Brand Registry to protect the listing from hijackers.',
      'Launch with a small first order, spend on advertising deliberately, and only reorder once the numbers work.'
    ],
    pros: ['Amazon supplies enormous buyer traffic and handles all fulfilment', 'A working product line is a sellable asset worth a multiple of profit', 'Genuinely scalable well beyond your own hours'],
    cons: ['Real money at risk — unsold inventory is a total loss', 'Fees, returns, storage and ad costs compress margins hard', 'Account suspensions can happen with limited recourse'],
    flags: ['Treat any "Amazon automation" agency promising passive returns as a scam — many have been prosecuted', 'Never buy a course costing thousands before validating one product yourself'],
    tags: ['inventory', 'brand', 'capital']
  },
  {
    id: 'thrift-flipping', name: 'Thrift & clearance flipping', cat: 'ecommerce',
    tagline: 'Buy underpriced second-hand goods locally and resell them where the buyers are.',
    summary: 'Reselling rewards knowledge of a narrow category more than capital. People who consistently profit specialise — vintage denim, film cameras, power tools, Lego, mid-century ceramics — because they can price accurately in three seconds while everyone else guesses. Typical margins are 2–4x purchase price, and you can start with $50 and the sold listings on eBay as your pricing guide.',
    pay: [100, 700, 5000], cost: 'low', costLabel: '$50–$300 starting stock', speed: 'days', speedLabel: '3–14 days',
    effort: 'active', skill: 'beginner', where: 'hybrid', scale: 2, risk: 2,
    likes: ['selling', 'physical', 'research'],
    platforms: [['eBay', 'https://www.ebay.com'], ['Vinted', 'https://www.vinted.com'], ['Depop', 'https://www.depop.com'], ['Facebook Marketplace', 'https://www.facebook.com/marketplace']],
    steps: [
      'Pick one category and study completed sold listings until you know real prices from memory.',
      'Source from charity shops, estate sales, clearance racks and free listings — buy only what you can price confidently.',
      'Photograph well and describe flaws honestly. Returns destroy thin margins.',
      'Track cost, sale price and fees per item so you know your actual profit rather than your revenue.'
    ],
    pros: ['Start this weekend with almost no money', 'Cash converts quickly — often within days', 'Genuinely fun if you enjoy hunting, and the knowledge compounds'],
    cons: ['Income is directly tied to hours spent sourcing', 'Storage fills your home fast', 'Shipping, fees and returns take a bigger bite than beginners expect'],
    flags: ['Never resell counterfeit branded goods, even unknowingly — verify authenticity in designer categories', 'Beware buyers pushing you to complete payment off-platform; that is where reseller fraud happens'],
    tags: ['resale', 'secondhand', 'fast-cash']
  },
  {
    id: 'online-arbitrage', name: 'Retail & online arbitrage', cat: 'ecommerce',
    tagline: 'Buy discounted retail stock and resell it on marketplaces where it still commands full price.',
    summary: 'Different from flipping: you buy new, in-date retail products on clearance or promotion and resell them on Amazon or eBay, where the price is higher. Margins are thinner than private label — typically 15–30% after fees — but the capital cycle is fast and you can validate with a single case of stock. It rewards systematic scanning and spreadsheet discipline rather than taste.',
    pay: [100, 900, 6000], cost: 'mid', costLabel: '$300–$2,000 rolling stock', speed: 'weeks', speedLabel: '2–8 weeks',
    effort: 'active', skill: 'intermediate', where: 'hybrid', scale: 3, risk: 3,
    likes: ['selling', 'finance', 'research'],
    platforms: [['Amazon Seller Central', 'https://sell.amazon.com'], ['Keepa', 'https://keepa.com'], ['SellerAmp', 'https://selleramp.com'], ['eBay', 'https://www.ebay.com']],
    steps: [
      'Learn to read a Keepa price history chart before buying anything — it tells you whether a price is stable or a spike.',
      'Check that the category is not gated and that you can get ungated for the brand you want to sell.',
      'Buy a small test quantity, list it, and measure your true profit after all fees and shipping.',
      'Reinvest profits into whatever repeats, and keep meticulous purchase receipts for authenticity claims.'
    ],
    pros: ['Fast capital turnover compared with manufacturing your own product', 'No product development, design or minimum order quantities', 'Easy to scale up or stop entirely without stranded assets'],
    cons: ['Brand gating and IP complaints can block your listings without warning', 'Margins are thin and competitors trigger price wars', 'Requires constant sourcing — the deals do not repeat reliably'],
    flags: ['Keep receipts: brands do issue takedowns and you must prove legitimate sourcing', 'Anyone selling "guaranteed profitable product lists" is selling the same list to hundreds of people'],
    tags: ['arbitrage', 'marketplace', 'capital']
  },
  {
    id: 'digital-products', name: 'Digital products & templates', cat: 'ecommerce',
    tagline: 'Build a spreadsheet, template, preset or toolkit once and sell the same file forever.',
    summary: 'The best margin structure available to an individual: near-zero marginal cost, instant delivery, no shipping or support burden. Notion templates, financial models, Lightroom presets, contract packs, CAD blocks and Figma UI kits typically sell for $15–$150. The distribution problem is the whole game — the product is easy, being found is not — so this works best layered on top of an audience or a service business.',
    pay: [20, 500, 8000], cost: 'none', costLabel: '$0–$30 storefront fees', speed: 'weeks', speedLabel: '2–10 weeks',
    effort: 'passive', skill: 'intermediate', where: 'online', scale: 5, risk: 1,
    likes: ['design', 'writing', 'admin', 'code'],
    platforms: [['Gumroad', 'https://gumroad.com'], ['Lemon Squeezy', 'https://www.lemonsqueezy.com'], ['Payhip', 'https://payhip.com'], ['Etsy', 'https://www.etsy.com/sell']],
    steps: [
      'Find a repetitive task in your own work or field and package the solution you already built for yourself.',
      'Make it obviously useful within 60 seconds of opening — clear instructions beat extra features.',
      'Sell on a storefront that handles VAT and sales tax for you, which matters more than it sounds.',
      'Give away a lite version to build an email list, then sell the full version to that list repeatedly.'
    ],
    pros: ['Effectively infinite margin — one build, unlimited sales', 'No inventory, shipping, returns or fulfilment', 'Bundles and updates let you resell to the same customers'],
    cons: ['Nothing sells without distribution, and building an audience is the slow part', 'Easily copied by competitors', 'Buyers still expect support and updates'],
    flags: ['Do not resell templates or assets with licences that forbid redistribution', 'Register for digital sales tax where required — storefronts that handle this for you are worth their fee'],
    tags: ['digital', 'passive', 'templates']
  },
  {
    id: 'dropshipping', name: 'Dropshipping', cat: 'ecommerce',
    tagline: 'Sell products a supplier ships directly to your customer, so you hold no stock.',
    summary: 'Included because it is legal and can work, but with a warning: the version marketed on social media — generic gadgets from overseas marketplaces, sold on ad spend — mostly loses money, because shipping is slow, margins are thin and customer acquisition costs exceed profit. The version that does work is unglamorous: partnering with domestic suppliers in a specialised category (medical supplies, specialist tools, equestrian gear) where you add real product expertise and service.',
    pay: [0, 400, 8000], cost: 'mid', costLabel: '$300–$1,500 store + ads', speed: 'weeks', speedLabel: '4–12 weeks',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 4, risk: 4,
    likes: ['selling', 'design', 'finance'],
    platforms: [['Shopify', 'https://www.shopify.com'], ['Spocket', 'https://www.spocket.co'], ['Zendrop', 'https://zendrop.com'], ['Meta Ads', 'https://www.facebook.com/business/ads']],
    steps: [
      'Choose a specialised category you genuinely understand, where buyers want advice as much as the product.',
      'Find domestic or regional suppliers with real fulfilment agreements — not an overseas marketplace listing.',
      'Order samples yourself and time the delivery before promising anything to a customer.',
      'Calculate customer acquisition cost honestly against margin before scaling any advertising.'
    ],
    pros: ['No inventory investment or storage', 'Easy to test many products without committing capital', 'Store and supplier relationships can be a genuine business if the niche is real'],
    cons: ['Ad costs routinely exceed margins and most stores lose money', 'You own every complaint about a delivery you do not control', 'Chargebacks and refunds hit you, not the supplier'],
    flags: ['Ignore anyone showing revenue screenshots without cost figures — revenue is not profit', 'Long overseas shipping times are the number one cause of chargebacks; verify before you sell'],
    tags: ['ecommerce', 'no-inventory', 'ads']
  },
  {
    id: 'vending', name: 'Vending machine route', cat: 'ecommerce',
    tagline: 'Machines in the right buildings quietly take money — location matters far more than the machine.',
    summary: 'Treat this industry\'s advertised numbers with suspicion. A machine grosses roughly $150–$400 a month, and after product cost, location commission, card reader fees, fuel and your own restocking time the honest net is commonly $50–$150 — not the $300–$600 frequently quoted. Machines cost $2,000–$5,000 each and take one to two hours a week each to service. It becomes semi-passive only at the scale where you employ route drivers, which is a real business rather than a side income.',
    pay: [50, 400, 3000], cost: 'high', costLabel: '$2,000–$5,000 per machine', speed: 'months', speedLabel: '2–5 months',
    effort: 'active', skill: 'beginner', where: 'local', scale: 3, risk: 3,
    likes: ['physical', 'selling', 'driving'],
    platforms: [['NAMA (industry body)', 'https://namanow.org'], ['UsedVending', 'https://www.usedvending.com'], ['VendSoft', 'https://www.vendsoft.com'], ['Nayax', 'https://www.nayax.com']],
    steps: [
      'Secure the location before you buy the machine. Locations are the scarce resource; an unplaced machine is a garage ornament.',
      'Buy used from a reputable dealer and insist on seeing the machine powered up and tested before paying.',
      'Fit a card reader. Cashless payment materially increases takings and customers now expect it.',
      'Track sales per machine per product line and cull whatever does not move, because slow stock is dead capital that eventually expires.'
    ],
    pros: ['Genuinely recurring income once a machine is well placed', 'Simple operation with no employees or customer service', 'Scales by adding machines, and later route drivers'],
    cons: ['Real capital at risk, and one bad placement can waste a year', 'Advertised profit figures across this industry are wildly optimistic', 'Restocking, breakdowns, theft and vandalism are all yours to absorb'],
    flags: ['Treat any "turnkey vending business" selling machines plus guaranteed locations as a scam — this is a long-running fraud pattern regulators have repeatedly prosecuted', 'Get every location agreement in writing, including commission rate, term and who is liable for damage'],
    tags: ['machines', 'capital', 'route']
  },
  {
    id: 'craft-brewing', name: 'Craft brewing (nano-brewery)', cat: 'ecommerce',
    tagline: 'Brewing to sell is a licensed business — and the licence is the easy part next to the capital.',
    summary: 'Start with the fact that stops most people: brewing at home is legal almost everywhere, and selling what you brewed at home is legal essentially nowhere. Commercial production needs a federal brewer\'s notice, a state licence, bonding and non-residential premises. Once licensed the economics are stark — a taproom pint carries over 80% gross margin against 30–40% through a distributor and generates five to eight times more revenue per barrel, which is why most small breweries are taproom-led. Net margins across craft brewing still run only 4–9%. A 1–3 barrel nano system starts under $100,000 and a micro-brewery with a taproom runs $250,000 to $2 million.',
    pay: [0, 1500, 15000], cost: 'high', costLabel: '$20,000 contract-brewed to $250,000+', speed: 'long', speedLabel: '12–24 months',
    effort: 'active', skill: 'advanced', where: 'local', scale: 4, risk: 5,
    likes: ['food', 'physical', 'selling', 'crafts'],
    platforms: [['TTB Brewer\'s Notice', 'https://www.ttb.gov/regulated-commodities/beverage-alcohol/beer/ttb-beer-brewers-notice'], ['Brewers Association', 'https://www.brewersassociation.org'], ['American Homebrewers Association', 'https://www.homebrewersassociation.org'], ['SIBA (UK)', 'https://siba.co.uk']],
    steps: [
      'Enter competitions and get blind, honest feedback on your recipes as a homebrewer first. Enthusiasm from friends is not market validation.',
      'Look hard at contract brewing or an alternating proprietorship before buying anything — brewing on somebody else\'s licensed kit can start at $20,000–$50,000 rather than a quarter of a million.',
      'Apply for the brewer\'s notice and your state or national licence early. Approval takes months and you cannot legally sell a drop before it lands.',
      'Build the plan around a taproom wherever possible, because distribution margins are a fraction of what you keep selling direct.'
    ],
    pros: ['Taproom sales carry over 80% gross margin and build a real local following', 'Contract and alternating-proprietor routes let you start without buying a brewhouse', 'A recognised local brand becomes a genuine, sellable asset'],
    cons: ['Net margins across the industry are only 4–9% despite high gross margins', 'Heavy capital requirement and long licensing lead times before any revenue', 'Physically demanding production work in a crowded market in most cities'],
    flags: ['Selling beer you brewed at home is illegal in essentially every jurisdiction — including the workarounds people suggest, such as "selling the bottle and giving the beer away" or selling shares in the ingredients. Get licensed, or brew under someone else\'s licence', 'Undercapitalisation by 40–60% of true need is the single most common cause of failure; excise duty, labelling and record-keeping obligations are strictly enforced'],
    tags: ['brewing', 'licensed', 'capital']
  },
  {
    id: 'kombucha', name: 'Kombucha & small-batch fermented drinks', cat: 'ecommerce',
    tagline: 'The accessible end of brewing — provided you stay under 0.5% alcohol.',
    summary: 'Far lighter on capital than beer, and the regulatory line is a single number: any beverage reaching 0.5% ABV at any point — during fermentation, at bottling, or later inside the sealed bottle — falls under alcohol regulation, with the licensing and excise duty that implies. Below it you are usually in ordinary food regulation, and in some places cottage food rules. Bottles retail at $5–$7, fermentation vessels cost around $1,000 each, and food facility permits run $200–$1,000 with four to eight weeks of processing. The operational discipline is short ferments, immediate refrigeration, and genuinely testing ABV rather than assuming it.',
    pay: [50, 700, 4000], cost: 'mid', costLabel: '$1,000–$8,000 vessels, permits, bottling', speed: 'months', speedLabel: '3–8 months',
    effort: 'active', skill: 'intermediate', where: 'local', scale: 3, risk: 3,
    likes: ['food', 'physical', 'selling', 'crafts'],
    platforms: [['Kombucha Brewers International', 'https://kombuchabrewers.org'], ['FDA food facility registration', 'https://www.fda.gov/food'], ['Local Harvest', 'https://www.localharvest.org'], ['Square', 'https://squareup.com']],
    steps: [
      'Check your state or country\'s cottage food rules first. Fermented drinks sit in a grey area in many of them precisely because fermentation always produces some alcohol.',
      'Buy a hydrometer or refractometer and test every batch. Guessing at ABV is how small producers accidentally become unlicensed alcohol producers.',
      'Keep ferments short, refrigerate immediately after bottling, and control secondary fermentation in the sealed bottle — that is where the ABV quietly creeps up.',
      'Start at farmers markets and local cafés on keg or growler supply before investing in bottling, labelling and cold-chain distribution.'
    ],
    pros: ['Far lower capital than alcoholic brewing, and no liquor licence if you stay compliant', 'Strong margins on a $5–$7 bottle sold direct', 'Sells locally through markets, cafés and subscription boxes'],
    cons: ['The 0.5% ABV line is genuinely easy to cross accidentally inside the bottle', 'Cold chain and short shelf life complicate every distribution decision', 'Crowded retail shelves with well-funded incumbent brands'],
    flags: ['Any batch reaching 0.5% ABV is legally an alcoholic beverage requiring a licence and excise registration — test it, do not assume', 'Fermented drinks are excluded from cottage food rules in many jurisdictions; confirm yours before selling a single bottle'],
    tags: ['brewing', 'fermentation', 'food']
  },
  {
    id: 'brick-making', name: 'Concrete block & brick making', cat: 'ecommerce',
    tagline: 'Small-scale block production sold to local builders — heavy work, steady demand.',
    summary: 'A genuine small manufacturing business anywhere construction is active. A manual machine costs $3,000–$8,000 and produces 500–800 blocks per eight-hour shift; a semi-automatic runs $8,000–$18,000 and 800–2,000. Budget another 30–50% on top of the machine price for civil works, pallets, silos and electrical installation. Blocks cost $0.35–$0.55 to produce and sell for $0.60–$1.00 — roughly 30–50% gross and 15–25% net — with payback on a well-sited plant commonly 18–36 months. Location decides everything here, because blocks are heavy and uneconomic to transport far.',
    pay: [0, 1500, 12000], cost: 'high', costLabel: '$5,000–$60,000 depending on scale', speed: 'months', speedLabel: '3–9 months',
    effort: 'active', skill: 'intermediate', where: 'local', scale: 4, risk: 4,
    likes: ['physical', 'selling', 'home'],
    platforms: [['NCMA', 'https://ncma.org'], ['Alibaba', 'https://www.alibaba.com'], ['IndiaMART', 'https://www.indiamart.com'], ['Google Business Profile', 'https://www.google.com/business/']],
    steps: [
      'Survey local demand before buying anything — who is building nearby, which block sizes they specify, and what established suppliers charge.',
      'Start with a manual or egg-laying machine and prove you can sell consistently before upgrading to semi-automatic.',
      'Lock in aggregate and cement supply at a stable price, since raw materials are most of your unit cost and the margin is thin.',
      'Cure properly and to schedule. Under-cured blocks fail strength tests, destroy your standing with builders, and create real liability.'
    ],
    pros: ['Steady demand anywhere construction is happening', 'Simple, repeatable product with no design or branding complexity', 'Payback commonly 18–36 months on a well-placed plant'],
    cons: ['Heavy capital before any revenue, and machines are difficult to resell', 'Blocks are costly to transport, so your market is a small radius', 'Physically punishing work, and cement dust is a genuine respiratory hazard'],
    flags: ['Blocks sold for structural use must meet strength standards — test batches and keep records, because failures carry serious liability', 'Check zoning, dust and noise rules before setting up; block yards are frequently restricted in or near residential areas'],
    tags: ['manufacturing', 'construction', 'capital']
  },
  {
    id: 'soap-making', name: 'Soap & bath product making', cat: 'ecommerce',
    tagline: 'Low startup, real margins, and one regulatory line that decides which rulebook you live under.',
    summary: 'Cold-process soap costs roughly $1–$3 a bar in materials and sells for $6–$12 at markets, with wholesale to shops at around half retail. The regulatory point matters more than the recipe. In the US a product making only cleaning claims is "true soap" and sits with the CPSC — but the moment you claim it moisturises, exfoliates or improves skin, it becomes a cosmetic under FDA rules and MoCRA applies. Businesses under $1 million in average annual US cosmetics sales are exempt from facility registration and product listing, though safety substantiation still applies. In the UK and EU every formulation needs a safety assessment before sale.',
    pay: [30, 400, 3000], cost: 'low', costLabel: '$200–$1,200 moulds, oils, lye, safety gear', speed: 'weeks', speedLabel: '4–12 weeks',
    effort: 'active', skill: 'beginner', where: 'hybrid', scale: 3, risk: 2,
    likes: ['crafts', 'design', 'selling', 'home'],
    platforms: [['Handcrafted Soap & Cosmetic Guild', 'https://www.soapguild.org'], ['FDA small business cosmetics', 'https://www.fda.gov/cosmetics/resources-industry-cosmetics/small-businesses-homemade-cosmetics-fact-sheet'], ['Etsy', 'https://www.etsy.com/sell'], ['Faire', 'https://www.faire.com']],
    steps: [
      'Decide your claims before your recipes. "Cleans" keeps you in true-soap territory; "moisturises" makes it a cosmetic with an entirely different rulebook.',
      'Learn lye safety properly and work with protection. Sodium hydroxide causes serious chemical burns and is the real hazard in this craft.',
      'Nail one signature range and batch it reliably rather than launching twenty scents you cannot reproduce consistently.',
      'Sell at markets first for feedback and cash flow, then approach independent shops for wholesale once packaging and consistency are solid.'
    ],
    pros: ['Very low startup cost with cheap materials relative to retail price', 'Soap is consumed and rebought, so customers return', 'Wholesale to gift shops and hamper makers scales well beyond a market stall'],
    cons: ['Cure times of four to six weeks tie up cash and space before anything can be sold', 'Becomes a regulated cosmetic the moment you make a skincare claim', 'Crowded at craft fairs, so differentiation genuinely matters'],
    flags: ['Lye is caustic and causes serious burns — protection, ventilation and separate dedicated equipment are not optional', 'Check what your claims trigger: cosmetic claims bring FDA and MoCRA obligations in the US, while UK and EU sales require a safety assessment and product notification for every formulation before you sell a single bar'],
    tags: ['handmade', 'regulated', 'wholesale']
  },

  /* -------------------------------------------------------- MICRO-WORK & GIGS */
  {
    id: 'user-testing', name: 'Website & app user testing', cat: 'micro',
    tagline: 'Get paid to use a website out loud and say what confuses you.',
    summary: 'Companies pay for recordings of real people attempting tasks on their products. Standard rate is around $10 for a 15–20 minute unmoderated test, and $30–$120 for a live moderated session with a researcher. It will not replace a salary — test availability is inconsistent — but it is one of the fastest ways to earn genuine money online with no experience, often within the first week.',
    pay: [30, 180, 700], cost: 'none', costLabel: '$0 — microphone required', speed: 'days', speedLabel: '3–10 days',
    effort: 'active', skill: 'beginner', where: 'online', scale: 1, risk: 1,
    likes: ['people', 'research', 'admin'],
    platforms: [['UserTesting', 'https://www.usertesting.com/get-paid-to-test'], ['Userlytics', 'https://www.userlytics.com'], ['Respondent', 'https://www.respondent.io'], ['User Interviews', 'https://www.userinterviews.com']],
    steps: [
      'Sign up to four or five platforms at once — each has sporadic availability and this multiplies your invitations.',
      'Take the qualification test seriously; your first recording determines how many invitations you get.',
      'Narrate constantly. Silence is the main reason tests get rejected — say every thought out loud.',
      'Enable notifications and respond quickly; high-paying moderated studies fill within minutes.'
    ],
    pros: ['Genuine payment within days, with no experience or interview', 'Sessions are short and can fit into a lunch break', 'Moderated research studies pay surprisingly well per hour'],
    cons: ['Work is inconsistent and cannot be relied on', 'Screening questions disqualify you often, unpaid', 'Income ceiling is low — this is supplementary, not a living'],
    flags: ['Legitimate platforms never charge a registration fee', 'Never give bank login details, only payout details via PayPal or a verified processor'],
    tags: ['fast-cash', 'no-experience', 'research']
  },
  {
    id: 'ai-annotation', name: 'AI training & data annotation', cat: 'micro',
    tagline: 'Rate, correct and write model responses — the human layer behind AI systems.',
    summary: 'A large and growing market. Basic labelling and comparison tasks pay $15–$25 an hour, while expert work — where a lawyer, doctor, engineer or professional translator writes and grades responses in their field — pays $40–$150 an hour. This is the single best-paid entry point for a subject-matter expert who wants flexible remote work, and platforms are actively short of qualified people.',
    pay: [200, 1200, 6000], cost: 'none', costLabel: '$0', speed: 'weeks', speedLabel: '1–4 weeks',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 1, risk: 1,
    likes: ['research', 'writing', 'code', 'admin'],
    platforms: [['Outlier', 'https://outlier.ai'], ['Surge AI', 'https://www.surgehq.ai'], ['Mercor', 'https://mercor.com'], ['Appen', 'https://connect.appen.com']],
    steps: [
      'Apply to several platforms with an honest CV — your professional credentials directly determine your pay band.',
      'Complete the assessments carefully; quality scores control both your rate and how much work you are offered.',
      'Follow the task guidelines exactly, even where you disagree — consistency is what is being bought.',
      'Track hours across platforms so you can drop the ones that pay least for the same effort.'
    ],
    pros: ['Exceptional rates for genuine domain experts', 'Fully flexible hours with no client relationship to manage', 'Steady demand across the whole AI industry'],
    cons: ['Project work stops abruptly when a contract ends', 'Some platforms have poor communication and slow support', 'Repetitive and mentally tiring at volume'],
    flags: ['Never pay for "AI job training" or certification to access these platforms', 'Be cautious about any platform asking you to install remote-access software'],
    tags: ['ai', 'remote', 'expert-rates']
  },
  {
    id: 'transcription', name: 'Transcription & captioning', cat: 'micro',
    tagline: 'Turn audio into accurate text — the part automatic tools still get wrong.',
    summary: 'Automatic speech recognition destroyed the low end of this market, but not the top: legal, medical and academic transcription with heavy accents, multiple speakers or technical vocabulary still needs humans, paying $0.80–$3.00 per audio minute. Most of the modern work is editing machine output rather than typing from scratch, which roughly doubles the effective hourly rate for a fast, accurate worker.',
    pay: [100, 700, 3000], cost: 'none', costLabel: '$0 (foot pedal optional)', speed: 'weeks', speedLabel: '1–4 weeks',
    effort: 'active', skill: 'beginner', where: 'online', scale: 1, risk: 1,
    likes: ['writing', 'admin', 'audio'],
    platforms: [['Rev', 'https://www.rev.com/freelancers'], ['GoTranscript', 'https://gotranscript.com'], ['TranscribeMe', 'https://www.transcribeme.com'], ['Verbit', 'https://verbit.ai']],
    steps: [
      'Test your typing speed — under about 65 words per minute the hourly rate is not worth it.',
      'Pass a platform entrance test, taking style guide rules seriously since they decide acceptance.',
      'Start with general transcription, then qualify into legal or medical work where rates are two to three times higher.',
      'Use good headphones and a foot pedal; they materially increase how many minutes you finish per hour.'
    ],
    pros: ['No experience or qualification needed to begin', 'Work whenever you like, in any quantity', 'Specialist certification lifts the rate substantially'],
    cons: ['General transcription rates are low and still falling', 'Poor quality audio can halve your effective rate with no recourse', 'Genuinely tedious over long stretches'],
    flags: ['Any service charging for "certification" before letting you work is not a real employer', 'Confidentiality agreements in legal and medical transcription are binding — take them seriously'],
    tags: ['typing', 'remote', 'flexible']
  },
  {
    id: 'microtasks', name: 'Micro-task platforms', cat: 'micro',
    tagline: 'Thousands of tiny paid jobs: categorising, verifying, comparing, checking.',
    summary: 'Crowd platforms break work into pieces that take seconds to minutes. Honest expectations matter — realistic earnings are $5–$14 an hour once you learn which requesters pay fairly, and unqualified beginners earn less. Its real value is as a zero-barrier starting point that pays reliably and quickly while you build toward something better.',
    pay: [50, 300, 1200], cost: 'none', costLabel: '$0', speed: 'days', speedLabel: '2–7 days',
    effort: 'active', skill: 'beginner', where: 'online', scale: 1, risk: 1,
    likes: ['admin', 'research'],
    platforms: [['Amazon Mechanical Turk', 'https://www.mturk.com'], ['Clickworker', 'https://www.clickworker.com'], ['Prolific', 'https://www.prolific.com'], ['Toloka', 'https://toloka.ai']],
    steps: [
      'Register on two or three platforms and complete every profile and qualification survey available.',
      'Build your approval rating on small tasks first — high ratings unlock the better-paid work.',
      'Use community forums to identify which requesters pay well and which waste your time.',
      'Track your actual dollars per hour and abandon anything below your floor.'
    ],
    pros: ['Absolutely no barrier to entry — start within the hour', 'Payment is quick and reliable on established platforms', 'Prolific research studies in particular pay decently per hour'],
    cons: ['Low ceiling; this will never be a primary income', 'Unpaid time spent hunting for good tasks', 'Some regions have far less work available'],
    flags: ['Never pay a fee to access tasks — real platforms pay you, not the reverse', 'Avoid any task asking you to receive money, buy gift cards or forward packages'],
    tags: ['fast-cash', 'no-experience', 'flexible']
  },
  {
    id: 'bug-bounty', name: 'Bug bounty & security research', cat: 'micro',
    tagline: 'Find security flaws in systems companies have invited you to test, and get paid per finding.',
    summary: 'Companies publish scopes and pay for valid vulnerability reports — typically $100–$1,500 for medium severity and $5,000–$50,000+ for critical findings in major programmes. It is authorised testing with defined rules, entirely legal within scope, and pays purely on results. The learning curve is steep and most beginners earn nothing for months, but skilled researchers can out-earn senior salaries.',
    pay: [0, 800, 20000], cost: 'none', costLabel: '$0 — free labs available', speed: 'months', speedLabel: '3–12 months',
    effort: 'active', skill: 'advanced', where: 'online', scale: 3, risk: 2,
    likes: ['code', 'research'],
    platforms: [['HackerOne', 'https://www.hackerone.com'], ['Bugcrowd', 'https://www.bugcrowd.com'], ['Intigriti', 'https://www.intigriti.com'], ['PortSwigger Academy (free training)', 'https://portswigger.net/web-security']],
    steps: [
      'Work through the free PortSwigger Web Security Academy until you can find common flaw classes reliably.',
      'Practise on deliberately vulnerable labs and capture-the-flag events, never on systems without permission.',
      'Start with programmes that have wide scopes and fewer competing researchers rather than famous targets.',
      'Write clear, reproducible reports — report quality strongly affects payout and reputation.'
    ],
    pros: ['Payouts scale with skill, not hours, with no ceiling', 'Reputation transfers directly into well-paid security employment', 'Fully remote, self-directed and merit-based'],
    cons: ['Long unpaid learning period is normal', 'Duplicate reports mean genuine work often earns nothing', 'Income is lumpy and unpredictable'],
    flags: ['Only ever test systems explicitly listed in a published scope — testing outside scope is a criminal offence', 'Never demand payment for a vulnerability outside a programme; that is extortion, not research'],
    tags: ['security', 'technical', 'merit-based']
  },
  {
    id: 'test-scoring', name: 'Remote exam scoring', cat: 'micro',
    tagline: 'Score written exam answers from home during the assessment season.',
    summary: 'Assessment companies hire large temporary cohorts to score open-response exam answers, concentrated between roughly February and June. Pay runs about $15–$20 an hour plus daily and weekly performance incentives that can add up to around $150 a week. Most roles require a bachelor\'s degree, prefer teaching experience, and expect at least 20 hours a week for the duration of the project. It is seasonal supplementary income rather than a standing one, but it is reliable, fully remote, and involves no pitching or self-promotion at all.',
    pay: [0, 900, 2500], cost: 'none', costLabel: '$0', speed: 'weeks', speedLabel: '2–8 weeks (seasonal hiring)',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 1, risk: 1,
    likes: ['teaching', 'admin', 'research'],
    platforms: [['Pearson Scoring', 'https://www.pearsonassessments.com'], ['ETS', 'https://www.ets.org'], ['Measurement Incorporated', 'https://www.measinc.com']],
    steps: [
      'Apply in late autumn or early winter — hiring closes well before the spring scoring window opens.',
      'Have your degree documentation ready, since the qualification check is strict and non-negotiable.',
      'Take the calibration training seriously; your agreement with benchmark papers decides whether you stay on the project.',
      'Treat it as a fixed seasonal block in your year and pair it with something counter-seasonal.'
    ],
    pros: ['Genuinely remote with no clients, pitching or self-marketing', 'Predictable seasonal blocks you can plan a year around', 'Steady, quiet work if you like reading and consistency'],
    cons: ['Strictly seasonal — the work disappears outside the testing window', 'A degree is required, which rules many people out', 'Repetitive, and your scoring accuracy is monitored continuously'],
    flags: ['Legitimate assessment companies never charge you to apply or to be trained', 'Be wary of "proctoring" listings that ask for remote access to your computer outside an official platform'],
    tags: ['seasonal', 'remote', 'education']
  },
  {
    id: 'mock-juror', name: 'Online mock juror', cat: 'micro',
    tagline: 'Read a case, give a verdict, get paid — occasional, but entirely real.',
    summary: 'Attorneys test arguments on mock juries before trial. Written online cases pay roughly $5–$10 for 30–60 minutes on the cheaper platforms and $20–$60 on the better ones, while live video or in-person panels pay $75–$700 for a half or full day. The catch is volume: cases are jurisdiction-specific, so you only qualify when a firm near you is preparing a trial, and outside major metropolitan areas invitations can be months apart. Treat it as occasional found money, never as something you can plan around.',
    pay: [0, 40, 400], cost: 'none', costLabel: '$0', speed: 'months', speedLabel: 'Unpredictable — weeks to months',
    effort: 'passive', skill: 'beginner', where: 'hybrid', scale: 1, risk: 1,
    likes: ['research', 'admin'],
    platforms: [['eJury', 'https://www.ejury.com'], ['OnlineVerdict', 'https://www.onlineverdict.com'], ['Resolution Research', 'https://www.resolutionresearch.com']],
    steps: [
      'Register with several platforms, since each draws on a different set of law firms and jurisdictions.',
      'Complete your profile accurately including your county, because eligibility is jurisdiction-specific.',
      'Respond immediately when invited — panels fill within hours.',
      'Prioritise the platforms running live video panels, which pay an order of magnitude more than written cases.'
    ],
    pros: ['No experience, equipment or ongoing commitment required', 'Live panels pay very well for the hours involved', 'Genuinely interesting reading compared with most micro-work'],
    cons: ['Invitations are rare, particularly outside large metropolitan areas', 'Written cases pay very little for the reading time involved', 'Impossible to schedule or rely upon'],
    flags: ['A legitimate research firm never charges a registration or "juror certification" fee', 'Be truthful about your jurisdiction and eligibility; falsifying it invalidates the research and your payment'],
    tags: ['legal', 'occasional', 'no-experience']
  },

  /* ------------------------------------------------------ RENT WHAT YOU OWN */
  {
    id: 'spare-room', name: 'Short-stay room hosting', cat: 'rental',
    tagline: 'Let the spare room or annexe you already heat pay for itself.',
    summary: 'Hosting a private room typically returns $400–$1,200 a month depending on city and occupancy; a separate studio or annexe returns considerably more. Net income is what matters — cleaning, laundry, consumables, platform fees of around 3–15% and higher utility use commonly consume 25–35% of gross. Long-term lodgers earn less per night but need a fraction of the work, and in many countries carry a generous tax-free allowance.',
    pay: [200, 800, 3500], cost: 'low', costLabel: '$150–$800 to furnish', speed: 'weeks', speedLabel: '2–6 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 2, risk: 2,
    likes: ['home', 'people', 'physical'],
    platforms: [['Airbnb', 'https://www.airbnb.com/host/homes'], ['Booking.com', 'https://join.booking.com'], ['SpareRoom', 'https://www.spareroom.com'], ['Furnished Finder', 'https://www.furnishedfinder.com']],
    steps: [
      'Check the rules that bind you first: your lease or mortgage, local short-let licensing, and any night caps in your city.',
      'Tell your insurer — standard home policies usually exclude paying guests entirely.',
      'Furnish simply and photograph in daylight; listing photos determine your occupancy more than price does.',
      'Price against comparable local listings, then raise rates once you have a handful of five-star reviews.'
    ],
    pros: ['Turns space you already pay for into monthly income', 'Many countries give a substantial tax-free allowance for letting a room in your own home', 'Flexible — block the calendar whenever you want your space back'],
    cons: ['Real ongoing labour: cleaning, messaging, laundry, restocking', 'Loss of privacy in your own home', 'Regulation is tightening fast in many cities'],
    flags: ['Subletting without permission can void your lease or mortgage terms', 'Never accept a booking that moves payment off-platform — that is the most common hosting scam'],
    tags: ['property', 'hosting', 'local']
  },
  {
    id: 'parking-space', name: 'Rent out a parking space', cat: 'rental',
    tagline: 'A driveway near a station, stadium or hospital is quietly worth money every month.',
    summary: 'Close to zero effort for genuinely passive money if your location is right. Suburban driveways earn $40–$120 a month; spaces near city centres, airports, stadiums or major hospitals reach $150–$400. Listing is free, the platform handles payment and basic cover, and once it is set up there is essentially nothing to do.',
    pay: [30, 110, 400], cost: 'none', costLabel: '$0', speed: 'weeks', speedLabel: '1–4 weeks',
    effort: 'passive', skill: 'beginner', where: 'local', scale: 1, risk: 1,
    likes: ['home'],
    platforms: [['JustPark', 'https://www.justpark.com'], ['SpotHero', 'https://spothero.com'], ['YourParkingSpace', 'https://www.yourparkingspace.co.uk'], ['Neighbor', 'https://www.neighbor.com']],
    steps: [
      'Confirm you are allowed to sublet the space — check your lease, deeds or building management rules.',
      'Photograph the space clearly, including access, and measure it so drivers know what fits.',
      'List on two platforms simultaneously and price slightly under nearby commercial car parks.',
      'Offer monthly commuter bookings rather than hourly for steadier, lower-hassle income.'
    ],
    pros: ['As close to genuinely passive as everyday income gets', 'No cost, no stock, nothing to maintain', 'Monthly commuter tenants are reliable and undemanding'],
    cons: ['Entirely dependent on your location — many spaces are simply not in demand', 'Low absolute ceiling', 'Occasional disputes about access or overstaying'],
    flags: ['Leaseholders often have explicit clauses banning this — check before listing', 'Handle payment through the platform so their insurance and dispute process applies'],
    tags: ['passive', 'property', 'zero-effort']
  },
  {
    id: 'storage-space', name: 'Rent out storage space', cat: 'rental',
    tagline: 'An empty garage, loft, basement or shed undercuts commercial self-storage easily.',
    summary: 'Peer-to-peer storage platforms connect people needing cheap storage with neighbours who have empty space. A single-car garage earns roughly $100–$300 a month, a basement or spare room $50–$200, at prices well below commercial facilities. Platforms handle vetting, contracts, payment and provide host protection, and once a tenant moves in you may not see them for a year.',
    pay: [40, 160, 500], cost: 'none', costLabel: '$0', speed: 'weeks', speedLabel: '2–6 weeks',
    effort: 'passive', skill: 'beginner', where: 'local', scale: 1, risk: 1,
    likes: ['home'],
    platforms: [['Neighbor', 'https://www.neighbor.com/host'], ['Stashbee', 'https://stashbee.com'], ['StoreAtMyHouse', 'https://www.storeatmyhouse.com']],
    steps: [
      'Clear and clean the space, then measure it properly — listings quote square footage.',
      'Photograph it empty and well-lit, and note access hours and whether it is dry and secure.',
      'Set a price around 30–50% below local commercial self-storage.',
      'Agree access arrangements in writing up front so expectations are clear from day one.'
    ],
    pros: ['Truly passive once occupied — tenants rarely visit', 'No furnishing, cleaning or guest management', 'Platform provides host protection and handles the contract'],
    cons: ['Only worth it if you genuinely have unused space', 'Modest ceiling per property', 'You are responsible for the space staying dry and secure'],
    flags: ['Never store anything for a stranger without a platform contract and stated contents', 'Check your home insurance — storing third-party goods may need a policy note'],
    tags: ['passive', 'property', 'zero-effort']
  },
  {
    id: 'car-rental', name: 'Rent out your car', cat: 'rental',
    tagline: 'A car sitting idle 95% of the time can cover its own finance payment.',
    summary: 'Peer-to-peer car sharing lets you list a vehicle by the day. Hosts typically net $300–$800 a month per car after platform commission of 15–40%, cleaning and increased wear. The economics work best for reliable, cheap-to-run vehicles in a city or near an airport; they work badly for expensive cars, where depreciation and repair costs swallow the return.',
    pay: [150, 450, 2000], cost: 'low', costLabel: '$0 if you own the car', speed: 'weeks', speedLabel: '2–5 weeks',
    effort: 'semi', skill: 'beginner', where: 'local', scale: 2, risk: 3,
    likes: ['driving', 'home'],
    platforms: [['Turo', 'https://turo.com/list-your-car'], ['Getaround', 'https://www.getaround.com'], ['Hiyacar', 'https://www.hiyacar.co.uk']],
    steps: [
      'Verify your finance agreement and insurer allow peer-to-peer hire — many prohibit it outright.',
      'Photograph the car thoroughly, inside and out, before every single rental. This is your only defence in a damage dispute.',
      'Start with a modest daily rate to accumulate reviews, then raise it.',
      'Track mileage, cleaning, servicing and the extra depreciation — the net figure is often much lower than the gross.'
    ],
    pros: ['Monetises an expensive asset that mostly sits still', 'Platforms provide insurance cover during the rental period', 'Can genuinely cover a car payment in a busy location'],
    cons: ['Accelerated wear, cleaning and higher servicing costs', 'Damage and cleanliness disputes are common and stressful', 'Your own car may be unavailable when you want it'],
    flags: ['Standard personal motor insurance does not cover paid hire — confirm the platform policy applies to you', 'Never rent to someone outside the platform, which voids all cover'],
    tags: ['vehicle', 'asset', 'local']
  },
  {
    id: 'gear-rental', name: 'Rent out equipment & gear', cat: 'rental',
    tagline: 'Cameras, tools, trailers, party equipment and instruments earn while stored.',
    summary: 'Expensive gear used occasionally is ideal for peer-to-peer hire. A camera body might rent for 3–5% of its value per day, and tools, projectors, carpet cleaners, camping equipment and DJ kit all have steady local demand. Platforms take a commission and handle verification and cover; some people build a genuine small business by deliberately buying high-demand items to rent.',
    pay: [40, 250, 1500], cost: 'low', costLabel: '$0 with gear you own', speed: 'weeks', speedLabel: '2–6 weeks',
    effort: 'semi', skill: 'beginner', where: 'local', scale: 2, risk: 2,
    likes: ['physical', 'photo', 'home'],
    platforms: [['Fat Llama', 'https://fatllama.com'], ['ShareGrid', 'https://www.sharegrid.com'], ['Sparetoolz', 'https://www.sparetoolz.com']],
    steps: [
      'List the expensive items you use less than once a month — that is your inventory.',
      'Photograph every item including serial numbers and any existing marks.',
      'Price per day using replacement value as your anchor and require a deposit.',
      'Record condition at handover and return, with the renter present, every time.'
    ],
    pros: ['Monetises things you already own and store', 'Demand is reliably local and repeat renters are common', 'Scales by buying more of whatever rents most'],
    cons: ['Damage and loss happen; platform cover has exclusions worth reading', 'Handover logistics take time', 'Some categories barely rent at all'],
    flags: ['Read the platform\'s protection policy carefully — cover limits and excluded categories vary a lot', 'Verify renter ID through the platform, never arrange handover off-platform'],
    tags: ['equipment', 'local', 'asset']
  },
  {
    id: 'cohosting', name: 'Short-let co-hosting', cat: 'rental',
    tagline: 'Run somebody else\'s holiday let for a share of the revenue, without owning property.',
    summary: 'Owners with a short-let they cannot manage pay a co-host 10–30% of booking revenue — roughly 10–15% for messaging and calendar management only, and 20–30% for full service including cleaning coordination, restocking and maintenance. Some prefer a flat $500–$1,500 per property per month. Three or four properties is a realistic part-time load and produces meaningful recurring income without buying anything at all. This is the property-income route for people who have organisational ability but no capital.',
    pay: [200, 1500, 8000], cost: 'none', costLabel: '$0 — you manage, not own', speed: 'weeks', speedLabel: '3–8 weeks',
    effort: 'active', skill: 'intermediate', where: 'hybrid', scale: 3, risk: 1,
    likes: ['admin', 'people', 'home'],
    platforms: [['Airbnb Hosting', 'https://www.airbnb.com/host/homes'], ['Hospitable', 'https://hospitable.com'], ['Guesty', 'https://www.guesty.com'], ['Turno', 'https://turno.com']],
    steps: [
      'Learn the operation first, ideally by co-hosting one property for a friend or family member at a low rate.',
      'Build the supplier bench owners are actually paying you for: dependable cleaners, a handyman, a locksmith, a laundry service.',
      'Quote a percentage of revenue rather than an hourly rate, and put scope in writing — guest damage and maintenance decisions cause most disputes.',
      'Adopt channel-management software once you pass two or three properties, or guest messaging will consume every evening.'
    ],
    pros: ['Property income with no deposit, mortgage or ownership risk', 'Recurring monthly revenue that compounds with each property added', 'Transfers directly into full property management as a career'],
    cons: ['Guest problems arrive at 2am and immediately become yours', 'Your income falls with occupancy, which you only partly control', 'Short-let regulation is tightening quickly in many cities'],
    flags: ['Establish who carries liability and damage insurance before taking responsibility for someone\'s property', 'Managing property for a fee requires a licence in some jurisdictions — check before you charge anyone'],
    tags: ['property', 'management', 'recurring']
  },
  {
    id: 'pool-yard-rental', name: 'Rent your pool, yard or court by the hour', cat: 'rental',
    tagline: 'A pool, a fenced garden or a sports court is bookable by the hour by your neighbours.',
    summary: 'Hourly space-rental platforms let someone book a private pool for an afternoon, or a securely fenced garden as a safe off-lead space for a reactive dog. Pools list at roughly $25–$100 an hour with most sitting around $30–$60, and active hosts in warm months commonly report $1,500 or more; fenced-yard dog rentals earn less per hour but run year-round and need almost nothing from you. Platforms take 15–30% and provide booking-period liability cover on top of your own insurance.',
    pay: [50, 400, 3000], cost: 'none', costLabel: '$0 if you already have the space', speed: 'weeks', speedLabel: '2–6 weeks',
    effort: 'semi', skill: 'beginner', where: 'local', scale: 2, risk: 2,
    likes: ['home', 'pets'],
    platforms: [['Swimply', 'https://swimply.com/become-a-host'], ['Sniffspot', 'https://www.sniffspot.com'], ['Peerspace', 'https://www.peerspace.com']],
    steps: [
      'Check local rules first — paid use often triggers permit, fencing and pool-safety requirements that do not apply to private use.',
      'Tell your home insurer. Standard policies frequently exclude commercial use, and an uninsured drowning or dog-bite claim is catastrophic.',
      'Photograph in bright daylight and state the details precisely: depth, heating, shade, toilet access, gate height, fence condition.',
      'Price low to collect the first reviews, then raise weekend and holiday rates where demand concentrates.'
    ],
    pros: ['Monetises space that already costs you nothing extra to own', 'Guests are present only for booked hours, unlike a lodger or a house guest', 'Dog-yard bookings run all year and require almost nothing from you'],
    cons: ['Strongly seasonal for pools in most climates', 'Noise, mess and neighbour complaints are common', 'Genuine liability exposure — water and unfamiliar dogs both carry real risk'],
    flags: ['Confirm your own insurer covers paid commercial use; platform cover is limited and sits on top of your policy rather than replacing it', 'Pool fencing and safety regulations are legally enforced and carry serious penalties — verify compliance before your first booking'],
    tags: ['space', 'hourly', 'seasonal']
  },
  {
    id: 'car-advertising', name: 'Car wrap advertising', cat: 'rental',
    tagline: 'Get paid to drive a car carrying somebody\'s advert — modest money, heavy scam traffic.',
    summary: 'A small number of legitimate companies pay drivers to carry advertising wraps or roof toppers, typically $100–$300 a month and occasionally up to around $450, based on the mileage you drive inside a target area. The wrap is applied and removed entirely at the advertiser\'s cost. It is included here largely because the space around it is thick with fraud: the fake-cheque car wrap scam is one of the most commonly reported consumer frauds, and recognising its shape protects you well beyond this one gig.',
    pay: [0, 120, 450], cost: 'none', costLabel: '$0 — the advertiser pays for the wrap', speed: 'months', speedLabel: '1–4 months (campaign dependent)',
    effort: 'passive', skill: 'beginner', where: 'local', scale: 1, risk: 1,
    likes: ['driving'],
    platforms: [['Carvertise', 'https://carvertise.com'], ['Wrapify', 'https://wrapify.com'], ['Robot (formerly Nickelytics)', 'https://www.robot.com/ads']],
    steps: [
      'Apply directly on the company\'s own website. Never respond to an unsolicited message, text or email offering this.',
      'Expect screening on mileage, driving area and vehicle age — campaigns are geographically targeted and most applicants never match one.',
      'Tell your insurer, since some policies require notification when a vehicle carries advertising livery.',
      'Treat it as intermittent — campaigns are short and there may be long gaps with nothing available in your area.'
    ],
    pros: ['Genuinely passive — you drive exactly as you already do', 'Costs nothing; the advertiser pays for application and removal', 'No skill, time commitment or ongoing effort at all'],
    cons: ['Low pay and campaigns are infrequent and geographically limited', 'Most applicants are never matched to a campaign at all', 'Your car carries someone else\'s branding everywhere you go'],
    flags: ['If anyone sends you a cheque and asks you to forward part of it to a "wrap installer", it is a fake-cheque scam — the cheque bounces days later and the money you sent is gone', 'You should never pay anything to have a car wrapped. If you are asked for money, walk away'],
    tags: ['passive', 'vehicle', 'scam-aware']
  },

  /* ------------------------------------------------------ YIELD & INVESTING */
  {
    id: 'index-funds', name: 'Index fund investing', cat: 'invest',
    tagline: 'Own a slice of thousands of companies at very low cost, and leave it alone.',
    summary: 'Not a way to make money quickly, and included here as the baseline every other option gets compared against. Broad market index funds have historically returned roughly 7% a year after inflation over multi-decade periods, with severe declines along the way — falls of 30–50% have occurred repeatedly. The income only becomes meaningful with substantial capital and long time horizons. Capital is genuinely at risk and past returns do not predict future ones.',
    pay: [0, 50, 2000], cost: 'low', costLabel: 'From ~$50, but scales with capital', speed: 'long', speedLabel: 'Years',
    effort: 'passive', skill: 'beginner', where: 'online', scale: 5, risk: 3,
    likes: ['finance'],
    platforms: [['Vanguard', 'https://investor.vanguard.com'], ['Fidelity', 'https://www.fidelity.com'], ['iShares', 'https://www.ishares.com'], ['Trading 212', 'https://www.trading212.com']],
    steps: [
      'Clear high-interest debt first — paying off a 20% credit card is a guaranteed return no investment can match.',
      'Use the tax-advantaged account available where you live before any taxable account.',
      'Choose a broad, low-cost, diversified fund and check the ongoing charge figure, which compounds against you.',
      'Automate a fixed monthly contribution and then genuinely do nothing for years.'
    ],
    pros: ['Requires almost no time or expertise once set up', 'Diversification removes the risk of any single company failing', 'Tax wrappers can shelter the gains entirely in many countries'],
    cons: ['Needs real capital before the income is noticeable', 'Values fall sharply and can stay down for years', 'Nothing here is quick — the timescale is decades'],
    flags: ['Anyone guaranteeing returns is committing fraud — investment returns cannot be guaranteed', 'Be sceptical of high-fee "managed" products; costs above roughly 1% a year compound badly against you'],
    tags: ['capital', 'long-term', 'passive']
  },
  {
    id: 'dividend-stocks', name: 'Dividend investing', cat: 'invest',
    tagline: 'Hold shares in companies that pay out part of their profits as regular cash.',
    summary: 'A portfolio built for income rather than growth typically yields 3–5% a year, meaning $100,000 invested produces roughly $3,000–$5,000 annually, usually paid quarterly. The appeal is that the cash arrives without selling anything. The risks are concrete: dividends are discretionary and get cut in downturns, and chasing unusually high yields is a reliable way to buy failing companies. Capital is at risk.',
    pay: [0, 80, 2500], cost: 'high', costLabel: 'Meaningful income needs $50k+', speed: 'long', speedLabel: '3–12 months for first payout',
    effort: 'passive', skill: 'intermediate', where: 'online', scale: 4, risk: 3,
    likes: ['finance', 'research'],
    platforms: [['Vanguard', 'https://investor.vanguard.com'], ['Charles Schwab', 'https://www.schwab.com'], ['Hargreaves Lansdown', 'https://www.hl.co.uk'], ['Interactive Brokers', 'https://www.interactivebrokers.com']],
    steps: [
      'Decide honestly whether you want income now or growth later — for most people under 50 growth funds are the better fit.',
      'Prefer a diversified dividend fund over picking individual companies, which concentrates risk.',
      'Check payout ratios and dividend history rather than headline yield.',
      'Understand the tax treatment of dividends where you live, since it differs from capital gains.'
    ],
    pros: ['Produces cash without needing to sell your holdings', 'Reinvested dividends compound powerfully over decades', 'Dividend-paying companies are often mature and less volatile'],
    cons: ['Requires substantial capital to matter', 'Dividends are cut precisely when you most need the income', 'Very high yields are usually a warning sign, not an opportunity'],
    flags: ['Yields above roughly 8% usually signal a company in trouble', 'Never invest borrowed money chasing dividend income'],
    tags: ['capital', 'income', 'passive']
  },
  {
    id: 'reits', name: 'REITs & property funds', cat: 'invest',
    tagline: 'Property income without a mortgage, a tenant or a broken boiler at midnight.',
    summary: 'Real estate investment trusts own portfolios of commercial or residential property and are legally required to distribute most of their income, typically yielding 3–7%. They trade like shares, so you can invest small amounts and sell quickly — unlike actual property. They are also genuinely volatile and highly sensitive to interest rates, having fallen sharply in recent rate-rise cycles. Capital is at risk.',
    pay: [0, 70, 1800], cost: 'mid', costLabel: 'From ~$100', speed: 'months', speedLabel: '1–6 months for first payout',
    effort: 'passive', skill: 'intermediate', where: 'online', scale: 4, risk: 3,
    likes: ['finance'],
    platforms: [['Vanguard Real Estate ETF', 'https://investor.vanguard.com'], ['Nareit (education)', 'https://www.reit.com'], ['iShares', 'https://www.ishares.com']],
    steps: [
      'Learn the difference between publicly traded REITs and illiquid non-traded ones — the latter are far riskier and hard to exit.',
      'Prefer a diversified REIT index fund over single trusts.',
      'Check how the distributions are taxed where you live; REIT income is often treated differently from ordinary dividends.',
      'Size the position as part of a wider portfolio rather than as your only holding.'
    ],
    pros: ['Property exposure with none of the landlord work', 'Sellable within a day, unlike physical property', 'Legally mandated high distribution of income'],
    cons: ['Highly sensitive to interest rate changes', 'Falls hard in property downturns', 'Distributions can be taxed less favourably than other dividends'],
    flags: ['Non-traded REITs often carry high fees and severe exit restrictions — read the terms twice', 'Any property investment promising fixed guaranteed returns deserves deep suspicion'],
    tags: ['property', 'capital', 'passive']
  },
  {
    id: 'savings-bonds', name: 'High-yield savings & government bonds', cat: 'invest',
    tagline: 'The safest income on this list: cash earning proper interest instead of nothing.',
    summary: 'Not exciting, and genuinely useful. High-yield savings accounts, money market funds and short-term government bonds have recently paid around 3.5–5% with government or scheme-backed protection on deposits up to the relevant limit. It will not make you rich, but leaving an emergency fund in a 0.1% account while a protected account pays 4% is a needless annual loss of hundreds of dollars.',
    pay: [5, 100, 1200], cost: 'low', costLabel: 'Whatever you can save', speed: 'weeks', speedLabel: '1 month',
    effort: 'passive', skill: 'beginner', where: 'online', scale: 3, risk: 1,
    likes: ['finance'],
    platforms: [['TreasuryDirect (US)', 'https://www.treasurydirect.gov'], ['NS&I (UK)', 'https://www.nsandi.com'], ['Bankrate comparison', 'https://www.bankrate.com'], ['MoneySavingExpert (UK)', 'https://www.moneysavingexpert.com/savings/']],
    steps: [
      'Check what your current account actually pays. Most people are earning close to nothing without realising.',
      'Compare rates and confirm the provider is covered by your country\'s deposit protection scheme.',
      'Keep three to six months of expenses accessible before locking anything into fixed terms.',
      'Set a calendar reminder for when introductory rates expire, since they always drop.'
    ],
    pros: ['Protected up to the scheme limit — as close to risk-free as money gets', 'Instant or near-instant access depending on product', 'Requires no knowledge, monitoring or decisions'],
    cons: ['Returns barely beat inflation in most periods', 'Rates fall when central banks cut', 'Interest is usually taxable as ordinary income'],
    flags: ['Never exceed the deposit protection limit at any single institution', 'Any "savings" product offering far above market rates is not a savings product — check what you would actually be buying'],
    tags: ['safe', 'cash', 'passive']
  },
  {
    id: 'p2p-lending', name: 'Peer-to-peer lending', cat: 'invest',
    tagline: 'Lend to businesses or individuals through a platform and earn the interest.',
    summary: 'Platforms match lenders with borrowers, advertising returns of 5–12%. The advertised figure is before defaults, and the actual return after bad debt is usually several points lower. Critically, this is not a savings account: your money is not protected by any deposit guarantee scheme, platforms have failed, and in a recession defaults rise exactly when you want your money back. Treat it as a risk investment, not as savings.',
    pay: [0, 60, 900], cost: 'mid', costLabel: 'From ~$100, meaningful at $10k+', speed: 'months', speedLabel: '1–3 months',
    effort: 'passive', skill: 'intermediate', where: 'online', scale: 3, risk: 4,
    likes: ['finance', 'research'],
    platforms: [['Prosper', 'https://www.prosper.com'], ['LendingClub', 'https://www.lendingclub.com'], ['Funding Circle', 'https://www.fundingcircle.com'], ['Mintos', 'https://www.mintos.com']],
    steps: [
      'Read the platform\'s published historical default rates, not the headline advertised return.',
      'Spread money across many small loans rather than a few large ones — concentration is what causes losses here.',
      'Start with an amount you would be genuinely relaxed about losing entirely.',
      'Understand the exit terms; secondary markets can freeze exactly when everyone wants out.'
    ],
    pros: ['Higher headline yields than cash savings', 'Automated diversification tools require little ongoing work', 'Monthly repayments create a regular income stream'],
    cons: ['No deposit protection whatsoever — you can lose the lot', 'Defaults cluster in downturns and platforms themselves can fail', 'Your money can be locked up for years'],
    flags: ['This is emphatically not a savings account regardless of how it is marketed', 'Any platform promising guaranteed or "capital protected" P2P returns is misrepresenting the risk'],
    tags: ['lending', 'capital', 'higher-risk']
  },
  {
    id: 'buy-online-business', name: 'Buying a small online business', cat: 'invest',
    tagline: 'Skip the two years of building and buy something that already earns.',
    summary: 'Marketplaces list content sites, e-commerce stores, newsletters and small software products, typically priced at 25–45 times monthly profit — so a site earning $1,000 a month sells for roughly $25,000–$45,000. You are buying proven cash flow rather than a hope, which removes the hardest part of building from scratch, but it concentrates real capital into a single asset that can decline. Due diligence is the entire skill: verifying traffic and revenue independently, and understanding honestly why the seller is leaving.',
    pay: [0, 400, 6000], cost: 'high', costLabel: '$5,000+ realistically', speed: 'months', speedLabel: '2–6 months',
    effort: 'semi', skill: 'advanced', where: 'online', scale: 4, risk: 4,
    likes: ['finance', 'selling', 'research'],
    platforms: [['Flippa', 'https://flippa.com'], ['Empire Flippers', 'https://empireflippers.com'], ['Acquire.com', 'https://acquire.com'], ['Motion Invest', 'https://www.motioninvest.com']],
    steps: [
      'Decide what you can actually operate. Buying a business you cannot run is the most expensive mistake available here.',
      'Verify everything independently — analytics access, payment processor exports, supplier invoices. Never accept screenshots as evidence.',
      'Examine traffic and revenue concentration closely; one search algorithm or one supplier is frequently a single point of failure.',
      'Transact through escrow with a written asset purchase agreement, and negotiate a documented handover period with the seller.'
    ],
    pros: ['Buys existing cash flow instead of hoping to create it', 'Curated marketplaces vet listings and supply verified financials', 'You can improve an existing asset far faster than starting one from nothing'],
    cons: ['Requires substantial capital that is genuinely at risk', 'Many listed businesses are already declining, which is precisely why they are for sale', 'Operating it afterwards is a real job, not a passive investment'],
    flags: ['Never transact outside escrow, and never accept revenue screenshots in place of platform access', 'Be extremely wary of any business dependent on a single traffic source, supplier or expiring contract'],
    tags: ['acquisition', 'capital', 'cash-flow']
  },

  /* ------------------------------------------------------- LOCAL & HANDS-ON */
  {
    id: 'pet-sitting', name: 'Pet sitting & dog walking', cat: 'local',
    tagline: 'Look after other people\'s animals — the most consistently in-demand local gig there is.',
    summary: 'Dog walks pay $15–$30 each, daytime visits $20–$35, and overnight boarding in your home $35–$85 per night per dog. Because you can walk several dogs together and board multiple animals, the effective hourly rate is far better than it first appears. Demand is constant, deeply repeat-based, and holiday periods let you charge premium rates.',
    pay: [200, 900, 4000], cost: 'low', costLabel: '$50–$200 insurance & basics', speed: 'days', speedLabel: '3–14 days',
    effort: 'active', skill: 'beginner', where: 'local', scale: 2, risk: 1,
    likes: ['pets', 'physical', 'people'],
    platforms: [['Rover', 'https://www.rover.com/become-a-sitter/'], ['Wag', 'https://wagwalking.com'], ['Pawshake', 'https://www.pawshake.com'], ['Trusted Housesitters', 'https://www.trustedhousesitters.com']],
    steps: [
      'Get pet-sitting liability insurance and a basic pet first-aid certificate — both are cheap and win bookings.',
      'List on a platform to get your first reviews, accepting slightly low rates initially.',
      'Deliver more than expected: photo updates during every visit generate repeat bookings and referrals.',
      'Move regular clients to direct booking once the relationship is established, and raise your rate.'
    ],
    pros: ['Genuinely enjoyable if you like animals, and you get exercise', 'Extremely high repeat rate — clients rebook for years', 'Can be run entirely around another job'],
    cons: ['You are responsible for a living animal; emergencies happen', 'Holidays are your busiest time, which limits your own travel', 'Platform commission is steep, often 15–25%'],
    flags: ['Do not work without liability insurance — a bitten passer-by is your problem', 'Meet every animal before agreeing to a booking, and get vet details in writing'],
    tags: ['pets', 'local', 'repeat-clients']
  },
  {
    id: 'cleaning', name: 'House & office cleaning', cat: 'local',
    tagline: 'Reliable, thorough cleaners are scarce everywhere and can name their price.',
    summary: 'One of the fastest routes to real local income. Domestic cleaning bills $25–$50 an hour, and specialisms pay considerably more — end-of-tenancy, post-construction and short-let turnovers are typically $150–$400 per job. Recurring weekly and fortnightly clients make income highly predictable, and the biggest competitive advantage is simply turning up reliably.',
    pay: [400, 2000, 7000], cost: 'low', costLabel: '$150–$400 supplies & insurance', speed: 'days', speedLabel: '1–3 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 3, risk: 1,
    likes: ['physical', 'home'],
    platforms: [['TaskRabbit', 'https://www.taskrabbit.com/become-a-tasker'], ['Handy', 'https://www.handy.com/jobs'], ['Nextdoor', 'https://nextdoor.com'], ['Checkatrade (UK)', 'https://www.checkatrade.com']],
    steps: [
      'Get public liability insurance before your first paid job — clients increasingly ask for proof.',
      'Price per job rather than per hour once you know your pace; efficiency then raises your earnings.',
      'Find your first clients through local community groups and neighbourhood apps, not national platforms.',
      'Target recurring contracts, then add a second cleaner once you are consistently turning work away.'
    ],
    pros: ['Cash flowing within days of starting', 'Recurring clients make income unusually stable', 'Scales by hiring, unlike most solo services'],
    cons: ['Physically demanding and hard on hands, knees and back', 'Requires reliable transport in most areas', 'Some clients are difficult and expectations must be set in writing'],
    flags: ['Never work without public liability insurance', 'Agree scope in writing — "deep clean" means wildly different things to different people'],
    tags: ['local', 'recurring', 'fast-cash']
  },
  {
    id: 'lawn-garden', name: 'Lawn care & garden maintenance', cat: 'local',
    tagline: 'Seasonal, repeat, route-based work that pays well for straightforward effort.',
    summary: 'A single lawn cut bills $35–$80, and the economics come from density: ten houses on one street is a profitable morning, ten scattered across a city is not. Regular fortnightly contracts through the growing season create predictable income, and adding hedge trimming, leaf clearance, gutter cleaning and winter gritting fills the quieter months.',
    pay: [300, 1600, 6000], cost: 'mid', costLabel: '$400–$2,000 equipment', speed: 'days', speedLabel: '1–3 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 3, risk: 2,
    likes: ['physical', 'home'],
    platforms: [['Nextdoor', 'https://nextdoor.com'], ['Thumbtack', 'https://www.thumbtack.com/pro'], ['LawnLove', 'https://lawnlove.com'], ['Bark', 'https://www.bark.com']],
    steps: [
      'Start with a decent mower and strimmer; buy used and upgrade once income justifies it.',
      'Leaflet a small number of streets intensively rather than a wide area thinly — route density is the whole business.',
      'Sell fortnightly contracts for the season rather than one-off cuts.',
      'Add complementary seasonal services so income does not vanish in winter.'
    ],
    pros: ['Immediate cash and very low competition for reliable operators', 'Route density makes it efficient and genuinely profitable', 'Straightforward to add staff and equipment as it grows'],
    cons: ['Strongly seasonal in most climates', 'Equipment costs money up front and needs maintenance', 'Weather dictates your schedule'],
    flags: ['Get liability insurance — a stone thrown by a mower through a window is a common claim', 'Check local rules on green waste disposal; fly-tipping fines are severe'],
    tags: ['seasonal', 'local', 'equipment']
  },
  {
    id: 'handyman', name: 'Handyman & small repairs', cat: 'local',
    tagline: 'The small jobs every tradesperson turns down are exactly where the demand sits.',
    summary: 'Flat-pack assembly, shelf hanging, door adjustments, tap washers, curtain rails — jobs too small for a specialist trade and beyond most homeowners. Rates run $40–$90 an hour or $80–$250 per visit, demand is relentless, and word of mouth spreads quickly because reliable handypeople are genuinely hard to find. You must stay within the boundaries of licensed trades: electrical and gas work is regulated almost everywhere.',
    pay: [400, 2200, 7000], cost: 'mid', costLabel: '$300–$1,500 tools & insurance', speed: 'days', speedLabel: '1–3 weeks',
    effort: 'active', skill: 'intermediate', where: 'local', scale: 2, risk: 2,
    likes: ['physical', 'home'],
    platforms: [['TaskRabbit', 'https://www.taskrabbit.com/become-a-tasker'], ['Thumbtack', 'https://www.thumbtack.com/pro'], ['Checkatrade (UK)', 'https://www.checkatrade.com'], ['Angi', 'https://www.angi.com']],
    steps: [
      'Define exactly which jobs you will and will not take, and stay clear of licensed trades.',
      'Get liability insurance and build a basic but good-quality tool kit.',
      'Take before and after photos of everything — visual proof wins the next three jobs.',
      'Set a minimum call-out charge so small jobs remain worth the travel.'
    ],
    pros: ['Constant demand and very little competition for reliable people', 'Paid the same day, usually in full', 'Skills accumulate and let you charge more over time'],
    cons: ['Physically demanding with real injury risk', 'Requires a vehicle and steadily growing tool investment', 'Strict legal limits on regulated work'],
    flags: ['Never touch gas or fixed electrical work without the required licence — it is illegal and dangerous', 'Quote in writing before starting; verbal quotes cause most payment disputes'],
    tags: ['trades', 'local', 'repeat-clients']
  },
  {
    id: 'delivery-rideshare', name: 'Delivery & rideshare driving', cat: 'local',
    tagline: 'Turn spare hours and a vehicle into money you can start earning today.',
    summary: 'The most accessible income on this list — approval takes days and you choose your own hours. Be honest about the numbers: gross earnings of $18–$28 an hour become roughly $12–$19 net once fuel, insurance, servicing, tyres and depreciation are subtracted, and most drivers ignore depreciation entirely. Bicycle and e-bike delivery avoids most vehicle costs and is often better paid per hour in dense cities.',
    pay: [200, 1200, 3500], cost: 'low', costLabel: 'Vehicle + insurance you likely have', speed: 'days', speedLabel: '3–10 days',
    effort: 'active', skill: 'beginner', where: 'local', scale: 1, risk: 2,
    likes: ['driving', 'physical'],
    platforms: [['Uber', 'https://www.uber.com/drive/'], ['DoorDash', 'https://dasher.doordash.com'], ['Deliveroo', 'https://riders.deliveroo.com'], ['Amazon Flex', 'https://flex.amazon.com']],
    steps: [
      'Check that your insurance covers commercial or hire-and-reward use — personal policies usually do not.',
      'Sign up to two or three platforms so you can work whichever is busiest at any hour.',
      'Work only peak periods; off-peak hours often earn below minimum wage after costs.',
      'Log every mile and expense — the deductions materially change your tax position.'
    ],
    pros: ['Earning within days with no interview or experience', 'Complete control over when you work', 'Tips and surge periods can lift the rate substantially'],
    cons: ['Vehicle wear and depreciation quietly consume much of the profit', 'No sick pay, holiday pay or guaranteed hours', 'Algorithm changes can cut effective pay overnight'],
    flags: ['Driving commercially on a personal insurance policy voids your cover entirely', 'Ignore "guaranteed earnings" adverts — they are gross figures before all costs'],
    tags: ['fast-cash', 'flexible', 'vehicle']
  },
  {
    id: 'car-detailing', name: 'Mobile car detailing', cat: 'local',
    tagline: 'Drive to the customer, transform their car in the driveway, charge properly for it.',
    summary: 'A basic exterior and interior clean bills $60–$120 and takes about ninety minutes; full detailing with paint correction runs $250–$600 a day. Mobile operation removes premises costs entirely, which is what makes the margins good. Corporate contracts — dealerships, fleets, office car parks — turn it from ad-hoc weekend work into steady weekday income.',
    pay: [300, 1500, 6000], cost: 'mid', costLabel: '$400–$1,500 kit & water supply', speed: 'weeks', speedLabel: '1–4 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 3, risk: 2,
    likes: ['physical', 'driving'],
    platforms: [['Thumbtack', 'https://www.thumbtack.com/pro'], ['Nextdoor', 'https://nextdoor.com'], ['Bark', 'https://www.bark.com'], ['Google Business Profile', 'https://www.google.com/business/']],
    steps: [
      'Buy a proper starter kit: pressure washer, water tank, vacuum, quality chemicals and microfibre towels.',
      'Practise on friends\' and family cars until the finish is consistently excellent, and photograph every one.',
      'Set up a Google Business Profile immediately — local search drives most enquiries in this trade.',
      'Pursue fleet and dealership contracts for weekday volume alongside retail weekend work.'
    ],
    pros: ['Visible before-and-after results sell the next job for you', 'No premises, rent or staff needed', 'Repeat customers book monthly or quarterly'],
    cons: ['Physically hard work in all weather', 'Water access and disposal rules can be restrictive', 'Chemicals and equipment need continual replacement'],
    flags: ['Check local rules on wastewater run-off, which is regulated in many areas', 'Get insurance before touching a customer\'s vehicle — paint damage claims are expensive'],
    tags: ['local', 'service', 'equipment']
  },
  {
    id: 'mobile-notary', name: 'Mobile notary & loan signing agent', cat: 'local',
    tagline: 'Drive to people signing important documents and get paid per appointment.',
    summary: 'This is really two jobs stacked. General notary work is paid per signature at rates your state caps, often only a few dollars — the money is in loan signings, where you supervise a full mortgage or refinance package for a flat $75–$200 per appointment, and up to $300 for complex or remote online ones. Each takes roughly an hour plus travel and printing. Three to five signings a week at around $125 is $1,500–$2,500 a month. Volume tracks mortgage activity, so it rises and falls with interest rates.',
    pay: [200, 1200, 4000], cost: 'low', costLabel: '$200–$700 commission, bond & E&O', speed: 'weeks', speedLabel: '3–8 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 2, risk: 1,
    likes: ['admin', 'people', 'driving'],
    platforms: [['National Notary Association', 'https://www.nationalnotary.org'], ['Snapdocs', 'https://www.snapdocs.com'], ['Notary Rotary', 'https://www.notaryrotary.com'], ['123notary', 'https://www.123notary.com']],
    steps: [
      'Check your jurisdiction first — commissioning rules, bonding and errors-and-omissions requirements vary enormously, and some places do not permit mobile notaries at all.',
      'Get commissioned, bonded and insured, then take loan signing training separately; the signing agent role is not covered by the notary commission itself.',
      'Register with signing services and local title companies, and keep a current background check since lenders require one.',
      'Track mileage and printing costs carefully — they decide whether a $125 signing was actually profitable.'
    ],
    pros: ['Paid per appointment, usually within days or weeks', 'Genuinely part-time and works well around a day job', 'Title companies rebook reliable signers constantly'],
    cons: ['Volume swings hard with mortgage rates and can dry up for months', 'Printing, mileage and insurance eat into the per-signing fee', 'Mistakes on legal documents carry real liability'],
    flags: ['Never notarise for someone who is not physically present or cannot produce valid ID, whatever the client tells you', 'Training companies promising guaranteed signing volume are selling a course, not a job'],
    tags: ['licensed', 'appointments', 'local']
  },
  {
    id: 'sports-officiating', name: 'Sports officiating & refereeing', cat: 'local',
    tagline: 'Local leagues are desperately short of officials and pay per game.',
    summary: 'Youth and recreational games pay roughly $30–$60 each, high school varsity $70–$130 depending on sport and state, and officials commonly work two or three games in an evening. There is a genuine shortage — tens of thousands of officials have left since 2020 — so new officials get assigned quickly and experienced ones effectively choose their own schedule. The cause of that shortage is also the main reason to think carefully: abuse from spectators and coaches is the most cited reason people quit.',
    pay: [150, 700, 2500], cost: 'low', costLabel: '$100–$300 registration & uniform', speed: 'weeks', speedLabel: '2–8 weeks (season dependent)',
    effort: 'active', skill: 'beginner', where: 'local', scale: 1, risk: 1,
    likes: ['physical', 'people'],
    platforms: [['National Association of Sports Officials', 'https://www.naso.org'], ['ArbiterSports', 'https://www.arbitersports.com'], ['NFHS', 'https://www.nfhs.org'], ['US Soccer Learning Center', 'https://learning.ussoccer.com']],
    steps: [
      'Pick a sport you already understand well and contact your state or regional officiating association, which runs the certification.',
      'Complete the rules clinic and exam, then register with the local assignor who actually distributes the games.',
      'Start at youth and sub-varsity level, accept every assignment offered, and build a reputation for simply turning up.',
      'Move up to varsity and tournament work after a season or two, where the fees roughly double.'
    ],
    pros: ['Immediate demand — shortages mean new officials get assigned quickly', 'Paid per game, often within weeks and sometimes in cash', 'Keeps you fit and connected to a sport you already care about'],
    cons: ['Verbal abuse from spectators and coaches is routine and drives most officials out', 'Seasonal, and concentrated in evenings and weekends', 'Travel between venues is generally unpaid'],
    flags: ['Register through your official state or governing association, not a third party charging for "certification"', 'Confirm the league carries liability insurance covering officials before you work a game'],
    tags: ['sport', 'per-game', 'shortage']
  },
  {
    id: 'pressure-washing', name: 'Pressure washing & exterior cleaning', cat: 'local',
    tagline: 'Driveways, patios, decks and siding — dramatic visible results people pay well for.',
    summary: 'Residential jobs bill $150–$400 and take one to three hours, so an operator with a full weekend route can turn over $600–$1,500 in a day. Startup is a genuine cost: a professional 4 GPM petrol machine, surface cleaner, hoses and insurance run roughly $1,500–$3,000, though at those job values the kit pays for itself within a handful of jobs. Softwash chemistry for siding and roofs is a real skill worth learning first, because high pressure on the wrong surface causes expensive damage you will be billed for.',
    pay: [300, 1800, 7000], cost: 'mid', costLabel: '$1,500–$3,000 machine & insurance', speed: 'weeks', speedLabel: '1–4 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 3, risk: 2,
    likes: ['physical', 'home'],
    platforms: [['Thumbtack', 'https://www.thumbtack.com/pro'], ['Nextdoor', 'https://nextdoor.com'], ['Angi', 'https://www.angi.com'], ['Google Business Profile', 'https://www.google.com/business/']],
    steps: [
      'Buy a 4 GPM petrol machine and a surface cleaner rather than a consumer electric washer; the cheap one will not earn money.',
      'Learn softwashing before touching siding, render or roofs — pressure damages them, and that damage becomes your bill.',
      'Get liability insurance, then work one neighbourhood intensively, doing the first few driveways cheaply purely for photographs.',
      'Price by square foot, publish before-and-after photos relentlessly, and add gutter clearing and roof cleaning as upsells.'
    ],
    pros: ['Dramatic visible results mean the work sells itself in photographs', 'High job values relative to the time each takes', 'Equipment pays for itself within a handful of jobs'],
    cons: ['Real equipment outlay before you earn a single dollar', 'Seasonal in cold or wet climates', 'Physically demanding, and damage claims are a genuine risk'],
    flags: ['Check local rules on wastewater run-off and reclaim; commercial work often legally requires containment', 'Never pressure wash render, soft timber or roof shingles — use a softwash method or decline the job'],
    tags: ['exterior', 'local', 'equipment']
  },
  {
    id: 'food-truck', name: 'Food truck', cat: 'local',
    tagline: 'A kitchen on wheels — big revenue, thin margins, and the licensing is the real obstacle.',
    summary: 'Trucks commonly turn over $20,000–$42,000 a month, which sounds transformative until the margins are applied: most operators net 6–10%, so $15,000 of monthly revenue may leave $900–$1,350 of actual profit. Well-run operations reach 25–35%. Startup is the genuine barrier at roughly $28,000–$200,000 all-in depending on whether you convert a used vehicle or buy new, and fixed monthly costs — truck payment, commissary rent, insurance, permits — run $2,200–$7,700 before you sell a single item. Break-even typically takes six to eighteen months.',
    pay: [0, 1500, 12000], cost: 'high', costLabel: '$28,000–$200,000 all-in', speed: 'months', speedLabel: '4–12 months',
    effort: 'active', skill: 'intermediate', where: 'local', scale: 3, risk: 5,
    likes: ['food', 'selling', 'physical', 'people'],
    platforms: [['National Street Food Vendors Association', 'https://www.nsfva.org'], ['Roaming Hunger', 'https://roaminghunger.com'], ['Square for Restaurants', 'https://squareup.com'], ['Local Harvest', 'https://www.localharvest.org']],
    steps: [
      'Test the concept before buying anything — trade at markets, festivals or a pop-up from a rented kitchen and prove people actually pay for your food.',
      'Resolve licensing before capital: health permits, commissary kitchen requirements, fire inspection, and exactly where you are legally allowed to park. This is where most food truck plans genuinely die.',
      'Buy used and have it inspected by both a mechanic and a kitchen fitter, or lease first rather than committing capital to a vehicle you cannot resell.',
      'Keep the menu very small. Food cost needs to sit at 25–35% of revenue, and every extra item adds waste, prep time and slower service at the window.'
    ],
    pros: ['High revenue per trading day at good events and pitches', 'Far cheaper than opening a restaurant, and you can move to where the customers are', 'A proven concept expands into catering, a second truck or a permanent site'],
    cons: ['Margins are thin — 6–10% net is normal, so revenue figures badly overstate the income', 'Heavy licensing, commissary and parking regulation that varies street by street', 'Long hours, weather-dependent trade, and a breakdown stops all income immediately'],
    flags: ['Verify vending and parking rules for every location you intend to trade at; fines and being moved on are routine for operators who assumed it was fine', 'Never buy a truck without independent inspection of both the vehicle and the kitchen fit-out — failing a health inspection on a truck you already own is common and expensive'],
    tags: ['food', 'capital', 'local']
  },
  {
    id: 'drone-pilot', name: 'Drone photography & inspection', cat: 'local',
    tagline: 'Pass one exam, then sell aerial photography, roof inspections and site surveys.',
    summary: 'In the US the FAA Part 107 remote pilot certificate is a single knowledge exam — a $175 test fee and typically two to four weeks of study — and it is the entire legal barrier between hobby flying and paid work. After that the numbers are good: residential roof inspections bill $150–$400 for 30–60 minutes of flying, commercial buildings $500–$1,500, and inspection work generally runs $300–$700 an hour. Estate agency photography is the easiest way in; roofing, solar and insurance work pays several times more and is where the repeat clients are.',
    pay: [100, 1200, 6000], cost: 'mid', costLabel: '$2,000–$7,000 drone, exam, insurance', speed: 'weeks', speedLabel: '4–10 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 3, risk: 2,
    likes: ['photo', 'video', 'physical'],
    platforms: [['FAA Part 107', 'https://www.faa.gov/uas/commercial_operators'], ['Drone Launch Academy', 'https://dronelaunchacademy.com'], ['DroneDeploy', 'https://www.dronedeploy.com'], ['Thumbtack', 'https://www.thumbtack.com/pro']],
    steps: [
      'Study for and pass the Part 107 knowledge exam, or your country\'s equivalent licence, before accepting a single paid job.',
      'Get liability insurance and register the aircraft — most commercial clients ask for proof of both before letting you on site.',
      'Start with estate agents for volume and portfolio, then move toward roofing, solar and insurance inspection where rates are several times higher.',
      'Learn the reporting side. Clients are buying a usable inspection report, not raw footage, and the report is what justifies the fee.'
    ],
    pros: ['One exam and a few weeks of study is the whole regulatory barrier', 'Inspection work bills at several hundred dollars an hour once you have clients', 'Equipment pays for itself in roughly 15–20 residential jobs'],
    cons: ['Real equipment outlay before the first paid job', 'Weather grounds you, and the work is seasonal in wet or windy climates', 'Airspace restrictions can make whole areas of a city unworkable'],
    flags: ['Flying commercially without the required certificate is an enforcement matter carrying substantial fines — get licensed before you advertise', 'Check airspace authorisation before every flight; controlled airspace near airports needs prior approval'],
    tags: ['short-training', 'aerial', 'inspection']
  },
  {
    id: 'phlebotomy', name: 'Phlebotomy & mobile draws', cat: 'local',
    tagline: 'A 4–12 week certificate — sometimes trained free and paid — that turns into per-visit work.',
    summary: 'One of the shortest routes into paid clinical work. Certificate programmes run 4–12 weeks and accelerated courses exist at 2–4 weeks; notably, the major plasma chains hire with no prior experience or certification at all and provide four to six weeks of paid in-house training at around $16–$19 an hour. The alternative-income version is what comes afterwards: per-diem shifts you choose, mobile draws in people\'s homes, and insurance paramedical examinations paid per appointment. Those contract routes pay meaningfully more than a fixed centre role and you work as much or as little as you want.',
    pay: [400, 1400, 3500], cost: 'low', costLabel: '$0 if trained on the job, or $700–$2,500', speed: 'weeks', speedLabel: '4–12 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 1, risk: 1,
    likes: ['people', 'physical', 'admin'],
    platforms: [['ASCP certification', 'https://www.ascp.org'], ['National Healthcareer Association', 'https://www.nhanow.com'], ['CSL Plasma', 'https://www.cslplasma.com']],
    steps: [
      'Choose your route: pay for a 4–12 week certificate, or apply to a plasma centre that trains you free and pays you while you learn.',
      'Check your state or country requirements — a handful of places license phlebotomists specifically, most do not.',
      'Certify with a recognised body once you have logged the required draws; certification is what unlocks hospital and per-diem rates.',
      'Move into per-diem, mobile draw or insurance paramedical work, which pays materially more per hour than a fixed centre post.'
    ],
    pros: ['Among the shortest trainings that leads to genuine clinical work', 'Some employers train you free and pay you throughout', 'Shift and visit based — no marketing, pitching or client-finding at all'],
    cons: ['Hourly pay is modest and rises slowly', 'Physically and emotionally demanding; needle work does not suit everyone', 'Fixed shifts, frequently early mornings and weekends'],
    flags: ['Verify a training provider\'s accreditation before paying — unaccredited phlebotomy courses will not get you certified', 'Never practise draws outside a supervised clinical setting'],
    tags: ['short-training', 'healthcare', 'shifts']
  },
  {
    id: 'dog-grooming', name: 'Dog grooming', cat: 'local',
    tagline: 'Learn a trade in months, then charge per dog with clients who rebook every six weeks.',
    summary: 'Groomers train either at an intensive school over roughly 8–16 weeks costing $3,000–$8,500, or through a paid salon apprenticeship spread over longer — the apprenticeship route means you earn while you learn. Once working, solo operators run 30–65% net margins and experienced full-timers clear $40,000–$60,000, with mobile groomers charging a premium for coming to the door. The real advantage is rebooking: a dog needs grooming every four to eight weeks for its entire life, so a full book is genuinely recurring income.',
    pay: [300, 1800, 6000], cost: 'mid', costLabel: '$3,000–$8,500 school, or free via apprenticeship', speed: 'months', speedLabel: '3–8 months',
    effort: 'active', skill: 'intermediate', where: 'local', scale: 2, risk: 2,
    likes: ['pets', 'physical', 'crafts'],
    platforms: [['National Dog Groomers Association', 'https://www.nationaldoggroomers.com'], ['Paragon School of Pet Grooming', 'https://paragonpetschool.com'], ['Rover', 'https://www.rover.com'], ['Nextdoor', 'https://nextdoor.com']],
    steps: [
      'Shadow or apprentice in a salon before paying for any course, so you find out whether you can handle frightened, elderly and difficult dogs.',
      'Train through a recognised school or a structured salon apprenticeship, photographing every breed you finish to build a portfolio.',
      'Start part-time from a home setup or by renting a chair before committing capital to a mobile van.',
      'Book the next appointment before the dog leaves. Rebooking on the spot is what turns this into recurring income.'
    ],
    pros: ['Clients rebook every four to eight weeks for the animal\'s whole life', 'Solo operators keep 30–65% of gross revenue', 'Mobile grooming commands a real premium and needs no premises'],
    cons: ['Physically hard on hands, back and shoulders with a genuine injury rate', 'Training costs real money and takes months', 'Frightened or aggressive dogs are a daily risk, and bites do happen'],
    flags: ['Get liability insurance and check licensing before your first paid dog; some jurisdictions regulate grooming specifically', 'Never accept a dog with a medical condition you are not trained to handle — grooming injuries and heat incidents lead to real claims'],
    tags: ['short-training', 'pets', 'repeat-clients']
  },
  {
    id: 'lash-tech', name: 'Lash & brow technician', cat: 'local',
    tagline: 'A two-to-five day certification, then $60–$300 a client who rebooks every few weeks.',
    summary: 'One of the shortest formal trainings that leads to real money. Classic lash certification courses run two to five days; newly qualified techs charge $50–$80 for a full set while established ones charge $150–$300, and a part-time tech working three days a week with a steady book can reach $3,000–$5,000 a month. The economics work because infills are needed every two to three weeks, so clients rebook permanently. Licensing is the thing to check before anything else — many US states require a cosmetology or esthetics licence, not merely a lash certificate.',
    pay: [200, 1500, 5000], cost: 'mid', costLabel: '$500–$2,500 course & starter kit', speed: 'weeks', speedLabel: '3–10 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 2, risk: 2,
    likes: ['crafts', 'design', 'people'],
    platforms: [['Associated Skin Care Professionals', 'https://www.ascpskincare.com'], ['Fresha', 'https://www.fresha.com'], ['Nextdoor', 'https://nextdoor.com']],
    steps: [
      'Check your licensing requirement first. In many US states you legally need a cosmetology or esthetics licence to apply lashes, and a weekend certificate alone is not sufficient.',
      'Take an accredited classic course, then practise on models free until your isolation and retention are genuinely reliable.',
      'Build a portfolio of your own work and take bookings through a scheduling app from the very first client.',
      'Add volume lashes, brow lamination and tinting once classic sets are consistent — each raises your ticket without needing a new client.'
    ],
    pros: ['Among the shortest routes from nothing to a paid, skilled service', 'Clients rebook infills every two to three weeks, indefinitely', 'Works from a spare room, a rented chair, or mobile'],
    cons: ['Licensing requirements catch people out and vary sharply by state and country', 'Detailed close-up work that is hard on eyes, neck and back', 'Fully booked means fully worked — the income stops when you do'],
    flags: ['Applying lashes without the licence your jurisdiction requires can bring fines and closure — verify before you advertise', 'Patch test every client for adhesive reaction; allergic response to cyanoacrylate is the main liability in this trade'],
    tags: ['short-training', 'beauty', 'repeat-clients']
  },
  {
    id: 'pool-service', name: 'Pool cleaning route', cat: 'local',
    tagline: 'Recurring monthly contracts, learnable in weeks, priced per pool.',
    summary: 'The appeal is the revenue model: pools need servicing every week forever, so a route is genuinely recurring income. Residential pools bill $125–$175 a month and a solo operator running 50–80 pools nets $75,000–$120,000 a year. Startup ranges from $2,000 lean to $20,000–$25,000 fully equipped, and the honest warning is cash flow — building a route from scratch can run a cumulative deficit of $15,000–$30,000 before it breaks even. Buying an established route costs more up front and pays from the first week.',
    pay: [200, 2000, 8000], cost: 'mid', costLabel: '$2,000–$25,000 depending on route', speed: 'weeks', speedLabel: '3–10 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 3, risk: 3,
    likes: ['physical', 'home', 'driving'],
    platforms: [['Pool & Hot Tub Alliance', 'https://www.phta.org'], ['Thumbtack', 'https://www.thumbtack.com/pro'], ['Nextdoor', 'https://nextdoor.com']],
    steps: [
      'Take the Certified Pool Operator course or your local equivalent. The chemistry is learnable in days and certification is what lets you take commercial contracts.',
      'Build route density in one neighbourhood before accepting anything across town, because drive time is what destroys the margin.',
      'Price monthly and include chemicals, so the customer gets a predictable bill and you get predictable revenue.',
      'Seriously consider buying an established route — it costs more but you earn from week one rather than month six.'
    ],
    pros: ['Genuinely recurring monthly revenue with very low churn', 'Chemistry and technique are learnable in weeks, not years', 'Routes are a sellable asset that trade at a multiple of monthly billing'],
    cons: ['Long cash flow deficit while building a route from nothing', 'Seasonal in cold climates unless you add winterising and heater work', 'Chemical handling and heat exposure are real occupational risks'],
    flags: ['Mishandled pool chemicals cause fires and serious injury — get proper training and storage before carrying any', 'Check licensing; several states regulate pool servicing and commercial pools almost always require certification'],
    tags: ['short-training', 'recurring', 'route']
  },
  {
    id: 'wedding-officiant', name: 'Wedding officiant', cat: 'local',
    tagline: 'Ordination can take minutes; the craft takes a few weekends. $200–$800 a ceremony.',
    summary: 'Becoming legally able to solemnise a marriage is genuinely fast in many places — online ordination plus, in some jurisdictions, county registration. What takes actual practice is writing and delivering a ceremony people remember afterwards. Beginners charge $100–$800, with $200–$450 the working range for a personalised ceremony covering consultations and the legal paperwork, and rehearsal attendance adding $100–$150. Weekends only and heavily seasonal, but a handful of ceremonies a month is a real second income.',
    pay: [0, 600, 3000], cost: 'none', costLabel: '$0–$200 ordination & registration', speed: 'weeks', speedLabel: '4–10 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 2, risk: 1,
    likes: ['people', 'writing', 'teaching'],
    platforms: [['Universal Life Church', 'https://www.ulc.org'], ['American Marriage Ministries', 'https://theamm.org'], ['The Knot', 'https://www.theknot.com'], ['WeddingWire', 'https://www.weddingwire.com']],
    steps: [
      'Check your jurisdiction\'s rules precisely. Authority to solemnise a marriage varies by state, county and country, and getting it wrong can invalidate the marriage.',
      'Get ordained, register wherever registration is required, then observe or assist at several ceremonies before charging anyone.',
      'Build a package: consultation, a written personalised ceremony, rehearsal attendance and the legal filing.',
      'List on the wedding directories and build relationships with local planners and venues, which is where most bookings actually originate.'
    ],
    pros: ['Almost no startup cost and a very fast route to being legally able to work', 'Weekend-only work that fits around anything else', 'Genuinely enjoyable, and happy couples refer readily'],
    cons: ['Intensely seasonal and concentrated onto Saturdays', 'You are responsible for legal paperwork where a mistake has serious consequences', 'Building a booking pipeline takes a full season'],
    flags: ['Confirm you are legally authorised to solemnise marriages where the ceremony takes place — some states and countries do not recognise online ordination at all', 'Never guarantee a legal outcome you have not verified directly with the local registrar or county clerk'],
    tags: ['short-training', 'weddings', 'weekends']
  },
  {
    id: 'phone-repair', name: 'Phone & device repair', cat: 'local',
    tagline: 'A few weeks practising on scrap handsets turns into $80–$200 a repair.',
    summary: 'The skill is learnable from structured courses and practice on dead handsets within weeks, and the economics are simple: a screen replacement bills $80–$200 with a part costing $20–$60, so the margin is your time and your confidence. Repeat demand is constant and largely recession-proof, because people repair rather than replace when money is tight. Two things separate profitable repairers from frustrated ones — buying quality parts, and knowing which jobs to refuse, since water damage and board-level faults can eat a day and still fail.',
    pay: [150, 1200, 5000], cost: 'low', costLabel: '$300–$1,500 tools, parts, practice units', speed: 'weeks', speedLabel: '3–10 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 2, risk: 2,
    likes: ['physical', 'code', 'crafts'],
    platforms: [['iFixit', 'https://www.ifixit.com'], ['Mobile Sentrix', 'https://www.mobilesentrix.com'], ['Thumbtack', 'https://www.thumbtack.com/pro'], ['Nextdoor', 'https://nextdoor.com']],
    steps: [
      'Buy a bag of broken handsets and repair them over and over until screen and battery swaps are routine. Ruin your own stock, never a customer\'s phone.',
      'Source parts from established suppliers — cheap screens fail, come back, and cost you the same job twice.',
      'Start mobile or by appointment rather than renting premises, because rent is what kills small repair businesses.',
      'Decide early which repairs you refuse. Water damage and board-level work take hours and frequently fail anyway.'
    ],
    pros: ['Short learning curve with immediate, visible results', 'Strong margins on the common, repeatable repairs', 'Constant demand that holds up well in a downturn'],
    cons: ['You are liable for a customer\'s device and the data on it', 'Cheap parts fail and take your reputation with them', 'Manufacturers increasingly restrict parts and pair components to the device'],
    flags: ['Never access, copy or browse customer data; take a signed repair authorisation and record existing damage before opening anything', 'Some repairs void manufacturer warranties or trip anti-tamper locks — say so in writing before you start'],
    tags: ['short-training', 'repair', 'local']
  },
  {
    id: 'construction', name: 'Construction & renovation work', cat: 'local',
    tagline: 'Small building jobs pay well — but the licensing threshold is where people get caught.',
    summary: 'A step up from handyman work in both money and regulation. Renovation subcontracting — tiling, drywall, decking, painting, bathroom and kitchen fitting — bills several times what small repairs do, and skilled trades routinely subcontract evenings and weekends. The line that catches people is the licence threshold: most US states require a contractor licence above a project value somewhere between $1,000 and $3,000, some as low as $500, and those exemptions almost never cover permitted work, electrical, plumbing, HVAC or anything structural. Penalties run $500 to $15,000, with jail for repeat offences in some states.',
    pay: [300, 2500, 12000], cost: 'mid', costLabel: '$1,000–$8,000 tools, insurance, licence', speed: 'weeks', speedLabel: '2–8 weeks',
    effort: 'active', skill: 'intermediate', where: 'local', scale: 3, risk: 3,
    likes: ['physical', 'home', 'crafts'],
    platforms: [['Angi', 'https://www.angi.com'], ['Thumbtack', 'https://www.thumbtack.com/pro'], ['Checkatrade (UK)', 'https://www.checkatrade.com'], ['Nextdoor', 'https://nextdoor.com']],
    steps: [
      'Find your jurisdiction\'s licence threshold and exactly what it excludes before quoting anything. That single number defines what you can legally take on unlicensed.',
      'Pick one finishing trade and get genuinely good at it — tiling, drywall finishing, decking — rather than offering everything badly.',
      'Subcontract for established builders first. You learn standards and sequencing, and get paid, without carrying the client relationship.',
      'Get licensed once your jobs routinely exceed the threshold, and carry liability insurance and workers\' compensation where required.'
    ],
    pros: ['Job values are several times higher than handyman repairs', 'Constant demand and a chronic shortage of reliable trades', 'Skills compound, and licensing raises your ceiling substantially'],
    cons: ['Physically demanding with a real injury rate', 'Payment disputes and retentions are common on larger jobs', 'Weather, inspections and other trades all delay your schedule and your invoice'],
    flags: ['Working above your jurisdiction\'s licence threshold without a licence brings fines of $500–$15,000 and, in some states, jail for repeat offences — check the number before you quote', 'Never take on electrical, gas, plumbing or structural work outside your licensed trade, whatever the customer offers to pay'],
    tags: ['trades', 'licensed', 'local']
  },
  {
    id: 'event-entertainer', name: 'Children\'s & event entertainer', cat: 'local',
    tagline: 'Face painting, balloons, magic and characters — weekend work at $120–$300 an hour.',
    summary: 'The rates are better than most people expect. Face painting and balloon twisting bill $65–$165 an hour, children\'s magicians $150–$300, and a 50-minute magic show around $325. Bookings cluster into weekend afternoons and school holidays, so it stacks neatly on top of anything weekday. The skills are learnable from courses and relentless practice — face painting and balloon modelling within weeks, a solid magic set over months. What actually sells is confidence in a room full of over-excited six-year-olds, which no course really teaches.',
    pay: [100, 900, 4000], cost: 'low', costLabel: '$200–$1,500 kit, costume, insurance', speed: 'weeks', speedLabel: '4–12 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 2, risk: 1,
    likes: ['people', 'crafts', 'design', 'teaching'],
    platforms: [['GigSalad', 'https://www.gigsalad.com'], ['The Bash', 'https://www.thebash.com'], ['Nextdoor', 'https://nextdoor.com']],
    steps: [
      'Pick one skill and get genuinely good before adding others — face painting reaches a bookable standard fastest, magic slowest.',
      'Work free at friends\' parties while filming everything, so you finish with footage and testimonials you can book from.',
      'Get public liability insurance and a background check. Venues, schools and nurseries will not book you without both.',
      'Build a package with a fixed running order and stated duration, then upsell extra time or a second entertainer.'
    ],
    pros: ['Excellent hourly rate for weekend-only work', 'Very low startup cost with no premises required', 'Referrals spread quickly among parents at the same schools and nurseries'],
    cons: ['Concentrated into weekend afternoons and school holidays', 'Physically and emotionally draining — managing a room of children is real work', 'Seasonal dips and last-minute cancellations'],
    flags: ['Background checks and safeguarding certification are legally required for working with children in most countries — arrange them before you advertise', 'Carry public liability insurance, and use only cosmetic-grade face paints with a patch test; skin reactions are the common claim in this work'],
    tags: ['events', 'weekends', 'performance']
  },

  /* -------------------------------------------------- GROWING & SMALLHOLDING */
  {
    id: 'poultry', name: 'Poultry & egg keeping', cat: 'grow',
    tagline: 'A backyard flock sells eggs locally — modest money, but genuinely real money.',
    summary: 'Be honest about scale. A productive hen returns roughly $50–$60 of annual profit at direct-sale prices, so a twelve-hen backyard flock clears something like $300–$700 a year after feed and cartons — real, but not an income. Around twenty-five hens produces roughly $165 a month. It only becomes a business at several hundred birds, where startup runs $5,000–$30,000 and the first two or three years typically break even. Pastured eggs, heritage breeds and selling direct at the gate or a market stall are what lift the price above supermarket parity, and that premium is the entire margin.',
    pay: [20, 150, 1500], cost: 'mid', costLabel: '$500–$3,000 for a small flock', speed: 'months', speedLabel: '5–8 months to point of lay',
    effort: 'active', skill: 'beginner', where: 'local', scale: 2, risk: 2,
    likes: ['food', 'pets', 'physical', 'home'],
    platforms: [['ATTRA poultry guides', 'https://attra.ncat.org'], ['BackyardChickens', 'https://www.backyardchickens.com'], ['Local Harvest', 'https://www.localharvest.org']],
    steps: [
      'Check local rules first — many areas cap flock size, prohibit roosters, or require registration and licensing before you may sell a single egg.',
      'Start with six to twelve hens of a proven laying breed and run it for a full year, through a winter and a moult, before scaling anything.',
      'Calculate your true feed cost per dozen before setting a price. Feed dominates the cost base and moves with grain markets.',
      'Sell direct — farm gate, workplace, market stall — because wholesale pricing does not work at this scale and the direct premium is your only margin.'
    ],
    pros: ['Genuinely enjoyable work that fits around other commitments', 'Direct-sold eggs command a real premium over supermarket prices', 'Scales gently — add birds as demand grows, with no cliff edge or large commitment'],
    cons: ['Small absolute income unless you reach several hundred birds', 'A daily, unavoidable commitment including holidays and bad weather', 'Disease, predators and moulting halt production with little warning'],
    flags: ['Egg sales are regulated nearly everywhere — check licensing, labelling, candling and refrigeration rules before selling to anyone, including neighbours', 'Avian influenza restrictions can legally force flocks indoors or suspend sales entirely, sometimes at very short notice'],
    tags: ['livestock', 'food', 'smallholding']
  },
  {
    id: 'market-garden', name: 'Market garden', cat: 'grow',
    tagline: 'Intensive vegetable growing on a small plot, sold direct at a premium.',
    summary: 'The economics come from intensity and direct selling rather than acreage. A well-run half acre grosses $20,000–$40,000, and intensive growers report $40,000–$60,000 per acre with gross margins around 55–65% selling through farmers markets, restaurants and a box scheme. A hundred-member CSA over a twenty-week season is roughly $70,000 of pre-paid revenue, which also solves the cash flow problem that kills most small farms. Be clear-eyed: it is physically hard, weather-exposed, and the selling takes as many hours as the growing.',
    pay: [0, 1200, 5000], cost: 'mid', costLabel: '$2,000–$15,000 beds, tools, irrigation', speed: 'months', speedLabel: '4–10 months to first harvest',
    effort: 'active', skill: 'intermediate', where: 'local', scale: 3, risk: 3,
    likes: ['food', 'physical', 'home', 'selling'],
    platforms: [['The Market Gardener', 'https://themarketgardener.com'], ['ATTRA', 'https://attra.ncat.org'], ['SARE', 'https://www.sare.org'], ['Local Harvest', 'https://www.localharvest.org']],
    steps: [
      'Secure the sales channel before expanding the growing area. Market gardens fail on selling, not on growing, and unsold vegetables are compost.',
      'Start with 1,000–3,000 square feet worked intensively rather than a large plot worked badly. Weeds beat ambition every single time.',
      'Grow high-value, fast-turning crops — salad, bunched herbs, radish, heirloom tomatoes — not storage crops that compete directly with supermarkets.',
      'Launch a small CSA once you can guarantee supply, because pre-paid subscriptions fund the season before you spend on it.'
    ],
    pros: ['Pre-paid CSA subscriptions solve the cash flow problem that ends most small farms', 'Very high revenue per square foot compared with conventional cropping', 'Direct customer relationships and genuine, durable local demand'],
    cons: ['Physically hard, weather-exposed work concentrated into a short season', 'Selling takes as much time as growing and is consistently underestimated', 'One bad week of weather or pests can destroy a crop you have already sold'],
    flags: ['Selling produce triggers licensing, food-safety registration and market permits in most places — check before your first sale', 'Never scale the growing area before the sales channel is proven; overproduction is the most common and most expensive mistake in this field'],
    tags: ['vegetables', 'csa', 'smallholding']
  },
  {
    id: 'microgreens', name: 'Microgreens', cat: 'grow',
    tagline: 'A 7–14 day crop grown on indoor shelves, sold to restaurants at a premium.',
    summary: 'The fastest cycle in small-scale growing, and the reason it suits people with no land at all — trays stack on shelving in a spare room or garage. Restaurants pay $25–$45 a tray wholesale for common varieties, and gross margins commonly run 70–80% once production is honestly costed, so each tray nets roughly $15–$30 on a one-to-two week cycle. Sunflower and pea shoots are the reliable earners; delicate specialty varieties look impressive on a plate and waste far more. This business is chefs and consistency, not horticulture.',
    pay: [0, 700, 4000], cost: 'low', costLabel: '$300–$1,500 shelving, trays, seed', speed: 'weeks', speedLabel: '3–8 weeks',
    effort: 'active', skill: 'beginner', where: 'local', scale: 3, risk: 2,
    likes: ['food', 'physical', 'selling', 'home'],
    platforms: [['On The Grow', 'https://onthegrow.net'], ['True Leaf Market', 'https://trueleafmarket.com'], ['Local Harvest', 'https://www.localharvest.org']],
    steps: [
      'Find the buyers first. Walk into restaurants with free samples before buying a single shelf — this is sold, not grown.',
      'Master two or three varieties, especially sunflower and pea shoots, before adding anything delicate or slow.',
      'Sort out food-safety registration early, because selling to restaurants means inspection regimes apply to you.',
      'Set a fixed weekly delivery rhythm and never miss it. Chefs buy reliability and will replace a supplier who fails once.'
    ],
    pros: ['Fastest crop cycle in growing — cash back within two weeks', 'Needs no land at all, just shelving and clean indoor space', 'Very high margin per square foot of floor space'],
    cons: ['Depends on a handful of restaurant accounts that can vanish together', 'Mould and contamination can destroy a whole batch overnight', 'Daily attention with no holidays in the middle of a cycle'],
    flags: ['Selling fresh produce triggers food-safety registration and inspection almost everywhere — confirm the rules before your first sale', 'Ignore courses promising restaurant contracts. Nobody can sell to your local chefs except you'],
    tags: ['indoor', 'restaurants', 'fast-cycle']
  },
  {
    id: 'mushrooms', name: 'Gourmet mushroom growing', cat: 'grow',
    tagline: 'Oyster and lion\'s mane grown indoors, sold to restaurants and markets weekly.',
    summary: 'Wholesale gourmet mushrooms move at $7–$14 a pound, while farmers market and direct-to-restaurant sales clear $16–$24. A garage-scale operation running around fifty blocks a week grosses roughly $5,800 a month and nets near $3,200 after paid labour; a part-time 100 square foot plot is closer to $14,000 a year wholesale or $24,000 retail. Startup is $800–$1,800 using an existing structure, or $2,000–$8,000 for a serious build. The technical barrier is genuine — contamination is a constant adversary and sterile technique is most of the skill.',
    pay: [0, 900, 5000], cost: 'mid', costLabel: '$800–$8,000 depending on the build', speed: 'months', speedLabel: '2–5 months',
    effort: 'active', skill: 'intermediate', where: 'local', scale: 3, risk: 3,
    likes: ['food', 'physical', 'selling', 'home'],
    platforms: [['GroCycle', 'https://grocycle.com'], ['Fungi Ally', 'https://www.fungially.com'], ['North Spore', 'https://northspore.com'], ['Local Harvest', 'https://www.localharvest.org']],
    steps: [
      'Begin with ready-to-fruit blocks rather than making your own substrate, so you learn harvesting and selling before sterile technique.',
      'Grow oyster varieties first — they are fast, forgiving, and outcompete contaminants better than anything else you could start with.',
      'Line up weekly restaurant and market buyers before scaling production, because shelf life is measured in days.',
      'Move to producing your own substrate only once demand is proven. That is where the margin lives, and also where the contamination risk lives.'
    ],
    pros: ['Very fast cycles and high value per square foot', 'Grows indoors year-round, entirely independent of weather and season', 'Strong and still-growing demand from restaurants and markets'],
    cons: ['Contamination can wipe out entire batches with little warning', 'Extremely short shelf life, so unsold stock is a total loss', 'Real occupational health considerations from spore exposure'],
    flags: ['Only grow and sell culinary species you can identify with certainty — never sell foraged mushrooms without formal identification training', 'Prolonged spore exposure causes respiratory sensitisation. Ventilate properly and wear suitable respiratory protection; this is not optional'],
    tags: ['indoor', 'restaurants', 'year-round']
  },
  {
    id: 'cut-flowers', name: 'Cut flower growing', cat: 'grow',
    tagline: 'Seasonal blooms for markets, florists and weddings — among the highest returns per square foot.',
    summary: 'Small flower farms report gross sales of $25,000–$50,000 an acre with net margins of 50–60% on direct sales, and growers working a quarter to half acre commonly earn $25,000–$35,000 a year. Urban micro-growers report $15–$20 per square foot through market stalls and bouquet subscriptions. Stems wholesale at $2–$5 and retail at $4–$8. Weddings are the highest-value channel and by far the most demanding, because the flowers have to be perfect on one immovable date you cannot renegotiate.',
    pay: [0, 1000, 4500], cost: 'mid', costLabel: '$1,000–$6,000 seed, netting, cooler', speed: 'months', speedLabel: '4–9 months to first cut',
    effort: 'active', skill: 'intermediate', where: 'local', scale: 3, risk: 3,
    likes: ['crafts', 'physical', 'selling', 'home'],
    platforms: [['Association of Specialty Cut Flower Growers', 'https://www.ascfg.org'], ['Floret', 'https://www.floretflowers.com'], ['Local Harvest', 'https://www.localharvest.org']],
    steps: [
      'Grow what does not ship well and therefore cannot be imported — dahlias, sweet peas, zinnias, ranunculus. That is your entire advantage over the wholesale trade.',
      'Start with a market stall or bouquet subscription before taking weddings, which are unforgiving about dates and colours.',
      'Succession sow every two to three weeks so you get continuous stems instead of one unsellable glut.',
      'Buy a cooler early. Post-harvest handling is what separates flowers that last a week from flowers that wilt in two days.'
    ],
    pros: ['Among the highest revenue per square foot in small-scale growing', 'Direct-sale net margins of 50–60% are normal', 'Weddings and subscriptions give bookable, predictable income months ahead'],
    cons: ['Intensely seasonal, with income compressed into a few months', 'Weather can destroy a crop days before an event you have been paid for', 'Post-harvest handling and delivery are time-critical and unforgiving'],
    flags: ['Never take a wedding booking without a written contract permitting substitutions — no grower can guarantee a specific flower on a specific date', 'Check plant import and licensing rules before buying bulbs, corms or tubers from overseas'],
    tags: ['flowers', 'weddings', 'seasonal']
  },
  {
    id: 'beekeeping', name: 'Beekeeping & honey', cat: 'grow',
    tagline: 'Hives produce honey, wax and — more profitably — more bees.',
    summary: 'The surprise for most beginners is that honey is rarely the best line. A hive yields 30–60 pounds a season, worth roughly $90–$180, while a five-frame nucleus colony split off a strong hive sells for $180–$220, and pollination placement earns $50–$200 per hive per season. Add beeswax, propolis and pollen and a well-run hive returns $200–$500 a year. Startup is around $1,200 for a two-hive backyard apiary and break-even typically arrives in year three. Colonies die; this needs patience and a tolerance for loss.',
    pay: [0, 200, 1200], cost: 'mid', costLabel: '$1,200–$2,500 for two hives', speed: 'long', speedLabel: '12–24 months',
    effort: 'semi', skill: 'intermediate', where: 'local', scale: 2, risk: 2,
    likes: ['pets', 'physical', 'home', 'food'],
    platforms: [['Mann Lake', 'https://www.mannlakeltd.com'], ['Betterbee', 'https://www.betterbee.com'], ['British Beekeepers Association', 'https://www.bbka.org.uk'], ['Local Harvest', 'https://www.localharvest.org']],
    steps: [
      'Join a local association and work somebody else\'s hives for a season before buying your own. This single step prevents most beginner losses.',
      'Start with two hives rather than one, so you can compare them and use a strong colony to rescue a failing one.',
      'Plan to sell nucs and queens alongside honey, since selling bees is usually more profitable than selling what they produce.',
      'Register your hives where required and learn to recognise notifiable diseases — inspection regimes are legally enforced in most countries.'
    ],
    pros: ['Several income lines from one hive: honey, wax, nucs, queens and pollination', 'Semi-passive between seasonal inspections', 'Hives compound — strong colonies split into more hives each spring'],
    cons: ['Colonies die from mites, disease and hard winters, sometimes despite doing everything right', 'Slow to break even, commonly around the third year', 'Requires real study, and being stung is simply part of it'],
    flags: ['Hive registration and notifiable disease reporting are legal requirements in most countries — check yours before buying bees', 'Never buy bees from an unverified seller; imported mites and disease can destroy your apiary and your neighbours\' too'],
    tags: ['bees', 'honey', 'livestock']
  },
  {
    id: 'plant-nursery', name: 'Backyard plant nursery', cat: 'grow',
    tagline: 'Propagate from cuttings and seed, and sell for many times the input cost.',
    summary: 'Propagation carries the best margins in growing because the input is essentially a cutting and some potting mix. Retail houseplants typically return 50–70%, rare and specimen plants considerably more, and even a backyard nursery selling wholesale into garden centres runs at very high margin. It is unusually flexible: a $3 seed packet becomes dozens of plants, you can sell at the gate or ship nationally through an online shop, and it scales gently from a few benches to a polytunnel with no cliff edge anywhere along the way.',
    pay: [20, 400, 3000], cost: 'low', costLabel: '$200–$1,500 pots, mix, benches', speed: 'months', speedLabel: '4–12 months to saleable size',
    effort: 'semi', skill: 'beginner', where: 'hybrid', scale: 3, risk: 1,
    likes: ['crafts', 'home', 'physical', 'selling'],
    platforms: [['Etsy', 'https://www.etsy.com/sell'], ['Royal Horticultural Society', 'https://www.rhs.org.uk'], ['Local Harvest', 'https://www.localharvest.org']],
    steps: [
      'Propagate what people near you actually buy and what garden centres run short of — natives, herbs, fruit bushes, popular houseplants.',
      'Learn the timing. Most stock needs a full growing season to reach saleable size, so plan a year ahead rather than a month.',
      'Sell through several channels at once: plant fairs, a stall at the gate, local groups, and an online shop for the rare material.',
      'Check propagation rights before multiplying named cultivars, because a great many of them are legally protected.'
    ],
    pros: ['Exceptional margins — a cutting and some compost becomes a $15–$25 plant', 'Scales gently upward from a few benches with no large commitment', 'Sells locally, and rare plants ship nationally at good prices'],
    cons: ['Slow, since most stock takes a full season to become saleable', 'Needs space, watering discipline and frost protection', 'A heatwave, freeze or failed watering can kill a year of stock at once'],
    flags: ['Many named cultivars are protected by plant breeders\' rights and cannot legally be propagated for sale without a licence', 'Shipping plants across state or national borders is restricted and often needs phytosanitary certification — check before selling online'],
    tags: ['plants', 'propagation', 'high-margin']
  },

  /* ---------------------------------------------------- TEACHING & EXPERTISE */
  {
    id: 'tutoring', name: 'Private tutoring', cat: 'teaching',
    tagline: 'Teach a subject you already know to students who need it right now.',
    summary: 'Rates run $25–$60 an hour for general subjects and $60–$150 for exam preparation, specialist sciences or admissions coaching. Demand is intense and seasonal around exams, and online delivery removes travel entirely. The most profitable structure is small group sessions — three students at a reduced individual rate can double your hourly income while costing them less.',
    pay: [200, 1200, 5000], cost: 'none', costLabel: '$0', speed: 'weeks', speedLabel: '1–4 weeks',
    effort: 'active', skill: 'intermediate', where: 'hybrid', scale: 2, risk: 1,
    likes: ['teaching', 'people'],
    platforms: [['Wyzant', 'https://www.wyzant.com'], ['Superprof', 'https://www.superprof.com'], ['Preply', 'https://preply.com'], ['MyTutor (UK)', 'https://www.mytutor.co.uk']],
    steps: [
      'Choose the subject and exam level you know best, ideally one you have been examined in yourself.',
      'Use a platform for your first few students and reviews, accepting their commission as a marketing cost.',
      'Move to direct booking with regular families once trust exists, and raise your rate.',
      'Introduce small group sessions to lift your hourly earnings without extra preparation time.'
    ],
    pros: ['No qualification barrier in most markets if you know the subject', 'Students book weekly for months, so income is stable', 'Fully remote and easy to fit around other work'],
    cons: ['Strongly seasonal around exam periods', 'Platform commissions are high, often 20–30%', 'Directly limited by the hours you have available'],
    flags: ['Background checks are legally required for work with minors in many countries — get one', 'Never accept payment through unusual channels or from someone who "overpays" and asks for a refund'],
    tags: ['teaching', 'flexible', 'seasonal']
  },
  {
    id: 'online-course', name: 'Online course creation', cat: 'teaching',
    tagline: 'Record what you know once and sell it to everyone who needs it afterwards.',
    summary: 'Courses on marketplaces sell for $20–$200 with the platform taking a large cut and controlling pricing; self-hosted courses sell for $200–$2,000 but you must find every buyer yourself. Marketplace courses in technical subjects can produce genuine passive income, while high-ticket self-hosted courses depend entirely on having an audience already. Building the course is roughly 20% of the work — selling it is the rest.',
    pay: [0, 500, 12000], cost: 'low', costLabel: '$100–$600 mic, lighting, hosting', speed: 'months', speedLabel: '3–9 months',
    effort: 'semi', skill: 'intermediate', where: 'online', scale: 5, risk: 2,
    likes: ['teaching', 'video', 'writing'],
    platforms: [['Udemy', 'https://www.udemy.com/teaching/'], ['Teachable', 'https://teachable.com'], ['Podia', 'https://www.podia.com'], ['Kajabi', 'https://kajabi.com']],
    steps: [
      'Validate before you build: sell a live cohort or workshop version first and see if anyone pays.',
      'Structure around one specific outcome the student can achieve, not a broad subject survey.',
      'Record in short focused lessons with clean audio — audio quality matters far more than video.',
      'Launch on a marketplace for distribution, or to your own email list for margin.'
    ],
    pros: ['Build once, sell indefinitely with almost no marginal cost', 'Establishes real authority in your field', 'Combines well with coaching, consulting and community offers'],
    cons: ['Enormous up-front effort before a single sale', 'Marketplaces control pricing and discount heavily', 'Course markets are saturated in popular subjects'],
    flags: ['Ignore "course launch" gurus promising six figures — the median course earns very little', 'Do not build for months before testing whether anyone will pay'],
    tags: ['teaching', 'digital', 'passive']
  },
  {
    id: 'coaching', name: 'Coaching & consulting', cat: 'teaching',
    tagline: 'Sell the judgement you built over a career, by the hour or by the project.',
    summary: 'The highest hourly rate available to most professionals. Specialist consultants bill $100–$500 an hour and small projects run $2,000–$20,000, because clients are buying a specific outcome rather than time. Credibility comes from a track record — the more precisely you can name the problem you solve and for whom, the higher the fee you can defend.',
    pay: [300, 3000, 20000], cost: 'none', costLabel: '$0–$100 scheduling & invoicing', speed: 'weeks', speedLabel: '3–10 weeks',
    effort: 'active', skill: 'advanced', where: 'hybrid', scale: 2, risk: 1,
    likes: ['teaching', 'people', 'research'],
    platforms: [['Clarity.fm', 'https://clarity.fm'], ['Catalant', 'https://gocatalant.com'], ['LinkedIn', 'https://www.linkedin.com'], ['Intro', 'https://intro.co']],
    steps: [
      'Write your offer as a sentence: "I help [specific type of company] fix [specific expensive problem]."',
      'Publish evidence — case studies, results, a talk, a detailed article — so credibility precedes the sales conversation.',
      'Price by project outcome rather than hourly wherever you can, since hourly caps your income.',
      'Ask past colleagues and clients directly for introductions; almost all early consulting work comes through the network you already have.'
    ],
    pros: ['Highest realistic hourly rate of anything on this list', 'Zero start-up cost — you already own the asset', 'Naturally leads into retainers, board work and equity roles'],
    cons: ['Requires genuine hard-won expertise, which cannot be shortcut', 'Constant business development between engagements', 'Income is lumpy until retainers exist'],
    flags: ['Beware "coaching certification" schemes whose main business is selling certifications', 'Never guarantee specific financial results for a client'],
    tags: ['expertise', 'high-rate', 'clients']
  },
  {
    id: 'esl-teaching', name: 'Teaching English online', cat: 'teaching',
    tagline: 'Teach conversational English to adults across time zones, from your kitchen table.',
    summary: 'The market changed substantially after China restricted foreign online tutoring, but adult conversational teaching remains steady across Europe, Latin America and the Middle East. Platform rates run $10–$25 an hour, while independent teaching with your own students reaches $25–$50. A TEFL certificate costs little and meaningfully improves both which platforms accept you and what they pay.',
    pay: [200, 900, 3000], cost: 'low', costLabel: '$100–$300 TEFL certificate', speed: 'weeks', speedLabel: '2–6 weeks',
    effort: 'active', skill: 'beginner', where: 'online', scale: 1, risk: 1,
    likes: ['teaching', 'people'],
    platforms: [['Preply', 'https://preply.com/en/teach'], ['italki', 'https://www.italki.com/teacher/application'], ['Cambly', 'https://www.cambly.com/en/tutors'], ['Lingoda', 'https://www.lingoda.com/en/teach/']],
    steps: [
      'Take an accredited 120-hour TEFL course; it is inexpensive and expected by most platforms.',
      'Set up a tidy, well-lit background and a wired headset — presentation directly affects bookings.',
      'Start on a platform to build reviews, targeting time zones where demand outstrips supply.',
      'Develop a specialism — business English, medical English, interview preparation — and charge accordingly.'
    ],
    pros: ['Low entry barrier and genuinely global demand', 'Fully remote and location-independent', 'Regular students book weekly for months at a time'],
    cons: ['Hourly rates are modest on platforms', 'Teaching hours are dictated by your students\' time zones, often early or late', 'Income is capped by hours available'],
    flags: ['Do not pay large sums for job placement — reputable platforms recruit for free', 'Verify a school exists and pays before signing anything that requires you to relocate'],
    tags: ['teaching', 'remote', 'certification']
  },
  {
    id: 'music-lessons', name: 'Music & skill lessons', cat: 'teaching',
    tagline: 'Teach an instrument, a language, a craft or a sport locally and online.',
    summary: 'Instrument lessons bill $30–$70 an hour locally and slightly less online, with the same economics for chess, art, singing, martial arts and dance. The advantage over academic tutoring is that hobby lessons are not seasonal — students continue year-round for years. Group classes and school partnerships lift the hourly rate substantially above one-to-one teaching.',
    pay: [200, 1000, 4000], cost: 'low', costLabel: '$0 if you own the instrument', speed: 'weeks', speedLabel: '2–6 weeks',
    effort: 'active', skill: 'intermediate', where: 'hybrid', scale: 2, risk: 1,
    likes: ['teaching', 'audio', 'people', 'crafts'],
    platforms: [['Lessonface', 'https://www.lessonface.com'], ['Fiverr', 'https://www.fiverr.com'], ['Superprof', 'https://www.superprof.com'], ['Nextdoor', 'https://nextdoor.com']],
    steps: [
      'Decide who you teach best — absolute beginners, children, or adults returning after years away.',
      'Advertise where those people already are: local schools, community boards, music shops, neighbourhood apps.',
      'Charge for a block of lessons up front to reduce cancellations and stabilise income.',
      'Add group classes or a school partnership once your individual slots are full.'
    ],
    pros: ['Students stay for years, making income remarkably stable', 'Not seasonal in the way exam tutoring is', 'Deeply rewarding and uses a skill you already enjoy'],
    cons: ['Evenings and weekends are when students are available', 'Cancellations disrupt income without a clear policy', 'Limited by your available hours'],
    flags: ['Background checks are required for teaching children in most countries', 'Have a written cancellation policy from the first lesson'],
    tags: ['teaching', 'local', 'repeat-clients']
  },
  {
    id: 'expert-network', name: 'Expert network consultations', cat: 'teaching',
    tagline: 'Investors and consultants pay by the hour to ask someone who actually does your job.',
    summary: 'Expert networks broker one-hour calls between working professionals and clients doing research — investors, consultancies, corporate strategy teams. Rates run roughly $100–$300 an hour for mid-career professionals and $500 or more for senior specialists, with the network keeping the majority of what the client pays. What sells is current, specific operational knowledge — which vendors you evaluated, what a budget line actually covers, why a rollout failed — rather than seniority for its own sake. For most employed professionals it is the highest hourly rate reachable without building a business.',
    pay: [0, 600, 5000], cost: 'none', costLabel: '$0', speed: 'months', speedLabel: '1–4 months to first call',
    effort: 'passive', skill: 'advanced', where: 'online', scale: 1, risk: 1,
    likes: ['research', 'people', 'teaching'],
    platforms: [['GLG', 'https://glginsights.com'], ['AlphaSights', 'https://www.alphasights.com'], ['Guidepoint', 'https://www.guidepoint.com'], ['Third Bridge', 'https://www.thirdbridge.com']],
    steps: [
      'Register with several networks — each holds different client relationships, and rates for the same person differ substantially between them.',
      'Write your profile around specific operational detail: systems you have run, vendors you have chosen, budgets you have held.',
      'Set your rate deliberately and raise it over time; several networks will quietly accept more than their opening offer.',
      'Screen every request against your employment contract and confidentiality obligations before accepting a call.'
    ],
    pros: ['Exceptional hourly rate for a conversation you are already qualified to have', 'No preparation, marketing, or deliverable afterwards', 'Keeps you unusually well informed about your own industry'],
    cons: ['Call volume is unpredictable and invitations can be months apart', 'Compliance screening is lengthy and some requests must be declined', 'The network keeps most of what the client actually pays'],
    flags: ['Never disclose confidential, insider or material non-public information — this is exactly where expert network work becomes a securities offence', 'Check your employment contract; many employers restrict or forbid paid consultations in your own field'],
    tags: ['expertise', 'hourly', 'high-rate']
  },
  {
    id: 'personal-training', name: 'Personal training', cat: 'teaching',
    tagline: 'A three-to-six month certification, then $50–$100 an hour on your own schedule.',
    summary: 'Certification through a recognised body costs roughly $500–$1,400 and takes three to six months at a self-directed pace, with motivated people finishing in four to six weeks. Independent trainers charge $50–$100 an hour and more for specialisms, though roughly a quarter of gross disappears into business costs and tax. The route that breaks past your own hours is small-group training and online coaching, where you serve three or four people in the hour you were previously selling to one.',
    pay: [200, 1600, 6000], cost: 'low', costLabel: '$500–$1,400 certification', speed: 'months', speedLabel: '3–6 months',
    effort: 'active', skill: 'intermediate', where: 'hybrid', scale: 2, risk: 1,
    likes: ['physical', 'people', 'teaching'],
    platforms: [['NASM', 'https://www.nasm.org'], ['ACE', 'https://www.acefitness.org'], ['Trainerize', 'https://www.trainerize.com'], ['Nextdoor', 'https://nextdoor.com']],
    steps: [
      'Choose an accredited certification — NASM, ACE, ISSA or your country\'s recognised equivalent — and confirm local gyms and insurers accept it.',
      'Get liability insurance and a current first aid and CPR certificate before training a single paying client.',
      'Start by training clients outdoors, in their homes or in rented space rather than signing a gym floor contract.',
      'Move toward small groups and online programming, which is the only way to earn beyond the hours you can physically be present for.'
    ],
    pros: ['Clear, affordable certification path measured in months', 'Strong hourly rates and clients who stay for years', 'Small-group and online formats break the hourly ceiling'],
    cons: ['Early mornings and evenings, because that is when clients train', 'Income is capped by your physical hours and energy', 'Client attrition after the January surge is brutal'],
    flags: ['Never give nutrition, medical or rehabilitation advice beyond your scope of practice — this is where trainers get sued', 'Verify a certification is accredited before paying; unaccredited certificates are not accepted by gyms or insurers'],
    tags: ['short-training', 'fitness', 'hourly']
  },
  {
    id: 'swim-instruction', name: 'Swimming instruction', cat: 'teaching',
    tagline: 'A short instructor and lifesaving certificate, then year-round lesson demand.',
    summary: 'Instructor certification through a recognised body takes days to a few weeks and costs a few hundred dollars, usually alongside lifeguard and CPR qualifications. Private lessons bill $25–$60 an hour and small groups earn considerably more per hour of your time. Demand is unusually stable because parents treat swimming as a safety necessity rather than a hobby, so it does not soften with the economy the way other lessons do. Pool access, not finding students, is the practical constraint on this one.',
    pay: [150, 900, 3000], cost: 'low', costLabel: '$300–$700 certification', speed: 'weeks', speedLabel: '3–8 weeks',
    effort: 'active', skill: 'intermediate', where: 'local', scale: 2, risk: 1,
    likes: ['physical', 'teaching', 'people'],
    platforms: [['American Red Cross', 'https://www.redcross.org/take-a-class'], ['Swim England', 'https://www.swimming.org'], ['STA', 'https://www.sta.co.uk'], ['Nextdoor', 'https://nextdoor.com']],
    steps: [
      'Take the instructor award alongside lifeguard and CPR certification, which most pools require before letting you teach at all.',
      'Secure pool access first — a leisure centre contract, a swim school, or private pools by arrangement. This is the genuine bottleneck.',
      'Teach for an established school first to build hours and confidence before taking private clients of your own.',
      'Move toward small groups of three or four, which multiplies your income per hour without adding hours.'
    ],
    pros: ['Short, inexpensive certification with immediate local demand', 'Parents treat lessons as a safety necessity, so demand resists downturns', 'Small groups multiply earnings without extra hours'],
    cons: ['Pool access is the real constraint and can be genuinely hard to secure', 'Evenings and weekends, in hot and humid conditions', 'You are responsible for children\'s safety in water, which is serious'],
    flags: ['Never teach without current lifesaving and safeguarding certification and appropriate insurance — around children and water this is non-negotiable', 'Background checks are legally required for working with minors in most countries'],
    tags: ['short-training', 'teaching', 'local']
  },

  /* ---------------------------------------------------- ROYALTIES & LICENSING */
  {
    id: 'kdp-publishing', name: 'Self-publishing books', cat: 'royalty',
    tagline: 'Write books that keep selling for years, at a 35–70% royalty you set yourself.',
    summary: 'Self-publishing pays royalties of 35–70% versus roughly 10% traditionally, and you keep control. The reality is that a single book rarely earns much: authors who make real money publish in series within a genre readers binge — romance, thriller, cosy mystery, LitRPG — where each new release lifts sales of the whole backlist. Non-fiction in a professional niche sells fewer copies at higher prices and doubles as marketing for consulting work.',
    pay: [0, 300, 8000], cost: 'low', costLabel: '$300–$1,200 editing & cover', speed: 'long', speedLabel: '6–18 months',
    effort: 'passive', skill: 'intermediate', where: 'online', scale: 5, risk: 2,
    likes: ['writing', 'research'],
    platforms: [['Amazon KDP', 'https://kdp.amazon.com'], ['Draft2Digital', 'https://www.draft2digital.com'], ['Kobo Writing Life', 'https://www.kobo.com/writinglife'], ['IngramSpark', 'https://www.ingramspark.com']],
    steps: [
      'Choose a genre by reading what sells in it, and study the covers and blurbs of the current bestsellers.',
      'Pay for a professional cover and a real editor. These are the two costs worth every penny.',
      'Publish wide or go exclusive deliberately, understanding what each choice gives up.',
      'Plan a series. The second and third books are what make the first one profitable.'
    ],
    pros: ['Royalties arrive monthly for years with no further work', 'Complete creative and pricing control', 'A backlist is a genuine appreciating asset you can sell or license'],
    cons: ['You are the publisher, editor, marketer and advertiser', 'Most single books earn very little', 'Advertising skill matters as much as writing skill'],
    flags: ['Never pay a "publisher" to publish you — vanity presses take your money and your rights', 'Avoid contracts that claim rights beyond a specific book for a specific term'],
    tags: ['writing', 'royalties', 'passive']
  },
  {
    id: 'music-licensing', name: 'Music & sound licensing', cat: 'royalty',
    tagline: 'License tracks and sound design to videos, adverts, games and podcasts.',
    summary: 'Production music libraries pay $20–$300 per licence, and a sync placement in television or advertising pays $500–$20,000 plus performance royalties. Non-exclusive libraries let you place the same track in several catalogues at once. This suits composers who can produce consistently useful, well-mixed music to brief — emotive underscore, corporate optimism, tension beds — rather than personal artistic statements.',
    pay: [0, 200, 5000], cost: 'low', costLabel: '$200–$800 software & interface', speed: 'months', speedLabel: '3–9 months',
    effort: 'passive', skill: 'advanced', where: 'online', scale: 4, risk: 1,
    likes: ['audio', 'design'],
    platforms: [['Artlist', 'https://artlist.io'], ['Epidemic Sound', 'https://www.epidemicsound.com'], ['Musicbed', 'https://www.musicbed.com'], ['Pond5', 'https://www.pond5.com']],
    steps: [
      'Study what libraries actually request — they publish briefs, and writing to brief is the whole skill.',
      'Produce and mix to broadcast standard; poor mixing is the main rejection reason.',
      'Register with a performing rights organisation so you collect royalties when your music is broadcast.',
      'Submit to several non-exclusive libraries, and deliver stems and multiple lengths for every track.'
    ],
    pros: ['One track can earn licence fees for many years', 'No audience, touring or fanbase required', 'Fully remote and entirely merit-based'],
    cons: ['Needs genuine production and mixing skill', 'Libraries reject a lot, especially at first', 'AI-generated background music is compressing the low end of this market'],
    flags: ['Read exclusivity terms carefully — some libraries claim your track permanently', 'Never sign away your writer\'s share of performance royalties'],
    tags: ['music', 'licensing', 'royalties']
  },
  {
    id: 'indie-app', name: 'Indie apps & micro-SaaS', cat: 'royalty',
    tagline: 'Build a small tool that solves one problem, and charge a subscription for it.',
    summary: 'A product with 200 subscribers at $15 a month is $3,000 monthly recurring revenue with negligible costs — and 200 customers is a genuinely achievable number for a focused tool serving a specific profession. The path that works is unglamorous: solve a problem you personally have, sell to people like you, and stay small. Most failures come from building for months without talking to a single potential customer.',
    pay: [0, 600, 20000], cost: 'low', costLabel: '$50–$500 hosting & services', speed: 'long', speedLabel: '6–18 months',
    effort: 'semi', skill: 'advanced', where: 'online', scale: 5, risk: 2,
    likes: ['code', 'design', 'research'],
    platforms: [['Stripe', 'https://stripe.com'], ['Vercel', 'https://vercel.com'], ['Product Hunt', 'https://www.producthunt.com'], ['Indie Hackers', 'https://www.indiehackers.com']],
    steps: [
      'Find a problem in a field you know where people are currently paying with spreadsheets and frustration.',
      'Talk to ten potential customers before writing any code, and ask what they use today.',
      'Ship a deliberately narrow first version quickly and charge from day one — free users teach you nothing about willingness to pay.',
      'Grow through the communities those customers already inhabit rather than broad advertising.'
    ],
    pros: ['Recurring revenue compounds and is highly predictable', 'Very high margins with tiny running costs', 'Profitable micro-SaaS sells for 3–5x annual revenue'],
    cons: ['Requires real development skill and months of unpaid work', 'Support and maintenance never stop once you have customers', 'Distribution is much harder than building'],
    flags: ['Do not build for a year in secret — validate with paying customers early', 'Handle payment data through a proper processor; never store card details yourself'],
    tags: ['software', 'recurring', 'technical']
  },
  {
    id: 'audiobook-narration', name: 'Audiobook narration', cat: 'royalty',
    tagline: 'Record books for a flat fee, a royalty share, or both.',
    summary: 'Narration pays $50–$400 per finished hour depending on experience, or a royalty share where you earn a percentage of sales indefinitely. A typical novel is 8–12 finished hours and takes roughly four to six hours of work per finished hour once editing is included. Synthetic narration is taking the low end, which is pushing human narrators toward character-driven fiction and premium non-fiction where performance matters.',
    pay: [0, 500, 5000], cost: 'low', costLabel: '$200–$900 mic & treated space', speed: 'months', speedLabel: '2–6 months',
    effort: 'active', skill: 'intermediate', where: 'online', scale: 3, risk: 2,
    likes: ['audio', 'people', 'writing'],
    platforms: [['ACX', 'https://www.acx.com'], ['Findaway Voices', 'https://findawayvoices.com'], ['Voices.com', 'https://www.voices.com'], ['Bunny Studio', 'https://bunnystudio.com']],
    steps: [
      'Build a quiet recording space — a treated cupboard genuinely works and costs almost nothing.',
      'Record a professional demo covering two or three genres you can perform convincingly.',
      'Audition steadily on ACX; early on, take royalty-share projects to build a catalogue.',
      'Move to per-finished-hour rates once you have several completed titles and reviews.'
    ],
    pros: ['Royalty-share titles pay for years after the work is done', 'Fully remote with no client meetings', 'Voice skill transfers into advertising and e-learning work, which pay more'],
    cons: ['Editing and proofing take far longer than beginners expect', 'Royalty-share projects can earn almost nothing if the book does not sell', 'Synthetic voices are compressing rates at the low end'],
    flags: ['Read exclusivity terms on royalty-share contracts, which often run seven years', 'Never accept work requiring you to buy the producer\'s equipment or software'],
    tags: ['audio', 'royalties', 'voice']
  },
  {
    id: 'patent-licensing', name: 'Invention & patent licensing', cat: 'royalty',
    tagline: 'License an idea to a company that already manufactures and sells in that market.',
    summary: 'The realistic route for an independent inventor is licensing rather than manufacturing: a company pays you a royalty of typically 2–5% of net sales to make and sell your invention. Most ideas never license, and the process takes years. Included because it is legitimate and occasionally transformative — and because the industry surrounding it is full of predatory "invention promotion" firms that charge thousands and deliver nothing.',
    pay: [0, 0, 15000], cost: 'high', costLabel: '$2,000–$15,000 patent costs', speed: 'long', speedLabel: '1–4 years',
    effort: 'passive', skill: 'advanced', where: 'hybrid', scale: 5, risk: 5,
    likes: ['design', 'research', 'physical'],
    platforms: [['USPTO', 'https://www.uspto.gov'], ['UK IPO', 'https://www.gov.uk/government/organisations/intellectual-property-office'], ['InventRight', 'https://inventright.com'], ['Espacenet (prior art)', 'https://worldwide.espacenet.com']],
    steps: [
      'Search existing patents thoroughly before spending anything — most ideas already exist.',
      'File a cheap provisional application to establish a date while you test commercial interest.',
      'Build a simple prototype and a one-page sell sheet showing the benefit, not the mechanism.',
      'Approach companies already selling in that aisle, and use a proper licensing agreement drafted by an IP lawyer.'
    ],
    pros: ['Royalties can continue for the life of the patent with no further work', 'No manufacturing, inventory or distribution burden', 'A single successful licence can be genuinely life-changing'],
    cons: ['Patents are expensive and most never earn back their cost', 'Very long timescales with no income throughout', 'Enforcement against infringement is costly and often impractical'],
    flags: ['Invention promotion companies charging large up-front fees have an extremely poor record — many have been prosecuted for fraud', 'Never publicly disclose your invention before filing; in most countries that destroys patentability'],
    tags: ['ip', 'long-term', 'high-risk']
  },
  {
    id: 'beat-sales', name: 'Beat & sample pack sales', cat: 'royalty',
    tagline: 'License instrumentals and sound kits to other musicians, over and over again.',
    summary: 'Producers lease beats non-exclusively for $20–$100 each and sell exclusive rights for $300–$5,000, while sample packs and drum kits sell for $10–$40 to an audience of other producers. Non-exclusive leasing is the volume business — the same instrumental can be licensed to hundreds of different artists, which is what makes a catalogue behave like an asset. Income tracks catalogue size and how closely you match current genre demand far more than it tracks musical sophistication.',
    pay: [0, 250, 6000], cost: 'low', costLabel: '$150–$700 DAW & interface', speed: 'months', speedLabel: '2–8 months',
    effort: 'semi', skill: 'intermediate', where: 'online', scale: 4, risk: 1,
    likes: ['audio', 'selling'],
    platforms: [['BeatStars', 'https://www.beatstars.com'], ['Airbit', 'https://airbit.com'], ['Splice', 'https://splice.com'], ['Traktrain', 'https://traktrain.com']],
    steps: [
      'Pick a genre lane and study what is actually charting in it, since beat buyers search by the artist they want to sound like.',
      'Upload in volume with accurate tags and clear preview mixes — discovery on these platforms is entirely search-driven.',
      'Publish a tiered licence menu (non-exclusive, premium, exclusive) with the usage limits of each spelled out plainly.',
      'Repackage your best sounds into sample packs and drum kits, which sell to producers rather than artists and reach a different market.'
    ],
    pros: ['One instrumental can be licensed hundreds of times with no extra work', 'Catalogue income keeps arriving from beats you made years ago', 'Direct route into paid production credits and artist relationships'],
    cons: ['A very crowded market where most catalogues sell almost nothing', 'Needs constant new uploads to stay visible in search', 'Non-exclusive leases pay small amounts individually'],
    flags: ['Never sell beats containing uncleared samples — the liability follows you and the artist who licensed it', 'Understand exactly what each licence tier grants before selling; vague terms cause disputes when a track takes off'],
    tags: ['music', 'licensing', 'catalogue']
  },
  {
    id: 'game-assets', name: '3D models & game assets', cat: 'royalty',
    tagline: 'Build models, textures and tools once, then sell them to every developer who needs them.',
    summary: 'Asset marketplaces pay 50–88% royalty depending on platform and exclusivity, and a popular environment kit or character pack can earn $200–$3,000 a month for years. The reliable sellers are unglamorous production needs — modular buildings, foliage, props, rigged generic characters, editor tools that save developers a week — rather than showpieces. Technical quality bars are real and enforced: poor topology, unoptimised textures and missing levels of detail get submissions rejected.',
    pay: [0, 350, 6000], cost: 'none', costLabel: '$0 with free tools like Blender', speed: 'months', speedLabel: '3–9 months',
    effort: 'passive', skill: 'advanced', where: 'online', scale: 4, risk: 1,
    likes: ['design', 'code'],
    platforms: [['Unity Asset Store', 'https://assetstore.unity.com'], ['Fab', 'https://www.fab.com'], ['Blender Market', 'https://blendermarket.com'], ['CGTrader', 'https://www.cgtrader.com']],
    steps: [
      'Browse a marketplace by best-selling rather than newest, and note how ordinary the top sellers are.',
      'Build a modular pack rather than one hero model — developers buy kits they can assemble scenes from.',
      'Meet the platform technical standards exactly: clean topology, sensible naming, optimised textures, LODs and a demo scene.',
      'Support it after launch. Packs that get engine-version updates keep selling; abandoned ones die within a year.'
    ],
    pros: ['Genuinely passive once published, often earning for several years', 'Free professional tooling means no startup cost', 'Skills transfer directly into well-paid studio and freelance work'],
    cons: ['Requires real 3D or technical art expertise built over years', 'Engine updates force ongoing maintenance to stay compatible', 'Marketplace discovery is difficult without reviews'],
    flags: ['Confirm any scan, reference or texture source permits commercial redistribution before shipping it inside a pack', 'Several marketplaces restrict or ban AI-generated assets — read the submission terms before building a catalogue'],
    tags: ['3d', 'gamedev', 'passive']
  },
  {
    id: 'indie-game', name: 'Indie game development', cat: 'royalty',
    tagline: 'Ship one small, genuinely finished game and earn from every copy sold afterwards.',
    summary: 'Storefronts take around 30% and pay on a rolling schedule, and the earnings distribution is brutally top-heavy — the median game sells very few copies. What separates games that earn from games that do not is almost always scope: a tightly focused three to six hour game, finished and marketed, beats an ambitious project abandoned at 60%. Wishlists accumulated before launch are the single best predictor of first-week revenue, which means marketing has to start long before the game is done.',
    pay: [0, 200, 20000], cost: 'low', costLabel: '$100–$800 store fee & tools', speed: 'long', speedLabel: '1–3 years',
    effort: 'passive', skill: 'advanced', where: 'online', scale: 5, risk: 4,
    likes: ['code', 'design'],
    platforms: [['Steamworks', 'https://partner.steamgames.com'], ['itch.io', 'https://itch.io'], ['Godot', 'https://godotengine.org'], ['GameMaker', 'https://gamemaker.io']],
    steps: [
      'Scope down hard, then scope down again. Finishing something small is the rare skill, not having ideas.',
      'Put up a store page as early as you legitimately can and accumulate wishlists throughout development.',
      'Release a demo and take it to online festivals and events, which is where most indie visibility actually comes from.',
      'Launch with press and creator outreach prepared weeks in advance, since the first week determines the long tail.'
    ],
    pros: ['A finished game keeps selling for years with no further work', 'Free, professional-grade engines mean minimal startup cost', 'Complete creative ownership, plus console porting and publishing options later'],
    cons: ['Very long unpaid development with a genuinely high failure rate', 'Marketing matters as much as the game and most developers neglect it', 'Post-launch support, patches and refunds continue long after release'],
    flags: ['A "publisher" asking you to pay them to publish is not a publisher', 'Be careful with revenue-share contracts that commit no funding or marketing in return'],
    tags: ['gamedev', 'royalties', 'long-build']
  },

  /* ------------------------------------------------------ REWARDS & BONUSES */
  {
    id: 'bank-bonuses', name: 'Bank & brokerage switch bonuses', cat: 'rewards',
    tagline: 'Banks pay real money to move your account. Take it, then move again.',
    summary: 'Providers routinely pay $150–$500 to open and fund a current account, and brokerages pay similar or more for transferring investments. This is genuinely free money for an afternoon of paperwork, and the requirements are usually straightforward: fund the account, set up a couple of direct debits, keep it open for a few months. The only real discipline required is tracking the conditions and the dates.',
    pay: [0, 60, 400], cost: 'none', costLabel: '$0 (funding is returned)', speed: 'weeks', speedLabel: '4–12 weeks',
    effort: 'passive', skill: 'beginner', where: 'online', scale: 1, risk: 1,
    likes: ['finance', 'admin'],
    platforms: [['Doctor of Credit (US)', 'https://www.doctorofcredit.com'], ['MoneySavingExpert (UK)', 'https://www.moneysavingexpert.com/banking/'], ['NerdWallet', 'https://www.nerdwallet.com']],
    steps: [
      'Track current offers on a comparison site that lists the full terms rather than headline figures.',
      'Read the qualifying conditions precisely — minimum deposit, direct debits, and how long the account must stay open.',
      'Keep a simple spreadsheet of open dates, requirements met, and when you may safely close.',
      'Space applications a few months apart so the credit searches do not cluster.'
    ],
    pros: ['Genuinely free money for modest administration', 'No skill, capital risk or ongoing commitment', 'Repeatable every year as offers refresh'],
    cons: ['Each application usually leaves a mark on your credit file', 'Small absolute amounts, capped by how many accounts exist', 'Missing one condition forfeits the whole bonus'],
    flags: ['Never open accounts on behalf of someone else who "cannot" open their own — that is money laundering', 'Avoid this entirely in the months before a mortgage application'],
    tags: ['free-money', 'banking', 'admin']
  },
  {
    id: 'cashback', name: 'Cashback & rebate stacking', cat: 'rewards',
    tagline: 'Get a percentage back on spending you were going to do anyway.',
    summary: 'Cashback portals pay 1–15% back on online purchases, and stacking a portal with a rewards card and a retailer promotion routinely returns 8–20% on planned spending. Realistic value is $200–$900 a year for a household that shops online regularly. It is not income in the strict sense — it is a discount — but it is real money and it takes about ten seconds per purchase.',
    pay: [10, 45, 200], cost: 'none', costLabel: '$0', speed: 'weeks', speedLabel: '4–12 weeks to payout',
    effort: 'passive', skill: 'beginner', where: 'online', scale: 1, risk: 1,
    likes: ['admin', 'finance'],
    platforms: [['Rakuten', 'https://www.rakuten.com'], ['TopCashback', 'https://www.topcashback.com'], ['Quidco (UK)', 'https://www.quidco.com'], ['Honey', 'https://www.joinhoney.com']],
    steps: [
      'Join two portals and compare rates before every online purchase — they differ substantially per retailer.',
      'Always click through from the portal immediately before buying, or the sale will not track.',
      'Stack portal cashback with a rewards card and any retailer voucher code.',
      'Disable other coupon extensions during checkout; they can overwrite the tracking cookie and void your cashback.'
    ],
    pros: ['Effectively free money on spending you had already planned', 'Takes seconds once it is part of your routine', 'No risk, cost or commitment'],
    cons: ['It reduces spending rather than creating income', 'Payouts are slow, often taking months to confirm', 'Genuinely encourages unnecessary purchases if you are not careful'],
    flags: ['Never buy something you did not need for the cashback — that is a guaranteed net loss', 'Portals occasionally fail to track; keep order confirmations to raise claims'],
    tags: ['savings', 'free-money', 'shopping']
  },
  {
    id: 'card-rewards', name: 'Credit card rewards', cat: 'rewards',
    tagline: 'Points and sign-up bonuses on spending you already do — only if you clear the balance monthly.',
    summary: 'A sign-up bonus is commonly worth $500–$1,000 in points or travel value, and ongoing earning adds 1–5% back. This only works for people who pay the statement in full every single month; carrying a balance at 20%+ interest destroys the value many times over and this belongs nowhere near your plan if that is a risk. Used properly by a disciplined household it is one of the highest-value low-effort items available.',
    pay: [0, 70, 400], cost: 'none', costLabel: '$0–$695 annual fee', speed: 'months', speedLabel: '2–4 months',
    effort: 'passive', skill: 'intermediate', where: 'online', scale: 1, risk: 3,
    likes: ['finance', 'admin'],
    platforms: [['NerdWallet', 'https://www.nerdwallet.com/the-best-credit-cards'], ['The Points Guy', 'https://thepointsguy.com'], ['MoneySavingExpert (UK)', 'https://www.moneysavingexpert.com/credit-cards/']],
    steps: [
      'Be honest with yourself first — if there is any chance of carrying a balance, skip this entirely.',
      'Set up a full-balance direct debit before you make a single purchase on the card.',
      'Choose a card whose bonus you can hit with normal spending, never by manufacturing extra spending.',
      'Track annual fee renewal dates and cancel or downgrade before a fee you no longer justify.'
    ],
    pros: ['Substantial value from spending you were making anyway', 'Sign-up bonuses are worth hundreds for minimal effort', 'Adds purchase protection and travel insurance benefits'],
    cons: ['Catastrophic if you ever carry a balance', 'Applications affect your credit file', 'Annual fees eat the value on cards you underuse'],
    flags: ['Never spend more to reach a bonus threshold — the spending costs more than the reward is worth', 'Manufactured spending schemes can trigger account closure and forfeiture of all points'],
    tags: ['points', 'discipline', 'free-money']
  },
  {
    id: 'referrals', name: 'Referral programmes', cat: 'rewards',
    tagline: 'Get paid for recommending services you genuinely use to people who genuinely need them.',
    summary: 'Banks, brokers, insurers, software firms and energy providers pay $10–$200 per successful referral, and some business software pays recurring commission for the life of the customer. This works honestly when you are recommending something you actually use to someone who was going to need it anyway. It stops working — and starts costing you relationships — the moment it becomes spam.',
    pay: [0, 40, 600], cost: 'none', costLabel: '$0', speed: 'weeks', speedLabel: '2–8 weeks',
    effort: 'passive', skill: 'beginner', where: 'online', scale: 2, risk: 1,
    likes: ['selling', 'people', 'admin'],
    platforms: [['Wise', 'https://wise.com'], ['Revolut', 'https://www.revolut.com'], ['PartnerStack', 'https://www.partnerstack.com'], ['Notion', 'https://www.notion.so']],
    steps: [
      'List the services you already use and check whether each has a referral programme.',
      'Share your link only in genuinely relevant contexts, with a real explanation of why you use it.',
      'Keep the double-sided offers front of mind — referrals where the other person also benefits convert far better.',
      'Disclose that it is a referral link. It is required in many places and costs you nothing.'
    ],
    pros: ['Absolutely no cost or risk', 'Some software referrals pay recurring commission for years', 'Fits naturally into conversations you were already having'],
    cons: ['Very low earnings unless you have an audience', 'Easy to damage friendships by overdoing it', 'Programmes change or close without notice'],
    flags: ['If the reward comes from recruiting people rather than from them buying something, it is a pyramid scheme', 'Never create fake accounts to claim referral bonuses — that is fraud'],
    tags: ['referral', 'free-money', 'low-effort']
  },
  {
    id: 'focus-groups', name: 'Paid research studies & focus groups', cat: 'rewards',
    tagline: 'Companies pay properly for a couple of hours of your honest opinion.',
    summary: 'Market research and academic studies pay $50–$200 for a 60–90 minute session, and specialist panels — medical professionals, IT decision-makers, business owners — pay $200–$500 an hour. Clinical trials pay considerably more but carry genuine medical risk and belong in a different category of decision. For most people this is occasional rather than regular money, but the hourly rate is excellent when a study fits.',
    pay: [0, 120, 800], cost: 'none', costLabel: '$0', speed: 'weeks', speedLabel: '2–8 weeks',
    effort: 'active', skill: 'beginner', where: 'hybrid', scale: 1, risk: 1,
    likes: ['people', 'research'],
    platforms: [['Respondent', 'https://www.respondent.io'], ['User Interviews', 'https://www.userinterviews.com'], ['Prolific', 'https://www.prolific.com'], ['FocusGroup.com', 'https://focusgroup.com']],
    steps: [
      'Register with several panels and complete your profile fully — matching depends entirely on those details.',
      'Answer screening questions truthfully; panels blacklist people who fabricate qualifications, and rightly so.',
      'Prioritise professional panels if you have a specialist job — those studies pay several times consumer rates.',
      'Confirm the payment method and timeline before attending anything.'
    ],
    pros: ['Excellent hourly rate for what is essentially a conversation', 'No skill or preparation required', 'Genuinely interesting — you see products before launch'],
    cons: ['Highly irregular; you cannot plan around it', 'Screening rejections are frequent and unpaid', 'Payment can take weeks to arrive'],
    flags: ['A legitimate study never asks you to pay a fee or buy anything', 'Be cautious with any "study" requiring your bank login or a deposit — real panels pay by transfer, PayPal or gift card'],
    tags: ['research', 'fast-cash', 'no-experience']
  }
];

/* ============================================================ SAFETY CONTENT */

const RED_FLAGS = [
  ['You have to pay to start working', 'Legitimate work pays you. Upfront fees for "training kits", "certification", "background check processing" or "starter packages" are the single most common signature of a scam.'],
  ['Income comes from recruiting, not selling', 'If your earnings depend on how many people you sign up beneath you rather than on products sold to real customers, it is a pyramid scheme — illegal in most countries regardless of what the product is.'],
  ['Specific income promises with no conditions', '"Earn $500 a day guaranteed" is not optimism, it is a lie. Nobody can promise your results without knowing your skills, market or effort.'],
  ['Pressure to decide immediately', 'Fake urgency — "only three spots left", "price doubles tonight" — exists purely to stop you researching before paying.'],
  ['Money passing through your personal account', 'Being asked to receive payments, buy gift cards, or forward parcels makes you a money mule or reshipper. This is a criminal offence even if you were deceived.'],
  ['Vague about what the work actually is', 'If after reading everything you still cannot explain what you would do all day, the product being sold is the opportunity itself.'],
  ['Screenshots of earnings as the main proof', 'Dashboards are trivially faked and revenue is not profit. Ask for costs, hours and net figures; watch what happens next.'],
  ['They need your bank login, not your details', 'Payment needs an account number or PayPal address. Nobody legitimate needs your online banking password or a remote-access session.']
];

const GREEN_FLAGS = [
  ['A real customer pays for real value', 'You can point to who pays, what they receive, and why it is worth the money to them.'],
  ['You can start small and stop cheaply', 'Genuine opportunities let you test with limited time or money. Anything requiring a large irreversible commitment up front deserves suspicion.'],
  ['The downsides are stated plainly', 'Honest sources talk about failure rates, seasonality, costs and how long it takes. Only sales pages are relentlessly positive.'],
  ['Money moves in the right direction', 'Payment flows from the customer to you. Any fee you pay should buy a tool or a service you chose, not access to the work itself.'],
  ['Public, checkable track record', 'A registered company, real reviews across independent sites, named people with findable histories, and complaints that get answered.'],
  ['Clear written terms', 'Rates, payment timing, scope and cancellation are in writing before you start, and you are allowed to read them without pressure.']
];

const CHECKLIST = [
  'Search the company name with the words "scam", "not paying" and "review" — then read the complaints rather than the testimonials.',
  'Check the company is registered where it claims to be, and how long it has existed. New plus aggressive is a bad combination.',
  'Find the payment terms in writing before doing any work: how much, how measured, and how many days until it arrives.',
  'Look for people doing this a year ago and see what happened to them, not just the ones celebrating week one.',
  'Ask what happens if you stop. If leaving costs you money you have already earned, do not start.',
  'Run the numbers on your own real hourly rate after costs, unpaid admin and taxes — not the advertised gross figure.',
  'Check the tax, licensing and insurance obligations where you live before your first payment, not after.',
  'Never send money, gift cards or crypto to get paid. There is no legitimate arrangement that works that way.'
];

const FAQS = [
  ['Is any of this actually passive?', 'Very little, and the honest answer matters. Genuinely passive entries here — renting a parking space or storage, index funds, stock media after upload — either require an asset you already own or a large amount of front-loaded work. Everything marketed as "passive income" with no capital and no prior effort is a sales pitch. The realistic version is semi-passive: you build something over months, then maintain it for a few hours a week while it earns.'],
  ['How much can I realistically make in the first three months?', 'For most people starting from nothing: a few hundred dollars a month. The fast movers are service and local work — cleaning, tutoring, pet sitting, freelancing, delivery — because someone pays you directly for hours worked. Anything audience-based or asset-based takes six to eighteen months before it pays meaningfully. If you need money this month, pick from the "days" or "weeks" filter and ignore everything else for now.'],
  ['Do I have to pay tax on this?', 'Almost certainly yes, in every country. Side income is usually taxable from the first dollar, though many countries have a small tax-free trading allowance and specific reliefs for renting a room in your own home. Keep records of income and expenses from day one, set aside roughly 25–35% depending on where you live, and speak to an accountant once it becomes regular. This site is not tax advice.'],
  ['Which one should I start with?', 'Whichever one you can begin this week with what you already have. The most common failure is spending three months researching and zero weeks doing. Use the matcher, pick from the top three, give it 60 days of real effort, and judge it then. One stream done properly beats five started badly.'],
  ['Why is multi-level marketing not listed here?', 'Because MLM fails the core test this directory uses: income that depends on recruiting people beneath you is not a business, it is a transfer of money from newer participants to older ones. Published income disclosures from MLM companies themselves consistently show the large majority of participants lose money after expenses. Nothing here requires you to recruit anyone.'],
  ['Can I combine several of these?', 'Yes, and the sensible combination is one active earner plus one asset builder. The active one — freelancing, tutoring, local services — pays your bills now. The asset one — a content site, a digital product, a channel, a portfolio of stock work — is slow but keeps earning later. Trying to run four active income streams at once usually means doing all of them badly.'],
  ['What if I have no skills and no money?', 'Then start with the entries filtered to "none to start" and "days" — micro-tasks, user testing, delivery, cleaning, pet sitting, thrift flipping. None will make you rich, but they pay within days and require nothing but reliability. Use the first few hundred dollars and the confidence to fund something with a higher ceiling.'],
  ['How were these figures worked out?', 'They are researched ranges drawn from platform-published rates, industry surveys, and figures reported publicly by people doing the work — expressed as monthly USD for someone treating it seriously but not exceptionally. The low number is what a slow start looks like, the middle is a realistic outcome, and the high number is achievable but uncommon. Treat them as orientation, not forecasts.']
];

const ICONS = {
  video:     'M15 10.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3.5l6 4.5V6z',
  briefcase: 'M4 8h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zM9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3',
  bag:       'M6 8h12l1 12H5zM9 8V6a3 3 0 0 1 6 0v2',
  grid:      'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  key:       'M15 7a4 4 0 1 1-3.9 5H8v3H5v-3H3v-3h8.1A4 4 0 0 1 15 7z',
  chart:     'M4 20V10M10 20V4M16 20v-7M22 20H2',
  home:      'M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z',
  sprout:    'M12 21v-7.5M12 13.5c0-3.3-2.7-6-6-6 0 3.3 2.7 6 6 6zM12 13.5c0-3.9 3.1-7 7-7 0 3.9-3.1 7-7 7z',
  cap:       'M2 9l10-5 10 5-10 5zM6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5',
  music:     'M9 18V6l11-2v12M9 18a3 3 0 1 1-3-3M20 16a3 3 0 1 1-3-3',
  gift:      'M3 11h18v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zM3 7h18v4H3zM12 7v14M12 7S9 3 7 4.5 9 7 12 7zm0 0s3-4 5-2.5S15 7 12 7z'
};
