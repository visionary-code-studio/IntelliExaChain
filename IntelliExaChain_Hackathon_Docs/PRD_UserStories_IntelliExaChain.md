# PRD — IntelliExaChain
## Product Requirement Document
**Theme:** Examinations  
**Product Type:** Blockchain-powered examination integrity platform for EdTech and institutional assessments.

---

## 1) Product Vision
IntelliExaChain is a secure, fair, and intelligent examination orchestration platform that uses a permissioned blockchain, smart contracts, and AI-assisted monitoring to reduce paper leaks, impersonation, post-exam tampering, and grading disputes.

The product is designed for:
- Online examinations
- Hybrid examination centers
- High-stakes assessments
- Certification and credential verification

---

## 2) Problem Statement
Traditional examination systems suffer from:
- Question paper leaks before the exam window
- Proxy attendance and identity fraud
- Weak auditability of exam access and actions
- Tampering with submissions or grading records
- Limited trust between institutions, students, invigilators, and auditors

A trusted exam system needs:
- Immutable records
- Automated rule enforcement
- Strong identity verification
- Transparent evaluation
- Controlled access to sensitive exam assets

---

## 3) Goals
1. Prevent unauthorized access to question papers and submissions.
2. Ensure candidate identity is verified before and during the exam.
3. Log all important exam events immutably.
4. Support intelligent proctoring and anomaly detection.
5. Provide transparent, auditable evaluation and grading.
6. Offer a clean, usable interface for administrators, examiners, students, and invigilators.

---

## 4) Non-Goals
- Replacing all human invigilation in high-stakes exams.
- Storing raw biometric images on-chain.
- Using a public blockchain for private exam data.
- Automating subjective grading of long-form answers without human review.
- Building a consumer-grade crypto product; blockchain is infrastructure, not the user-facing goal.

---

## 5) Target Users / Personas
### A. Exam Administrator
Schedules exams, assigns candidates, manages question paper release, monitors incidents, exports reports.

### B. Examiner / Professor
Creates question sets, reviews objective scoring, validates subjective answers, finalizes grades.

### C. Student / Candidate
Registers identity, attends exam, completes authentication, receives secure access to paper, submits responses.

### D. Invigilator / Proctor
Observes live sessions, reviews AI flags, handles exceptions, confirms identity issues.

### E. Compliance / Auditor
Reviews immutable logs, access trails, score history, and incident records.

---

## 6) Core Value Proposition
- **Security:** encrypted question delivery, access control, immutable audit logs.
- **Fairness:** identical exam timing, controlled release, anti-impersonation checks.
- **Integrity:** tamper-proof submissions and traceable grading.
- **Intelligence:** AI-assisted proctoring to detect suspicious behavior.
- **Trust:** transparent, verifiable exam lifecycle.

---

## 7) Scope
### MVP
- Role-based dashboards
- Candidate onboarding and verification
- Exam scheduling and smart contract-based release
- Encrypted question paper access
- Basic proctoring event logging
- Objective question auto-evaluation
- Immutable audit trail
- Exam result publication and export

### Phase 2
- Advanced AI proctoring
- Decentralized identity integration
- Multi-device exam continuity
- Offline capture with later sync
- Subjective answer evaluation workflow
- Institutional analytics dashboard

---

## 8) Functional Requirements

### 8.1 Secure Exam Generation and Distribution
- Admin can create exams, upload encrypted question papers, define start time, end time, access window, and allowed candidate list.
- System must hash every question paper package and store the hash on-chain.
- Actual question paper file must be stored off-chain in encrypted storage.
- Smart contract must unlock access only at the scheduled time.
- Every access event must be logged with timestamp, user ID, and exam ID.

### 8.2 Candidate Authentication
- Candidate registers with institutional ID, email/phone, and biometric template reference.
- Biometric data must be stored as a protected encrypted template reference, not as plain data.
- Candidate receives a decentralized identity wallet or wallet-linked credential.
- Exam entry requires identity verification before the question release event.
- System must support fallback verification by invigilator for edge cases.

