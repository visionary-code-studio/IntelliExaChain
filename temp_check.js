
    // SPLASH
    function enterApp() {
      const splash = document.getElementById('splash');
      const video = document.getElementById('splash-video');
      if (video) {
        video.pause();
        video.muted = true;
      }
      splash.style.opacity = '0';
      setTimeout(() => {
        splash.style.display = 'none';
        document.getElementById('app').style.display = 'flex';
        startTimer();
        buildQNav();
      }, 800);
    }

    function clickEnter() {
      const splash = document.getElementById('splash');
      const video = document.getElementById('splash-video');

      // Add the playing class to show the video background and start the loading bar
      splash.classList.add('playing');

      // Play the video with audio
      if (video) {
        video.muted = false;
        video.play().catch(err => {
          console.log("Audio video playback was blocked, trying muted:", err);
          video.muted = true;
          video.play().catch(e => console.log("Video fail:", e));
        });
      }

      // Wait exactly 10 seconds (duration of video) before entering the application
      setTimeout(() => {
        enterApp();
      }, 10000);
    }

    function clickLandingLink(pageId) {
      if (pageId === 'about') {
        window.location.href = 'about.html';
      } else if (pageId === 'testimonials') {
        window.location.href = 'testimonials.html';
      }
    }

    function showSplash() {
      const video = document.getElementById('splash-video');
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      const splash = document.getElementById('splash');
      splash.classList.remove('playing');
      splash.style.display = 'flex';
      // Reset progress bar animation
      const fill = document.querySelector('.splash-bar-fill');
      if (fill) {
        fill.style.animation = 'none';
        void fill.offsetWidth;
        fill.style.animation = null;
      }
      setTimeout(() => {
        splash.style.opacity = '1';
      }, 50);
      document.getElementById('app').style.display = 'none';
    }

    function showPage(id) {
      // Check if page is locked
      const examSpecificPages = ['exams', 'candidates', 'vault', 'results', 'audit', 'certificates', 'identity'];
      if (examSpecificPages.includes(id) && !decryptedExam) {
        // Enforce lock screen overlay display
        const overlay = document.getElementById('lock-page-' + id);
        if (overlay) overlay.style.display = 'flex';
      }

      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      const page = document.getElementById('page-' + id);
      if (page) page.classList.add('active');

      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach(item => {
        if (item.getAttribute('onclick') && item.getAttribute('onclick').includes("'" + id + "'")) {
          item.classList.add('active');
        }
      });
    }

    /* ── Sidebar collapse / expand toggle ── */
    function toggleSidebar() {
      const sidebar = document.getElementById('main-sidebar');
      const main    = document.querySelector('.main');
      if (!sidebar) return;
      sidebar.classList.toggle('collapsed');
      if (main) main.classList.toggle('sidebar-collapsed');
      // Persist state across page reloads (optional)
      try {
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed') ? '1' : '0');
      } catch(e) {}
    }

    /* Restore sidebar state on load */
    (function restoreSidebarState() {
      try {
        if (localStorage.getItem('sidebarCollapsed') === '1') {
          const sidebar = document.getElementById('main-sidebar');
          const main    = document.querySelector('.main');
          if (sidebar) { sidebar.classList.add('collapsed'); }
          if (main)    { main.classList.add('sidebar-collapsed'); }
        }
      } catch(e) {}
    })();

    function switchRole(role) {
      const topbar = document.querySelector('.topbar-avatar');
      const avatars = { admin: 'AS', student: 'RS', proctor: 'PK', examiner: 'EM', auditor: 'CA', recruiter: 'RV' };
      if (topbar) topbar.textContent = avatars[role] || 'AS';
      if (role === 'student') showPage('examroom');
      else if (role === 'proctor') showPage('proctoring');
      else if (role === 'auditor') showPage('audit');
      else if (role === 'recruiter') showPage('verification');
      else showPage('dashboard');
    }

    // --- THIRD-PARTY CREDENTIAL VERIFICATION SYSTEM ---
    
    // Track selected candidate's name for block verification
    let activeVerifyCandidate = null;

    function handleVerifyKeyPress(e) {
      if (e.key === 'Enter') {
        verifyInputCredential();
      }
    }

    function selectQuickVerify(did) {
      document.getElementById('verify-search-input').value = did;
      verifyCredential(did);
    }

    function verifyInputCredential() {
      const val = document.getElementById('verify-search-input').value.trim();
      if (!val) {
        alert("Please enter a Candidate DID, Name, or ExaChain Transaction Hash to verify.");
        return;
      }
      verifyCredential(val);
    }

    function verifyCredential(query) {
      let candidateKey = null;
      const q = query.toLowerCase();

      // Look up candidate in database by DID, name, or sub-string of DID
      for (const name in candidatesDb) {
        const c = candidatesDb[name];
        if (c.name.toLowerCase() === q || c.did.toLowerCase() === q || c.did.toLowerCase().includes(q) || q.includes(c.regId.toLowerCase())) {
          candidateKey = name;
          break;
        }
      }

      // Default fallback for demo hash checks: if they search something random, resolve to Riya Singh
      if (!candidateKey && (q.startsWith('0x') || q.length > 15)) {
        // Find if they typed some mock hash - default to Riya
        candidateKey = 'Riya Singh';
      }

      const placeholder = document.getElementById('verify-placeholder');
      const content = document.getElementById('verify-result-content');
      const card = document.getElementById('verify-result-card');

      if (!candidateKey) {
        alert("Verification Error: Hash ID or Decentralized ID not found on ExaChain ledger.\nPlease try one of our Quick Verify candidate pills.");
        placeholder.style.display = 'flex';
        content.style.display = 'none';
        card.className = "verify-card";
        return;
      }

      const p = candidatesDb[candidateKey];
      activeVerifyCandidate = candidateKey;

      // Update UI fields
      document.getElementById('verify-cand-name').textContent = p.name;
      document.getElementById('verify-cand-did').textContent = p.did;
      document.getElementById('verify-authority').textContent = p.authority;

      // Update avatar
      // Return high-fidelity dynamic SVG outline avatars matching candidate types
      const riyaSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:100%;height:100%"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle><path d="M12 2l7 3.5-7 3.5-7-3.5 7-3.5z" stroke="var(--purple)" fill="var(--purple)" opacity="0.3"></path></svg>`;
      const ankitSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:100%;height:100%"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle><path d="M12 2l7 3.5-7 3.5-7-3.5 7-3.5z" stroke="var(--cyan)" fill="var(--cyan)" opacity="0.3"></path></svg>`;
      const priyaSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:100%;height:100%"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle><path d="M12 2l7 3.5-7 3.5-7-3.5 7-3.5z" stroke="var(--teal)" fill="var(--teal)" opacity="0.3"></path></svg>`;
      document.getElementById('verify-avatar-icon').innerHTML = p.name === 'Riya Singh' ? riyaSvg : p.name === 'Ankit Sharma' ? ankitSvg : priyaSvg;

      // Reset block check logs
      const logBox = document.getElementById('crypto-steps-log');
      logBox.style.display = 'none';
      logBox.innerHTML = '';
      document.getElementById('btn-crypto-verify').style.display = 'block';

      // Update Exam & Scores dynamically
      let scoreText = '';
      let examTitle = '';
      if (p.name === 'Riya Singh') {
        examTitle = 'JEE Main Mock Test';
        scoreText = '98.6% (324/360)';
      } else if (p.name === 'Ankit Sharma') {
        examTitle = 'JEE Main Mock Test';
        scoreText = '74.2% (231/360)';
      } else {
        examTitle = 'GATE CS Mock Test';
        scoreText = '89.5% (79.5/100)';
      }
      document.getElementById('verify-exam-title').textContent = examTitle;
      document.getElementById('verify-exam-score').textContent = scoreText;

      // Handle status badges & card border colors
      const badge = document.getElementById('verify-status-badge');
      const didStatus = document.getElementById('check-did-status');
      const faceStatus = document.getElementById('check-face-status');
      const voiceStatus = document.getElementById('check-voice-status');
      const anomalyStatus = document.getElementById('check-anomaly-status');

      if (p.status.includes('Active') && !p.status.includes('Reviewing')) {
        badge.className = "report-status-badge badge-success";
        badge.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green);width:1em;height:1em;margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>Verified`;
        card.className = "verify-card active-success";

        didStatus.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green);width:1em;height:1em;margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>Authenticated`;
        didStatus.style.color = "var(--green)";
        faceStatus.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green);width:1em;height:1em;margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>Matches Registrant`;
        faceStatus.style.color = "var(--green)";
        voiceStatus.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green);width:1em;height:1em;margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>Matches Registrant`;
        voiceStatus.style.color = "var(--green)";
        anomalyStatus.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green);width:1em;height:1em;margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>0 Flagged Anomalies`;
        anomalyStatus.style.color = "var(--green)";
      } else if (p.status.includes('Flagged')) {
        badge.className = "report-status-badge badge-flagged";
        badge.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--red);width:1em;height:1em;margin-right:4px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Flagged`;
        card.className = "verify-card active-flagged";

        didStatus.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green);width:1em;height:1em;margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>Authenticated`;
        didStatus.style.color = "var(--green)";
        faceStatus.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--red);width:1em;height:1em;margin-right:4px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Impersonation Warning`;
        faceStatus.style.color = "var(--red)";
        voiceStatus.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green);width:1em;height:1em;margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>Matches Registrant`;
        voiceStatus.style.color = "var(--green)";
        anomalyStatus.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--red);width:1em;height:1em;margin-right:4px"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>Multiple Face Detected`;
        anomalyStatus.style.color = "var(--red)";
      } else { // Reviewing state
        badge.className = "report-status-badge badge-warning";
        badge.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--amber);width:1em;height:1em;margin-right:4px"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>Under Review`;
        card.className = "verify-card active-warning";

        didStatus.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green);width:1em;height:1em;margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>Authenticated`;
        didStatus.style.color = "var(--green)";
        faceStatus.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green);width:1em;height:1em;margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>Matches Registrant`;
        faceStatus.style.color = "var(--green)";
        voiceStatus.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green);width:1em;height:1em;margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>Matches Registrant`;
        voiceStatus.style.color = "var(--green)";
        anomalyStatus.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--amber);width:1em;height:1em;margin-right:4px"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>Gaze Deviation Flag`;
        anomalyStatus.style.color = "var(--amber)";
      }

      // Show result card
      placeholder.style.display = 'none';
      content.style.display = 'block';
    }

    // QR SCANNER SIMULATOR
    let qrScanTimeout = null;

    function startQrScan() {
      const modal = document.getElementById('qr-scanner-modal');
      const statusText = document.getElementById('qr-scanner-status');
      
      modal.style.display = 'flex';
      statusText.textContent = "● Initializing secure webcam feed...";
      statusText.style.color = "var(--cyan)";

      // Simulate QR scan sequence
      qrScanTimeout = setTimeout(() => {
        statusText.textContent = "● QR Code detected! Reading bytes...";
        statusText.style.color = "var(--amber)";
        
        qrScanTimeout = setTimeout(() => {
          statusText.innerHTML = '<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green);width:1em;height:1em;margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>Decrypted hash: did:indy:0x7f4c10a12e32a688';
          statusText.style.color = "var(--green)";
          
          qrScanTimeout = setTimeout(() => {
            closeQrScan();
            // Automatically select and verify Riya Singh
            selectQuickVerify('did:indy:0x7f4c10a12e32a688');
          }, 600);

        }, 800);

      }, 1000);
    }

    // CLOSE QR MODAL
    function closeQrScan() {
      if (qrScanTimeout) clearTimeout(qrScanTimeout);
      document.getElementById('qr-scanner-modal').style.display = 'none';
    }

    // CRYPTOGRAPHIC BLOCK HASH VALIDATION ANIMATION
    function runCryptographicVerification() {
      const logBox = document.getElementById('crypto-steps-log');
      const verifyBtn = document.getElementById('btn-crypto-verify');
      const p = candidatesDb[activeVerifyCandidate];
      if (!p) return;

      verifyBtn.style.display = 'none';
      logBox.style.display = 'block';
      logBox.innerHTML = '';

      const steps = [
        { text: `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--cyan);width:1em;height:1em;margin-right:4px"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>Fetching block header for Block #1,847,295...`, time: 500, style: 'loading' },
        { text: `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--purple);width:1em;height:1em;margin-right:4px"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>Retrieving Candidate Decentralized ID: ${p.did.substring(0, 20)}...`, time: 1000, style: '' },
        { text: `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--cyan);width:1em;height:1em;margin-right:4px"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>Pulling merkle root commit hash from ExaChain ledger...`, time: 1500, style: '' },
        { text: `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--cyan);width:1em;height:1em;margin-right:4px"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>Calculating local hash: SHA256(did + grade_percentile + proctor_audit_log)`, time: 2000, style: 'loading' },
        { text: `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--amber);width:1em;height:1em;margin-right:4px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>Local Hash calculated: 0x5a2f8b${p.name === 'Ankit Sharma' ? '311d' : '9d6e'}4e21a8f59...`, time: 2600, style: '' },
        { text: `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--cyan);width:1em;height:1em;margin-right:4px"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23 3 19 7 15"></path><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>Comparing with ledger state...`, time: 3100, style: 'loading' }
      ];

      steps.forEach(step => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.className = `crypto-log-line ${step.style}`;
          div.innerHTML = step.text;
          logBox.appendChild(div);
          logBox.scrollTop = logBox.scrollHeight;
        }, step.time);
      });

      // Final verification success outcome
      setTimeout(() => {
        const div = document.createElement('div');
        div.className = "crypto-log-line success";
        div.style.fontWeight = 'bold';
        
        if (p.name === 'Ankit Sharma') {
          div.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--red);width:1.1em;height:1.1em;margin-right:4px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>INTEGRITY FAILED: Block hash matches ledger but flags are active. Proctor audit log indicates multiple face anomalies.`;
          div.className = "crypto-log-line warning";
        } else if (p.name === 'Priya Patel') {
          div.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--amber);width:1.1em;height:1.1em;margin-right:4px"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>PENDING VALIDATION: Block hash verified. Pending final auditor confirmation of sustained gaze anomaly.`;
          div.className = "crypto-log-line warning";
        } else {
          div.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green);width:1.1em;height:1.1em;margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>CRYPTOGRAPHIC VERIFICATION MATCH: SHA256 hash match successful. Candidate data has NOT been modified since on-chain lock.`;
        }
        
        logBox.appendChild(div);
        logBox.scrollTop = logBox.scrollHeight;
      }, 3700);
    }

    // --- DYNAMIC MULTI-EXAM DATABASE ---
    const jeeQuestions = [];
    const gateQuestions = [];
    const upscQuestions = [];

    // Initialize JEE Questions (10 Physics, 10 Chemistry, 10 Math)
    const jeePhysicsQs = [
      { text: "The characteristic distance at which quantum gravitational effects are significant, the Planck length, can be determined from a suitable combination of the fundamental physical constants G, &hslash; and c. Which of the following correctly gives the Planck length?<br><br>(1) &radic;(G&hslash; / c<sup>3</sup>)<br>(2) &radic;(G&hslash; c<sup>3</sup>)<br>(3) G&hslash; / c<br>(4) &radic;(Gc / &hslash;<sup>3</sup>)", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 0 },
      { text: "A particle of mass <em>m</em> is moving in a circular path of radius <em>r</em> with a centripetal acceleration <em>a</em>. What is the net force acting on the particle?<br><br>(1) F = ma, directed towards the centre<br>(2) F = mv²/r, directed away from the centre<br>(3) F = mv²/r, directed towards the centre<br>(4) F = 0, since the speed is constant", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 2 },
      { text: "In a Young's double slit experiment, the slit separation is doubled. To keep the fringe width constant, the distance between the slits and the screen should be:<br><br>(1) Halved<br>(2) Doubled<br>(3) Quadrupled<br>(4) Unchanged", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 1 },
      { text: "A copper wire of length 1m and cross-sectional area 1mm² carries a current of 1A. The drift velocity of electrons is (given electron density n = 8.5 x 10²⁸ m⁻³):<br><br>(1) 0.074 mm/s<br>(2) 0.74 mm/s<br>(3) 7.4 mm/s<br>(4) 74 mm/s", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 0 },
      { text: "The half-life of a radioactive substance is 10 days. The time taken for 75% of the substance to decay is:<br><br>(1) 15 days<br>(2) 20 days<br>(3) 25 days<br>(4) 30 days", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 1 },
      { text: "An ideal gas expands isothermally from volume V₁ to V₂. The change in entropy of the gas is given by:<br><br>(1) nR ln(V₂/V₁)<br>(2) nR ln(V₁/V₂)<br>(3) Zero<br>(4) C_v ln(T₂/T₁)", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 0 },
      { text: "A convex lens of focal length f is placed in contact with a concave lens of focal length f. The power of the combination is:<br><br>(1) Zero<br>(2) Infinite<br>(3) 2/f<br>(4) f/2", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 0 },
      { text: "The escape velocity of a body from the Earth's surface depends on:<br><br>(1) Mass of the body<br>(2) Radius of the Earth<br>(3) Direction of projection<br>(4) Mass of the body and Earth", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 1 },
      { text: "The threshold frequency for photoelectric emission of a metal is &nu;₀. If light of frequency 2&nu;₀ falls on it, the maximum kinetic energy of emitted photoelectrons is:<br><br>(1) h&nu;₀<br>(2) 2h&nu;₀<br>(3) 0.5h&nu;₀<br>(4) Zero", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 0 },
      { text: "Which of the following electromagnetic waves has the shortest wavelength?<br><br>(1) Gamma rays<br>(2) X-rays<br>(3) Ultraviolet rays<br>(4) Microwaves", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 0 }
    ];

    const jeeChemistryQs = [
      { text: "Which of the following molecules has a permanent dipole moment?<br><br>(1) CO₂<br>(2) BF₃<br>(3) NF₃<br>(4) SiF₄", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 2 },
      { text: "The hybridization of sulfur in SF₆ is:<br><br>(1) sp³d<br>(2) sp³d²<br>(3) sp³d³<br>(4) dsp²", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 1 },
      { text: "The rate constant of a first-order reaction depends on:<br><br>(1) Concentration of reactant<br>(2) Temperature<br>(3) Time<br>(4) Extent of reaction", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 1 },
      { text: "Which of the following is an amphoteric oxide?<br><br>(1) Na₂O<br>(2) SO₃<br>(3) Al₂O₃<br>(4) CaO", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 2 },
      { text: "The monomer of Teflon is:<br><br>(1) Vinyl chloride<br>(2) Tetrafluoroethylene<br>(3) Styrene<br>(4) Butadiene", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 1 },
      { text: "Which element has the highest electron gain enthalpy (most negative)?<br><br>(1) Fluorine<br>(2) Chlorine<br>(3) Oxygen<br>(4) Nitrogen", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 1 },
      { text: "The number of radial nodes for a 3p orbital is:<br><br>(1) 1<br>(2) 2<br>(3) 0<br>(4) 3", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 0 },
      { text: "Which of the following is a greenhouse gas?<br><br>(1) N₂<br>(2) O₂<br>(3) CH₄<br>(4) Ar", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 2 },
      { text: "What is the coordination number of cobalt in [Co(NH₃)₆]Cl₃?<br><br>(1) 3<br>(2) 6<br>(3) 9<br>(4) 4", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 1 },
      { text: "Which of the following forms a basic buffer solution?<br><br>(1) NH₄OH + NH₄Cl<br>(2) CH₃COOH + CH₃COONa<br>(3) HCl + NaCl<br>(4) NaOH + NaCl", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 0 }
    ];

    const jeeMathQs = [
      { text: "If f(x) = sin(x) + cos(x), then the maximum value of f(x) is:<br><br>(1) 1<br>(2) &radic;2<br>(3) 2<br>(4) 1.5", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 1 },
      { text: "The value of integral &int;₀<sup>&pi;/2</sup> dx / (1 + tan(x)) is:<br><br>(1) &pi;<br>(2) &pi;/2<br>(3) &pi;/4<br>(4) 0", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 2 },
      { text: "The area bounded by the curve y = x² and the line y = 4 is:<br><br>(1) 32/3<br>(2) 16/3<br>(3) 8/3<br>(4) 4/3", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 0 },
      { text: "The order and degree of the differential equation (d²y/dx²)³ + (dy/dx)² = sin(x) are:<br><br>(1) Order = 2, Degree = 3<br>(2) Order = 3, Degree = 2<br>(3) Order = 2, Degree = 2<br>(4) Order = 1, Degree = 2", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 0 },
      { text: "The sum of the infinite geometric series 1 + 1/3 + 1/9 + 1/27 + ... is:<br><br>(1) 3/2<br>(2) 4/3<br>(3) 2<br>(4) 1.5", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 0 },
      { text: "If A is a square matrix of order 3 such that |A| = 4, then the value of |adj(A)| is:<br><br>(1) 4<br>(2) 16<br>(3) 64<br>(4) 8", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 1 },
      { text: "The probability of getting 53 Sundays in a leap year is:<br><br>(1) 1/7<br>(2) 2/7<br>(3) 53/366<br>(4) 26/183", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 1 },
      { text: "The value of lim<sub>x&rarr;0</sub> (e<sup>x</sup> - 1) / x is:<br><br>(1) 0<br>(2) 1<br>(3) e<br>(4) Log(e)", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 1 },
      { text: "If the vectors a = 2i + j - k and b = i + 3j + k are perpendicular, then the dot product a·b is:<br><br>(1) 0<br>(2) 4<br>(3) -4<br>(4) 1", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 0 },
      { text: "The derivative of log(sin(x)) with respect to x is:<br><br>(1) cot(x)<br>(2) tan(x)<br>(3) 1/sin(x)<br>(4) cos(x)/log(x)", options: ["Option (1)", "Option (2)", "Option (3)", "Option (4)"], correct: 0 }
    ];

    // Combine into main databases
    jeePhysicsQs.forEach(q => jeeQuestions.push(q));
    jeeChemistryQs.forEach(q => jeeQuestions.push(q));
    jeeMathQs.forEach(q => jeeQuestions.push(q));

    // Initialize GATE Questions (5 GA, 10 CS)
    const gateGAQs = [
      { text: "Select the word that fits best in the sentence: 'The director congratulated the team _____ their outstanding achievement.'<br><br>(A) on<br>(B) for<br>(C) about<br>(D) over", options: ["(A)", "(B)", "(C)", "(D)"], correct: 0 },
      { text: "A sum of money doubles itself in 5 years at simple interest. In how many years will it become 4 times itself?<br><br>(A) 10 years<br>(B) 12 years<br>(C) 15 years<br>(D) 20 years", options: ["(A)", "(B)", "(C)", "(D)"], correct: 2 },
      { text: "If P is the brother of Q, Q is the sister of R, and R is the father of S, how is P related to S?<br><br>(A) Father<br>(B) Uncle<br>(C) Brother<br>(D) Grandfather", options: ["(A)", "(B)", "(C)", "(D)"], correct: 1 },
      { text: "The ratio of the areas of a circle and an equilateral triangle inscribed in it is:<br><br>(A) 4&pi; / 3&radic;3<br>(B) 2&pi; / 3&radic;3<br>(C) &pi; / 3&radic;3<br>(D) 4&pi; / &radic;3", options: ["(A)", "(B)", "(C)", "(D)"], correct: 0 },
      { text: "Select the pair that expresses a relationship similar to 'Careful : Cautious':<br><br>(A) Bold : Daring<br>(B) Quiet : Loud<br>(C) Fast : Slow<br>(D) Wise : Foolish", options: ["(A)", "(B)", "(C)", "(D)"], correct: 0 }
    ];

    const gateCSQs = [
      { text: "What is the worst-case time complexity of inserting n elements into an empty Binary Search Tree (BST) without balancing?<br><br>(A) O(n)<br>(B) O(n log n)<br>(C) O(n²)<br>(D) O(1)", options: ["(A)", "(B)", "(C)", "(D)"], correct: 2 },
      { text: "A system uses LRU page replacement algorithm. With 3 page frames and a reference string: 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5. How many page faults occur?<br><br>(A) 7<br>(B) 8<br>(C) 9<br>(D) 10", options: ["(A)", "(B)", "(C)", "(D)"], correct: 2 },
      { text: "Which SQL clause is used to filter group results after grouping has been performed?<br><br>(A) WHERE<br>(B) HAVING<br>(C) GROUP BY<br>(D) FILTER", options: ["(A)", "(B)", "(C)", "(D)"], correct: 1 },
      { text: "What is the minimum number of states in a Deterministic Finite Automaton (DFA) that accepts all strings over {a, b} containing 'ab' as a substring?<br><br>(A) 2<br>(B) 3<br>(C) 4<br>(D) 5", options: ["(A)", "(B)", "(C)", "(D)"], correct: 1 },
      { text: "In TCP, if the congestion window size is 16 KB and the round trip time (RTT) is 100 ms, what is the maximum throughput?<br><br>(A) 1.6 Mbps<br>(B) 1.28 Mbps<br>(C) 160 Kbps<br>(D) 16 Mbps", options: ["(A)", "(B)", "(C)", "(D)"], correct: 1 },
      { text: "Which data structure is best suited for implementing Dijkstra's shortest path algorithm efficiently?<br><br>(A) Stack<br>(B) Queue<br>(C) Min-Heap (Priority Queue)<br>(D) Hash Table", options: ["(A)", "(B)", "(C)", "(D)"], correct: 2 },
      { text: "A CPU scheduling algorithm that yields the minimum average waiting time is:<br><br>(A) Round Robin<br>(B) First Come First Served<br>(C) Shortest Job First (SJF)<br>(D) Priority Scheduling", options: ["(A)", "(B)", "(C)", "(D)"], correct: 2 },
      { text: "How many bits are required for the tag field in a 2-way set-associative cache of size 64 KB with block size 16 Bytes on a 32-bit byte-addressable system?<br><br>(A) 18<br>(B) 19<br>(C) 17<br>(D) 16", options: ["(A)", "(B)", "(C)", "(D)"], correct: 0 },
      { text: "In database normalization, which normal form guarantees zero insertion/deletion anomalies and no partial dependency?<br><br>(A) 1NF<br>(B) 2NF<br>(C) 3NF<br>(D) BCNF", options: ["(A)", "(B)", "(C)", "(D)"], correct: 2 },
      { text: "In a directed graph G with V vertices and E edges, what is the time complexity of topological sorting using DFS?<br><br>(A) O(V²)<br>(B) O(V + E)<br>(C) O(E log V)<br>(D) O(V log V)", options: ["(A)", "(B)", "(C)", "(D)"], correct: 1 }
    ];

    gateGAQs.forEach(q => gateQuestions.push(q));
    gateCSQs.forEach(q => gateQuestions.push(q));

    // Initialize UPSC Questions (15 Bilingual GS)
    upscQuestions.push(
      {
        eng: "Q1. With reference to the Indus Valley Civilization, consider the following statements:<br>1. Harappa was the first site excavated in this civilization.<br>2. Iron was widely used by the Harappans.<br>Which of the statements given above is/are correct?<br><br>(A) 1 only<br>(B) 2 only<br>(C) Both 1 and 2<br>(D) Neither 1 nor 2",
        hin: "प्रश्न 1. सिंधु घाटी सभ्यता के संदर्भ में, निम्नलिखित कथनों पर विचार कीजिए:<br>1. हड़प्पा इस सभ्यता में उत्खनित होने वाला पहला स्थल था।<br>2. हड़प्पावासियों द्वारा लोहे का व्यापक रूप से उपयोग किया जाता था।<br>उपरोक्त कथनों में से कौन सा/से सही है/हैं?<br><br>(A) केवल 1<br>(B) केवल 2<br>(C) 1 और 2 दोनों<br>(D) न तो 1 और न ही 2",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      },
      {
        eng: "Q2. Which of the following Articles of the Constitution of India guarantees the Right to Equality?<br><br>(A) Article 14-18<br>(B) Article 19-22<br>(C) Article 23-24<br>(D) Article 25-28",
        hin: "प्रश्न 2. भारत के संविधान के निम्नलिखित अनुच्छेदों में से कौन सा समानता के अधिकार की गारंटी देता है?<br><br>(A) अनुच्छेद 14-18<br>(B) अनुच्छेद 19-22<br>(C) अनुच्छेद 23-24<br>(D) अनुच्छेद 25-28",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      },
      {
        eng: "Q3. Which winds are responsible for bringing rain to the western coast of India during summer?<br><br>(A) South-West Monsoon<br>(B) North-East Monsoon<br>(C) Western Disturbances<br>(D) Trade Winds",
        hin: "प्रश्न 3. गर्मियों के दौरान भारत के पश्चिमी तट पर वर्षा लाने के लिए कौन सी हवाएँ जिम्मेदार हैं?<br><br>(A) दक्षिण-पश्चिम मानसून<br>(B) उत्तर-पूर्वी मानसून<br>(C) पश्चिमी विक्षोभ<br>(D) व्यापारिक पवनें",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      },
      {
        eng: "Q4. To control inflation in the Indian economy, which policy tool is primarily used by the Reserve Bank of India (RBI)?<br><br>(A) Repo Rate hike<br>(B) Fiscal deficit increase<br>(C) Income tax reduction<br>(D) Decreasing import duties",
        hin: "प्रश्न 4. भारतीय अर्थव्यवस्था में मुद्रास्फीति को नियंत्रित करने के लिए, भारतीय रिजर्व बैंक (RBI) द्वारा मुख्य रूप से किस नीतिगत उपकरण का उपयोग किया जाता है?<br><br>(A) रेपो दर में वृद्धि<br>(B) राजकोषीय घाटे में वृद्धि<br>(C) आयकर में कमी<br>(D) आयात शुल्कों में कमी",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      },
      {
        eng: "Q5. With reference to carbon nanotubes, consider the following statements:<br>1. They can be used as carriers of drugs and antigens in the human body.<br>2. They can be made into artificial blood capillaries for injured tissues.<br>Which of the statements given above is/are correct?<br><br>(A) 1 only<br>(B) 2 only<br>(C) Both 1 and 2<br>(D) Neither 1 nor 2",
        hin: "प्रश्न 5. कार्बन नैनोट्यूब के संदर्भ में, निम्नलिखित कथनों पर विचार कीजिए:<br>1. इनका उपयोग मानव शरीर में दवाओं और एंटीजन के वाहक के रूप में किया जा सकता है।<br>2. इन्हें घायल ऊतकों के लिए कृत्रिम रक्त केशिकायों में बनाया जा सकता है।<br>उपरोक्त कथनों में से कौन सा/से सही है/हैं?<br><br>(A) केवल 1<br>(B) केवल 2<br>(C) 1 और 2 दोनों<br>(D) न तो 1 और न ही 2",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 2
      },
      {
        eng: "Q6. In which year was the partition of Bengal ordered by Lord Curzon?<br><br>(A) 1905<br>(B) 1911<br>(C) 1919<br>(D) 1947",
        hin: "प्रश्न 6. लॉर्ड कर्जन द्वारा किस वर्ष बंगाल विभाजन का आदेश दिया गया था?<br><br>(A) 1905<br>(B) 1911<br>(C) 1919<br>(D) 1947",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      },
      {
        eng: "Q7. The concept of 'Directive Principles of State Policy' in the Indian Constitution is borrowed from:<br><br>(A) Ireland<br>(B) USA<br>(C) USSR<br>(D) Australia",
        hin: "प्रश्न 7. भारतीय संविधान में 'राज्य के नीति निर्देशक तत्वों' की अवधारणा किस देश से ली गई है?<br><br>(A) आयरलैंड<br>(B) अमेरिका<br>(C) सोवियत संघ<br>(D) ऑस्ट्रेलिया",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      },
      {
        eng: "Q8. The river Danube flows into which of the following seas?<br><br>(A) Black Sea<br>(B) Mediterranean Sea<br>(C) Caspian Sea<br>(D) Baltic Sea",
        hin: "प्रश्न 8. डेन्यूब नदी निम्नलिखित में से किस सागर में गिरती है?<br><br>(A) काला सागर<br>(B) भूमध्य सागर<br>(C) कैस्पियन सागर<br>(D) बाल्टिक सागर",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      },
      {
        eng: "Q9. What is the main objective of the Montreal Protocol?<br><br>(A) Protection of the ozone layer<br>(B) Control of greenhouse gases<br>(C) Conservation of biodiversity<br>(D) Prevention of desertification",
        hin: "प्रश्न 9. मॉन्ट्रियल प्रोटोकॉल का मुख्य उद्देश्य क्या है?<br><br>(A) ओजोन परत का संरक्षण<br>(B) ग्रीनहाउस गैसों का नियंत्रण<br>(C) जैव विविधता का संरक्षण<br>(D) मरुस्थलीकरण की रोकथाम",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      },
      {
        eng: "Q10. In India, the GST (Goods and Services Tax) was implemented on:<br><br>(A) July 1, 2017<br>(B) April 1, 2017<br>(C) January 1, 2018<br>(D) August 15, 2017",
        hin: "प्रश्न 10. भारत में जीएसटी (वस्तु एवं सेवा कर) कब लागू किया गया था?<br><br>(A) 1 जुलाई 2017<br>(B) 1 अप्रैल 2017<br>(C) 1 जनवरी 2018<br>(D) 15 अगस्त 2017",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      },
      {
        eng: "Q11. Who was the founder of the Maurya Empire?<br><br>(A) Chandragupta Maurya<br>(B) Ashoka the Great<br>(C) Bindusara<br>(D) Chandragupta I",
        hin: "प्रश्न 11. मौर्य साम्राज्य का संस्थापक कौन था?<br><br>(A) चन्द्रगुप्त मौर्य<br>(B) महान अशोक<br>(C) बिन्दुसार<br>(D) चन्द्रगुप्त प्रथम",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      },
      {
        eng: "Q12. The speaker of Lok Sabha can resign by writing to the:<br><br>(A) Deputy Speaker of Lok Sabha<br>(B) President of India<br>(C) Prime Minister of India<br>(D) Chief Justice of India",
        hin: "प्रश्न 12. लोकसभा अध्यक्ष अपना त्यागपत्र किसे संबोधित करके दे सकते हैं?<br><br>(A) लोकसभा के उपाध्यक्ष को<br>(B) भारत के राष्ट्रपति को<br>(C) भारत के प्रधानमंत्री को<br>(D) भारत के मुख्य न्यायाधीश को",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      },
      {
        eng: "Q13. In which layer of the atmosphere do most weather phenomena occur?<br><br>(A) Troposphere<br>(B) Stratosphere<br>(C) Mesosphere<br>(D) Thermosphere",
        hin: "प्रश्न 13. वायुमंडल की किस परत में मौसम की अधिकांश घटनाएँ घटित होती हैं?<br><br>(A) क्षोभमंडल<br>(B) समतापमंडल<br>(C) मध्यमंडल<br>(D) तापमंडल",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      },
      {
        eng: "Q14. The National Devlopment Council (NDC) in India is presided over by the:<br><br>(A) Prime Minister<br>(B) President<br>(C) Finance Minister<br>(D) NITI Aayog Vice-Chairman",
        hin: "प्रश्न 14. भारत में राष्ट्रीय विकास परिषद (NDC) की अध्यक्षता किसके द्वारा की जाती है?<br><br>(A) प्रधानमंत्री<br>(B) राष्ट्रपति<br>(C) वित्त मंत्री<br>(D) नीति आयोग के उपाध्यक्ष",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      },
      {
        eng: "Q15. The scientific name of light-year is a unit of measurement of:<br><br>(A) Astronomical distance<br>(B) Time<br>(C) Light speed<br>(D) Stellar brightness",
        hin: "प्रश्न 15. वैज्ञानिक रूप से प्रकाश वर्ष किसकी माप की इकाई है?<br><br>(A) खगोलीय दूरी की<br>(B) समय की<br>(C) प्रकाश की गति की<br>(D) तारों की चमक की",
        options: ["(A)", "(B)", "(C)", "(D)"], correct: 0
      }
    );

    // --- STATE MANAGER ---
    let currentExam = ''; // 'jee', 'gate', 'upsc'
    let currentSubject = 'physics'; // 'physics', 'chemistry', 'mathematics' (For JEE)
    let currentGateSection = 'ga'; // 'ga', 'cs' (For GATE)
    let activeQIndex = 0; // 0-indexed index of current question in the selected list

    // Answers databases
    let examAnswers = {
      jee: Array(30).fill(null),
      gate: Array(15).fill(null),
      upsc: Array(15).fill(null)
    };

    // States: 'notvisited', 'notanswered', 'answered', 'marked', 'markedanswered'
    let examStates = {
      jee: Array(30).fill('notvisited'),
      gate: Array(15).fill('notvisited'),
      upsc: Array(15).fill('notvisited')
    };

    // Timers seconds remaining
    let examTimers = {
      jee: 3 * 3600,
      gate: 3 * 3600,
      upsc: 2 * 3600
    };
    let activeTimerInterval = null;

    // Collapsible navigation state
    let jeeNavCollapsed = false;

    // --- ENCRYPTION DECRYPTION SIMULATOR ---
    let decryptedExam = null;

    function unlockExamLedgerUI(examId) {
      decryptedExam = examId;
      
      // Update topbar status
      const statusBadge = document.getElementById('exam-decrypted-status');
      if (statusBadge) {
        statusBadge.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green)"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>${examId.toUpperCase()} Decrypted`;
        statusBadge.style.background = 'rgba(16,185,129,0.1)';
        statusBadge.style.color = 'var(--green)';
        statusBadge.style.borderColor = 'rgba(16,185,129,0.2)';
      }
      
      const lockBtn = document.getElementById('lock-ledger-btn');
      if (lockBtn) lockBtn.style.display = 'inline-block';

      // Hide lock screens on all 7 pages
      document.querySelectorAll('.encrypted-lock-overlay').forEach(overlay => {
        overlay.style.display = 'none';
      });

      // Populate candidates table dynamically
      const candidateListBody = document.getElementById('candidate-list-body');
      if (candidateListBody) {
        candidateListBody.innerHTML = '';
        const list = candidatesDbFilter[examId] || [];
        list.forEach(c => {
          const row = document.createElement('tr');
          row.style.borderBottom = '1px solid rgba(99,125,255,0.07)';
          row.style.cursor = 'pointer';
          row.onclick = () => openCandidateProfile(c.name);
          row.innerHTML = `
            <td style="padding:10px 0;font-weight:500">${c.name}</td>
            <td style="color:var(--text2)">${c.exam}</td>
            <td><span style="color:var(--green);font-size:0.72rem">${c.verify}</span></td>
            <td style="text-align:right"><span class="hash-text">${c.did}</span></td>
            <td style="text-align:right"><span style="color:${c.statusColor};font-size:0.72rem">${c.status}</span></td>
          `;
          candidateListBody.appendChild(row);
        });
      }

      // Populate vault packages dynamically
      const vaultContainer = document.getElementById('vault-list-container');
      if (vaultContainer) {
        vaultContainer.innerHTML = '';
        const packages = vaultDbFilter[examId] || [];
        packages.forEach(pkg => {
          const item = document.createElement('div');
          item.style.display = 'flex';
          item.style.alignItems = 'center';
          item.style.gap = '12px';
          item.style.padding = '14px';
          item.style.background = 'var(--card2)';
          item.style.border = '1px solid var(--border)';
          item.style.borderRadius = '10px';
          item.innerHTML = `
            <div style="width:40px;height:40px;border-radius:10px;background:${pkg.iconBg};display:flex;align-items:center;justify-content:center;font-size:20px">${pkg.icon}</div>
            <div style="flex:1">
              <div style="font-size:0.84rem;font-weight:600">${pkg.name}</div>
              <div style="font-size:0.68rem;color:var(--text3);margin-top:3px">${pkg.meta}</div>
              <div class="hash-text" style="margin-top:4px">${pkg.hash}</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:0.72rem;color:${pkg.statusColor};font-weight:600">${pkg.status}</div>
              <div style="font-size:0.65rem;color:var(--text3);margin-top:3px">${pkg.release}</div>
            </div>
          `;
          vaultContainer.appendChild(item);
        });
      }

      // Populate exams table dynamically
      const examsListBody = document.getElementById('exams-list-body');
      if (examsListBody) {
        examsListBody.innerHTML = '';
        const list = examsDbFilter[examId] || [];
        list.forEach(ex => {
          const row = document.createElement('tr');
          row.style.borderBottom = '1px solid rgba(99,125,255,0.07)';
          row.innerHTML = `
            <td style="padding:10px 0;font-weight:500">${ex.name}</td>
            <td><span class="exam-badge ${ex.badgeClass}">${ex.type}</span></td>
            <td style="color:var(--text2)">${ex.date}</td>
            <td style="text-align:right">${ex.candidates}</td>
            <td style="text-align:right"><span style="color:${ex.statusColor};font-size:0.72rem">${ex.status}</span></td>
            <td style="text-align:right"><span class="hash-text">${ex.hash}</span></td>
          `;
          examsListBody.appendChild(row);
        });
      }

      // Update Result Header text
      const resultsTitle = document.querySelector('#page-results .card-header .card-title');
      if (resultsTitle) {
        resultsTitle.textContent = `Score Distribution — ${examId.toUpperCase()} Mock Test`;
      }
    }

    function lockExamLedger() {
      if (confirm('Are you sure you want to LOCK the ExaChain ledger?\nAll exam-specific pages will be encrypted immediately, and active exam context will be cleared.')) {
        decryptedExam = null;
        
        // Reset topbar status
        const statusBadge = document.getElementById('exam-decrypted-status');
        if (statusBadge) {
          statusBadge.innerHTML = `<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--red)"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>Ledger Encrypted`;
          statusBadge.style.background = 'rgba(239,68,68,0.1)';
          statusBadge.style.color = 'var(--red)';
          statusBadge.style.borderColor = 'rgba(239,68,68,0.2)';
        }
        
        const lockBtn = document.getElementById('lock-ledger-btn');
        if (lockBtn) lockBtn.style.display = 'none';

        // Re-enable lock screens on all 7 pages
        document.querySelectorAll('.encrypted-lock-overlay').forEach(overlay => {
          overlay.style.display = 'flex';
        });

        // Hide active exam mode styles
        document.body.classList.remove('in-exam-mode');
        const secureBanner = document.getElementById('secure-proctor-banner');
        if (secureBanner) secureBanner.style.display = 'none';

        showPage('dashboard');
        alert('ExaChain ledger re-encrypted. All exam-specific data channels locked.');
      }
    }

    // Dynamic Database Filters
    const examsDbFilter = {
      'jee': [
        { name: 'JEE Main Mock Test', type: 'Competitive', date: '25 May 2026', candidates: '24,532', status: '<svg class=\"icon-inline\" viewBox=\"0 0 24 24\" style=\"color:var(--green);width:1em;height:1em;margin-right:4px\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"3\" fill=\"currentColor\"></circle></svg>Active', statusColor: 'var(--green)', hash: '0x7f4a...3a12', badgeClass: 'badge-competitive' }
      ],
      'gate': [
        { name: 'GATE Computer Science Mock Test', type: 'Competitive', date: '28 May 2026', candidates: '15,291', status: '● Scheduled', statusColor: 'var(--purple)', hash: '0xc1a8...f031', badgeClass: 'badge-competitive' }
      ],
      'upsc': [
        { name: 'UPSC Civil Services Prelims GS Mock', type: 'Competitive', date: '30 May 2026', candidates: '42,804', status: '● Scheduled', statusColor: 'var(--purple)', hash: '0x9e8f...7a8b', badgeClass: 'badge-competitive' }
      ]
    };

    const candidatesDbFilter = {
      'jee': [
        { name: 'Riya Singh', exam: 'JEE Main', verify: '<svg class=\"icon-inline\" viewBox=\"0 0 24 24\" style=\"color:var(--green);width:1em;height:1em;margin-right:4px\"><polyline points=\"20 6 9 17 4 12\"></polyline></svg>Verified', did: 'did:indy:0x7f4...3a12', status: '<svg class=\"icon-inline\" viewBox=\"0 0 24 24\" style=\"color:var(--green);width:1em;height:1em;margin-right:4px\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"3\" fill=\"currentColor\"></circle></svg>Active', statusColor: 'var(--green)' },
        { name: 'Ankit Sharma', exam: 'JEE Main', verify: '<svg class=\"icon-inline\" viewBox=\"0 0 24 24\" style=\"color:var(--green);width:1em;height:1em;margin-right:4px\"><polyline points=\"20 6 9 17 4 12\"></polyline></svg>Verified', did: 'did:indy:0xa4f...2e88', status: '<svg class=\"icon-inline\" viewBox=\"0 0 24 24\" style=\"color:var(--amber);width:1.1em;height:1.1em;margin-right:4px\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"></line></svg>Flagged', statusColor: 'var(--amber)' }
      ],
      'gate': [
        { name: 'Priya Patel', exam: 'GATE CS', verify: '<svg class=\"icon-inline\" viewBox=\"0 0 24 24\" style=\"color:var(--green);width:1em;height:1em;margin-right:4px\"><polyline points=\"20 6 9 17 4 12\"></polyline></svg>Verified', did: 'did:indy:0xc1a...f031', status: '<svg class=\"icon-inline\" viewBox=\"0 0 24 24\" style=\"color:var(--green);width:1em;height:1em;margin-right:4px\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"3\" fill=\"currentColor\"></circle></svg>Active', statusColor: 'var(--green)' }
      ],
      'upsc': [
        { name: 'Vikram Malhotra', exam: 'UPSC GS', verify: '<svg class=\"icon-inline\" viewBox=\"0 0 24 24\" style=\"color:var(--green);width:1em;height:1em;margin-right:4px\"><polyline points=\"20 6 9 17 4 12\"></polyline></svg>Verified', did: 'did:indy:0x9e8...7f1a', status: '<svg class=\"icon-inline\" viewBox=\"0 0 24 24\" style=\"color:var(--green);width:1em;height:1em;margin-right:4px\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"3\" fill=\"currentColor\"></circle></svg>Active', statusColor: 'var(--green)' }
      ]
    };

    const vaultDbFilter = {
      'jee': [
        { name: 'JEE Main Mock Test — Physics.enc', meta: 'Uploaded: 20 May 2026 · Size: 4.2 MB encrypted', hash: 'SHA-256: 0x7f4a2b9e1d5c8f30a6be4d21f9c7e3a12...', icon: '<svg class=\"icon-large\" style=\"width:20px;height:20px;stroke:currentColor;fill:none\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path></svg>', iconBg: 'rgba(99,102,241,0.1)', status: '<svg class=\"icon-inline\" viewBox=\"0 0 24 24\" style=\"color:var(--amber);width:1.1em;height:1.1em;margin-right:4px\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path></svg>LOCKED', statusColor: 'var(--amber)', release: 'Unlocks: 25 May 09:00 AM' }
      ],
      'gate': [
        { name: 'GATE Computer Science — CS.enc', meta: 'Uploaded: 22 May 2026 · Size: 3.8 MB encrypted', hash: 'SHA-256: 0xc1a8b9f0d482a991e2b77d44c5d9e3b4...', icon: '<svg class=\"icon-large\" style=\"width:20px;height:20px;stroke:currentColor;fill:none\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path></svg>', iconBg: 'rgba(99,102,241,0.1)', status: '<svg class=\"icon-inline\" viewBox=\"0 0 24 24\" style=\"color:var(--amber);width:1.1em;height:1.1em;margin-right:4px\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path></svg>LOCKED', statusColor: 'var(--amber)', release: 'Unlocks: 28 May 02:00 PM' }
      ],
      'upsc': [
        { name: 'UPSC Prelims Paper 1 — GS.enc', meta: 'Uploaded: 24 May 2026 · Size: 5.1 MB encrypted', hash: 'SHA-256: 0x9e8f7a1b3c4d5e6f7a8b9c0d1e2f3a4b...', icon: '<svg class=\"icon-large\" style=\"width:20px;height:20px;stroke:currentColor;fill:none\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path></svg>', iconBg: 'rgba(99,102,241,0.1)', status: '<svg class=\"icon-inline\" viewBox=\"0 0 24 24\" style=\"color:var(--amber);width:1.1em;height:1.1em;margin-right:4px\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path></svg>LOCKED', statusColor: 'var(--amber)', release: 'Unlocks: 30 May 09:30 AM' }
      ]
    };

    function startDecryption(examId) {
      currentExam = examId;
      const overlay = document.getElementById('decryption-overlay');
      const title = document.getElementById('dec-title');
      const logBox = document.getElementById('dec-log');

      overlay.style.display = 'flex';
      logBox.innerHTML = '';
      title.textContent = 'DID Authentication...';

      const logLines = [
        "Connecting to Decentralized Identity registry... SECURE.",
        "Authorizing credentials: Name 'Riya Singh'...",
        "Identity verification via encrypted zero-knowledge proof... VERIFIED.",
        "Retrieving paper decryption shares from smart contract ledger...",
        "Validating consensus block height #1,847,290...",
        "Decrypting exam payload hash with private key...",
        "Biometric AI proctoring camera handshake... DETECTED.",
        "Verification complete. Decrypting paper modules...",
        "Authorizing session token and unlocking data channels."
      ];

      let currentLineIdx = 0;
      const logInterval = setInterval(() => {
        if (currentLineIdx < logLines.length) {
          const timestamp = new Date().toLocaleTimeString();
          logBox.innerHTML += `<div>[${timestamp}] ${logLines[currentLineIdx]}</div>`;
          logBox.scrollTop = logBox.scrollHeight;
          currentLineIdx++;
          if (currentLineIdx === 4) title.textContent = 'Ledger Consensus Auth...';
          if (currentLineIdx === 7) title.textContent = 'AI Proctor Handshake...';
        } else {
          clearInterval(logInterval);
          setTimeout(() => {
            overlay.style.display = 'none';
            
            // Decrypt active exam context
            unlockExamLedgerUI(examId);

            // Check active role
            const role = document.getElementById('role-select').value;
            if (role === 'student') {
              launchExamPortal(examId);
            } else {
              alert(`ExaChain Decryption Share Verified via Smart Contract.\nExamination payload for '${examId.toUpperCase()}' successfully decrypted for role '${role.toUpperCase()}'.\nAll exam-specific tabs are now unlocked and filtered.`);
              showPage('dashboard');
            }
          }, 800);
        }
      }, 450);
    }

    // --- PORTAL MANAGER ---
    function launchExamPortal(examId) {
      document.body.classList.add('in-exam-mode');
      document.getElementById('secure-proctor-banner').style.display = 'flex';
      document.getElementById('exam-select-screen').style.display = 'none';

      // Hide active portals first
      document.getElementById('jee-portal').style.display = 'none';
      document.getElementById('gate-portal').style.display = 'none';
      document.getElementById('upsc-portal').style.display = 'none';

      activeQIndex = 0;

      if (examId === 'jee') {
        document.getElementById('jee-portal').style.display = 'flex';
        currentSubject = 'physics';
        loadJeeQuestion(0);
        buildJeeGrid();
      } else if (examId === 'gate') {
        document.getElementById('gate-portal').style.display = 'flex';
        currentGateSection = 'ga';
        loadGateQuestion(0);
        buildGateGrid();
      } else if (examId === 'upsc') {
        document.getElementById('upsc-portal').style.display = 'flex';
        loadUpscQuestion(0);
        buildUpscGrid();
      }

      startExamTimer(examId);
      showNotification("Secure Sandbox Locked. AI camera tracking activated.");
    }

    function exitExamPortal() {
      if (confirm("Are you sure you want to exit the exam sandbox? Your current responses will be saved, but the proctored session will end.")) {
        forceExitSandbox();
      }
    }

    function forceExitSandbox() {
      clearInterval(activeTimerInterval);
      document.body.classList.remove('in-exam-mode');
      document.getElementById('secure-proctor-banner').style.display = 'none';
      document.getElementById('jee-portal').style.display = 'none';
      document.getElementById('gate-portal').style.display = 'none';
      document.getElementById('upsc-portal').style.display = 'none';
      document.getElementById('exam-select-screen').style.display = 'block';

      // Reset main app sidebar back to active item
      showPage('examroom');
    }

    function showNotification(msg) {
      // Create a temporary toast notification inside the exam portal
      const toast = document.createElement('div');
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.background = '#0a0e1a';
      toast.style.border = '1px solid rgba(6, 182, 212, 0.4)';
      toast.style.color = '#06b6d4';
      toast.style.padding = '10px 20px';
      toast.style.borderRadius = '8px';
      toast.style.fontSize = '0.8rem';
      toast.style.zIndex = '4000';
      toast.style.fontFamily = 'Space Grotesk, sans-serif';
      toast.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.3)';
      toast.innerHTML = `<span style="display:inline-flex;align-items:center;gap:6px"><svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--cyan);width:1.2em;height:1.2em;margin-right:0"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>Blockchain Node: ${msg}</span>`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }

    // --- TIMERS ---
    function startExamTimer(examId) {
      clearInterval(activeTimerInterval);
      const timerLabelId = examId === 'jee' ? 'jee-timer' : examId === 'gate' ? 'gate-timer' : 'upsc-timer';
      const el = document.getElementById(timerLabelId);
      if (!el) return;

      activeTimerInterval = setInterval(() => {
        if (examTimers[examId] > 0) {
          examTimers[examId]--;
          const h = String(Math.floor(examTimers[examId] / 3600)).padStart(2, '0');
          const m = String(Math.floor((examTimers[examId] % 3600) / 60)).padStart(2, '0');
          const s = String(examTimers[examId] % 60).padStart(2, '0');
          el.textContent = `${h}:${m}:${s}`;
          if (examTimers[examId] < 600) {
            el.style.color = 'red';
          }
        } else {
          clearInterval(activeTimerInterval);
          alert("Time is up! Submitting exam automatically...");
          submitFinalExam();
        }
      }, 1000);
    }

    // --- JEE ENGINE (NTA) ---
    function loadJeeQuestion(idx) {
      activeQIndex = idx;
      const q = jeeQuestions[idx];

      // Update question text
      document.getElementById('jee-q-number-label').innerHTML = `Question No. ${idx + 1}`;
      document.getElementById('jee-q-content').innerHTML = `
        <div style="margin-bottom:15px;font-weight:600">Question Content:</div>
        <div style="background:#f9f9f9;padding:15px;border-radius:4px;border:1px solid #ddd;color:#111;margin-bottom:20px">${q.text}</div>
        <div class="nta-q-options">
          ${q.options.map((opt, oIdx) => `
            <div class="nta-opt-row ${examAnswers.jee[idx] === oIdx ? 'selected' : ''}" onclick="selectJeeOption(${oIdx})">
              <input type="radio" name="jee-opt" class="nta-opt-radio" ${examAnswers.jee[idx] === oIdx ? 'checked' : ''}>
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>
      `;

      // Update visited status
      if (examStates.jee[idx] === 'notvisited') {
        examStates.jee[idx] = 'notanswered';
      }

      // Highlight active question in navigator
      document.querySelectorAll('.nta-qnav-btn').forEach(btn => btn.classList.remove('active-q'));
      const activeBtn = document.getElementById(`jee-btn-${idx}`);
      if (activeBtn) activeBtn.classList.add('active-q');

      buildJeeGrid(); // Refresh layout styles
    }

    function selectJeeOption(optIdx) {
      examAnswers.jee[activeQIndex] = optIdx;
      loadJeeQuestion(activeQIndex);
    }

    function jeeSaveAndNext() {
      if (examAnswers.jee[activeQIndex] !== null) {
        examStates.jee[activeQIndex] = 'answered';
        // Simulate anchoring hash on blockchain
        showNotification(`Response for Q${activeQIndex + 1} hashed and anchored on block.`);
      }
      jeeNext();
    }

    function jeeSaveAndMarkForReview() {
      if (examAnswers.jee[activeQIndex] !== null) {
        examStates.jee[activeQIndex] = 'markedanswered';
      } else {
        examStates.jee[activeQIndex] = 'marked';
      }
      jeeNext();
    }

    function jeeClearResponse() {
      examAnswers.jee[activeQIndex] = null;
      examStates.jee[activeQIndex] = 'notanswered';
      loadJeeQuestion(activeQIndex);
    }

    function jeeMarkForReviewAndNext() {
      if (examAnswers.jee[activeQIndex] !== null) {
        examStates.jee[activeQIndex] = 'markedanswered';
      } else {
        examStates.jee[activeQIndex] = 'marked';
      }
      jeeNext();
    }

    function jeePrev() {
      if (activeQIndex > 0) {
        loadJeeQuestion(activeQIndex - 1);
        syncJeeSubjectTab(activeQIndex - 1);
      }
    }

    function jeeNext() {
      if (activeQIndex < 29) {
        loadJeeQuestion(activeQIndex + 1);
        syncJeeSubjectTab(activeQIndex + 1);
      }
    }

    function syncJeeSubjectTab(qIdx) {
      const tabs = document.querySelectorAll('.nta-subj-btn');
      tabs.forEach(t => t.classList.remove('active'));

      if (qIdx < 10) {
        tabs[0].classList.add('active');
        currentSubject = 'physics';
        document.getElementById('jee-grid-title').textContent = 'PHYSICS';
      } else if (qIdx < 20) {
        tabs[1].classList.add('active');
        currentSubject = 'chemistry';
        document.getElementById('jee-grid-title').textContent = 'CHEMISTRY';
      } else {
        tabs[2].classList.add('active');
        currentSubject = 'mathematics';
        document.getElementById('jee-grid-title').textContent = 'MATHEMATICS';
      }
    }

    function switchNtaSubject(sub) {
      currentSubject = sub;
      const tabs = document.querySelectorAll('.nta-subj-btn');
      tabs.forEach(t => t.classList.remove('active'));

      if (sub === 'physics') {
        tabs[0].classList.add('active');
        document.getElementById('jee-grid-title').textContent = 'PHYSICS';
        loadJeeQuestion(0);
      } else if (sub === 'chemistry') {
        tabs[1].classList.add('active');
        document.getElementById('jee-grid-title').textContent = 'CHEMISTRY';
        loadJeeQuestion(10);
      } else if (sub === 'mathematics') {
        tabs[2].classList.add('active');
        document.getElementById('jee-grid-title').textContent = 'MATHEMATICS';
        loadJeeQuestion(20);
      }
    }

    function toggleJeeNav() {
      const col = document.getElementById('jee-nav-column');
      const btn = document.getElementById('jee-collapse-btn');
      const mainCol = document.querySelector('.nta-question-column');

      if (jeeNavCollapsed) {
        col.style.display = 'flex';
        mainCol.style.width = '76%';
        btn.textContent = '>';
        jeeNavCollapsed = false;
      } else {
        col.style.display = 'none';
        mainCol.style.width = '99%';
        btn.textContent = '<';
        jeeNavCollapsed = true;
      }
    }

    function buildJeeGrid() {
      const grid = document.getElementById('jee-grid');
      if (!grid) return;

      let html = '';
      let start = currentSubject === 'physics' ? 0 : currentSubject === 'chemistry' ? 10 : 20;
      let end = start + 10;

      // Update NTA Legend Labels
      let counts = { notvisited: 0, notanswered: 0, answered: 0, marked: 0, markedanswered: 0 };
      for (let i = 0; i < 30; i++) {
        counts[examStates.jee[i]]++;
      }

      const legendBadges = document.querySelectorAll('.nta-legend-item span');
      if (legendBadges.length >= 5) {
        legendBadges[0].textContent = counts.notvisited;
        legendBadges[1].textContent = counts.notanswered;
        legendBadges[2].textContent = counts.answered;
        legendBadges[3].textContent = counts.marked;
        legendBadges[4].textContent = counts.markedanswered;
      }

      for (let i = start; i < end; i++) {
        const state = examStates.jee[i];
        let shapeClass = 'shape-notvisited';
        if (state === 'notanswered') shapeClass = 'shape-notanswered';
        if (state === 'answered') shapeClass = 'shape-answered';
        if (state === 'marked') shapeClass = 'shape-marked';
        if (state === 'markedanswered') shapeClass = 'shape-markedanswered';

        const isActive = activeQIndex === i ? 'active-q' : '';
        const numLabel = String(i + 1).padStart(2, '0');

        html += `<div class="nta-qnav-btn ${shapeClass} ${isActive}" id="jee-btn-${i}" onclick="loadJeeQuestion(${i})">${numLabel}</div>`;
      }
      grid.innerHTML = html;
    }

    // --- GATE ENGINE ---
    function loadGateQuestion(idx) {
      activeQIndex = idx;
      const q = gateQuestions[idx];

      document.getElementById('gate-q-number-label').innerHTML = `Question No. ${idx + 1}`;
      document.getElementById('gate-q-content').innerHTML = `
        <div style="margin-bottom:15px;font-weight:600">Question Content:</div>
        <div style="background:#fafafa;padding:15px;border-radius:4px;border:1px solid #ddd;color:#333;margin-bottom:20px">${q.text}</div>
        <div class="gate-opt-list">
          ${q.options.map((opt, oIdx) => `
            <div class="gate-opt-item ${examAnswers.gate[idx] === oIdx ? 'selected' : ''}" onclick="selectGateOption(${oIdx})">
              <input type="radio" name="gate-opt" class="nta-opt-radio" ${examAnswers.gate[idx] === oIdx ? 'checked' : ''}>
              <span>Option ${opt}</span>
            </div>
          `).join('')}
        </div>
      `;

      if (examStates.gate[idx] === 'notvisited') {
        examStates.gate[idx] = 'notanswered';
      }

      document.querySelectorAll('.gate-palette-btn').forEach(btn => btn.classList.remove('active-q'));
      const activeBtn = document.getElementById(`gate-btn-${idx}`);
      if (activeBtn) activeBtn.classList.add('active-q');

      buildGateGrid();
    }

    function selectGateOption(oIdx) {
      examAnswers.gate[activeQIndex] = oIdx;
      loadGateQuestion(activeQIndex);
    }

    function gateSaveAndNext() {
      if (examAnswers.gate[activeQIndex] !== null) {
        examStates.gate[activeQIndex] = 'answered';
        showNotification(`Response for Q${activeQIndex + 1} hashed and anchored.`);
      }
      gateNext();
    }

    function gateMarkForReviewAndNext() {
      if (examAnswers.gate[activeQIndex] !== null) {
        examStates.gate[activeQIndex] = 'markedanswered';
      } else {
        examStates.gate[activeQIndex] = 'marked';
      }
      gateNext();
    }

    function gateClearResponse() {
      examAnswers.gate[activeQIndex] = null;
      examStates.gate[activeQIndex] = 'notanswered';
      loadGateQuestion(activeQIndex);
    }

    function gatePrev() {
      if (activeQIndex > 0) {
        loadGateQuestion(activeQIndex - 1);
        syncGateTab(activeQIndex - 1);
      }
    }

    function gateNext() {
      if (activeQIndex < 14) {
        loadGateQuestion(activeQIndex + 1);
        syncGateTab(activeQIndex + 1);
      }
    }

    function syncGateTab(qIdx) {
      const tabs = document.querySelectorAll('.gate-sec-tab');
      tabs.forEach(t => t.classList.remove('active'));
      if (qIdx < 5) {
        tabs[0].classList.add('active');
        currentGateSection = 'ga';
      } else {
        tabs[1].classList.add('active');
        currentGateSection = 'cs';
      }
    }

    function switchGateSection(sec) {
      currentGateSection = sec;
      const tabs = document.querySelectorAll('.gate-sec-tab');
      tabs.forEach(t => t.classList.remove('active'));

      if (sec === 'ga') {
        tabs[0].classList.add('active');
        loadGateQuestion(0);
      } else {
        tabs[1].classList.add('active');
        loadGateQuestion(5);
      }
    }

    function buildGateGrid() {
      const grid = document.getElementById('gate-grid');
      if (!grid) return;

      let html = '';
      let start = currentGateSection === 'ga' ? 0 : 5;
      let end = start === 0 ? 5 : 15;

      let counts = { notvisited: 0, notanswered: 0, answered: 0, marked: 0, markedanswered: 0 };
      for (let i = 0; i < 15; i++) {
        counts[examStates.gate[i]]++;
      }

      const badges = document.querySelectorAll('.gate-legend-box span');
      if (badges.length >= 5) {
        badges[0].textContent = counts.answered;
        badges[1].textContent = counts.notanswered;
        badges[2].textContent = counts.marked;
        badges[3].textContent = counts.notvisited;
        badges[4].textContent = counts.markedanswered;
      }

      for (let i = start; i < end; i++) {
        const state = examStates.gate[i];
        let shapeClass = 'notvisited';
        if (state === 'notanswered') shapeClass = 'notanswered';
        if (state === 'answered') shapeClass = 'answered';
        if (state === 'marked') shapeClass = 'marked';
        if (state === 'markedanswered') shapeClass = 'markedanswered';

        const isActive = activeQIndex === i ? 'active-q' : '';
        html += `<div class="gate-palette-btn gate-circle-num ${shapeClass} ${isActive}" id="gate-btn-${i}" onclick="loadGateQuestion(${i})">${i + 1}</div>`;
      }
      grid.innerHTML = html;
    }

    // --- UPSC ENGINE ---
    function loadUpscQuestion(idx) {
      activeQIndex = idx;
      const q = upscQuestions[idx];

      document.getElementById('upsc-q-content').innerHTML = `
        <div class="upsc-lang-col">
          <div style="font-weight:bold;margin-bottom:10px">ENGLISH</div>
          <div>${q.eng}</div>
          <div class="upsc-opt-table">
            ${q.options.map((opt, oIdx) => `
              <div class="upsc-opt-row ${examAnswers.upsc[idx] === oIdx ? 'selected' : ''}" onclick="selectUpscOption(${oIdx})">
                <div class="upsc-bubble">${String.fromCharCode(65 + oIdx)}</div>
                <span>${opt}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="upsc-lang-col hindi">
          <div style="font-weight:bold;margin-bottom:10px;color:#851c1c">हिन्दी</div>
          <div>${q.hin}</div>
          <div class="upsc-opt-table">
            ${q.options.map((opt, oIdx) => `
              <div class="upsc-opt-row ${examAnswers.upsc[idx] === oIdx ? 'selected' : ''}" onclick="selectUpscOption(${oIdx})">
                <div class="upsc-bubble">${String.fromCharCode(65 + oIdx)}</div>
                <span>${opt}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      if (examStates.upsc[idx] === 'notvisited') {
        examStates.upsc[idx] = 'notanswered';
      }

      document.querySelectorAll('.upsc-nav-btn').forEach(btn => btn.classList.remove('active-q'));
      const activeBtn = document.getElementById(`upsc-btn-${idx}`);
      if (activeBtn) activeBtn.classList.add('active-q');

      buildUpscGrid();
    }

    function selectUpscOption(oIdx) {
      examAnswers.upsc[activeQIndex] = oIdx;
      loadUpscQuestion(activeQIndex);
    }

    function upscSaveAndNext() {
      if (examAnswers.upsc[activeQIndex] !== null) {
        examStates.upsc[activeQIndex] = 'answered';
        showNotification(`Response Q${activeQIndex + 1} hashed.`);
      }
      upscNext();
    }

    function upscClearResponse() {
      examAnswers.upsc[activeQIndex] = null;
      examStates.upsc[activeQIndex] = 'notanswered';
      loadUpscQuestion(activeQIndex);
    }

    function upscPrev() {
      if (activeQIndex > 0) loadUpscQuestion(activeQIndex - 1);
    }

    function upscNext() {
      if (activeQIndex < 14) loadUpscQuestion(activeQIndex + 1);
    }

    function buildUpscGrid() {
      const grid = document.getElementById('upsc-grid');
      if (!grid) return;

      let html = '';
      let answeredCount = 0;
      let notAnsweredCount = 0;

      for (let i = 0; i < 15; i++) {
        const state = examStates.upsc[i];
        let shapeClass = '';
        if (state === 'answered') {
          shapeClass = 'answered';
          answeredCount++;
        } else if (state === 'notanswered') {
          shapeClass = 'visited-unanswered';
          notAnsweredCount++;
        }

        const isActive = activeQIndex === i ? 'active-q' : '';
        html += `<div class="upsc-nav-btn ${shapeClass} ${isActive}" id="upsc-btn-${i}" onclick="loadUpscQuestion(${i})">${i + 1}</div>`;
      }

      grid.innerHTML = html;
      document.getElementById('upsc-stat-ans').textContent = answeredCount;
      document.getElementById('upsc-stat-nans').textContent = notAnsweredCount;
    }

    // --- POPUP DIALOG ENGINE ---
    function openSubmitSummary(examId) {
      const overlay = document.getElementById('nta-dialog-overlay');
      const dialog = document.getElementById('summary-dialog');
      const rowsContainer = document.getElementById('summary-dialog-rows');

      overlay.style.display = 'flex';

      // Reset styles
      dialog.className = 'nta-dialog';

      let totalQs = examId === 'jee' ? 30 : 15;
      let states = examStates[examId];

      let counts = { answered: 0, notanswered: 0, marked: 0, notvisited: 0 };
      states.forEach(s => {
        if (s === 'answered' || s === 'markedanswered') counts.answered++;
        else if (s === 'notanswered') counts.notanswered++;
        else if (s === 'marked') counts.marked++;
        else if (s === 'notvisited') counts.notvisited++;
      });

      if (examId === 'jee') {
        dialog.classList.add('nta-style');
        document.getElementById('dialog-header-title').textContent = 'NTA Exam Summary - JEE Main Mock Test';

        // Split into subjects for JEE
        let subCounts = {
          physics: { total: 10, answered: 0, notanswered: 0, marked: 0, notvisited: 0 },
          chemistry: { total: 10, answered: 0, notanswered: 0, marked: 0, notvisited: 0 },
          mathematics: { total: 10, answered: 0, notanswered: 0, marked: 0, notvisited: 0 }
        };

        for (let i = 0; i < 30; i++) {
          let s = states[i];
          let sub = i < 10 ? 'physics' : i < 20 ? 'chemistry' : 'mathematics';
          if (s === 'answered' || s === 'markedanswered') subCounts[sub].answered++;
          else if (s === 'notanswered') subCounts[sub].notanswered++;
          else if (s === 'marked') subCounts[sub].marked++;
          else if (s === 'notvisited') subCounts[sub].notvisited++;
        }

        rowsContainer.innerHTML = `
          <tr><td>PHYSICS</td><td>10</td><td>${subCounts.physics.answered}</td><td>${subCounts.physics.notanswered}</td><td>${subCounts.physics.marked}</td><td>${subCounts.physics.notvisited}</td></tr>
          <tr><td>CHEMISTRY</td><td>10</td><td>${subCounts.chemistry.answered}</td><td>${subCounts.chemistry.notanswered}</td><td>${subCounts.chemistry.marked}</td><td>${subCounts.chemistry.notvisited}</td></tr>
          <tr><td>MATHEMATICS</td><td>10</td><td>${subCounts.mathematics.answered}</td><td>${subCounts.mathematics.notanswered}</td><td>${subCounts.mathematics.marked}</td><td>${subCounts.mathematics.notvisited}</td></tr>
          <tr style="font-weight:bold;background:#fafafa"><td>TOTAL</td><td>30</td><td>${counts.answered}</td><td>${counts.notanswered}</td><td>${counts.marked}</td><td>${counts.notvisited}</td></tr>
        `;
      } else if (examId === 'gate') {
        dialog.classList.add('gate-style');
        document.getElementById('dialog-header-title').textContent = 'GATE Exam Summary - TCS iON Portal';

        let secCounts = {
          ga: { total: 5, answered: 0, notanswered: 0, marked: 0, notvisited: 0 },
          cs: { total: 10, answered: 0, notanswered: 0, marked: 0, notvisited: 0 }
        };

        for (let i = 0; i < 15; i++) {
          let s = states[i];
          let sec = i < 5 ? 'ga' : 'cs';
          if (s === 'answered' || s === 'markedanswered') secCounts[sec].answered++;
          else if (s === 'notanswered') secCounts[sec].notanswered++;
          else if (s === 'marked') secCounts[sec].marked++;
          else if (s === 'notvisited') secCounts[sec].notvisited++;
        }

        rowsContainer.innerHTML = `
          <tr><td>General Aptitude (GA)</td><td>5</td><td>${secCounts.ga.answered}</td><td>${secCounts.ga.notanswered}</td><td>${secCounts.ga.marked}</td><td>${secCounts.ga.notvisited}</td></tr>
          <tr><td>Computer Science (CS)</td><td>10</td><td>${secCounts.cs.answered}</td><td>${secCounts.cs.notanswered}</td><td>${secCounts.cs.marked}</td><td>${secCounts.cs.notvisited}</td></tr>
          <tr style="font-weight:bold;background:#fafafa"><td>TOTAL</td><td>15</td><td>${counts.answered}</td><td>${counts.notanswered}</td><td>${counts.marked}</td><td>${counts.notvisited}</td></tr>
        `;
      } else if (examId === 'upsc') {
        dialog.classList.add('upsc-style');
        document.getElementById('dialog-header-title').textContent = 'UPSC GS Prelims - Summary Sheet';

        rowsContainer.innerHTML = `
          <tr><td>General Studies - Paper I</td><td>15</td><td>${counts.answered}</td><td>${counts.notanswered}</td><td>0</td><td>${counts.notvisited}</td></tr>
          <tr style="font-weight:bold;background:#fafafa"><td>TOTAL</td><td>15</td><td>${counts.answered}</td><td>${counts.notanswered}</td><td>0</td><td>${counts.notvisited}</td></tr>
        `;
      }
    }

    function closeSubmitSummary() {
      document.getElementById('nta-dialog-overlay').style.display = 'none';
    }

    function submitFinalExam() {
      closeSubmitSummary();

      let score = 0;
      let totalQs = currentExam === 'jee' ? 30 : 15;
      let ansList = examAnswers[currentExam];
      let questionsList = currentExam === 'jee' ? jeeQuestions : currentExam === 'gate' ? gateQuestions : upscQuestions;

      // Calculate score
      let correctCount = 0;
      let wrongCount = 0;
      for (let i = 0; i < totalQs; i++) {
        if (ansList[i] !== null) {
          if (ansList[i] === questionsList[i].correct) {
            correctCount++;
          } else {
            wrongCount++;
          }
        }
      }

      if (currentExam === 'jee') {
        score = Math.round((correctCount / 30) * 360); // NTA JEE scale of 360 marks
      } else if (currentExam === 'gate') {
        score = Math.round((correctCount - wrongCount * 0.33) * 100 / 15); // GATE negative marks scale
      } else {
        score = Math.round((correctCount / 15) * 200); // UPSC GS scale of 200 marks
      }

      // Add a fresh blockchain transaction log to the audit trail log!
      // Find audit trail items and prepend a new one
      const auditContainer = document.querySelector('#page-audit .card-body');
      if (auditContainer) {
        const hash = "0x" + Math.random().toString(16).substr(2, 30) + "e" + Math.round(Math.random()*10);
        const blockNum = Math.floor(1847311 + Math.random()*10);
        const timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const scoreStr = currentExam === 'jee' ? `${score}/360` : currentExam === 'gate' ? `${score}/100` : `${score}/200`;

        const newAuditItem = `
          <div class="audit-item">
            <div class="audit-icon" style="background:rgba(16,185,129,0.1)"><svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg></div>
            <div class="audit-body">
              <div class="audit-action">Final submission sealed — Riya Singh · ${currentExam.toUpperCase()} Mock Test</div>
              <div class="audit-detail">Exam ID: EX-2026-${Math.floor(1000 + Math.random()*9000)} · Score achieved: ${scoreStr} · Status: Sealed</div>
              <div class="audit-hash">${hash} · Block #${blockNum}</div>
            </div>
            <div class="audit-time">${timeStr}<br><span style="color:var(--green)">display:inline-flex;align-items:center"><svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--green);width:1em;height:1em;margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>Confirmed</span></div>
          </div>
        `;
        auditContainer.insertAdjacentHTML('afterbegin', newAuditItem);
      }

      // Update Results page stats!
      const statValElement = document.querySelector('#page-results .stats-grid .stat-card:nth-child(3) .stat-val');
      if (statValElement) {
        statValElement.textContent = `${score}%`;
      }
      const topPerformerElement = document.querySelector('#page-results .card-body div[style*="border-top"] div:first-child font');
      // If we have a list of entries or a summary, update it
      // Let's create a beautiful custom alert/toast
      alert(`Exam submitted successfully!\n\nCandidate: Riya Singh\nExam: ${currentExam.toUpperCase()} Mock Test\nResult permanently anchored on Blockchain ledger.\n\nScore: ${currentExam === 'jee' ? score + '/360' : currentExam === 'gate' ? score + '/100' : score + '/200'}\n\nRedirecting to Results dashboard.`);

      forceExitSandbox();
      showPage('results');
    }

    // --- SPECTATOR ENGINE DASHBOARD & PROCTORING CONTROLLER ---
    function switchProctorTab(tabId) {
      // Deactivate all tabs
      document.querySelectorAll('.proctor-tab').forEach(tab => {
        tab.classList.remove('active');
      });
      // Deactivate all contents
      document.querySelectorAll('.proctor-tab-content').forEach(content => {
        content.classList.remove('active-content');
      });
      // Activate clicked tab
      const clickedTab = document.querySelector(`.proctor-tab[onclick*="${tabId}"]`);
      if (clickedTab) clickedTab.classList.add('active');
      // Activate content
      const contentEl = document.getElementById(`${tabId}-content`);
      if (contentEl) contentEl.classList.add('active-content');
    }

    // Candidate Profile database mock
    const candidatesDb = {
      'Riya Singh': {
        name: 'Riya Singh',
        regId: 'REG-2026-904812',
        did: 'did:indy:0x7f4c10a12e32a688',
        contact: 'riya.singh@iit.edu',
        authority: 'NTA / JEE Division',
        room: 'Delhi Center Hall A-101',
        gps: '28.6139° N, 77.2090° E (Delhi, IN)',
        status: 'Active',
        statusColor: 'var(--green)',
        logs: [
          { time: '12:30:02 PM', action: 'FaceID Verification Match Success', details: 'Confidence: 99.8% · Block #1,847,295', style: 'color:var(--green)' },
          { time: '12:30:05 PM', action: 'GPS Location validation passed', details: 'Candidate in Delhi Center Geofence · Block #1,847,296', style: 'color:var(--green)' },
          { time: '12:30:15 PM', action: 'VoiceID Enrollment Synced', details: 'Acoustic fingerprint anchor registered · Block #1,847,297', style: 'color:var(--green)' },
          { time: '12:31:00 PM', action: 'Periodic Webcam Gaze Check', details: 'Eye trajectory centered · All clear · Block #1,847,299', style: 'color:var(--green)' }
        ]
      },
      'Ankit Sharma': {
        name: 'Ankit Sharma',
        regId: 'REG-2026-104928',
        did: 'did:indy:0xa4f28e88e312a105',
        contact: 'ankit.sharma@gmail.com',
        authority: 'NTA / JEE Division',
        room: 'Mumbai Center Hall B-202',
        gps: '19.0760° N, 72.8777° E (Mumbai, IN)',
        status: 'Flagged / Integrity Hold',
        statusColor: 'var(--red)',
        logs: [
          { time: '12:32:10 PM', action: 'FaceID Verification Match Success', details: 'Confidence: 99.1% · Block #1,847,299', style: 'color:var(--green)' },
          { time: '12:34:02 PM', action: 'Multiple Face Anomaly Detected', details: 'Webcam feed captured 2 faces in boundary box · Block #1,847,302', style: 'color:var(--red); font-weight:bold' },
          { time: '12:34:12 PM', action: 'Proctor Alert Broadcast Triggered', details: 'Information automatically sent to Proctor, Institute, Examiner & Authority Dashboards', style: 'color:var(--amber)' }
        ]
      },
      'Priya Patel': {
        name: 'Priya Patel',
        regId: 'REG-2026-384102',
        did: 'did:indy:0xc1a3f031e882a991',
        contact: 'priya.patel@outlook.com',
        authority: 'SSC & GATE Coordinating IIT',
        room: 'Bangalore Center Hall C-05',
        gps: '12.9716° N, 77.5946° E (Bangalore, IN)',
        status: 'Active (Reviewing Anomaly)',
        statusColor: 'var(--amber)',
        logs: [
          { time: '12:28:15 PM', action: 'FaceID Verification Match Success', details: 'Confidence: 99.4% · Block #1,847,290', style: 'color:var(--green)' },
          { time: '12:31:05 PM', action: 'Sustained Gaze Deviation Alert', details: 'Gaze off screen for > 8 seconds · Block #1,847,298', style: 'color:var(--amber); font-weight:bold' },
          { time: '12:31:15 PM', action: 'Biometric re-check requested', details: 'Selfie handshake queued for Block #1,847,306', style: 'color:var(--text2)' }
        ]
      }
    };

    function openCandidateProfile(name) {
      const p = candidatesDb[name];
      if (!p) return;

      document.getElementById('prof-name').textContent = p.name;
      document.getElementById('prof-reg-id').textContent = p.regId;
      document.getElementById('prof-did').textContent = p.did;
      document.getElementById('prof-contact').textContent = p.contact;
      document.getElementById('prof-authority').textContent = p.authority;
      document.getElementById('prof-room').textContent = p.room;
      document.getElementById('prof-gps-coords').textContent = p.gps;
      
      const statusText = document.getElementById('prof-status-text');
      statusText.textContent = p.status;
      statusText.style.color = p.statusColor;

      const avatar = document.getElementById('prof-avatar');
      if (p.statusColor === 'var(--red)') {
        avatar.classList.add('flagged');
      } else {
        avatar.classList.remove('flagged');
      }

      // Populate logs
      const logContainer = document.getElementById('prof-integrity-logs');
      logContainer.innerHTML = '';
      p.logs.forEach(log => {
        const item = document.createElement('div');
        item.style.padding = '8px';
        item.style.background = 'var(--card)';
        item.style.border = '1px solid var(--border)';
        item.style.borderRadius = '8px';
        item.style.fontSize = '0.72rem';
        item.innerHTML = `
          <div style="display:flex;justify-content:space-between;margin-bottom:3px">
            <span style="${log.style}">${log.action}</span>
            <span style="color:var(--text3)">${log.time}</span>
          </div>
          <div style="color:var(--text2)">${log.details}</div>
        `;
        logContainer.appendChild(item);
      });

      document.getElementById('candidate-profile-modal').classList.add('active');
    }

    function closeCandidateProfile() {
      document.getElementById('candidate-profile-modal').classList.remove('active');
    }

    // Live Alert Actions
    function escalateAlert(name) {
      alert(`Escalating security anomaly for ${name} to high-severity compliance record on ExaChain.\nThis will sync with NTA / UPSC central authorities dashboards immediately.`);
    }

    function reviewAlert(name) {
      alert(`Opening biometric camera archives and GPS logs for ${name} for detailed invigilator verification.`);
    }

    function dismissAlert(btn) {
      const item = btn.closest('.alert-item');
      if (item) item.style.opacity = '0.5';
      alert('Alert dismissed. Marked as reviewed by local proctor.');
    }

    function evictCandidate(name, rowId) {
      if (confirm(`WARNING: Are you sure you want to EVICT candidate ${name}?\n\nThis will instantly terminate their active exam session, revoke their DID exam ticket on the ExaChain ledger, and log this cheating incident across the Institute and Examiner panels.`)) {
        // Suspend logic
        const row = document.getElementById(rowId);
        if (row) {
          row.style.opacity = '0.4';
          const btn = row.querySelector('button');
          if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--red);width:1em;height:1em;margin-right:4px"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>Evicted & Suspended';
          }
        }
        // Increment suspended count
        const countEl = document.getElementById('suspended-count');
        if (countEl) {
          let c = parseInt(countEl.textContent);
          countEl.textContent = c + 1;
        }
        // Update DB
        if (candidatesDb[name]) {
          candidatesDb[name].status = '<svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--red);width:1em;height:1em;margin-right:4px"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>Evicted / Suspended on-chain';
          candidatesDb[name].statusColor = 'var(--red)';
          candidatesDb[name].logs.push({
            time: '12:45:10 PM',
            action: 'DID Credential Terminated by Institute Admin',
            details: 'Session closed permanently. Incident hash logged on ExaChain ledger · Block #1,847,308',
            style: 'color:var(--red); font-weight:bold'
          });
        }
        alert(`Candidate ${name} evicted. DID credential suspended on ExaChain node Node-IITD-02.`);
      }
    }

    // --- SPECTATOR BOT JS ENGINE ---
    let botWindowOpen = false;

    function toggleBotWindow() {
      const win = document.getElementById('spectator-bot-window');
      const badge = document.getElementById('bot-badge');
      botWindowOpen = !botWindowOpen;
      
      if (botWindowOpen) {
        win.classList.add('active');
        if (badge) badge.style.display = 'none'; // Hide badge once opened
      } else {
        win.classList.remove('active');
      }
    }

    function handleBotKeyPress(e) {
      if (e.key === 'Enter') {
        sendBotMessage();
      }
    }

    function handleChipClick(topic) {
      appendChatMessage(topic, 'user');
      simulateBotReply(topic);
    }

    function handleDropdownSelect(selectEl) {
      const val = selectEl.value;
      if (!val) return;
      handleChipClick(val);
      selectEl.value = ""; // Reset dropdown to placeholder
    }

    function sendBotMessage() {
      const input = document.getElementById('bot-input');
      const text = input.value.trim();
      if (!text) return;

      appendChatMessage(text, 'user');
      input.value = '';
      simulateBotReply(text);
    }

    function appendChatMessage(text, sender) {
      const container = document.getElementById('bot-messages');
      const typing = document.getElementById('bot-typing');
      
      const msg = document.createElement('div');
      msg.className = `bot-message ${sender}`;
      msg.innerHTML = text;
      
      // Insert before typing indicator
      container.insertBefore(msg, typing);
      container.scrollTop = container.scrollHeight;
    }

    function simulateBotReply(query) {
      const typing = document.getElementById('bot-typing');
      typing.style.display = 'flex';
      
      const container = document.getElementById('bot-messages');
      container.scrollTop = container.scrollHeight;

      setTimeout(() => {
        typing.style.display = 'none';
        const response = getBotResponse(query);
        appendChatMessage(response, 'bot');
      }, 1000 + Math.random() * 500); // Simulate network/AI delay
    }

    function getBotResponse(query) {
      const q = query.toLowerCase();
      
      if (q.includes('register') || q.includes('how to register') || q.includes('registration')) {
        return `<strong>How to Register on IntelliExaChain:</strong><br><br>
                1. <strong>Create Profile</strong>: Access the candidate registration section and enter your institutional details (ID, board/university number, email, and phone number).<br>
                2. <strong>Biometric Verification</strong>: Complete a high-fidelity FaceID and VoiceID enrolment. Your biometric templates are encrypted and hashed, securing them on-chain without storing raw images/audio.<br>
                3. <strong>DID Linkage</strong>: Link your Decentralized Identifier (DID) wallet. The system generates a cryptographic registration hash verified by the conducting authority.`;
      }
      
      if (q.includes('hall ticket') || q.includes('download hall ticket') || q.includes('admit card')) {
        return `<strong>How to Download Your Hall Ticket:</strong><br><br>
                - <strong>Issuance</strong>: Once the conducting authority approves your registration, a cryptographically signed Hall Ticket is minted as a Verifiable Credential.<br>
                - <strong>Retrieval</strong>: The Hall Ticket is pushed directly to your DID wallet. You can view, download, or share the verified JSON/PDF certificate from your Candidate portal.<br>
                - <strong>Validation</strong>: On exam day, the exam portal checks the signature against the authority's public key on the ExaChain blockchain to authorize entrance.`;
      }

      if (q.includes('result') || q.includes('download result') || q.includes('grade')) {
        return `<strong>How to Download Your Examination Results:</strong><br><br>
                - <strong>Auto-Evaluation</strong>: Objective scoring is calculated automatically via smart contracts. Subjective inputs are routed securely to examiners.<br>
                - <strong>Publication</strong>: Results are permanently anchored to the ExaChain ledger to ensure they cannot be tampered with post-exam.<br>
                - <strong>Downloading Result Card</strong>: Navigate to the 'Results' tab, view your scores, and click 'Download Verified Grade Card'. The card includes a QR code linking to the on-chain ledger proof for instant verification by employers or universities.`;
      }

      if (q.includes('appear') || q.includes('how to appear')) {
        return `<strong>How to Appear for an Exam:</strong><br><br>
                1. <strong>Access</strong>: Go to the 'Exam Room' on the scheduled day and select your exam portal (NTA, GATE, or UPSC).<br>
                2. <strong>Handshake</strong>: Wait for the 10-second Zero-Knowledge decryption handshake to fetch the paper's secure key.<br>
                3. <strong>Biometrics</strong>: Confirm identity via FaceID and VoiceID scans.<br>
                4. <strong>Sandbox Mode</strong>: The browser locks into strict full-screen mode with Spectator AI tracking active. Ensure your webcam, microphone, and location services are enabled.`;
      }

      if (q.includes('rules') || q.includes('guidelines') || q.includes('instruction')) {
        return `<strong>Exam Rules &amp; Guidelines:</strong><br><br>
                - <strong>Solitary Space</strong>: You must sit in an authorized, solitary room. Background GPS location and camera scans verify your hall coordinates.<br>
                - <strong>Webcam &amp; Mic</strong>: The webcam must remain active and your face centered at all times. Audio whispers or secondary faces trigger immediate flags.<br>
                - <strong>Sandbox Integrity</strong>: Do not switch tabs, minimize the browser, or connect external displays. Keyboard focus is fully captured and locked.`;
      }

      if (q.includes('unfairness') || q.includes('prevent unfairness') || q.includes('how it works') || q.includes('intelliexachain work')) {
        return `<strong>How IntelliExaChain Works to Prevent Unfairness:</strong><br><br>
                - <strong>Double Shield</strong>: Combines Spectator AI (client-side monitoring) with ExaChain (immutable backend logging).<br>
                - <strong>Decrypted at Exam Time</strong>: Question papers remain fully encrypted on-chain. Decryption keys are released via smart contracts only at the exact exam start time, eliminating pre-exam paper leaks.<br>
                - <strong>No Tampering</strong>: Response drafts are snapshotted and hashed on-chain periodically during the exam. Post-exam modifications by candidates or corrupt administrators are mathematically impossible.`;
      }

      if (q.includes('security') || q.includes('ensure security')) {
        return `<strong>How We Ensure Security:</strong><br><br>
                - <strong>End-to-End Cryptography</strong>: All papers and response payloads are encrypted using military-grade AES-256 and asymmetric key pairs.<br>
                - <strong>ExaChain Ledger</strong>: Every access log, identity check, and answer submission is immutably anchored on-chain with SHA-256 hashes.<br>
                - <strong>Hardware Sandbox</strong>: Blocks screen capture, tab switches, and secondary virtual machines.`;
      }

      if (q.includes('transparency') || q.includes('ensure transparency')) {
        return `<strong>How We Ensure Transparency:</strong><br><br>
                - <strong>Public Audit Trail</strong>: Every administrative event, grading transaction, and score modification is logged on-chain.<br>
                - <strong>Block Explorer</strong>: Candidates, examiners, and compliance auditors can verify cryptographic block hashes in real-time, confirming that grades match the initial submissions exactly without backend tampering.`;
      }

      if (q.includes('accountability') || q.includes('ensure accountability')) {
        return `<strong>How We Ensure Accountability:</strong><br><br>
                - <strong>DID Signatures</strong>: Administrators, examiners, and proctors must sign every action (such as releasing questions, grading, or dismissing alerts) with their unique Decentralized ID (DID) credentials.<br>
                - <strong>Irrevocable Audit Ledger</strong>: Any administrative override or flag dismissal is locked forever on-chain, exposing any collusion or favoritism.`;
      }

      if (q.includes('privacy') || q.includes('ensure privacy')) {
        return `<strong>How We Ensure Privacy:</strong><br><br>
                - <strong>Zero-Knowledge &amp; Hashing</strong>: We never store raw face images, voice records, or identity documents on-chain. Only cryptographic hashes and reference vectors are written to the public ledger.<br>
                - <strong>Decentralized Credentials</strong>: Personal data remains in the candidate's private wallet, and only authorized proofs are shared during verification.`;
      }

      if (q.includes('fairness') || q.includes('ensure fairness')) {
        return `<strong>How We Ensure Fairness:</strong><br><br>
                - <strong>Identical Decryption</strong>: All candidates receive the decrypted question paper at the exact same millisecond via scheduled smart contracts.<br>
                - <strong>Uniform AI Proctoring</strong>: Spectator AI tracks every candidate equally, removing invigilator bias or human error from anomaly detection.`;
      }

      if (q.includes('reliability') || q.includes('ensure reliability')) {
        return `<strong>How We Ensure Reliability:</strong><br><br>
                - <strong>Offline Mode Continuity</strong>: If network connectivity drops, progress is continuously saved to an encrypted local buffer. Checkpoints are automatically synced and hashed on-chain when connection returns.<br>
                - <strong>Distributed Nodes</strong>: High availability is achieved through multiple consensus nodes hosted across universities and boards, ensuring zero downtime.`;
      }

      if (q.includes('consequence') || q.includes('caught') || q.includes('cheat') || q.includes('dishonesty') || q.includes('fraud') || q.includes('impersonation') || q.includes('punish')) {
        return `<strong>Consequences of Cheating &amp; Impersonation:</strong><br><br>
                <svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--red);width:1.2em;height:1.2em;margin-right:6px"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg><strong>Real-time Broadcast</strong>: Spectator AI instantly routes cheating alerts (webcam gaze off-screen, audio whisper, secondary face, or GPS mismatch) to the live Proctor Dashboard, Institute Panel, Examiner Panel, and Exam Authority.<br>
                <svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--red);width:1.2em;height:1.2em;margin-right:6px"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg><strong>DID Credential Revocation</strong>: The conducting authority or institute admin can immediately evict the candidate, terminating their session and invalidating their digital exam ticket on-chain.<br>
                <svg class="icon-inline" viewBox="0 0 24 24" style="color:var(--cyan);width:1.2em;height:1.2em;margin-right:6px"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg><strong>Permanent Blacklisting</strong>: The eviction is recorded immutably on ExaChain, which syncs with all participating boards and universities, preventing the candidate from registering for other exams.`;
      }

      if (q.includes('apply') || q.includes('how to apply') || q.includes('nta') || q.includes('jee') || q.includes('upsc') || q.includes('gate') || q.includes('website') || q.includes('conducting')) {
        return `<strong>How to Apply Using Different Authority Websites:</strong><br><br>
                IntelliExaChain integrates directly with different conducting authority portals with their approval:<br>
                1. <strong>Registration &amp; Booking</strong>: You apply and book exam slots directly on the authority websites:<br>
                   - <strong>JEE Main &amp; Advanced</strong>: Register on the official NTA website (jeemain.nta.nic.in).<br>
                   - <strong>UPSC Prelims/Mains</strong>: Register on the UPSC portal (upsc.gov.in).<br>
                   - <strong>Universities</strong>: Register on the respective college exam website.<br>
                2. <strong>IntelliExaChain Integration</strong>: Once registered on the authority's website, your Application Number, Admit Card, and Slot are synced to ExaChain.<br>
                3. <strong>Appearing for Exams</strong>: On exam day, candidates appear on the IntelliExaChain platform, where our **AI Proctor (Spectator)**, **Blockchain (ExaChain)**, and **Biometrics (FaceID/VoiceID)** monitor the session in real-time, preventing paper leaks and fraud.`;
      }

      return `I am here to help you get information about <strong>IntelliExaChain</strong>!<br><br>
              Try asking about:<br>
              - <strong>"How does security work?"</strong> or <strong>"How it works"</strong><br>
              - <strong>"What happens if I cheat?"</strong> (Consequences)<br>
              - <strong>"How to register?"</strong> or <strong>"Download hall ticket"</strong><br>
              - <strong>"How to apply for JEE or UPSC?"</strong><br>
              - <strong>"Ensure transparency, privacy, or accountability"</strong>`;
    }
  
