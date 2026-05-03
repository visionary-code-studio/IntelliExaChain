export interface GlossaryTerm {
  term: string;
  definition: string;
  example: string;
  relatedTerms?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  { term: "Absentee Ballot", definition: "A ballot cast by a voter who is unable to attend their polling station in person on election day. Usually submitted by mail or early in-person.", example: "A soldier stationed abroad used an absentee ballot to vote in the national election.", relatedTerms: ["Postal Vote", "Early Voting"] },
  { term: "Ballot", definition: "The official document (paper or digital) that a voter uses to make their choices in an election.", example: "The voter carefully marked her ballot before placing it in the ballot box.", relatedTerms: ["Ballot Box", "Spoiled Ballot"] },
  { term: "Ballot Box", definition: "The sealed container in which voters deposit their completed paper ballots at the polling station.", example: "Election officials sealed the ballot box before transporting it to the counting center.", relatedTerms: ["Ballot", "EVM"] },
  { term: "By-Election", definition: "An election held outside of a general election cycle to fill a vacant seat, usually caused by the death, resignation, or disqualification of the previous holder.", example: "After the MP resigned, a by-election was scheduled to fill the vacant constituency seat.", relatedTerms: ["General Election", "Constituency"] },
  { term: "Campaign", definition: "The organized effort by a candidate or party to win votes, including speeches, advertisements, door-to-door canvassing, and debates.", example: "The campaign team organized rallies across the state to reach more voters.", relatedTerms: ["Candidate", "Manifesto"] },
  { term: "Candidate", definition: "A person who formally stands for election to a public office.", example: "There were five candidates on the ballot for the mayoral election.", relatedTerms: ["Nomination", "Campaign"] },
  { term: "Coalition", definition: "An alliance of two or more political parties that together hold a majority and agree to jointly govern.", example: "No single party won a majority, so three parties formed a coalition government.", relatedTerms: ["Hung Parliament", "Majority"] },
  { term: "Constituency", definition: "A geographic area whose registered voters elect a representative to a legislative body.", example: "She was elected as the MP for the North Mumbai constituency.", relatedTerms: ["Electoral District", "Candidate"] },
  { term: "Counting Agent", definition: "A representative appointed by a candidate or party to observe the counting process and ensure it is conducted fairly.", example: "Each candidate was allowed two counting agents in the counting hall.", relatedTerms: ["Election Observer", "Vote Counting"] },
  { term: "Election Commission", definition: "The independent government body responsible for conducting and overseeing elections, registering voters, and certifying results.", example: "The Election Commission of India announced the election schedule for the general election.", relatedTerms: ["Returning Officer", "Electoral Roll"] },
  { term: "Election Observer", definition: "An independent individual or organization that monitors the election process to verify it is free and fair.", example: "International election observers were present to assess whether the vote was conducted fairly.", relatedTerms: ["Counting Agent", "Election Commission"] },
  { term: "Electoral Roll", definition: "The official list of all registered voters in a constituency or country, also called the voters' list or register.", example: "She checked the electoral roll to confirm her name was included before election day.", relatedTerms: ["Voter Registration", "Constituency"] },
  { term: "EVM (Electronic Voting Machine)", definition: "An electronic device used to cast and record votes, replacing traditional paper ballots. Used extensively in India.", example: "The voter pressed the button next to her chosen candidate's name on the EVM.", relatedTerms: ["VVPAT", "Ballot"] },
  { term: "Exit Poll", definition: "A survey of voters conducted immediately after they have voted, used to predict election outcomes before official results are announced.", example: "The exit polls suggested a close race, but the final result was a clear victory.", relatedTerms: ["Opinion Poll", "Result Declaration"] },
  { term: "First-Past-the-Post (FPTP)", definition: "An electoral system in which the candidate with the most votes in a constituency wins, even if they do not have more than 50% of votes.", example: "Under the first-past-the-post system, the candidate with 35% of the vote won over two opponents.", relatedTerms: ["Proportional Representation", "Majority"] },
  { term: "Franchise", definition: "The legal right of citizens to vote in elections; also called suffrage.", example: "Universal franchise means every adult citizen has the right to vote, regardless of wealth or gender.", relatedTerms: ["Suffrage", "Voter Registration"] },
  { term: "General Election", definition: "A nationwide election in which all or most members of a legislature are elected at the same time.", example: "In the general election, over 960 million voters were eligible to cast their ballots.", relatedTerms: ["By-Election", "Constituency"] },
  { term: "Hung Parliament", definition: "A situation in which no single party wins an outright majority of seats in the legislature after an election.", example: "The hung parliament led to weeks of coalition negotiations before a government was formed.", relatedTerms: ["Coalition", "Majority"] },
  { term: "Indelible Ink", definition: "A special ink applied to a voter's finger at the polling station to prevent them from voting more than once.", example: "After voting, the voter displayed her inked finger as proof she had cast her ballot.", relatedTerms: ["Polling Station", "Voter ID"] },
  { term: "Manifesto", definition: "A formal public statement of a political party's policies, plans, and promises to voters, usually released before an election.", example: "The party's manifesto promised free healthcare, infrastructure investment, and education reforms.", relatedTerms: ["Campaign", "Party"] },
  { term: "Nomination", definition: "The official process by which a candidate formally declares their intention to stand for election by submitting required papers to election authorities.", example: "The deadline for filing nomination papers is 30 days before election day.", relatedTerms: ["Candidate", "Security Deposit"] },
  { term: "NOTA (None of the Above)", definition: "A ballot option that allows voters to formally reject all candidates without abstaining from voting. Available in India and some other countries.", example: "Fed up with all candidates, the voter selected NOTA on the electronic voting machine.", relatedTerms: ["Ballot", "Abstain"] },
  { term: "Opinion Poll", definition: "A survey conducted before an election to gauge voter intentions and predict the outcome.", example: "Opinion polls showed the incumbent trailing by 8 percentage points a week before the vote.", relatedTerms: ["Exit Poll", "Campaign"] },
  { term: "Polling Booth", definition: "The small private enclosure at a polling station where a voter casts their ballot in secrecy.", example: "The voter entered the polling booth alone to ensure the secrecy of her vote.", relatedTerms: ["Polling Station", "Secret Ballot"] },
  { term: "Polling Station", definition: "The official location, usually a school, community hall, or government building, where voters go to cast their ballots on election day.", example: "Her polling station was at the local primary school, two streets from her home.", relatedTerms: ["Polling Booth", "Electoral Roll"] },
  { term: "Postal Vote", definition: "A ballot cast by sending it through the mail, used by voters who cannot attend their polling station in person.", example: "Elderly voters in remote areas used postal votes to participate in the election.", relatedTerms: ["Absentee Ballot", "Early Voting"] },
  { term: "Proportional Representation (PR)", definition: "An electoral system in which parties gain seats in proportion to the number of votes they receive, rather than winner-takes-all.", example: "Under proportional representation, a party that wins 30% of the national vote receives about 30% of parliamentary seats.", relatedTerms: ["First-Past-the-Post", "Constituency"] },
  { term: "Recount", definition: "The process of counting votes a second time, usually requested when the margin of victory is very small or there is a dispute over the result.", example: "The candidate requested a recount after losing by just 47 votes.", relatedTerms: ["Vote Counting", "Election Petition"] },
  { term: "Referendum", definition: "A direct vote by the electorate on a specific policy question or proposed law, rather than to elect a representative.", example: "The country held a referendum on whether to leave the European Union.", relatedTerms: ["General Election", "Ballot"] },
  { term: "Returning Officer", definition: "The official responsible for managing the election process in a specific constituency, including accepting nominations, overseeing polling, and declaring results.", example: "The Returning Officer declared the winner after all votes in the constituency were counted.", relatedTerms: ["Election Commission", "Result Declaration"] },
  { term: "Secret Ballot", definition: "The principle that a voter's choices are kept confidential and cannot be revealed to anyone else. A fundamental feature of free elections.", example: "The secret ballot protects voters from intimidation and coercion.", relatedTerms: ["Polling Booth", "Franchise"] },
  { term: "Security Deposit", definition: "An amount of money a candidate must pay when filing their nomination, which is refunded if they receive a sufficient number of votes.", example: "The candidate's security deposit was forfeited after she received less than 1/6 of the valid votes.", relatedTerms: ["Nomination", "Candidate"] },
  { term: "Suffrage", definition: "The right to vote in political elections; also called the franchise.", example: "Universal adult suffrage means that all adult citizens, regardless of gender or wealth, have the right to vote.", relatedTerms: ["Franchise", "Voter Registration"] },
  { term: "Swing", definition: "The shift in voter support from one party to another between elections, usually expressed as a percentage.", example: "A 5% swing from the ruling party to the opposition was enough to change the government.", relatedTerms: ["Opinion Poll", "General Election"] },
  { term: "Turnout", definition: "The percentage of eligible voters who actually vote in an election.", example: "The election saw a turnout of 67%, meaning 67 out of every 100 eligible voters cast a ballot.", relatedTerms: ["Voter Registration", "Franchise"] },
  { term: "Voter ID", definition: "An official identity document required by voters to verify their identity at the polling station. Accepted forms vary by country.", example: "She brought her voter ID card and passport to the polling station as required by law.", relatedTerms: ["Electoral Roll", "Polling Station"] },
  { term: "Voter Registration", definition: "The process by which eligible citizens add their name to the official list of voters (electoral roll) so they can vote in elections.", example: "She completed her voter registration online three months before the general election.", relatedTerms: ["Electoral Roll", "Franchise"] },
  { term: "VVPAT (Voter-Verified Paper Audit Trail)", definition: "A system attached to an EVM that prints a paper slip showing the voter's choice, which the voter can verify before it is automatically cut and stored.", example: "After pressing the EVM button, the voter saw the VVPAT slip confirming her candidate's symbol.", relatedTerms: ["EVM", "Ballot"] },
];

export function getTermsByLetter(letter: string): GlossaryTerm[] {
  return glossaryTerms.filter((t) => t.term.toUpperCase().startsWith(letter.toUpperCase()));
}

export function searchTerms(query: string): GlossaryTerm[] {
  const q = query.toLowerCase();
  return glossaryTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q)
  );
}

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter((l) =>
  glossaryTerms.some((t) => t.term.toUpperCase().startsWith(l))
);