### 8.3 Cheating-Resistant Monitoring
- AI proctoring engine monitors webcam, audio, gaze, background activity, and tab-switch events.
- High-risk anomalies generate proctoring flags.
- Blockchain logs each flag as a permanent event record.
- Live session dashboard must show alert severity, timestamp, and incident history.

### 8.4 Tamper-Proof Submissions
- Candidate responses are encrypted and checkpointed periodically.
- Every response checkpoint is hashed and recorded on-chain.
- Final submission is signed and immutably stored.
- System must support recovery from network interruptions without data loss.

### 8.5 Automated Evaluation
- Objective questions are evaluated by smart contract rules or trusted scoring service.
- Scores are written to an immutable grade ledger.
- Subjective answers are routed to examiners for review.
- Final result is the combined outcome of automated evaluation and human moderation.
- Grade changes must be versioned and traceable.

### 8.6 Admin Controls
- Create/manage exam sessions
- Manage roles and permissions
- View live status, incidents, and logs
- Revoke access when necessary
- Export reports in PDF/CSV

---

## 9) User Stories & Acceptance Criteria

### Epic 1: Exam Setup
**User Story 1.1**  
As an administrator, I want to create an exam with timing, candidate list, and access rules so that the exam can be controlled securely.

**Acceptance Criteria**
- Given I am an authorized admin, when I create an exam, then the system saves schedule, rules, and candidate mapping.
- Given an exam is created, when I view it later, then all settings are visible and editable before publication.
- Given the exam is published, then critical timing fields become locked.

**User Story 1.2**  
As an administrator, I want to upload an encrypted question paper so that unauthorized users cannot read it.

**Acceptance Criteria**
- Upload must generate a file hash.
- File must be encrypted before storage.
- Hash must be written to the ledger.
- Only authenticated exam release can unlock it.

---

### Epic 2: Candidate Authentication
**User Story 2.1**  
As a student, I want to register my identity securely so that I can be verified on exam day.

**Acceptance Criteria**
- Candidate can complete registration only once per identity.
- Verification status must be visible.
- Sensitive biometric references are not exposed in the UI.
- Failed registration attempts are logged.

**User Story 2.2**  
As a proctor, I want to verify a candidate before exam access so that proxy attendance is prevented.

**Acceptance Criteria**
- Candidate must pass identity check before paper release.
- A failed match triggers an alert.
- Manual override must require a proctor reason and be logged.

---

### Epic 3: Secure Exam Access
**User Story 3.1**  
As a student, I want the question paper to unlock only at the scheduled time so that the process remains fair.

**Acceptance Criteria**
- Paper remains inaccessible before start time.
- Unlock occurs automatically at the start time.
- Early access attempts are denied and recorded.

**User Story 3.2**  
As an auditor, I want to see who accessed the question paper so that I can trace possible leaks.

**Acceptance Criteria**
- Every access event includes user, timestamp, and exam ID.
- Access logs are immutable and searchable.
- Export of access trail is available.

---

### Epic 4: Proctoring and Integrity
**User Story 4.1**  
As a proctor, I want AI-based alerts for suspicious activity so that I can intervene quickly.

**Acceptance Criteria**
- Alerts must include type, severity, and time.
- Proctor can dismiss or escalate an alert.
- Alert history is preserved.

**User Story 4.2**  
As a student, I want my responses saved continuously so that I do not lose progress during interruptions.

**Acceptance Criteria**
- Autosave occurs at configured intervals.
- Checkpoint hashes are recorded.
- Recovery resumes from the last valid checkpoint.

---

### Epic 5: Evaluation and Results
**User Story 5.1**  
As an examiner, I want objective answers to be scored automatically so that grading is fast and unbiased.

**Acceptance Criteria**
- Score is calculated according to published rules.
- Calculation results are reproducible.
- Any score change is versioned.

**User Story 5.2**  
As a student, I want my final result to be transparently recorded so that I can trust the outcome.

**Acceptance Criteria**
- Final result is viewable in the student portal.
- Ledger reference or verification proof is available.
- Result history includes evaluation stages.

---

