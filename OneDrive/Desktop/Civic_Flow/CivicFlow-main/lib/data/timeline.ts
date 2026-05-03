export interface TimelineStage {
  id: number;
  slug: string;
  phase: string;
  title: string;
  shortTitle: string;
  emoji: string;
  color: string;
  duration: string;
  summary: string;
  description: string;
  whatHappens: string[];
  whyItMatters: string;
  voterAction: string[];
  commonMistakes: string[];
  checklistItems: string[];
  faq: { question: string; answer: string }[];
  countryNotes: { country: string; flag: string; note: string }[];
}

export const timelineStages: TimelineStage[] = [
  {
    id: 1, slug: "voter-registration", phase: "Pre-Election", title: "Voter Registration", shortTitle: "Registration", emoji: "📝", color: "#D97706", duration: "Months before election",
    summary: "Citizens officially enroll to be eligible to vote in the upcoming election.",
    description: "Voter registration is the formal process by which eligible citizens add their name to the official electoral roll. Without registration, you cannot vote. Registration deadlines vary widely by country — from weeks before the election to same-day registration.",
    whatHappens: ["Citizens submit their personal details (name, age, address, ID) to electoral authorities", "The electoral roll is compiled and verified by election officials", "Registered voters receive a voter ID or confirmation", "Objections can be filed against incorrect entries"],
    whyItMatters: "Registration ensures that only eligible citizens vote and that each person votes only once.",
    voterAction: ["Check if you are already registered on the electoral roll", "Register online or at your local government office before the deadline", "Ensure your address and details are current", "Keep your voter ID card safe after receiving it"],
    commonMistakes: ["Missing the registration deadline", "Using an outdated address", "Not checking if already registered", "Losing voter ID after receiving it"],
    checklistItems: ["Verify my eligibility (age, citizenship)", "Check if I am already on the electoral roll", "Complete voter registration before deadline", "Receive and safely store my voter ID/card"],
    faq: [
      { question: "What documents do I need to register?", answer: "Typically a government-issued ID (national ID, passport, or birth certificate), proof of address, and proof of citizenship. Requirements vary by country." },
      { question: "What is the deadline for voter registration?", answer: "Deadlines vary. In India, registration closes about 3–4 months before elections. In the US, most states require registration 15–30 days before. Always check your official election commission website." },
      { question: "Can I register online?", answer: "Many countries now offer online registration — including India (voters.eci.gov.in), the US (vote.gov), and the UK (gov.uk/register-to-vote)." },
    ],
    countryNotes: [
      { country: "India", flag: "🇮🇳", note: "Register via the Election Commission of India at voters.eci.gov.in. The electoral roll is updated regularly." },
      { country: "United States", flag: "🇺🇸", note: "Registration rules vary by state. Most states require registration 15–30 days before election day." },
      { country: "United Kingdom", flag: "🇬🇧", note: "Register online at gov.uk/register-to-vote. The deadline is usually 12 days before election day." },
      { country: "Nepal", flag: "🇳🇵", note: "Voter registration is ongoing. Contact your local ward office. Biometric registration has been introduced." },
      { country: "Russia", flag: "🇷🇺", note: "Registration is automatic for citizens based on their permanent address registration (propiska). No separate action needed." },
    ],
  },
  {
    id: 2, slug: "candidate-nomination", phase: "Pre-Election", title: "Candidate Nomination", shortTitle: "Nomination", emoji: "🏛️", color: "#B45309", duration: "Weeks to months before election",
    summary: "Individuals and parties file to officially run for elected positions.",
    description: "Nomination is the legal process by which individuals declare their candidacy for public office. Candidates must meet eligibility criteria and file nomination papers with the election authority, sometimes with a refundable deposit.",
    whatHappens: ["Political parties select and announce their candidates", "Independent candidates file nomination papers", "Nomination papers are scrutinized for validity", "Final list of candidates is published publicly"],
    whyItMatters: "The nomination process ensures candidates meet legal requirements and that voters know who is running before casting their ballot.",
    voterAction: ["Learn who is running in your constituency", "Research the background of each candidate", "Check your candidate's party affiliation and manifesto"],
    commonMistakes: ["Not knowing who represents your constituency", "Confusing national and local election candidates"],
    checklistItems: ["Find my constituency or electoral district", "Look up the list of candidates for my area", "Research each candidate's background and platform"],
    faq: [
      { question: "Who can become a candidate?", answer: "Generally: a citizen of minimum age (18–35 depending on the position and country), a registered voter, and not disqualified by law (e.g., criminal conviction)." },
      { question: "What is a security deposit?", answer: "Many countries require candidates to pay a refundable deposit (e.g., ₹25,000 in India for Lok Sabha). It is forfeited if the candidate receives too few votes." },
      { question: "What is a primary election?", answer: "A primary (used in the US) is an internal election within a party where party members vote for who will represent the party in the main election." },
    ],
    countryNotes: [
      { country: "India", flag: "🇮🇳", note: "Candidates file nominations with the Returning Officer. Deposit: ₹25,000 for Lok Sabha, ₹10,000 for state assemblies." },
      { country: "United States", flag: "🇺🇸", note: "Candidates run in party primaries first, then the general election. Filing requirements vary by state and office." },
      { country: "United Kingdom", flag: "🇬🇧", note: "Candidates submit a nomination form signed by 10 registered voters and pay a £500 deposit." },
      { country: "Iran", flag: "🇮🇷", note: "Candidates must be vetted and approved by the Guardian Council before their nomination is accepted." },
      { country: "North Korea", flag: "🇰🇵", note: "A single candidate per constituency is nominated by the Korean Workers' Party. There is no multi-party competition." },
    ],
  },
  {
    id: 3, slug: "campaign-period", phase: "Pre-Election", title: "Campaign Period", shortTitle: "Campaigns", emoji: "📢", color: "#92400E", duration: "Weeks before election",
    summary: "Candidates and parties campaign to win public support and votes.",
    description: "The campaign period is the time between official nomination and election day, during which candidates make their case to voters through speeches, rallies, advertisements, and debates. Campaign finance rules and code of conduct apply.",
    whatHappens: ["Candidates hold rallies, public meetings, and door-to-door canvassing", "Political advertising runs on TV, radio, print, and digital media", "Election commissions enforce campaign finance limits", "Model Code of Conduct (or equivalent) takes effect", "Debates may be held between candidates"],
    whyItMatters: "The campaign period gives voters the chance to compare candidates, hear their plans, and make an informed decision on election day.",
    voterAction: ["Attend rallies or watch debates to understand candidate positions", "Read party manifestos and policy documents", "Be critical of campaign promises — fact-check claims", "Beware of disinformation and verify news from official sources"],
    commonMistakes: ["Believing all campaign promises without scrutiny", "Sharing unverified viral claims during the campaign", "Not reading the actual party manifesto"],
    checklistItems: ["Read party manifestos for candidates in my area", "Watch at least one candidate debate or town hall", "Fact-check key claims made by candidates"],
    faq: [
      { question: "What is the Model Code of Conduct (MCC)?", answer: "In India, the MCC is a set of guidelines issued by the Election Commission of India that governs the conduct of political parties and candidates during elections. It bans using government resources for campaigning." },
      { question: "Are there spending limits on campaigns?", answer: "Yes. Most countries impose campaign spending limits. In India, candidates for Lok Sabha are limited to ~₹75 lakh per constituency. In the UK, candidates face strict spending caps." },
      { question: "What is a campaign silence period?", answer: "Many countries ban campaigning in the 24–48 hours before polls open to give voters time to reflect. No rallies, advertisements, or canvassing is allowed during this period." },
    ],
    countryNotes: [
      { country: "India", flag: "🇮🇳", note: "The Model Code of Conduct comes into force when elections are announced. Campaign silence applies 48 hours before polls close." },
      { country: "United States", flag: "🇺🇸", note: "Campaign finance is regulated by the FEC. Super PACs can raise unlimited funds. No formal silence period exists." },
      { country: "United Kingdom", flag: "🇬🇧", note: "Strict spending limits apply to parties and candidates. The Electoral Commission regulates donations and spending." },
      { country: "Italy", flag: "🇮🇹", note: "Election campaign silence (silenzio elettorale) applies 24 hours before polls open. TV political advertising is closely regulated." },
    ],
  },
  {
    id: 4, slug: "election-announcement", phase: "Pre-Election", title: "Election Announcement", shortTitle: "Announcement", emoji: "📅", color: "#D97706", duration: "Months before election",
    summary: "The official announcement of the election date and schedule by authorities.",
    description: "The formal announcement of an election, including dates, schedule, and rules, is made by the election authority. This triggers the official election process, including the Model Code of Conduct and nomination timelines.",
    whatHappens: ["The election commission announces official election dates", "The election schedule is published", "Model Code of Conduct comes into effect", "Polling constituencies and voter lists are finalized"],
    whyItMatters: "The announcement sets the legal clock running for all subsequent election processes and puts candidates, parties, media, and voters on notice.",
    voterAction: ["Note the election date and mark it in your calendar", "Check that your voter registration is current", "Find out your polling booth location"],
    commonMistakes: ["Missing the election date announcement", "Not checking your updated polling booth location"],
    checklistItems: ["Note the official election date", "Confirm my polling booth location", "Ensure my voter ID is valid and available"],
    faq: [
      { question: "Who announces elections?", answer: "In most democracies, an independent Election Commission announces elections. In India, the ECI is constitutionally independent. In the US, states conduct their own elections." },
      { question: "How far in advance is an election announced?", answer: "In India, elections are typically announced 4–6 weeks before voting begins. In the UK, a general election can be called with as little as 25 days' notice." },
    ],
    countryNotes: [
      { country: "India", flag: "🇮🇳", note: "The ECI issues a press notification and the election schedule. The MCC comes into effect immediately." },
      { country: "United Kingdom", flag: "🇬🇧", note: "Parliament is dissolved and a writ is issued. The statutory minimum campaign period is 25 working days." },
      { country: "United States", flag: "🇺🇸", note: "Federal election dates are fixed by law (first Tuesday after first Monday in November). No formal announcement is needed." },
    ],
  },
  {
    id: 5, slug: "polling-day-preparation", phase: "Election Day", title: "Polling Day Preparation", shortTitle: "Preparation", emoji: "🗳️", color: "#B45309", duration: "Day before & morning of election",
    summary: "Voters, officials, and booths prepare for election day.",
    description: "In the hours and day before polling opens, election officials set up polling booths, seal EVMs or prepare paper ballots, and brief polling agents. Voters should check their documents and find their polling station before going in.",
    whatHappens: ["Polling stations are set up and sealed by election officials", "EVMs or ballot papers are prepared and sealed", "Polling agents from each party are permitted at booths", "Security forces are deployed at booths", "Voters are notified of their booth number"],
    whyItMatters: "Proper preparation ensures a smooth, fraud-free voting day. Voters who prepare in advance can vote quickly and confidently.",
    voterAction: ["Locate your polling station via your voter slip or official portal", "Gather required documents: voter ID, Aadhaar (India), passport, or designated ID", "Plan your transport to arrive without rushing"],
    commonMistakes: ["Arriving at the wrong polling station", "Not bringing the required ID documents", "Forgetting to check polling hours"],
    checklistItems: ["Find and note my exact polling station address", "Pack required ID documents the night before", "Know the polling station opening and closing times", "Plan transport to the polling station"],
    faq: [
      { question: "What time do polling stations open?", answer: "Hours vary. In India, polls typically open 7:00 AM and close 6:00 PM. In the US, hours vary by state (usually 6 AM–8 PM). In the UK, polls are open 7:00 AM–10:00 PM." },
      { question: "Can I bring someone to help me vote?", answer: "Yes — most countries allow a companion for voters with disabilities or literacy difficulties. The companion cannot influence your vote." },
    ],
    countryNotes: [
      { country: "India", flag: "🇮🇳", note: "Voters need their EPIC (Voter ID card) or any of 12 accepted alternative IDs. Find your booth on voters.eci.gov.in." },
      { country: "United States", flag: "🇺🇸", note: "ID requirements vary by state. Some states require photo ID; others accept signatures. Check vote.gov for your state." },
      { country: "United Kingdom", flag: "🇬🇧", note: "Photo ID is now required to vote at UK polling stations (introduced 2023). Accepted IDs include passport, driving licence, and Voter Authority Certificate." },
    ],
  },
  {
    id: 6, slug: "voting-process", phase: "Election Day", title: "The Voting Process", shortTitle: "Voting", emoji: "✅", color: "#16A34A", duration: "Election day",
    summary: "Citizens cast their votes at designated polling stations.",
    description: "Voting is the act of casting your ballot to choose your preferred candidate. The process differs by country — electronic voting machines (EVMs), paper ballots, postal voting, or online voting. In all cases, the voter's identity is verified, they are given a ballot, and they cast their vote in secret.",
    whatHappens: ["Voter arrives at polling station and presents ID", "Name is verified against the electoral roll", "Voter enters the private booth and makes their choice", "Voter casts their ballot (presses EVM button or marks paper ballot)", "Voter receives ink mark on finger as proof of voting"],
    whyItMatters: "Casting a vote is your fundamental democratic right. Every vote counts — elections can be won or lost by very small margins.",
    voterAction: ["Arrive at your polling station with required ID", "Queue patiently and follow booth instructions", "Vote for YOUR chosen candidate — no one can see your vote"],
    commonMistakes: ["Going to the wrong polling station", "Taking a photo of your ballot (usually prohibited)", "Being influenced or pressured by others"],
    checklistItems: ["Arrive at polling station on time", "Present my voter ID", "Cast my vote confidently", "Check for ink mark on finger as confirmation"],
    faq: [
      { question: "Is my vote secret?", answer: "Yes. Your vote is completely secret. No one — not election officials, family, or employer — can see who you voted for. The secret ballot is a fundamental democratic protection." },
      { question: "What if I make a mistake on the ballot?", answer: "In paper ballot systems, you can usually request a new ballot from the presiding officer. In EVM systems, vote carefully as the choice is final once confirmed." },
      { question: "What is NOTA?", answer: "NOTA (None of the Above) is an option in India and some other countries allowing voters to officially reject all candidates without abstaining." },
    ],
    countryNotes: [
      { country: "India", flag: "🇮🇳", note: "India uses Electronic Voting Machines (EVMs) with a Voter-Verified Paper Audit Trail (VVPAT). Indelible ink is applied to the left index finger." },
      { country: "United States", flag: "🇺🇸", note: "Voting methods vary by state: optical scan paper ballots, touchscreen machines, or punch cards. Mail-in/absentee voting is widely available." },
      { country: "United Kingdom", flag: "🇬🇧", note: "Paper ballots — voters mark an 'X' next to their chosen candidate. Counted by hand after polls close." },
      { country: "North Korea", flag: "🇰🇵", note: "One candidate per seat. Voting is near-universal as abstaining carries social and political risk. There is no meaningful electoral choice." },
      { country: "Iran", flag: "🇮🇷", note: "Paper ballots. Only candidates approved by the Guardian Council may stand. Voters choose from a pre-vetted list." },
    ],
  },
  {
    id: 7, slug: "vote-counting", phase: "Post-Election", title: "Vote Counting", shortTitle: "Counting", emoji: "🔢", color: "#D97706", duration: "Hours to days after polls close",
    summary: "Votes are tallied by election officials under official and party observation.",
    description: "After polls close, ballot boxes and EVMs are transported under security to counting centers. Counting is done by trained election officials in the presence of candidate representatives and observers. The process is carefully documented and subject to challenge if irregularities are found.",
    whatHappens: ["Polling stations close and all materials are sealed", "Ballot boxes/EVMs are transported to counting centers", "Counting agents from all parties are present to observe", "Votes are counted in rounds, with results tabulated", "In close races, recounts may be requested"],
    whyItMatters: "Transparent counting is the foundation of electoral trust. Observers, candidates, and the public all have a right to see that votes are counted accurately.",
    voterAction: ["Follow count results via official election commission websites or trusted news", "Be patient — counting can take hours or days", "Avoid sharing unofficial or speculative results before they are confirmed"],
    commonMistakes: ["Sharing unofficial early results as confirmed", "Believing social media projections as final results"],
    checklistItems: ["Note when results are expected to be announced", "Follow results via official sources only"],
    faq: [
      { question: "How long does counting take?", answer: "Indian Lok Sabha results are usually in within one day of counting. US presidential counts can take days as mail ballots are processed. UK results are often declared within hours of polls closing." },
      { question: "Can a candidate request a recount?", answer: "Yes. In most countries, candidates can request a recount if the margin is very small or if they believe there was an error." },
      { question: "Who observes the count?", answer: "Counting agents from each candidate/party, election observers (national and international), and accredited media all observe the count to ensure transparency." },
    ],
    countryNotes: [
      { country: "India", flag: "🇮🇳", note: "EVM counts begin on the announced counting day. Counting agents from all parties are present. VVPAT slips are verified in a sample of booths." },
      { country: "United States", flag: "🇺🇸", note: "Counting varies by state. Some states begin before election day (early/absentee ballots). Race calls are made by media, but official certification takes weeks." },
      { country: "United Kingdom", flag: "🇬🇧", note: "Paper ballots are counted by hand, typically overnight on election night. Most results are declared by early morning." },
      { country: "Italy", flag: "🇮🇹", note: "Paper ballots counted at the polling station itself. Results are publicly posted and transmitted to central authorities." },
    ],
  },
  {
    id: 8, slug: "result-declaration", phase: "Post-Election", title: "Result Declaration", shortTitle: "Results", emoji: "🏆", color: "#16A34A", duration: "Day of/after counting",
    summary: "Official election results are announced and winners are certified.",
    description: "After votes are counted, the election authority officially declares the results. Winning candidates are certified and notified. Losing candidates may concede or file election petitions. Government formation begins after a general election.",
    whatHappens: ["Election commission officially declares winning candidates", "Winners receive official certificates of election", "Defeated candidates may concede or file election petitions in court", "For legislative elections: the new legislature is constituted", "For executive elections: new government formation begins"],
    whyItMatters: "The peaceful acceptance and official certification of results is a cornerstone of democracy. It ensures a legitimate transfer of power.",
    voterAction: ["Accept election results through proper democratic processes", "Engage with your elected representative after they take office", "Hold elected officials accountable throughout their term"],
    commonMistakes: ["Confusing projected results with official certified results", "Not understanding the difference between winning an election and forming a government"],
    checklistItems: ["Find out who won in my constituency", "Learn how to contact my newly elected representative"],
    faq: [
      { question: "What is an election petition?", answer: "An election petition is a legal challenge filed in court by a losing candidate or voter claiming that the election was conducted improperly or with fraud. Courts can uphold or overturn results." },
      { question: "What happens after a legislative election?", answer: "The party or coalition with a majority forms the government. In a parliamentary system (India, UK), the leader of the majority party is invited to form the government and is sworn in as Prime Minister." },
      { question: "What is a hung parliament/legislature?", answer: "When no party wins an outright majority, the result is a 'hung parliament' (UK) or 'hung assembly' (India). Coalition negotiations then determine who forms the government." },
    ],
    countryNotes: [
      { country: "India", flag: "🇮🇳", note: "Results are declared by the Returning Officer. The party with a majority (272+ of 543 Lok Sabha seats) is invited to form government by the President." },
      { country: "United States", flag: "🇺🇸", note: "States certify results over weeks. The Electoral College meets in December. Congress certifies the presidential election result in January." },
      { country: "United Kingdom", flag: "🇬🇧", note: "The leader of the party winning a majority is invited by the monarch to form government. They move into 10 Downing Street immediately." },
      { country: "Nepal", flag: "🇳🇵", note: "The Election Commission announces results. Coalition politics often follows, requiring negotiation to form a government." },
      { country: "Russia", flag: "🇷🇺", note: "The Central Election Commission certifies results. Presidential results are certified within 10 days of election day." },
    ],
  },
];

export function getStageBySlug(slug: string): TimelineStage | undefined {
  return timelineStages.find((s) => s.slug === slug);
}

export function getAdjacentStages(slug: string): {
  prev: TimelineStage | null;
  next: TimelineStage | null;
} {
  const index = timelineStages.findIndex((s) => s.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? timelineStages[index - 1] : null,
    next: index < timelineStages.length - 1 ? timelineStages[index + 1] : null,
  };
}
