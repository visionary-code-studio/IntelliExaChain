# CivicFlow UI/UX Design Document

## 1. Design Reference Summary

This UI/UX direction is inspired by the visual and interaction language of the referenced nonprofit website concept: emotionally engaging storytelling, bold hero typography, a card-based content feed, mobile-first usability, outcome-driven sections, and a simple donation/action flow. For CivicFlow, the same principles are adapted into a civic education product that feels trustworthy, human, and easy to navigate.

---

## 2. Product Vision

CivicFlow is an interactive civic education assistant that helps users understand elections from start to finish through guided learning, visual timelines, and conversational assistance.

The experience should feel:

* clear
* calm
* trustworthy
* modern
* educational
* mobile-friendly

The design must make a complex civic process feel approachable for first-time voters and students.

---

## 3. Design Goals

* Reduce confusion around election processes
* Help users learn in small, digestible steps
* Make the assistant feel friendly and credible
* Support both quick scanning and deep exploration
* Provide a strong mobile experience
* Encourage completion of learning flows and checklists

---

## 4. Design Principles

### 4.1 Human-first storytelling

Present election information through relatable language, visual steps, and simple examples.

### 4.2 Progressive disclosure

Show only what the user needs at each step. Let users expand for more detail.

### 4.3 Trust over hype

Use clean layouts, factual language, and clear source labeling.

### 4.4 Guided discovery

Help users move through the election process in a logical sequence.

### 4.5 Mobile-native interaction

Design for thumbs, short attention spans, and quick reading.

---

## 5. Visual Design Direction

### 5.1 Overall style

A warm, editorial, civic, and modern visual style. The interface should feel more like a well-designed educational publication than a dense government portal.

### 5.2 Mood

* confident
* informative
* compassionate
* accessible
* calm

### 5.3 Visual inspiration translation

The referenced design uses large typography, immersive hero treatment, story cards, and clear action sections. CivicFlow should translate that into:

* a bold hero with a civic mission statement
* a scrollable learning feed
* timeline cards with strong hierarchy
* action panels for “Learn”, “Check Eligibility”, and “Ask Assistant”

---

## 6. Brand Personality

CivicFlow should feel like:

* a trusted civic guide
* a helpful teacher
* a calm policy explainer
* a digital mentor for first-time voters

Avoid making the product feel:

* political
* bureaucratic
* intimidating
* overly institutional

---

## 7. Color System

### 7.1 Recommended palette direction

Use a grounded, civic palette with warm neutrals and a strong accent.

### 7.2 Suggested tokens

* Background: soft warm ivory
* Surface: white / pale sand
* Primary text: deep charcoal
* Secondary text: muted gray
* Accent: civic orange or amber
* Support accent: deep brown or clay
* Success / completion: muted green
* Warning / deadline: deep amber

### 7.3 Color usage rules

* Use accent color sparingly for actions and highlights
* Keep backgrounds neutral so content stays readable
* Use strong contrast for accessibility
* Use one dominant accent for CTA buttons and active states

---

## 8. Typography

### 8.1 Type style

Use a strong sans-serif family for clarity and modernity.

### 8.2 Hierarchy

* H1: large, bold, editorial headline
* H2: section headers
* H3: card titles and step labels
* Body: highly readable, generous line-height
* Caption: metadata, hints, and helper text

### 8.3 Type behavior

* Headlines should be concise and impactful
* Body content should be broken into short paragraphs
* Avoid dense blocks of text

---

## 9. Layout System

### 9.1 Grid

* Desktop: 12-column responsive grid
* Tablet: 8-column grid
* Mobile: 4-column single-column flow

### 9.2 Spacing

* Use generous whitespace
* Keep cards visually separated
* Make content feel breathable and easy to scan

### 9.3 Section rhythm

The homepage should alternate between:

* hero
* curated highlights
* process timeline
* key actions
* civic outcomes / trust indicators
* final CTA

---

## 10. Information Architecture

### Primary navigation

* Home
* Timeline
* Learn Steps
* Ask Assistant
* Glossary
* Checklist
* Resources

### Secondary navigation

* About CivicFlow
* Accessibility
* Language selector
* Profile / progress

---

## 11. Homepage Structure

### 11.1 Hero section

A full-width hero with:

* strong mission statement
* short explanation of what CivicFlow does
* two primary actions: Learn the process, Ask a question
* subtle background illustration or civic motion graphic

### 11.2 Featured learning cards

A row or stack of cards such as:

* What is an election?
* How do I register?
* What happens on voting day?
* How are results announced?

### 11.3 Timeline preview

A scrollable strip or vertical summary of election stages.