## 10) Success Metrics
- Reduction in paper access violations
- Reduction in impersonation incidents
- Percentage of exams with complete audit trails
- Average time to identify suspicious activity
- Percentage of objective questions auto-graded
- Student and examiner trust scores
- Zero-tamper verification rate for stored submissions

---

## 11) Risks and Mitigations
### Risk: Blockchain complexity increases latency
Mitigation: keep heavy files off-chain, store only hashes and event proofs on-chain.

### Risk: Biometric privacy concerns
Mitigation: store encrypted templates and references only, never raw images on-chain.

### Risk: AI proctoring false positives
Mitigation: use severity thresholds, human review, and appeal workflows.

### Risk: Smart contract bugs
Mitigation: use audits, testnets, formal reviews, and restricted contract scope.

### Risk: Network interruptions during exams
Mitigation: autosave checkpoints, local secure cache, replay-safe syncing.

---

## 12) MVP Deliverables
- Web app with admin, student, proctor, and examiner portals
- Permissioned blockchain ledger
- Smart contracts for exam release and scoring
- Secure upload and encrypted exam vault
- AI proctoring event pipeline
- Result and audit dashboards

---

## 13) Out of Scope for MVP
- Fully decentralized public chain deployment
- Cross-institution universal identity network
- Automatic subjective answer generation
- Multi-language handwritten answer recognition
- Native mobile apps

---
## 14) Core and USP OF THE INTELLIEXACHAIN:
*Spectator*
 - It has Intelligence known as "Spectator" which uses AI to detect cheating
 - It has a secure blockchain know as "ExaChain" which uses AI to detect cheating
 - It monitor Webcam of every Candidate/Student and give realtime results to the Proct with every action of Candidate 
 - It also has a feature of face recognition to prevent impersonation
 - It also has a feature of FaceID and VoiceID to prevent impersonation
 - Send Information regarding Cheating and any type of impersonation and  fraud and dishonesty in examination to the Proct, Institute, show in candidate registration form, proctor panel, institute dashboard, examiner panel and also in the Examination Authority Dashboard and show realtime data in the AI Proctor's Dashboard.
 - Track the examination hall, location  using camera and GPS of the candidate
 - It track candidates perfromance during exam and give detailed analysis to the examiner and also show realtime data in the AI Proctor's Dashboard.
*Spectator Bot*
 - AI ChatBOT of IntelliExaChain which give realtime annoucement and notification about ongoing examination.
 - It helps Candidate to get relevent information about the examination.
   like how to register , how to download hall ticket, how to download result, how to appear for exam,rules and guidelines of examination, how this Intelliexachain prevent unfairness, how this IntelliExachain work, how this IntelliExachain ensure security, how this IntelliExachain ensure transparency, how this IntelliExachain ensure accountability, how this IntelliExachain ensure privacy, how this IntelliExachain ensure fairness, how this IntelliExachain ensure reliability, how this IntelliExachain ensure,etc.
 - What are the consequences of cheating and any type of impersonation and fraud and dishonesty in examination? 
 - How to Apply for Examination using different websites of Examination conducting authorities like JEE MAINS & ADVANCED BY NTA, UNIVERSITIES EXAMINATION (SUBJECTIVE OR OBJECTIVE), UPSC,etc.?

 *Overview*
 Intelliexachain is a revolutionary platform that redefines the examination process by integrating advanced AI and blockchain technologies. It ensures complete security, transparency, and fairness, eliminating cheating and impersonation while providing real-time monitoring and detailed analytics to all stakeholders.
 Integrating different websites of different authorities of different examinations , where candidate have to appear for examination in that authority's website with the help of intelliexachain technology and AI Proctor and blockchain security system, etc.  and with the approval of that Examination Authority. [In authority website candidate will register , book exam slot , get application number and form, admit card but in IntelliExaChain students appeared for examination and candidates real-time data will be track using Intelligence (AI),ExaChain (Blockchain),Proctor(AI), Spectator(AI). Question Paper will be encrypted with help of Blockchain and will be decrypted at the time of examination and no-one can download it before that and distribute.]

*Third-Party Access: Recruiters and academic institutions can instantly verify a candidate's credentials by scanning a QR code or entering a hash ID. This process bypasses the need for manual background checks or physical document verification*
