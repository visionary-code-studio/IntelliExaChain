export interface ChecklistItem {
  id: string;
  task: string;
  hint?: string;
  stage: string;
}

export interface ChecklistGroup {
  id: string;
  title: string;
  emoji: string;
  description: string;
  items: ChecklistItem[];
}

export const checklistGroups: ChecklistGroup[] = [
  {
    id: "eligibility",
    title: "Check Eligibility",
    emoji: "🔍",
    description: "Before anything else, make sure you are legally eligible to vote.",
    items: [
      { id: "c1", task: "Confirm I am of voting age (18+ in most countries)", hint: "Age requirements: India 18+, US 18+, UK 18+, Nepal 18+, Russia 18+", stage: "Before Registration" },
      { id: "c2", task: "Confirm I am a citizen of the country", hint: "Most countries require citizenship to vote in national elections.", stage: "Before Registration" },
      { id: "c3", task: "Check that I am not disqualified (e.g., criminal conviction)", hint: "Rules vary by country. Check your local election commission website.", stage: "Before Registration" },
    ],
  },
  {
    id: "registration",
    title: "Register to Vote",
    emoji: "📝",
    description: "Get yourself officially on the electoral roll before the deadline.",
    items: [
      { id: "c4", task: "Find the voter registration deadline for my country/state", hint: "India: months before; US: 15–30 days before; UK: 12 days before", stage: "Before Registration" },
      { id: "c5", task: "Check if I am already registered on the electoral roll", hint: "In India: voters.eci.gov.in | US: vote.gov | UK: gov.uk/register-to-vote", stage: "Before Registration" },
      { id: "c6", task: "Complete voter registration (online or in person)", hint: "Keep proof of registration / confirmation number safe.", stage: "Before Registration" },
      { id: "c7", task: "Ensure my address on the electoral roll is current", hint: "If you moved recently, you may need to update your registration.", stage: "Before Registration" },
      { id: "c8", task: "Receive and safely store my voter ID card", hint: "In India, this is your EPIC card. In the UK, a Voter Authority Certificate may be needed.", stage: "Before Registration" },
    ],
  },
  {
    id: "before-election",
    title: "Prepare Before Election Day",
    emoji: "📅",
    description: "Research candidates, understand your options, and plan your vote.",
    items: [
      { id: "c9", task: "Find my constituency and polling station", hint: "In India: voters.eci.gov.in | US: your state's election website | UK: gov.uk/polling-station-finder", stage: "Before Election Day" },
      { id: "c10", task: "Learn who the candidates are in my constituency", hint: "Check your election commission's official candidate list.", stage: "Before Election Day" },
      { id: "c11", task: "Read at least one party manifesto", hint: "Compare policies on issues you care about.", stage: "Before Election Day" },
      { id: "c12", task: "Fact-check major campaign claims", hint: "Use trusted fact-checking sites. Be skeptical of viral social media claims.", stage: "Before Election Day" },
      { id: "c13", task: "Understand the voting method used in my country", hint: "EVM (India), paper ballot (UK), optical scan or touchscreen (US varies by state)", stage: "Before Election Day" },
      { id: "c14", task: "Know what ID to bring to the polling station", hint: "India: EPIC or 12 alternative IDs | UK: Photo ID required since 2023 | US: varies by state", stage: "Before Election Day" },
    ],
  },
  {
    id: "election-day",
    title: "On Election Day",
    emoji: "🗳️",
    description: "Everything you need to do on the day of the vote.",
    items: [
      { id: "c15", task: "Pack required ID documents the night before", hint: "Don't leave this to the morning of election day.", stage: "On Election Day" },
      { id: "c16", task: "Check polling station address and opening hours", hint: "India: typically 7AM–6PM | UK: 7AM–10PM | US: varies by state", stage: "On Election Day" },
      { id: "c17", task: "Plan transport to the polling station", hint: "Allow extra time during peak hours.", stage: "On Election Day" },
      { id: "c18", task: "Arrive at the polling station before it closes", hint: "If you are in the queue before closing time, you are entitled to vote in most countries.", stage: "On Election Day" },
      { id: "c19", task: "Present my voter ID to polling officials", hint: "Your name will be verified against the electoral roll.", stage: "On Election Day" },
      { id: "c20", task: "Cast my vote in the private polling booth", hint: "Your vote is completely secret. No one can see who you voted for.", stage: "On Election Day" },
      { id: "c21", task: "Confirm ink mark on finger (if applicable)", hint: "India uses indelible ink on the left index finger as proof of voting.", stage: "On Election Day" },
    ],
  },
  {
    id: "after-voting",
    title: "After Voting",
    emoji: "🏆",
    description: "The election is not over when you vote — stay engaged.",
    items: [
      { id: "c22", task: "Follow official election results from verified sources", hint: "India: ECI results portal | US: AP/Reuters | UK: BBC Election Night coverage", stage: "After Voting" },
      { id: "c23", task: "Find out who won in my constituency", hint: "Check your election commission's results page.", stage: "After Voting" },
      { id: "c24", task: "Note how to contact my elected representative", hint: "In India: mpseva.gov.in | US: congress.gov | UK: parliament.uk/find-your-mp", stage: "After Voting" },
      { id: "c25", task: "Stay engaged with civic issues throughout the term", hint: "Democracy doesn't end on election day. Hold your representatives accountable.", stage: "After Voting" },
    ],
  },
];

export const allItems: ChecklistItem[] = checklistGroups.flatMap((g) => g.items);