### 11.4 Trust section

A small section that explains:

* the content is neutral
* the guide is educational only
* users should verify local rules with official sources

### 11.5 Progress / return user module

For returning users:

* continue learning
* resume checklist
* recent assistant questions

---

## 12. Core Screens

## 12.1 Home

Purpose: orient the user and funnel them into learning.

Key elements:

* hero
* learning cards
* timeline preview
* assistant CTA
* trust badge

## 12.2 Election Timeline

Purpose: explain the full process in sequence.

Key elements:

* interactive vertical timeline
* milestone cards
* progress indicator
* “What you should do here” notes

## 12.3 Step Detail Page

Purpose: deep dive into a single election phase.

Key elements:

* clear title
* stage summary
* step breakdown
* checklist items
* common questions
* next step navigation

## 12.4 Assistant Page

Purpose: natural language learning.

Key elements:

* chat interface
* suggested questions
* quick replies
* source/verification hints
* “explain simpler” toggle

## 12.5 Glossary

Purpose: explain terms simply.

Key elements:

* searchable term list
* alphabet jump
* term cards
* example usage

## 12.6 Checklist

Purpose: help users prepare.

Key elements:

* deadline reminders
* tasks grouped by stage
* completion states
* progress summary

---

## 13. Component Library

### 13.1 Hero banner

* title
* subtitle
* CTA buttons
* optional illustration

### 13.2 Story card / learning card

* icon
* title
* short description
* status indicator
* tap target

### 13.3 Timeline step card

* step number
* phase name
* short explanation
* action hint

### 13.4 Info panel

* definition
* source note
* key takeaway

### 13.5 Progress bar

* learning completion
* checklist completion

### 13.6 Assistant message block

* user query
* assistant response
* quick actions
* expand/collapse detail

### 13.7 CTA module

* one clear action
* short supporting message

---

## 14. Interaction Design

### 14.1 Scrolling behavior

Use scroll-driven discovery to let users explore naturally, similar to a story feed.

### 14.2 Card interactions

* hover elevation on desktop
* subtle press states on mobile
* smooth transitions between sections

### 14.3 Assistant behavior

* suggested prompts appear first
* assistant should answer in short form first
* user can expand for more detail

### 14.4 Progress behavior

* show completion states
* let users continue from where they left off

---

## 15. Content Design

### Tone of voice

* simple
* respectful
* clear
* neutral
* encouraging

### Writing rules

* use short sentences
* avoid jargon
* define technical terms immediately
* prioritize action-oriented language

### Example microcopy

* Learn the election process step by step
* Check what you need before election day
* Ask anything in plain language
* Continue where you left off

---

## 16. Accessibility Requirements

* WCAG-friendly contrast
* keyboard accessible navigation
* screen-reader labels for all actionable elements
* readable line lengths
* no information conveyed by color alone
* large touch targets on mobile
* optional audio narration in later versions

---

## 17. Responsive Behavior

### Desktop

* two-column learning layouts where helpful
* timeline side rail
* richer visual content

### Tablet

* card stacks and collapsible panels

### Mobile

* single-column flow
* sticky primary CTA
* bottom navigation for key actions
* simplified cards and fast scanning

---

## 18. Trust and Credibility Patterns

* source reference blocks
* neutral label badges
* “verified explanation” markers for reviewed content
* warning notes for region-specific steps
* official-resource links in the resources section

---

## 19. User Journey Map

### First-time visitor

1. Lands on hero
2. Understands CivicFlow in one sentence
3. Chooses timeline or assistant
4. Follows step cards
5. Saves checklist or returns later

### Returning user

1. Opens progress dashboard
2. Resumes from previous stage
3. Asks a specific question
4. Reviews glossary or checklist

### Student learner

1. Uses timeline overview
2. Opens step summaries
3. Saves key terms
4. Completes learning flow

---

## 20. Emotional Design Goals

The interface should make the user feel:

* informed
* confident
* welcomed
* capable
* ready to act responsibly

---

## 21. Design System Deliverables

* color tokens
* typography scale
* button styles
* card styles
* timeline components
* assistant message components
* empty states
* loading states
* mobile navigation patterns

---

## 22. Proposed UX Enhancements

* “Explain in simple words” toggle
* quick question chips
* progress resume card
* guided election journey
* location-aware official resource panel
* checklist reminders

---

## 23. Final Direction

CivicFlow should borrow the strongest qualities of the reference design: bold storytelling, immersive content sections, clear action pathways, and mobile-first simplicity. The result should be a civic education platform that feels alive, human, and easy to trust while staying focused on clarity and usability.
